"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * 未登录访问修复页时跳转首页并带 from=restore，首页显示「需要登录才可以使用功能」条并打开登录弹窗
 */
export function RestoreGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || !session?.user) {
      const target = `/?login=1&from=restore`;
      router.replace(target);
    }
  }, [status, session?.user, router]);

  if (status === "loading" || !session?.user) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl bg-warm-50 border border-warm-200 p-12 flex flex-col items-center justify-center gap-4 min-h-[200px]">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
        <p className="text-warm-600 font-medium">正在跳转登录…</p>
      </div>
    );
  }

  return <>{children}</>;
}
