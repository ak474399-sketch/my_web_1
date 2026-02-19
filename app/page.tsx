"use client";

import { Upload, Sparkles, Eye, Shield, Heart, Images } from "lucide-react";
import Link from "next/link";
import { ALL_SLUGS, RESTORE_SLUGS } from "@/lib/seo-data";
import { SlugIcon } from "@/lib/icons";
import { useLocale } from "@/components/shared/locale-provider";
import HeroSection from "@/components/shared/hero-section";
import FeatureSection from "@/components/shared/feature-section";
import KnowledgeSection from "@/components/shared/knowledge-section";
import { logToolClick, logNavClick } from "@/lib/analytics";

const STEPS = [
  { icon: Upload, titleKey: "home.steps.step1Title" as const, descKey: "home.steps.step1Desc" as const },
  { icon: Sparkles, titleKey: "home.steps.step2Title" as const, descKey: "home.steps.step2Desc" as const },
  { icon: Eye, titleKey: "home.steps.step3Title" as const, descKey: "home.steps.step3Desc" as const },
];

export default function HomePage() {
  const { t } = useLocale();
  return (
    <div>
      <HeroSection />

      <section className="border-t border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 text-center mb-4">
            {t("home.steps.title")}
          </h2>
          <p className="text-warm-500 text-center max-w-xl mx-auto mb-14">
            {t("home.steps.subtitle")}
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {STEPS.map((step) => (
              <div
                key={step.titleKey}
                className="rounded-2xl bg-white border border-warm-200 p-8 text-center shadow-sm hover:shadow-md hover:border-warm-300 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-warm-800 mb-2">{t(step.titleKey)}</h3>
                <p className="text-warm-500 leading-relaxed">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />

      <section className="border-t border-warm-200 bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 text-center mb-3">
            {t("home.toolsSection.title")}
          </h2>
          <p className="text-warm-500 text-center max-w-lg mx-auto mb-10">
            {t("home.toolsSection.subtitle")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {ALL_SLUGS.map((slug) => {
              const d = RESTORE_SLUGS[slug];
              const kwKey = `home.toolKeywords.${slug}`;
              const descKey = `home.toolDescriptions.${slug}`;
              const keyword = t(kwKey) === kwKey ? d.keyword : t(kwKey);
              const description = t(descKey) === descKey ? d.description : t(descKey);
              return (
                <Link
                  key={slug}
                  href={`/restore/${slug}`}
                  onClick={() => logToolClick(slug, "home")}
                  className="rounded-2xl bg-warm-50/50 border border-warm-200 overflow-hidden shadow-sm hover:shadow-md hover:border-warm-300 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-2 h-28 relative">
                    <img src={d.previewBefore} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <img src={d.previewAfter} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-y-0 left-1/2 w-px bg-warm-300" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-medium text-warm-600 bg-white/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                      {t("common.before")}
                    </span>
                    <span className="absolute bottom-1.5 right-2 text-[10px] font-medium text-white bg-accent/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                      {t("common.after")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors">
                      <SlugIcon name={d.iconName} className="w-4 h-4 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-warm-700 group-hover:text-accent transition-colors">{keyword}</p>
                      <p className="text-xs text-warm-400 mt-0.5 line-clamp-1">{description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 案例入口 */}
      <section className="border-t border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto rounded-2xl border border-warm-200 bg-white p-8 md:p-10 shadow-sm hover:shadow-md hover:border-warm-300 transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Images className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-warm-800 mb-1">
                    修复案例与家庭故事
                  </h2>
                  <p className="text-warm-500 text-sm leading-relaxed">
                    查看真实修复效果与用户分享的珍贵回忆。
                  </p>
                </div>
              </div>
              <Link
                href="/cases"
                onClick={() => logNavClick("/cases", "查看案例")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 font-medium transition-colors shrink-0"
              >
                查看案例
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KnowledgeSection />

      <section className="border-t border-warm-200 bg-warm-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
              {t("home.privacySection.title")}
            </h2>
            <p className="text-warm-500 leading-relaxed mb-8">
              {t("home.privacySection.body")}
            </p>
            <Link
              href="/restore"
              onClick={() => logNavClick("/restore", "home_cta")}
              className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-8 py-4 font-semibold transition-colors shadow-md shadow-accent/20 active:scale-[0.98]"
            >
              <Heart className="w-5 h-5" />
              {t("home.privacySection.cta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
