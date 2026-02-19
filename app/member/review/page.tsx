"use client";

import { useState } from "react";
import { Star, Loader2, Check } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

export default function ReviewPage() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !content.trim()) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          content: content.trim(),
          country: country.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "提交失败");
        return;
      }
      setSuccess(true);
      setEmail("");
      setContent("");
      setCountry("");
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Star className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-warm-800">{t("review.title")}</h1>
          <p className="text-warm-500 text-sm">{t("review.description")}</p>
        </div>
      </div>

      {success && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-800 flex items-center gap-2 mb-6">
          <Check className="w-5 h-5 shrink-0" />
          {t("review.successMessage")}
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="review-email" className="block text-sm font-medium text-warm-700 mb-1">
            {t("review.labelEmail")}
          </label>
          <input
            id="review-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("review.placeholderEmail")}
            required
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <div>
          <label htmlFor="review-content" className="block text-sm font-medium text-warm-700 mb-1">
            {t("review.labelContent")}
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("review.placeholderContent")}
            rows={5}
            maxLength={2000}
            required
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <p className="text-xs text-warm-400 mt-1">{content.length} / 2000</p>
        </div>
        <div>
          <label htmlFor="review-country" className="block text-sm font-medium text-warm-700 mb-1">
            {t("review.labelCountry")}
          </label>
          <input
            id="review-country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={t("review.placeholderCountry")}
            maxLength={100}
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email.trim() || !content.trim()}
          className="w-full rounded-xl bg-accent hover:bg-accent-muted text-white py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("review.submitting")}
            </>
          ) : (
            t("review.submit")
          )}
        </button>
      </form>
    </div>
  );
}
