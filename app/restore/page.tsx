"use client";

import { RestoreTool } from "./[slug]/restore-tool";
import { useLocale } from "@/components/shared/locale-provider";

export default function RestorePage() {
  const { t } = useLocale();
  return (
    <div className="container mx-auto px-4 py-8 md:py-14">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-800 mb-3 text-center">
        {t("restore.pageTitle")}
      </h1>
      <p className="text-warm-500 text-center mb-8 max-w-xl mx-auto leading-relaxed">
        {t("restore.pageSubtitle")}
      </p>
      <RestoreTool />
    </div>
  );
}
