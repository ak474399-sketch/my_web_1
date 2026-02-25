import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { getCredits } from "@/lib/credits";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const hasSessionToken = cookieHeader.includes("next-auth.session-token");
    const hasSecureToken = cookieHeader.includes("__Secure-next-auth.session-token");
    const cookieNames = cookieHeader.split(";").map(c => c.split("=")[0].trim()).filter(Boolean);

    let tokenDebug: string = "not_attempted";
    try {
      const secret = process.env.NEXTAUTH_SECRET;
      if (secret) {
        const token = await getToken({ req: request as never, secret });
        tokenDebug = token ? `valid(email=${token.email},userId=${(token as Record<string, unknown>).userId ?? "none"})` : "null";
      } else {
        tokenDebug = "no_secret";
      }
    } catch (e) {
      tokenDebug = `error:${(e as Error).message}`;
    }

    console.error("[credits 401]", { hasSessionToken, hasSecureToken, cookieNames, tokenDebug });
    return NextResponse.json({
      error: "Unauthorized",
      debug: { hasSessionToken, hasSecureToken, cookieNames, tokenDebug },
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
