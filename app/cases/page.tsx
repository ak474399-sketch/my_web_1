import Link from "next/link";
import type { Metadata } from "next";
import { Heart, ArrowRight } from "lucide-react";
import { TrackedNavLink } from "@/components/analytics/tracked-nav-link";

const RESTORE_CASES = [
  {
    id: "1",
    title: "褪色老照片修复",
    desc: "一张上世纪 70 年代的全家福，褪色严重，经 AI 修复后色彩与细节得以还原。",
    before: "https://placehold.co/600x400/e8e0d5/7a6b5a?text=修复前",
    after: "https://placehold.co/600x400/d4a853/3d2e1c?text=修复后",
  },
  {
    id: "2",
    title: "划痕与折痕去除",
    desc: "保存多年的黑白照片布满划痕，修复后画面干净、人物清晰。",
    before: "https://placehold.co/600x400/c4b8a8/5c5248?text=修复前",
    after: "https://placehold.co/600x400/c9b896/3d2e1c?text=修复后",
  },
  {
    id: "3",
    title: "黑白照上色",
    desc: "祖辈的黑白结婚照经智能上色，重现当年的服装与场景色彩。",
    before: "https://placehold.co/600x400/a89b8a/4a4035?text=黑白原图",
    after: "https://placehold.co/600x400/d4a853/3d2e1c?text=上色后",
  },
];

const FAMILY_STORIES = [
  {
    id: "1",
    title: "三代人的一张合影",
    excerpt: "奶奶一直想修复她年轻时和姐妹的合影，照片已经发黄破损。我们帮她上传、修复，打印出来装裱后，她看了很久都没说话。",
    image: "https://placehold.co/400x300/e8e0d5/7a6b5a?text=家庭故事",
  },
  {
    id: "2",
    title: "父亲的军装照",
    excerpt: "父亲当兵时的老照片在搬家时受了潮，边缘都卷了。用 AI 修复后，不仅平整了，连当时的肩章和帽徽都更清晰了。",
    image: "https://placehold.co/400x300/c4b8a8/5c5248?text=珍贵回忆",
  },
  {
    id: "3",
    title: "老宅前的全家福",
    excerpt: "老房子拆掉前，我们翻出了在门口拍的全家福。修复这张照片，成了我们留住「老家」的一种方式。",
    image: "https://placehold.co/400x300/a89b8a/4a4035?text=老宅记忆",
  },
];

export const metadata: Metadata = {
  title: "修复案例与家庭故事",
  description: "查看老照片修复案例与用户分享的家庭故事，了解 AI 如何帮助留住珍贵回忆。",
};

export default function CasesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <p className="text-accent font-medium tracking-wide mb-3">案例与故事</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-warm-800 mb-4 max-w-2xl">
            修复案例与家庭故事
          </h1>
          <p className="text-warm-500 max-w-xl leading-relaxed">
            看看其他人如何用 AI 修复老照片，以及一张张旧照背后的家庭记忆。
          </p>
        </div>
      </section>

      {/* 修复案例 */}
      <section className="border-b border-warm-200 bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
            修复案例
          </h2>
          <p className="text-warm-500 mb-12 max-w-xl">
            以下为示意案例，使用占位图展示修复前后对比效果。
          </p>
          <div className="space-y-16 md:space-y-20">
            {RESTORE_CASES.map((c, i) => (
              <article
                key={c.id}
                className="rounded-2xl border border-warm-200 bg-warm-50/50 overflow-hidden shadow-sm hover:shadow-md hover:shadow-warm-900/5 transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] bg-warm-100">
                    <img
                      src={c.before}
                      alt="修复前"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-warm-800/70 text-white text-xs font-medium px-2.5 py-1">
                      修复前
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] bg-warm-100">
                    <img
                      src={c.after}
                      alt="修复后"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-accent/90 text-white text-xs font-medium px-2.5 py-1">
                      修复后
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-serif text-xl font-semibold text-warm-800 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-warm-500 leading-relaxed">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 家庭故事 */}
      <section className="border-b border-warm-200 bg-warm-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
            家庭故事
          </h2>
          <p className="text-warm-500 mb-12 max-w-xl">
            来自用户的真实分享：一张老照片，一段家族记忆。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FAMILY_STORIES.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-warm-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:shadow-warm-900/5 transition-all hover:border-warm-300"
              >
                <div className="aspect-[4/3] bg-warm-100">
                  <img
                    src={s.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-lg font-semibold text-warm-800 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed line-clamp-3">
                    {s.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warm-100">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mb-3">
              也来修复你的珍贵回忆
            </h2>
            <p className="text-warm-500 leading-relaxed mb-8">
              上传老照片，让 AI 帮你还原色彩、去除划痕，留住家人与时光。
            </p>
            <TrackedNavLink
              href="/restore"
              linkLabel="立即修复"
              className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-8 py-4 font-semibold transition-colors shadow-md shadow-accent/20"
            >
              立即修复
              <ArrowRight className="w-5 h-5" />
            </TrackedNavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
