"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/components/shared/locale-provider";

const STORAGE_KEY = "cookie_consent_accepted";

export function CookieConsentBar() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-4 py-4 md:py-3 bg-warm-800 text-warm-100 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm md:text-base text-warm-200/95">
          {t("cookieConsent.message")}{" "}
          <Link
            href="/privacy"
            className="text-accent-light hover:underline font-medium"
          >
            {t("cookieConsent.learnMore")}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/privacy"
            className="text-sm font-medium text-warm-300 hover:text-white transition-colors"
          >
            {t("cookieConsent.learnMore")}
          </Link>
          <button
            type="button"
            onClick={accept}
            className="rounded-xl bg-accent hover:bg-accent-muted text-white px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            {t("cookieConsent.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
