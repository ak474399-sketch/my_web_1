import { NextRequest, NextResponse } from "next/server";
import { Checkout } from "@polar-sh/nextjs";

const accessToken = process.env.POLAR_ACCESS_TOKEN;
const successUrl = process.env.POLAR_SUCCESS_URL;

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
  if (!successUrl?.trim()) {
    return NextResponse.json(
      {
        error: "Bad Configuration",
        detail: "POLAR_SUCCESS_URL is not set. Please set it in the environment (e.g. https://yoursite.com/member?checkout=success&checkout_id={CHECKOUT_ID}).",
      },
      { status: 503 }
    );
  }
  const handler = Checkout({ accessToken, successUrl });
  return handler(req);
}
