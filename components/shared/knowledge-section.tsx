"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { logToolClick } from "@/lib/analytics";

const ARTICLE_SLUGS = ["/restore/old-photo-restoration", "/restore/vintage-photo-enhancement", "/restore/faded-photo-repair"];
const ARTICLE_KEYS = ["article0", "article1", "article2"] as const;

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function KnowledgeSection() {
  const { t } = useLocale();
  return (
    <section className="border-t border-warm-200">
      <div className="container mx-auto px-4 py-12 sm:py-20 md:py-28">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-medium tracking-wide mb-3">{t("knowledge.learnExplore")}</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-warm-800">{t("knowledge.storiesTitle")}</h2>
          <p className="text-warm-400 mt-3 max-w-xl mx-auto">{t("knowledge.storiesSubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ARTICLE_KEYS.map((key, i) => (
            <motion.a
              key={ARTICLE_SLUGS[i]}
              href={ARTICLE_SLUGS[i]}
              onClick={() => {
                const slug = ARTICLE_SLUGS[i].replace(/^\/restore\//, "");
                logToolClick(slug, "knowledge");
              }}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl bg-white border border-warm-300 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:shadow-warm-900/5 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-sm text-warm-400">{t(`knowledge.${key}.readTime`)}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-warm-800 mb-3 leading-snug group-hover:text-accent transition-colors">
                {t(`knowledge.${key}.title`)}
              </h3>
              <p className="text-warm-500 leading-relaxed flex-1">{t(`knowledge.${key}.excerpt`)}</p>
              <div className="mt-5 inline-flex items-center gap-1 font-medium text-accent group-hover:text-accent-muted transition-colors">
                {t("knowledge.readMore")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
