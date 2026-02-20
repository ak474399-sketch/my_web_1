import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { grantInitialBonusIfEligible } from "@/lib/credits";

/**
 * 登录后调用：若该用户（由本次请求的登录态识别，对应登录时绑定的 Google 用户）从未获得过一次性 5 积分则发放并返回 { granted: true }，否则 { granted: false }。
 * 认人依赖 session（登录态），是否发过以后端 DB points_history 为准；前端本地记录仅用于减少重复请求与展示，不做鉴权。
 */
export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await grantInitialBonusIfEligible(userId);
  return NextResponse.json({ granted: result.granted });
}
