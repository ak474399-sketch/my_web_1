import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import type { MembershipType } from "@/lib/credits";
import { WEEKLY_POINTS, YEARLY_POINTS } from "@/lib/credits";

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { plan?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plan = body.plan === "yearly" ? "yearly" : body.plan === "weekly" ? "weekly" : null;
  if (!plan) {
    return NextResponse.json({ error: "Missing or invalid plan (weekly | yearly)" }, { status: 400 });
  }

  const membershipType: MembershipType = plan;
  const points = plan === "weekly" ? WEEKLY_POINTS : YEARLY_POINTS;
  const nowIso = new Date().toISOString();

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  const currentCredits = user?.credits ?? 0;
  const newCredits = currentCredits + points;

  await supabaseAdmin
    .from("users")
    .update({
      membership_type: membershipType,
      membership_started_at: nowIso,
      last_refill_at: nowIso,
      credits: newCredits,
      updated_at: nowIso,
    })
    .eq("id", userId);

  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: points,
    reason: plan === "weekly" ? "subscribe_weekly" : "subscribe_yearly",
  });

  return NextResponse.json({
    success: true,
    membershipType,
    creditsAdded: points,
    totalCredits: newCredits,
  });
}
