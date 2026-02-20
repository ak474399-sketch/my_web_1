import type { NextAuthOptions } from "next-auth";
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

/** 供 getToken 使用的 req 形态：需带 headers 与 cookies（next-auth 从 cookie 读 JWT） */
function reqForJwt(request: Request) {
  return {
    headers: request.headers,
    cookies: cookiesFromRequest(request),
  };
}

/**
 * 在 App Router 的 API 中从 request 获取当前用户 id。
 * 优先用 getToken 从 JWT cookie 解析（在 Route Handler 中最可靠），否则回退到 getServerSession。
 */
export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    const token = await getToken({ req: reqForJwt(request) as never, secret });
    const id = (token as { userId?: string } | null)?.userId;
    if (id) return id;
  }
  const session = await getSessionFromRequest(request);
  return (session?.user?.id as string) ?? null;
}

/** 在 App Router 的 API 中传入 request 获取 session；优先用 JWT 构造保证 user.id 存在。 */
export async function getSessionFromRequest(request: Request) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    const token = await getToken({ req: reqForJwt(request) as never, secret });
    if (token) {
      const userId = (token as { userId?: string }).userId;
      if (userId)
        return {
          user: { id: userId, email: token.email ?? null, name: token.name ?? null, image: token.picture ?? null },
          expires: token.exp ? new Date(token.exp * 1000).toISOString() : "",
        } as Awaited<ReturnType<typeof getServerSession>>;
    }
  }
  const req = {
    headers: Object.fromEntries(request.headers.entries()),
    cookies: cookiesFromRequest(request),
  };
  const res = { getHeader: () => undefined, setCookie: () => {}, setHeader: () => {} };
  return getServerSession(req as never, res as never, authOptions);
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
          await supabaseAdmin.from("points_history").insert({
            user_id: newUser.id,
            amount: 5,
            reason: "signup_bonus",
            created_at: nowIso,
          });
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
        const { data } = await supabaseAdmin
          .from("users")
          .select("id, role")
          .eq("email", user.email)
          .single();

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
