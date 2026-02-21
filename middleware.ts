import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CALLBACK_COOKIE_NAMES = [
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/index.html" || pathname === "/index" || pathname === "//") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Fix encoded callback URL cookie that causes NextAuth INVALID_CALLBACK_URL_ERROR.
  // If the cookie value looks like "https%3A%2F%2F..." instead of "https://...",
  // rewrite the request cookie (decoded) and also set the response cookie so the
  // browser stores the corrected value for subsequent requests.
  let needsFix = false;
  const cookieHeader = request.headers.get("cookie") ?? "";
  let fixedCookieHeader = cookieHeader;

  for (const name of CALLBACK_COOKIE_NAMES) {
    const raw = request.cookies.get(name)?.value;
    if (!raw) continue;
    if (raw.startsWith("https%3A") || raw.startsWith("http%3A")) {
      needsFix = true;
      try {
        const decoded = decodeURIComponent(raw);
        fixedCookieHeader = fixedCookieHeader.replace(
          new RegExp(`(${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})=${raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
          `${name}=${decoded}`
        );
      } catch {
        // can't decode — just delete it
        fixedCookieHeader = fixedCookieHeader.replace(
          new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=[^;]*;?\\s*`),
          ""
        );
      }
    }
  }

  if (needsFix) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("cookie", fixedCookieHeader);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    // Also fix the cookie in the browser for future requests
    for (const name of CALLBACK_COOKIE_NAMES) {
      const raw = request.cookies.get(name)?.value;
      if (!raw) continue;
      if (raw.startsWith("https%3A") || raw.startsWith("http%3A")) {
        try {
          response.cookies.set(name, decodeURIComponent(raw), { path: "/" });
        } catch {
          response.cookies.delete(name);
        }
      }
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/index",
    "/index.html",
    "/api/:path*",
    "/login-success",
  ],
};
