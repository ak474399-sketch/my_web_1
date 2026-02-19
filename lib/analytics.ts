/**
 * Firebase Analytics 事件埋点
 * 在客户端调用 logEvent，服务端调用会静默忽略。
 */

import type { Analytics } from "firebase/analytics";

let analyticsInstance: Analytics | null = null;

export function setAnalyticsInstance(instance: Analytics | null): void {
  analyticsInstance = instance;
}

export function logEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  if (!analyticsInstance) return;
  import("firebase/analytics").then(({ logEvent: firebaseLogEvent }) => {
    firebaseLogEvent(analyticsInstance!, eventName, params);
  });
}

/** 推荐事件：登录 */
export function logLogin(method: string): void {
  logEvent("login", { method });
}

/** 自定义：开始修复（上传图片并请求 API） */
export function logRestoreStarted(tool: string): void {
  logEvent("restore_started", { tool });
}

/** 自定义：修复成功 */
export function logRestoreCompleted(tool: string): void {
  logEvent("restore_completed", { tool });
}

/** 自定义：修复失败 */
export function logRestoreFailed(tool: string, reason?: string): void {
  logEvent("restore_failed", { tool, reason: reason ?? "unknown" });
}

/** 自定义：进入工具页（用于统计各工具页 PV） */
export function logToolView(tool: string): void {
  logEvent("tool_view", { tool });
}

/** GA4 标准：页面浏览（路由变化时上报） */
export function logPageView(pagePath: string, pageTitle?: string): void {
  const params: Record<string, string> = { page_path: pagePath };
  if (pageTitle) params.page_title = pageTitle;
  logEvent("page_view", params as Record<string, string | number | boolean>);
}

/**
 * 点击进入某个工具（GA4 select_content）
 * linkLocation: 来源位置，如 "home" | "navbar" | "footer" | "knowledge" | "cases"
 */
export function logToolClick(toolSlug: string, linkLocation: string): void {
  logEvent("select_content", {
    content_type: "tool",
    item_id: toolSlug,
    link_location: linkLocation,
  });
}

/** 自定义：导航链接点击（案例/会员/历史/条款等） */
export function logNavClick(destination: string, linkLabel?: string): void {
  logEvent("nav_click", {
    destination,
    ...(linkLabel && { link_label: linkLabel }),
  });
}
