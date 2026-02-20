import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { grantInitialBonusIfEligible } from "@/lib/credits";

/**
 * 登录后调用：若该用户（由本次请求的登录态识别，优先 JWT 再按 email 回退）从未获得过一次性 5 积分则发放并返回 { granted: true }，否则 { granted: false }。
 * 认人用 getUserIdFromRequest，是否发过以后端 DB points_history 为准。
 */
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await grantInitialBonusIfEligible(userId);
  return NextResponse.json({ granted: result.granted });
}
