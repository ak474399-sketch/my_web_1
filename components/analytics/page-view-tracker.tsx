"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logPageView } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || typeof document === "undefined") return;
    logPageView(pathname, document.title);
  }, [pathname]);

  return null;
}
