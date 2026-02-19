/**
 * Polar 产品 ID：结账链接用
 * - 10 积分包、周订阅、年订阅
 */
export const POLAR_PRODUCT_IDS = {
  /** 10 积分一次性购买 */
  credits10: "c18fd350-4d8d-42a6-a3bc-6afdbeeb8b6f",
  /** 周订阅 */
  weekly: "86f96d51-7027-4add-9513-c1729df3604a",
  /** 年订阅 */
  yearly: "e659ea84-6a99-4a7d-9cd8-43d25fd0e27a",
} as const;

/** 构建结账 URL（GET /api/checkout 会重定向到 Polar） */
export function getCheckoutUrl(productId: string, params?: { customerEmail?: string; customerExternalId?: string }): string {
  const base = "/api/checkout";
  const search = new URLSearchParams({ products: productId });
  if (params?.customerEmail) search.set("customerEmail", params.customerEmail);
  if (params?.customerExternalId) search.set("customerExternalId", params.customerExternalId);
  return `${base}?${search.toString()}`;
}
