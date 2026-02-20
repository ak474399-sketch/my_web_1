/**
 * 积分与会员：扣减、补发、周期刷新
 */

import { supabaseAdmin } from "@/lib/supabase";

const POINTS_PER_RESTORE = 5;
const WEEKLY_POINTS = 100;
const YEARLY_POINTS = 10000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export type MembershipType = "free" | "weekly" | "yearly";

export type UserCreditsRow = {
  credits: number;
  membership_type: MembershipType;
  membership_started_at: string | null;
  last_refill_at: string | null;
};

/** 检查并执行周期刷新（周/年会员到期后重新发放积分） */
export async function maybeRefillCredits(userId: string): Promise<UserCreditsRow | null> {
  const { data: user, error: fetchErr } = await supabaseAdmin
    .from("users")
    .select("credits, membership_type, membership_started_at, last_refill_at")
    .eq("id", userId)
    .single();

  if (fetchErr || !user) return null;

  const type = (user.membership_type as MembershipType) ?? "free";
  const lastRefill = user.last_refill_at ? new Date(user.last_refill_at).getTime() : null;
  const now = Date.now();

  if (type === "free" || !lastRefill) {
    return {
      credits: user.credits ?? 0,
      membership_type: type,
      membership_started_at: user.membership_started_at ?? null,
      last_refill_at: user.last_refill_at ?? null,
    };
  }

  let shouldRefill = false;
  let newCredits = type === "weekly" ? WEEKLY_POINTS : YEARLY_POINTS;

  if (type === "weekly" && now - lastRefill >= WEEK_MS) {
    shouldRefill = true;
  } else if (type === "yearly" && now - lastRefill >= YEAR_MS) {
    shouldRefill = true;
  }

  if (!shouldRefill) {
    return {
      credits: user.credits ?? 0,
      membership_type: type,
      membership_started_at: user.membership_started_at ?? null,
      last_refill_at: user.last_refill_at ?? null,
    };
  }

  const nowIso = new Date().toISOString();
  await supabaseAdmin
    .from("users")
    .update({
      credits: newCredits,
      last_refill_at: nowIso,
      updated_at: nowIso,
    })
    .eq("id", userId);

  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: newCredits,
    reason: type === "weekly" ? "refill_weekly" : "refill_yearly",
    created_at: nowIso,
  });

  return {
    credits: newCredits,
    membership_type: type,
    membership_started_at: user.membership_started_at ?? null,
    last_refill_at: nowIso,
  };
}

/** 获取当前积分（并执行可能的周期刷新） */
export async function getCredits(userId: string): Promise<UserCreditsRow | null> {
  return maybeRefillCredits(userId);
}

const INITIAL_BONUS_REASONS = ["signup_bonus", "initial_bonus"] as const;

/**
 * 一次性 5 积分发放逻辑（梳理）：
 * - signup_bonus：仅新用户，在 auth signIn 回调里创建用户时同时写入 users.credits=5 和 points_history(reason=signup_bonus)。
 * - initial_bonus：由 GET /api/user/initial-bonus 调用本函数发放；新用户已有 signup_bonus 会直接 return false，老用户只要没有任一条 signup_bonus/initial_bonus 记录就发 5 并写 initial_bonus。
 * 认人：以 DB 的 points_history 为准（是否有上述两种 reason）；前端 localStorage 仅防重复请求与展示，不做鉴权。
 */
/** 未获得过一次性 5 积分的用户发放 5 积分（仅一次）。新老用户一视同仁：只要没有 signup_bonus/initial_bonus 记录就发。先插入记录再改余额，配合 DB 唯一约束防并发重复发放。 */
export async function grantInitialBonusIfEligible(
  userId: string
): Promise<{ granted: boolean }> {
  const { data: existing } = await supabaseAdmin
    .from("points_history")
    .select("id")
    .eq("user_id", userId)
    .in("reason", [...INITIAL_BONUS_REASONS])
    .limit(1)
    .maybeSingle();

  if (existing) return { granted: false };

  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (!user) return { granted: false };

  const nowIso = new Date().toISOString();

  const { error: insertErr } = await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: 5,
    reason: "initial_bonus",
    created_at: nowIso,
  });

  if (insertErr) {
    const code = (insertErr as { code?: string })?.code;
    if (code === "23505") return { granted: false };
    throw insertErr;
  }

  const newCredits = (user.credits ?? 0) + 5;
  await supabaseAdmin
    .from("users")
    .update({ credits: newCredits, updated_at: nowIso })
    .eq("id", userId);

  return { granted: true };
}

/** 扣减积分（修复照片），成功返回 true，积分不足返回 false */
export async function deductForRestore(
  userId: string,
  restorationId?: string
): Promise<{ ok: true } | { ok: false; reason: "insufficient" }> {
  const row = await maybeRefillCredits(userId);
  if (!row || row.credits < POINTS_PER_RESTORE) {
    return { ok: false, reason: "insufficient" };
  }

  const newCredits = row.credits - POINTS_PER_RESTORE;
  const nowIso = new Date().toISOString();

  await supabaseAdmin
    .from("users")
    .update({ credits: newCredits, updated_at: nowIso })
    .eq("id", userId);

  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: -POINTS_PER_RESTORE,
    reason: "restore_photo",
    reference_id: restorationId ?? null,
  });

  return { ok: true };
}

/** 退回积分（修复失败时） */
export async function refundForRestore(
  userId: string,
  restorationId?: string
): Promise<void> {
  const nowIso = new Date().toISOString();
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (!user) return;
  const newCredits = (user.credits ?? 0) + POINTS_PER_RESTORE;

  await supabaseAdmin
    .from("users")
    .update({ credits: newCredits, updated_at: nowIso })
    .eq("id", userId);

  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: POINTS_PER_RESTORE,
    reason: "refund_restore_failed",
    reference_id: restorationId ?? null,
  });
}

export { POINTS_PER_RESTORE, WEEKLY_POINTS, YEARLY_POINTS };
