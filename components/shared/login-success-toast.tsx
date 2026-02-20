"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, X } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { logLogin } from "@/lib/analytics";

const DURATION_MS = 1600;

export function LoginSuccessToast() {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [bonusGranted, setBonusGranted] = useState(false);
  const loginLogged = useRef(false);
  const bonusFetched = useRef(false);

  const cleanupUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("login");
    const newUrl = url.pathname + (url.search || "") + url.hash;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    if (status !== "authenticated" || !session) return;
    const loginSuccess = searchParams.get("login") === "success";
    if (!loginSuccess || done) return;

    if (!loginLogged.current) {
      loginLogged.current = true;
      logLogin("Google");
    }

    if (!bonusFetched.current) {
      bonusFetched.current = true;
      fetch("/api/user/initial-bonus", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => data?.granted === true && setBonusGranted(true))
        .catch(() => {});
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setDone(true);
      cleanupUrl();
    }, DURATION_MS);

    return () => clearTimeout(timer);
  }, [session, status, searchParams, done]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4" role="alert">
      <div className="mx-auto max-w-3xl rounded-2xl border border-green-200/60 bg-green-600 text-white shadow-xl shadow-warm-900/10">
        <div className="px-5 py-4 flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-white shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-semibold text-base leading-snug">{t("loginSuccess.title")}</p>
            <p className="text-sm text-white/85 mt-0.5">{t("loginSuccess.description")}</p>
            {bonusGranted && (
              <p className="text-sm text-white/90 mt-1 font-medium">{t("loginSuccess.bonusLine")}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setDone(true);
              cleanupUrl();
            }}
            className="ml-auto rounded-lg p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t("loginSuccess.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
