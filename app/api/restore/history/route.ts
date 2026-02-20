import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

/** 历史记录 API 错误码，前端用于展示对应文案 */
export const HISTORY_ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  SESSION_INVALID: "SESSION_INVALID",
  TABLE_MISSING: "TABLE_MISSING",
  DB_ERROR: "DB_ERROR",
} as const;

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const userId = session?.user?.id as string | undefined;

  if (!session?.user) {
    return NextResponse.json(
      { code: HISTORY_ERROR_CODES.UNAUTHORIZED, error: "Unauthorized", message: "请先登录" },
      { status: 401 }
    );
  }

  if (!userId) {
    console.error("[/api/restore/history] session.user.id missing");
    return NextResponse.json(
      { code: HISTORY_ERROR_CODES.SESSION_INVALID, error: "Session invalid", message: "请刷新页面或重新登录" },
      { status: 401 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("restorations")
    .select("id, original_url, restored_url, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[/api/restore/history]", error.message, error.code, error.details);
    const isMissingTable = error.code === "42P01" || error.message?.includes("does not exist");
    const code = isMissingTable ? HISTORY_ERROR_CODES.TABLE_MISSING : HISTORY_ERROR_CODES.DB_ERROR;
    return NextResponse.json(
      {
        code,
        error: "Failed to load history",
        message: isMissingTable
          ? "历史记录表未就绪，请在 Supabase 中执行 schema 或联系管理员"
          : "加载失败，请稍后再试",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ items: data ?? [] });
}
