import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { grantInitialBonusIfEligible } from "@/lib/credits";

/** 登录后调用：若用户从未获得过一次性 5 积分则发放并返回 { granted: true }，否则 { granted: false }。 */
export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const userId = session?.user?.id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await grantInitialBonusIfEligible(userId);
  return NextResponse.json({ granted: result.granted });
}
