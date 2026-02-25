"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

const FEATURE_KEYS = ["feature0", "feature1", "feature2", "feature3"] as const;

const FEATURE_IMGS = [
  { beforeImg: "/images/ba-faded-before.png", afterImg: "/images/ba-faded-after.png" },
  { beforeImg: "/images/ba-scratch-before.png", afterImg: "/images/ba-scratch-after.png" },
  { beforeImg: "/images/ba-colorize-before.png", afterImg: "/images/ba-colorize-after.png" },
  { beforeImg: "/images/ba-water-before.png", afterImg: "/images/ba-water-after.png" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function BeforeAfterCard({
  beforeImg,
  afterImg,
  beforeLabel,
  afterLabel,
  title,
}: {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  title: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg shadow-warm-900/8 ring-1 ring-warm-300 bg-white">
      <div className="grid grid-cols-2 relative">
        <div className="relative">
          <img src={beforeImg} alt={`${title} — ${beforeLabel}`} className="w-full h-48 md:h-64 object-cover" loading="lazy" />
          <span className="absolute bottom-2 left-2 text-xs font-medium text-warm-700 bg-white/80 backdrop-blur-sm rounded-md px-2 py-0.5">{beforeLabel}</span>
        </div>
        <div className="relative">
          <img src={afterImg} alt={`${title} — ${afterLabel}`} className="w-full h-48 md:h-64 object-cover" loading="lazy" />
          <span className="absolute bottom-2 right-2 text-xs font-medium text-white bg-accent/80 backdrop-blur-sm rounded-md px-2 py-0.5">{afterLabel}</span>
        </div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-warm-300 pointer-events-none" />
      </div>
    </div>
  );
}

export default function FeatureSection() {
  const { t } = useLocale();
  return (
    <section className="border-t border-warm-200 bg-warm-100">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wide mb-3">{t("feature.howWeHelp")}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-800">{t("feature.restoreWhatMatters")}</h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-24">
          {FEATURE_KEYS.map((key, i) => {
            const reversed = i % 2 === 1;
            const prefix = `feature.${key}`;
            const imgs = FEATURE_IMGS[i];
            return (
              <motion.div
                key={key}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
              >
                <div className="flex-1 space-y-5">
                  <span className="inline-block text-sm font-medium text-accent bg-accent/10 rounded-full px-4 py-1">{t(`${prefix}.tag`)}</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 leading-tight">{t(`${prefix}.title`)}</h3>
                  <p className="text-warm-500 leading-relaxed">{t(`${prefix}.description`)}</p>
                  <ul className="space-y-2.5 pt-2">
                    <li className="flex items-start gap-2.5 text-warm-600"><Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />{t(`${prefix}.benefit1`)}</li>
                    <li className="flex items-start gap-2.5 text-warm-600"><Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />{t(`${prefix}.benefit2`)}</li>
                    <li className="flex items-start gap-2.5 text-warm-600"><Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />{t(`${prefix}.benefit3`)}</li>
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <BeforeAfterCard
                    beforeImg={imgs.beforeImg}
                    afterImg={imgs.afterImg}
                    beforeLabel={t(`${prefix}.beforeLabel`)}
                    afterLabel={t(`${prefix}.afterLabel`)}
                    title={t(`${prefix}.title`)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
