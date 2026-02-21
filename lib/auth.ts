import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

/** 从 Request 解析 cookies，供 getServerSession 使用 */
function cookiesFromRequest(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(";").map((s) => {
      const i = s.indexOf("=");
      const name = i === -1 ? s.trim() : s.slice(0, i).trim();
      const value = i === -1 ? "" : s.slice(i + 1).trim();
      return [name, value];
    })
  );
}

/** 供 getToken 使用的 req 形态：SessionStore 从 req.cookies 读，需为普通对象；Node 风格用 headers.cookie，此处用 cookies 对象兼容 */
function reqForJwt(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies: Record<string, string> = {};
  for (const part of cookieHeader.split(";")) {
    const i = part.indexOf("=");
    if (i === -1) continue;
    const name = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (name) cookies[name] = value;
  }
  return {
    headers: { cookie: cookieHeader },
    cookies,
  };
}

/**
 * 在 App Router 的 API 中从 request 获取当前用户 id。
 * 优先用 getToken 从 JWT cookie 解析（在 Route Handler 中最可靠），否则回退到 getServerSession。
 */
export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    try {
      const token = await getToken({ req: reqForJwt(request) as never, secret });
      if (token) {
        const id = (token as { userId?: string }).userId;
        if (id) return id;
        // userId not in JWT — look up or auto-create user by email
        if (token.email) {
          const email = String(token.email);
          const { data: existing } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();
          if (existing?.id) return existing.id;
          // User has a valid session but no DB row — auto-create
          // (happens when signIn callback failed due to assertConfig or DB issue)
          const { data: created } = await supabaseAdmin
            .from("users")
            .insert({
              email,
              name: (token.name as string) ?? null,
              avatar_url: (token.picture as string) ?? null,
              credits: 5,
            })
            .select("id")
            .single();
          if (created?.id) {
            await supabaseAdmin.from("points_history").insert({
              user_id: created.id,
              amount: 5,
              reason: "signup_bonus",
              created_at: new Date().toISOString(),
            }).catch(() => {});
            return created.id;
          }
        }
      }
    } catch (err) {
      console.warn("[getUserIdFromRequest] getToken failed:", (err as Error)?.message);
    }
  }
  const session = await getSessionFromRequest(request);
  return (session?.user as { id?: string })?.id ?? null;
}

/** 在 App Router 的 API 中传入 request 获取 session；优先用 JWT 构造保证 user.id 存在。 */
export async function getSessionFromRequest(request: Request): Promise<Session | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    const token = await getToken({ req: reqForJwt(request) as never, secret });
    if (token) {
      let userId = (token as { userId?: string }).userId;
      if (!userId && token.email) {
        const { data } = await supabaseAdmin
          .from("users")
          .select("id")
          .eq("email", String(token.email))
          .maybeSingle();
        if (data) userId = data.id;
      }
      if (userId) {
        const session: Session = {
          user: {
            id: userId,
            role: (token as { role?: string }).role ?? "user",
            email: (token.email as string | null) ?? null,
            name: (token.name as string | null) ?? null,
            image: (token.picture as string | null) ?? null,
          },
          expires: (token.exp as number | undefined) ? new Date((token.exp as number) * 1000).toISOString() : "",
        };
        return session;
      }
    }
  }
  try {
    const req = {
      headers: Object.fromEntries(request.headers.entries()),
      cookies: cookiesFromRequest(request),
    };
    const res = { getHeader: () => undefined, setCookie: () => {}, setHeader: () => {} };
    return await getServerSession(req as never, res as never, authOptions);
  } catch (err) {
    console.warn("[getSessionFromRequest] getServerSession failed, returning null:", (err as Error)?.message);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Auto-link Google: create or update user + account in Supabase; sync name & avatar from Google.
    // 新用户：此处给 5 积分并写 points_history(signup_bonus)；老用户不在此发积分，由 GET /api/user/initial-bonus 按 DB 是否已有 signup_bonus/initial_bonus 决定是否发 5。
    async signIn({ user, account }) {
      if (!user.email || !account) return false;

      const { data: existingUser } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (existingUser) {
        await supabaseAdmin
          .from("users")
          .update({
            name: user.name,
            avatar_url: user.image,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingUser.id);

        await supabaseAdmin
          .from("accounts")
          .upsert(
            {
              user_id: existingUser.id,
              provider: account.provider,
              provider_account_id: account.providerAccountId,
              access_token: account.access_token ?? null,
              refresh_token: account.refresh_token ?? null,
              expires_at: account.expires_at ?? null,
            },
            { onConflict: "provider,provider_account_id" }
          );
      } else {
        const { data: newUser } = await supabaseAdmin
          .from("users")
          .insert({
            email: user.email,
            name: user.name,
            avatar_url: user.image,
            credits: 5,
          })
          .select("id")
          .single();

        if (newUser) {
          const nowIso = new Date().toISOString();
          let err = await supabaseAdmin.from("points_history").insert({
            user_id: newUser.id,
            amount: 5,
            reason: "signup_bonus",
            created_at: nowIso,
          }).then((r) => r.error);
          if (err) {
            await new Promise((r) => setTimeout(r, 300));
            await supabaseAdmin.from("points_history").insert({
              user_id: newUser.id,
              amount: 5,
              reason: "signup_bonus",
              created_at: new Date().toISOString(),
            });
          }
        }

        if (newUser) {
          await supabaseAdmin.from("accounts").insert({
            user_id: newUser.id,
            provider: account.provider,
            provider_account_id: account.providerAccountId,
            access_token: account.access_token ?? null,
            refresh_token: account.refresh_token ?? null,
            expires_at: account.expires_at ?? null,
          });
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.email) {
        let { data } = await supabaseAdmin
          .from("users")
          .select("id, role")
          .eq("email", user.email)
          .single();
        if (!data) {
          await new Promise((r) => setTimeout(r, 400));
          const res = await supabaseAdmin
            .from("users")
            .select("id, role")
            .eq("email", user.email)
            .single();
          data = res.data;
        }
        if (data) {
          token.userId = data.id;
          token.role = data.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.userId;
        (session.user as Record<string, unknown>).role = token.role;
      }
      return session;
    },

    /** 显式放行同源回调 URL（含 ?login=success 等），避免 INVALID_CALLBACK_URL_ERROR */
    redirect({ url, baseUrl }) {
      try {
        const u = new URL(url);
        const base = new URL(baseUrl);
        if (u.origin === base.origin) return url;
      } catch {
        // ignore
      }
      return baseUrl;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/?login=1",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
