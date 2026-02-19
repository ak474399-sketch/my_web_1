import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 确保根路径和常见误输入能正确到达首页
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 将 /index.html、/index、或仅尾部斜杠的根路径 重定向到 /
  if (pathname === "/index.html" || pathname === "/index" || pathname === "//") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 不匹配根路径 /，避免影响首页；只处理 /index、/index.html 的重定向
export const config = {
  matcher: ["/index", "/index.html"],
};
