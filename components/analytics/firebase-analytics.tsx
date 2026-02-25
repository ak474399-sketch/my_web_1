"use client";

import { useEffect } from "react";
import { setAnalyticsInstance } from "@/lib/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = () => {
      import("@/lib/firebase").then(({ app }) => {
        if (!app) return;
        import("firebase/analytics").then(({ getAnalytics }) => {
          const analytics = getAnalytics(app);
          setAnalyticsInstance(analytics);
        });
      });
    };

    if ("requestIdleCallback" in window) {
      (window as Window).requestIdleCallback(init, { timeout: 4000 });
    } else {
      setTimeout(init, 2000);
    }
  }, []);
  return null;
}
