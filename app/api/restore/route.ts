/**
 * 老照片修复 API：接收 Base64 图片，调用 Gemini 处理并返回结果
 * 已登录用户扣 5 积分，失败则退回；并同步写入 Supabase 存储桶与 restorations 表
 */

import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { restorePhoto } from "@/lib/gemini";
import { supabaseAdmin } from "@/lib/supabase";
import { uploadRestorationImages } from "@/lib/storage";
import { deductForRestore, refundForRestore } from "@/lib/credits";

const MAX_BODY = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized", message: "请先登录后再使用修复功能" },
      { status: 401 }
    );
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { imageBase64, mimeType, slug, userPrompt } = body;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid imageBase64" },
        { status: 400 }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY) {
      return NextResponse.json(
        { error: "Request body too large (max 10MB)" },
        { status: 413 }
      );
    }

    let deduct: Awaited<ReturnType<typeof deductForRestore>>;
    try {
      deduct = await deductForRestore(userId);
    } catch (deductErr) {
      console.error("[/api/restore] credits check failed", deductErr);
      return NextResponse.json(
        { error: "credits_check_failed", message: "积分校验暂时失败，请稍后重试" },
        { status: 503 }
      );
    }
    if (!deduct.ok) {
      return NextResponse.json(
        { error: "insufficient_credits", message: "积分不足，请先开通会员或等待周期刷新" },
        { status: 402 }
      );
    }

    const result = await restorePhoto({
      imageBase64,
      mimeType: typeof mimeType === "string" ? mimeType : undefined,
      slug: typeof slug === "string" ? slug : undefined,
      userPrompt: typeof userPrompt === "string" ? userPrompt : undefined,
    });

    if (!result.success) {
      await refundForRestore(userId);
      const errMsg = result.error ?? "Restore failed";
      return NextResponse.json(
        { error: errMsg, refunded: true },
        { status: 500 }
      );
    }

    if (result.imageBase64) {
      try {
        const restorationId = crypto.randomUUID();
        const restoredMime = result.imageMimeType ?? "image/png";
        const { originalUrl, restoredUrl } = await uploadRestorationImages(
          userId,
          restorationId,
          imageBase64,
          result.imageBase64,
          typeof mimeType === "string" ? mimeType : "image/jpeg",
          restoredMime
        );
        await supabaseAdmin.from("restorations").insert({
          id: restorationId,
          user_id: userId,
          original_url: originalUrl,
          restored_url: restoredUrl,
          status: "completed",
        });
      } catch (saveErr) {
        console.error("[/api/restore] save history failed", saveErr);
        // 不阻断响应，仅记录
      }
    }

    return NextResponse.json({
      success: true,
      text: result.text,
      imageBase64: result.imageBase64 ?? null,
      imageMimeType: result.imageMimeType ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[/api/restore]", e);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? message : "Internal server error" },
      { status: 500 }
    );
  }
}
