"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { SUPPORTED_LOCALES, LOCALE_LABELS, type Locale } from "@/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale, isRtl } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-warm-500 hover:text-warm-800 transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline max-w-[6rem] truncate">
          {LOCALE_LABELS[locale]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 w-48 max-h-[70vh] overflow-y-auto rounded-xl border border-warm-300 bg-white shadow-xl shadow-warm-900/8 py-1 z-50"
          role="listbox"
          style={isRtl ? { right: 0 } : { left: 0 }}
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              role="option"
              aria-selected={loc === locale}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                loc === locale
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-warm-600 hover:bg-warm-100"
              }`}
            >
              {LOCALE_LABELS[loc as Locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
