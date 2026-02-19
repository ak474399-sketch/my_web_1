import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCredits } from "@/lib/credits";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
