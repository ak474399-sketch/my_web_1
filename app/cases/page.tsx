"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { logNavClick } from "@/lib/analytics";

const RESTORE_CASES = [
  { id: "1", title: "Faded photo restored", titleZh: "褪色老照片修复", desc: "A 1970s family portrait, heavily faded; AI restored color and detail.", descZh: "一张上世纪 70 年代的全家福，褪色严重，经 AI 修复后色彩与细节得以还原。", before: "/images/ba-faded-before.png", after: "/images/ba-faded-after.png" },
  { id: "2", title: "Scratches and creases removed", titleZh: "划痕与折痕去除", desc: "An old black-and-white photo full of scratches; after restoration, clean and clear.", descZh: "保存多年的黑白照片布满划痕，修复后画面干净、人物清晰。", before: "/images/ba-scratch-before.png", after: "/images/ba-scratch-after.png" },
  { id: "3", title: "Black-and-white colorized", titleZh: "黑白照上色", desc: "A vintage wedding photo colorized by AI, bringing back period clothing and scene.", descZh: "祖辈的黑白结婚照经智能上色，重现当年的服装与场景色彩。", before: "/images/ba-colorize-before.png", after: "/images/ba-colorize-after.png" },
];

const FAMILY_STORIES = [
  { id: "1", title: "Three generations, one photo", titleZh: "三代人的一张合影", excerpt: "Grandma always wanted to restore a portrait from her youth. We helped her upload, restore, and print it. She looked at it for a long time without saying a word.", excerptZh: "奶奶一直想修复她年轻时和姐妹的合影，照片已经发黄破损。我们帮她上传、修复，打印出来装裱后，她看了很久都没说话。", image: "/images/story-3gen-family.png" },
  { id: "2", title: "Father's military portrait", titleZh: "父亲的军装照", excerpt: "An old army photo was damaged in a move. After AI restoration, it was flat again and the insignia looked clearer.", excerptZh: "父亲当兵时的老照片在搬家时受了潮，边缘都卷了。用 AI 修复后，不仅平整了，连当时的肩章和帽徽都更清晰了。", image: "/images/story-military-portrait.png" },
  { id: "3", title: "Family in front of the old house", titleZh: "老宅前的全家福", excerpt: "Before the old house was torn down, we found a family photo at the door. Restoring it became our way of keeping 'home'.", excerptZh: "老房子拆掉前，我们翻出了在门口拍的全家福。修复这张照片，成了我们留住「老家」的一种方式。", image: "/images/story-old-house-family.png" },
];

export default function CasesPage() {
  const { t, locale } = useLocale();
  const isZh = locale === "zh-CN" || locale === "zh-TW";
  return (
    <div className="min-h-screen">
      <section className="border-b border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <p className="text-accent font-medium tracking-wide mb-3">{t("cases.badge")}</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-warm-800 mb-4 max-w-2xl">
            {t("cases.title")}
          </h1>
          <p className="text-warm-500 max-w-xl leading-relaxed">
            {t("cases.subtitle")}
          </p>
        </div>
      </section>

      <section className="border-b border-warm-200 bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
            {t("cases.restoreTitle")}
          </h2>
          <p className="text-warm-500 mb-12 max-w-xl">
            {t("cases.restoreSubtitle")}
          </p>
          <div className="space-y-16 md:space-y-20">
            {RESTORE_CASES.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-warm-200 bg-warm-50/50 overflow-hidden shadow-sm hover:shadow-md hover:shadow-warm-900/5 transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] bg-warm-100">
                    <img src={c.before} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-warm-800/70 text-white text-xs font-medium px-2.5 py-1">
                      {t("cases.beforeLabel")}
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] bg-warm-100">
                    <img src={c.after} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-accent/90 text-white text-xs font-medium px-2.5 py-1">
                      {t("cases.afterLabel")}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-serif text-xl font-semibold text-warm-800 mb-2">
                    {isZh ? c.titleZh : c.title}
                  </h3>
                  <p className="text-warm-500 leading-relaxed">{isZh ? c.descZh : c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
            {t("cases.storiesTitle")}
          </h2>
          <p className="text-warm-500 mb-12 max-w-xl">
            {t("cases.storiesSubtitle")}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FAMILY_STORIES.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-warm-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:shadow-warm-900/5 transition-all hover:border-warm-300"
              >
                <div className="aspect-[4/3] bg-warm-100">
                  <img src={s.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-lg font-semibold text-warm-800 mb-2">
                    {isZh ? s.titleZh : s.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed line-clamp-3">
                    {isZh ? s.excerptZh : s.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-100">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
              {t("cases.ctaTitle")}
            </h2>
            <p className="text-warm-500 leading-relaxed mb-8">
              {t("cases.ctaSubtitle")}
            </p>
            <Link
              href="/restore"
              onClick={() => logNavClick("/restore", t("cases.ctaButton"))}
              className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-8 py-4 font-semibold transition-colors shadow-md shadow-accent/20"
            >
              {t("cases.ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
