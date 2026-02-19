import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

/** 一次性积分包：10 积分 = $0.99（当前为演示，未接入真实支付） */
const CREDITS_PACK_10 = 10;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { pack?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.pack !== "10") {
    return NextResponse.json({ error: "Invalid pack (only pack 10 supported)" }, { status: 400 });
  }

  const nowIso = new Date().toISOString();

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  const currentCredits = user?.credits ?? 0;
  const newCredits = currentCredits + CREDITS_PACK_10;

  await supabaseAdmin
    .from("users")
    .update({
      credits: newCredits,
      updated_at: nowIso,
    })
    .eq("id", userId);

  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: CREDITS_PACK_10,
    reason: "purchase_credits_10",
  });

  return NextResponse.json({
    success: true,
    creditsAdded: CREDITS_PACK_10,
    totalCredits: newCredits,
  });
}
