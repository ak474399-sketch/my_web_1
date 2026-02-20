"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { UploadZone } from "@/components/tool/upload-zone";
import { CompareSlider } from "@/components/tool/compare-slider";
import { logRestoreStarted, logRestoreCompleted, logRestoreFailed, logToolView } from "@/lib/analytics";
import { useLocale } from "@/components/shared/locale-provider";
import { useTimeout } from "@/components/shared/timeout-context";

type RestoreToolProps = { slug?: string };

type RestoreResponse = {
  error?: string;
  message?: string;
  text?: string;
  imageBase64?: string;
  imageMimeType?: string;
  refunded?: boolean;
};

const RESTORE_TIMEOUT_MS = 45_000;

export function RestoreTool({ slug = "" }: RestoreToolProps) {
  const { t } = useLocale();
  const { showTimeout } = useTimeout();
  const [originalDataUrl, setOriginalDataUrl] = useState<string | null>(null);
  const [restoredDataUrl, setRestoredDataUrl] = useState<string | null>(null);
  const [restoreText, setRestoreText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRefundBanner, setShowRefundBanner] = useState(false);
  const [errorType, setErrorType] = useState<"login" | "credits" | null>(null);
  const [pointsTip, setPointsTip] = useState<"deduct" | "refund" | null>(null);
  const pointsTipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTriggered = useRef(false);
  const lastUploadRef = useRef<{ dataUrl: string; mimeType: string } | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (slug) logToolView(slug);
  }, [slug]);

  async function handleUpload(dataUrl: string, mimeType: string) {
    if (slug) logRestoreStarted(slug);
    lastUploadRef.current = { dataUrl, mimeType };
    setOriginalDataUrl(dataUrl);
    setRestoredDataUrl(null);
    setRestoreText(null);
    setError(null);
    setErrorType(null);
    setShowRefundBanner(false);
    setPointsTip(null);
    if (pointsTipTimer.current) {
      clearTimeout(pointsTipTimer.current);
      pointsTipTimer.current = null;
    }
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      controller.abort();
    }, RESTORE_TIMEOUT_MS);

    try {
      const base64 = dataUrl.split(",")[1];
      if (!base64) throw new Error("Invalid image data");

      const res = await fetch("/api/restore", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType,
          slug: slug || undefined,
        }),
        signal: controller.signal,
      });

      let data: RestoreResponse;
      try {
        data = await res.json();
      } catch {
        setError(res.ok ? t("restore.serverError") : (res.status === 500 ? t("restore.serverError") : `Request failed (${res.status})`));
        return;
      }

      if (!res.ok) {
        if (slug) logRestoreFailed(slug, `http_${res.status}`);
        if (res.status === 401) {
          setError(data.message ?? "请先登录后再使用修复功能");
          setErrorType("login");
        } else if (res.status === 402) {
          setError(data.message ?? "积分不足，请先开通会员或等待周期刷新");
          setErrorType("credits");
        } else if (res.status === 500 && data.refunded) {
          setShowRefundBanner(true);
          setPointsTip("refund");
          setError(data.message ?? data.error ?? "生成失败");
          pointsTipTimer.current = setTimeout(() => setPointsTip(null), 4000);
        } else {
          const fallback = res.status === 500 ? t("restore.serverError") : `Request failed (${res.status})`;
          setError(res.status === 500 ? (data.message ?? t("restore.serverError")) : (data.message ?? data.error ?? fallback));
        }
        return;
      }

      setRestoreText(data.text ?? null);
      if (data.imageBase64) {
        if (slug) logRestoreCompleted(slug);
        const outMime = data.imageMimeType || "image/png";
        setRestoredDataUrl(`data:${outMime};base64,${data.imageBase64}`);
      } else {
        setRestoredDataUrl(null);
      }
      setPointsTip("deduct");
      pointsTipTimer.current = setTimeout(() => setPointsTip(null), 4000);
    } catch (e) {
      if (controller.signal.aborted) {
        if (slug) logRestoreFailed(slug, "timeout");
        showTimeout({
          actionKey: "restore",
          onRetry: lastUploadRef.current
            ? () => handleUpload(lastUploadRef.current!.dataUrl, lastUploadRef.current!.mimeType)
            : undefined,
        });
      } else {
        if (slug) logRestoreFailed(slug, "network_or_error");
        setError(e instanceof Error ? e.message : "Could not connect. Please check your internet.");
      }
    } finally {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      abortControllerRef.current = null;
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoTriggered.current) return;
    const dataUrl = sessionStorage.getItem("hero_upload");
    const mime = sessionStorage.getItem("hero_upload_mime");
    if (dataUrl && mime) {
      autoTriggered.current = true;
      sessionStorage.removeItem("hero_upload");
      sessionStorage.removeItem("hero_upload_mime");
      handleUpload(dataUrl, mime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => {
    if (pointsTipTimer.current) clearTimeout(pointsTipTimer.current);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {pointsTip === "deduct" && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800 text-center">
          已扣除 5 积分
        </div>
      )}
      {(pointsTip === "refund" || showRefundBanner) && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800 text-center">
          生成失败，已退回 5 积分
        </div>
      )}

      <UploadZone onUpload={handleUpload} disabled={loading} />

      {loading && (
        <div className="rounded-2xl bg-white border border-warm-300 p-8 text-center text-warm-600 shadow-sm flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <p className="font-medium">正在修复照片，请稍候…</p>
        </div>
      )}

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700">
          <p>{error}</p>
          {errorType === "login" && (
            <Link href="/?login=1" className="mt-2 inline-block text-accent hover:underline font-medium">
              去登录
            </Link>
          )}
          {errorType === "credits" && (
            <Link href="/member/subscribe" className="mt-2 inline-block text-accent hover:underline font-medium">
              去开通会员
            </Link>
          )}
        </div>
      )}

      {restoreText && (
        <div className="rounded-2xl bg-white border border-warm-300 p-5 shadow-sm">
          <p className="text-sm font-medium text-warm-400 mb-1">Result</p>
          <p className="text-warm-700">{restoreText}</p>
        </div>
      )}

      {originalDataUrl && (restoredDataUrl || restoreText) && !loading && (
        <>
          <CompareSlider
            beforeSrc={originalDataUrl}
            afterSrc={restoredDataUrl ?? originalDataUrl}
            beforeLabel="Before"
            afterLabel="After"
          />
          <div className="text-center pt-4">
            <Link
              href="/member/feedback"
              className="text-sm text-warm-500 hover:text-accent transition-colors"
            >
              {t("feedback.ctaAfterRestore")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
