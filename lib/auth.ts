import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

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
          })
          .select("id")
          .single();

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
