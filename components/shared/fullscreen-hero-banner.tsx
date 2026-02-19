"use client";

import Link from "next/link";
import { useLocale } from "@/components/shared/locale-provider";
import { logNavClick } from "@/lib/analytics";

/** 全屏背景图（可替换为视频 URL），与标题镂空共用同一图以保证对齐 */
const BANNER_BG =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80";

export default function FullscreenHeroBanner() {
  const { t } = useLocale();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* 全屏背景（占位图，可替换为 <video> 或真实视频源） */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BANNER_BG})` }}
      />
      <div className="absolute inset-0 bg-warm-900/50" />

      {/* 内容 */}
      <div className="relative z-10 px-4 py-20 text-center">
        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] max-w-5xl mx-auto mb-6"
          style={{
            backgroundImage: `url(${BANNER_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {t("home.heroBanner.title")}
        </h1>
        <p className="text-warm-200/95 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10">
          {t("home.heroBanner.subtitle")}
        </p>
        <Link
          href="/restore"
          onClick={() => logNavClick("/restore", "hero_banner_cta")}
          className="inline-flex items-center rounded-full border-2 border-white/90 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          {t("home.heroBanner.cta")}
        </Link>
      </div>

      {/* 底部渐变，与下方区块过渡 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(253, 252, 248, 0.95))",
        }}
      />
    </section>
  );
