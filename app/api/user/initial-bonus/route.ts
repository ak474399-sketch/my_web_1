import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { grantInitialBonusIfEligible } from "@/lib/credits";

/**
 * 登录后或「获得礼物」按钮调用：若该用户从未获得过一次性 5 积分则发放并返回 { granted: true, code: "GRANTED" }，否则 { granted: false, code: "ALREADY_CLAIMED" }。
 * 认人用 getUserIdFromRequest，是否发过以后端 DB points_history 为准。
 */
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  try {
    const result = await grantInitialBonusIfEligible(userId);
    return NextResponse.json({
      granted: result.granted,
      code: result.granted ? "GRANTED" : "ALREADY_CLAIMED",
    });
  } catch {
    return NextResponse.json(
      { granted: false, code: "ERROR" },
      { status: 500 }
    );
  }
}
