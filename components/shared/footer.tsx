"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { logToolClick, logNavClick } from "@/lib/analytics";

const TOOL_LINKS = [
  { href: "/restore", labelKey: "footer.restoreMemories" as const },
  { href: "/cases", labelKey: "footer.cases" as const },
  { href: "/history", labelKey: "footer.history" as const },
  { href: "/restore/old-photo-restoration", labelKey: "footer.oldPhotos" as const },
  { href: "/restore/scratch-removal", labelKey: "footer.fixScratches" as const },
  { href: "/restore/faded-photo-repair", labelKey: "footer.reviveFaded" as const },
  { href: "/restore/black-and-white-photo-colorization", labelKey: "footer.addColor" as const },
];

const LEGAL_LINKS = [
  { href: "/terms", labelKey: "footer.termsOfService" as const },
  { href: "/privacy", labelKey: "footer.privacyPolicy" as const },
];

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-warm-300 bg-warm-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-warm-700 font-serif font-bold text-lg">
            <Heart className="w-4 h-4 text-accent" />
            {t("footer.memoryRestore")}
          </div>
          <p className="text-warm-400 text-center max-w-md">
            {t("footer.tagline")}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-warm-500">
            {TOOL_LINKS.map((link) => {
              const label = t(link.labelKey) as string;
              const isTool = link.href.startsWith("/restore/");
              const slug = isTool ? link.href.replace(/^\/restore\//, "") : undefined;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (slug) logToolClick(slug, "footer");
                    else logNavClick(link.href, label);
                  }}
                  className="hover:text-warm-700 transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div className="flex gap-x-6 text-warm-400">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => logNavClick(link.href, t(link.labelKey))}
                className="hover:text-warm-600 transition-colors text-sm"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
          <p className="text-sm text-warm-400">
            © 2026 AI RestorePic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
