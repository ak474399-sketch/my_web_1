import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { getToken } from "next-auth/jwt";
import { getCredits } from "@/lib/credits";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    // Temporary debug: figure out why auth fails
    const secret = process.env.NEXTAUTH_SECRET;
    const cookieHeader = request.headers.get("cookie") ?? "";
    const cookieNames = cookieHeader.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n.includes("next-auth") || n.includes("__Secure"));
    let tokenDebug: unknown = null;
    if (secret) {
      try {
        const cookies: Record<string, string> = {};
        for (const part of cookieHeader.split(";")) {
          const eq = part.indexOf("=");
          if (eq === -1) continue;
          cookies[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
        }
        const token = await getToken({ req: { headers: { cookie: cookieHeader }, cookies } as never, secret });
        tokenDebug = token ? { keys: Object.keys(token), userId: (token as Record<string, unknown>).userId, email: token.email, sub: token.sub } : "null";
      } catch (e) { tokenDebug = `error: ${(e as Error).message}`; }
    }
    return NextResponse.json({
      error: "Unauthorized",
      _debug: { hasSecret: !!secret, cookieNames, tokenDebug },
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
