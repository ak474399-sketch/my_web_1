import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { getCredits } from "@/lib/credits";
import { getToken } from "next-auth/jwt";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const hasSecureToken = cookieHeader.includes("__Secure-next-auth.session-token");

    let tokenDebug: string = "not_attempted";
    let supabaseDebug: string = "not_attempted";
    try {
      const secret = process.env.NEXTAUTH_SECRET;
      if (secret) {
        const token = await getToken({ req: request as never, secret });
        tokenDebug = token ? `valid(email=${token.email},userId=${(token as Record<string, unknown>).userId ?? "none"})` : "null";

        if (token?.email) {
          const { data, error } = await supabaseAdmin
            .from("users")
            .select("id, email")
            .eq("email", String(token.email))
            .maybeSingle();
          supabaseDebug = error
            ? `error:${error.message}(${error.code})`
            : data
              ? `found(id=${data.id})`
              : "not_found";
        }
      } else {
        tokenDebug = "no_secret";
      }
    } catch (e) {
      tokenDebug = `error:${(e as Error).message}`;
    }

    console.error("[credits 401]", { hasSecureToken, tokenDebug, supabaseDebug });
    return NextResponse.json({
      error: "Unauthorized",
      debug: { hasSecureToken, tokenDebug, supabaseDebug },
    }, { status: 401 });
  }

  const row = await getCredits(userId);
  if (!row) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    credits: row.credits,
    membershipType: row.membership_type,
    membershipStartedAt: row.membership_started_at,
    lastRefillAt: row.last_refill_at,
  });
}
