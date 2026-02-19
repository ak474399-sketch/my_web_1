"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/?login=1");
  }, [router]);
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <p className="text-warm-500">Redirecting…</p>
    </div>
  );
}
