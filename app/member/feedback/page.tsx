"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MessageCircle, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

export default function FeedbackPage() {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const [message, setMessage] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), context: context.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "提交失败");
        return;
      }
      setSuccess(true);
      setMessage("");
      setContext("");
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 text-warm-500">
        <p className="mb-4">{t("feedback.signInFirst")}</p>
        <Link href="/?login=1" className="text-accent hover:underline font-medium">
          {t("feedback.goLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-warm-800">{t("feedback.title")}</h1>
          <p className="text-warm-500 text-sm">{t("feedback.description")}</p>
        </div>
      </div>

      {success && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800 flex items-center gap-2 mb-6">
          <Check className="w-5 h-5 shrink-0" />
          {t("feedback.success")}
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="feedback-message" className="block text-sm font-medium text-warm-700 mb-1">
            {t("feedback.labelMessage")}
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("feedback.messagePlaceholder")}
            rows={5}
            maxLength={2000}
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
            required
          />
          <p className="text-xs text-warm-400 mt-1">{message.length} / 2000</p>
        </div>
        <div>
          <label htmlFor="feedback-context" className="block text-sm font-medium text-warm-700 mb-1">
            {t("feedback.labelContext")}
          </label>
          <input
            id="feedback-context"
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={t("feedback.contextPlaceholder")}
            maxLength={200}
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full rounded-xl bg-accent hover:bg-accent-muted text-white py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("feedback.submitting")}
            </>
          ) : (
            t("feedback.submit")
          )}
        </button>
      </form>
    </div>
  );
}
