import { NextRequest, NextResponse } from "next/server";
import { Checkout } from "@polar-sh/nextjs";

const accessToken = process.env.POLAR_ACCESS_TOKEN;
/** 规范化 URL：去掉首尾空格、去掉误写的前缀 = */
function normalizeSuccessUrl(raw: string | undefined): string | null {
  const s = raw?.trim();
  if (!s) return null;
  const url = s.startsWith("=") ? s.slice(1).trim() : s;
  return url || null;
}

const successUrl = normalizeSuccessUrl(process.env.POLAR_SUCCESS_URL);

export async function GET(req: NextRequest) {
  if (!accessToken?.trim()) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        detail: "Checkout is not configured. POLAR_ACCESS_TOKEN is missing or empty. Please set it in the environment.",
      },
      { status: 503 }
    );
  }
  if (!successUrl) {
    return NextResponse.json(
      {
        error: "Bad Configuration",
        detail: "POLAR_SUCCESS_URL is not set or invalid. Set it to a valid URL (e.g. https://restorepic.xyz/member?checkout=success&checkout_id={CHECKOUT_ID}).",
      },
      { status: 503 }
    );
  }
  const handler = Checkout({ accessToken, successUrl });
  return handler(req);
}
