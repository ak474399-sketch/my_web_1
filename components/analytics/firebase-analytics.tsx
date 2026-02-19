"use client";

import { useEffect } from "react";
import { app } from "@/lib/firebase";
import { setAnalyticsInstance } from "@/lib/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    if (!app || typeof window === "undefined") return;
    import("firebase/analytics").then(({ getAnalytics }) => {
      const analytics = getAnalytics(app);
      setAnalyticsInstance(analytics);
    });
  }, []);
  return null;
}
