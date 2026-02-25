import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { getCredits } from "@/lib/credits";
import { getToken } from "next-auth/jwt";
import { supabaseAdmin } from "@/lib/supabase";

async function selfHealUser(request: NextRequest): Promise<string | null> {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;
  const token = await getToken({ req: request as never, secret });
  if (!token?.email) return null;

  const email = String(token.email);

  const { data: existing } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (existing?.id) return existing.id;

  const { data: created, error: insertErr } = await supabaseAdmin
    .from("users")
    .insert({
      email,
      name: (token.name as string) ?? null,
      avatar_url: (token.picture as string) ?? null,
      credits: 5,
    })
    .select("id")
    .single();

  if (insertErr) {
    console.error("[selfHealUser] insert failed:", insertErr.message, insertErr.code, insertErr.details);
    return null;
  }
  if (created?.id) {
    try {
      await supabaseAdmin.from("points_history").insert({
        user_id: created.id,
        amount: 5,
        reason: "signup_bonus",
        created_at: new Date().toISOString(),
      });
    } catch { /* non-blocking */ }
    return created.id;
  }
  return null;
}

export async function GET(request: NextRequest) {
  let userId = await getUserIdFromRequest(request);

  if (!userId) {
    try {
      userId = await selfHealUser(request);
    } catch (e) {
      console.error("[credits] selfHeal error:", (e as Error).message);
    }
  }

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
