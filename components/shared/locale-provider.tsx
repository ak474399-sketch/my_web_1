"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type Locale,
  getDefaultLocale,
  setStoredLocale,
  isRtl,
} from "@/lib/i18n";
import { t as tFn } from "@/lib/translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  isRtl: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getDefaultLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setStoredLocale(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "zh-CN" || next === "zh-TW" ? next : next.split("-")[0];
      document.documentElement.dir = isRtl(next) ? "rtl" : "ltr";
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    document.documentElement.lang = locale === "zh-CN" || locale === "zh-TW" ? locale : locale.split("-")[0];
    document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
  }, [mounted, locale]);

  const t = useCallback(
    (key: string) => tFn(locale, key),
    [locale]
  );

  const value: LocaleContextValue = {
    locale,
    setLocale,
    t,
    isRtl: isRtl(locale),
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
