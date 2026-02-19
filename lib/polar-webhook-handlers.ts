/**
 * Polar Webhook 处理：订单支付 → 加积分；订阅生效 → 开通会员+积分；订阅撤销 → 收回会员
 * 鉴权：仅通过 Polar 回调更新 membership_type / credits，前端以 DB 为准。
 */

import { supabaseAdmin } from "@/lib/supabase";
import { POLAR_PRODUCT_IDS } from "@/lib/polar";
import { WEEKLY_POINTS, YEARLY_POINTS } from "@/lib/credits";

/** 通过 Polar customer 的 externalId（我们 users.id）或 email 解析本地 user id */
export async function findUserIdByPolarCustomer(customer: {
  externalId: string | null;
  email: string;
}): Promise<string | null> {
  if (customer.externalId) {
    const { data } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", customer.externalId)
      .single();
    if (data) return data.id;
  }
  const { data } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", customer.email)
    .single();
  return data?.id ?? null;
}

/** 一次性 10 积分包：order.paid 且 productId 为积分包时调用 */
export async function grantCredits10(userId: string): Promise<void> {
  const nowIso = new Date().toISOString();
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();
  if (!user) return;
  const newCredits = (user.credits ?? 0) + 10;
  await supabaseAdmin
    .from("users")
    .update({ credits: newCredits, updated_at: nowIso })
    .eq("id", userId);
  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: 10,
    reason: "purchase_credits_10",
    created_at: nowIso,
  });
}

/** 开通或续期周/年订阅：subscription.active 时调用。首次开通写 membership，续期只加积分+更新 last_refill_at */
export async function grantSubscription(
  userId: string,
  plan: "weekly" | "yearly"
): Promise<void> {
  const nowIso = new Date().toISOString();
  const points = plan === "weekly" ? WEEKLY_POINTS : YEARLY_POINTS;
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("credits, membership_type, membership_started_at")
    .eq("id", userId)
    .single();
  if (!user) return;
  const newCredits = (user.credits ?? 0) + points;
  const isRenewal =
    (user.membership_type === plan && user.membership_started_at) ?? false;
  const reason =
    plan === "weekly"
      ? isRenewal
        ? "refill_weekly"
        : "subscribe_weekly"
      : isRenewal
        ? "refill_yearly"
        : "subscribe_yearly";

  if (isRenewal) {
    await supabaseAdmin
      .from("users")
      .update({
        last_refill_at: nowIso,
        credits: newCredits,
        updated_at: nowIso,
      })
      .eq("id", userId);
  } else {
    await supabaseAdmin
      .from("users")
      .update({
        membership_type: plan,
        membership_started_at: nowIso,
        last_refill_at: nowIso,
        credits: newCredits,
        updated_at: nowIso,
      })
      .eq("id", userId);
  }
  await supabaseAdmin.from("points_history").insert({
    user_id: userId,
    amount: points,
    reason,
    created_at: nowIso,
  });
}

/** 撤销订阅：subscription.revoked 时调用，恢复为 free */
export async function revokeSubscription(userId: string): Promise<void> {
  const nowIso = new Date().toISOString();
  await supabaseAdmin
    .from("users")
    .update({
      membership_type: "free",
      membership_started_at: null,
      last_refill_at: null,
      updated_at: nowIso,
    })
    .eq("id", userId);
}

/** 根据 Polar productId 判断是否为已知产品并返回类型 */
export function getProductType(
  productId: string | null
): "credits10" | "weekly" | "yearly" | null {
  if (!productId) return null;
  if (productId === POLAR_PRODUCT_IDS.credits10) return "credits10";
  if (productId === POLAR_PRODUCT_IDS.weekly) return "weekly";
  if (productId === POLAR_PRODUCT_IDS.yearly) return "yearly";
  return null;
}
