/**
 * 一次性 5 积分发放的本地记录（按用户 id 区分，仅作前端缓存，防重复请求与重复弹窗）。
 * 真实是否发过以后端 DB（points_history）为准；请求时仍依赖登录态（session cookie）认人。
 */

const STORAGE_KEY_PREFIX = "initial_bonus_granted_";

export function hasLocalBonusRecord(userId: string | undefined): boolean {
  if (typeof window === "undefined" || !userId) return false;
  try {
    return localStorage.getItem(STORAGE_KEY_PREFIX + userId) === "1";
  } catch {
    return false;
  }
}

export function setLocalBonusRecord(userId: string | undefined): void {
  if (typeof window === "undefined" || !userId) return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + userId, "1");
  } catch {}
}
