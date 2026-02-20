import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { HISTORY_ERROR_CODES } from "@/lib/history-errors";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * 历史记录：用 getUserIdFromRequest 识人（JWT + email 回退），减少 401。
 * 失败可能：未登录/无 cookie → 401；restorations 表不存在或 DB 异常 → 500。
 */
export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json(
      { code: HISTORY_ERROR_CODES.UNAUTHORIZED, error: "Unauthorized", message: "请先登录" },
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
