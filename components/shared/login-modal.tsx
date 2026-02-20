"use client";

import { useState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Mail } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import { useLocale } from "@/components/shared/locale-provider";
import { useTimeout } from "@/components/shared/timeout-context";

/** 登录成功后直接回到首页并带 login=success，避免 /auth/callback?next=... 被二次编码触发 NextAuth INVALID_CALLBACK_URL_ERROR */
const AUTH_CALLBACK_URL = "/?login=success";
const LOGIN_TIMEOUT_MS = 45_000;

export function LoginModal({
  open,
  onClose,
  cleared = false,
}: {
  open: boolean;
  onClose: () => void;
  cleared?: boolean;
}) {
  const { t } = useLocale();
  const { showTimeout } = useTimeout();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isRedirecting) return;
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      setIsRedirecting(false);
      showTimeout({ actionKey: "login" });
    }, LOGIN_TIMEOUT_MS);
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [isRedirecting, showTimeout]);

  const handleGoogleSignIn = () => {
    setIsRedirecting(true);
    signIn("google", { callbackUrl: AUTH_CALLBACK_URL });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      titleId="login-modal-title"
      showCloseButton={!isRedirecting}
      closeOnBackdrop={!isRedirecting}
      maxWidth="max-w-sm"
    >
      {isRedirecting ? (
        <div className="py-12 px-6 flex flex-col items-center justify-center gap-4 text-warm-700">
          <Loader2 className="w-12 h-12 animate-spin text-accent" aria-hidden />
          <p className="text-lg font-medium">{t("login.redirecting")}</p>
          <p className="text-sm text-warm-500">{t("login.pleaseComplete")}</p>
        </div>
      ) : (
        <div className="pt-8 pb-6 px-6 bg-warm-50">
          {cleared && (
            <p className="text-center text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-4">
              {t("login.clearedMessage")}
            </p>
          )}
          <div className="text-center mb-6">
            <h2 id="login-modal-title" className="font-serif text-2xl font-bold text-warm-800 mb-1">
              {t("login.welcomeToBrand")}
            </h2>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-warm-300 bg-white hover:bg-warm-100 text-warm-800 font-medium px-4 py-3.5 transition-colors active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t("login.continueWithGoogle")}
            </button>

            <div className="relative flex items-center gap-2 my-4">
              <span className="flex-1 h-px bg-warm-300" aria-hidden />
              <span className="text-xs text-warm-500 font-medium">or</span>
              <span className="flex-1 h-px bg-warm-300" aria-hidden />
            </div>

            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-warm-200 bg-warm-100 text-warm-400 font-medium px-4 py-3.5 cursor-not-allowed"
            >
              <svg className="w-5 h-5 shrink-0 text-warm-400" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              {t("login.signInWithApple")}
              <span className="ml-1 text-xs text-warm-400">({t("login.comingSoon")})</span>
            </button>

            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-warm-200 bg-warm-100 text-warm-400 font-medium px-4 py-3.5 cursor-not-allowed"
            >
              <Mail className="w-5 h-5 shrink-0" aria-hidden />
              {t("login.signInWithEmail")}
              <span className="ml-1 text-xs text-warm-400">({t("login.comingSoon")})</span>
            </button>
          </div>

          <p className="mt-5 text-xs text-warm-500 text-center leading-relaxed">
            {t("login.agreeTerms")}{" "}
            <a href="/terms" className="text-accent hover:underline" onClick={onClose}>{t("login.terms")}</a>
            {t("login.and")}
            <a href="/privacy" className="text-accent hover:underline" onClick={onClose}>{t("login.privacyPolicy")}</a>.
          </p>
        </div>
      )}
    </Modal>
  );
}
