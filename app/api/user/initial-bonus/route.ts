import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { grantInitialBonusIfEligible } from "@/lib/credits";

/** 新人礼（一次性 5 积分）API 返回码，前端按 code 展示提示 */
export const INITIAL_BONUS_CODES = {
  GRANTED: "GRANTED",
  ALREADY_CLAIMED: "ALREADY_CLAIMED",
  UNAUTHORIZED: "UNAUTHORIZED",
  ERROR: "ERROR",
} as const;

/**
 * 登录后或「获得礼物」按钮调用：若该用户从未获得过一次性 5 积分则发放并返回 { granted: true, code: "GRANTED" }，否则 { granted: false, code: "ALREADY_CLAIMED" }。
 * 认人用 getUserIdFromRequest，是否发过以后端 DB points_history 为准。
 */
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized", code: INITIAL_BONUS_CODES.UNAUTHORIZED },
      { status: 401 }
    );
  }

  try {
    const result = await grantInitialBonusIfEligible(userId);
    return NextResponse.json({
      granted: result.granted,
      code: result.granted ? INITIAL_BONUS_CODES.GRANTED : INITIAL_BONUS_CODES.ALREADY_CLAIMED,
    });
  } catch {
    return NextResponse.json(
      { granted: false, code: INITIAL_BONUS_CODES.ERROR },
      { status: 500 }
    );
  }
}
