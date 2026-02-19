"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/modal";

export default function AuthCallbackPage() {
  const { status } = useSession();
  const [nextUrl, setNextUrl] = useState("/");
  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    setNextUrl(params.get("next") || "/");
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = nextUrl;
    }
  }, [status, nextUrl]);

  useEffect(() => {
    if (status !== "unauthenticated") return;
    const t = setTimeout(() => {
      window.location.href = "/";
    }, 5000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <Modal
      open
      noCard
      showCloseButton={false}
      closeOnBackdrop={false}
      zIndex={70}
    >
      <div className="flex flex-col items-center gap-4 text-white" aria-busy="true" aria-live="polite">
        <Loader2 className="w-12 h-12 animate-spin text-white" aria-hidden />
        <p className="text-lg font-medium">Logging you in…</p>
        <p className="text-sm text-white/70">Please wait.</p>
      </div>
    </Modal>
  );
}
