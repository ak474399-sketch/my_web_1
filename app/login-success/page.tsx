"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/modal";

/**
 * NextAuth 登录成功后的落地页（callbackUrl=/login-success，无 query 避免 INVALID_CALLBACK_URL_ERROR）。
 * 认证成功后重定向到 /?login=success，由首页 Toast 展示「已赠送 5 积分」等。
 */
export default function LoginSuccessPage() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      window.location.replace("/?login=success");
    }
  }, [status]);

  useEffect(() => {
    if (status !== "unauthenticated") return;
    const t = setTimeout(() => {
      window.location.replace("/");
    }, 3000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <Modal open noCard showCloseButton={false} closeOnBackdrop={false} zIndex={70}>
      <div className="flex flex-col items-center gap-4 text-white" aria-busy="true" aria-live="polite">
        <Loader2 className="w-12 h-12 animate-spin text-white" aria-hidden />
        <p className="text-lg font-medium">Logging you in…</p>
        <p className="text-sm text-white/70">Please wait.</p>
      </div>
    </Modal>
  );
}
