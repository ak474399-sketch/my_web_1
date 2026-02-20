"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Upload } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

/** 首屏左侧静态图（无全屏视频） */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?w=800&q=75";

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_SIZE_MB = 8;

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

export default function HeroSection() {
  const { t } = useLocale();
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) return;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        sessionStorage.setItem("hero_upload", dataUrl);
        sessionStorage.setItem("hero_upload_mime", file.type);
        router.push("/restore");
      };
      reader.readAsDataURL(file);
    },
    [router]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-warm-50">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* left — static image */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="order-2 lg:order-1"
            >
              <motion.div variants={slideUp} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-warm-900/10 ring-1 ring-warm-300 aspect-[4/3] bg-warm-200">
                  <img
                    src={HERO_IMAGE}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-900/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>

            {/* right — text + upload zone */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="order-1 lg:order-2"
            >
              <motion.p
                variants={slideUp}
                className="text-accent font-medium tracking-wide mb-4"
              >
                {t("home.hero.badge")}
              </motion.p>

              <motion.h1
                variants={slideUp}
                className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] mb-5 text-warm-800"
              >
                {t("home.hero.titleLine1")}
                <br />
                <span className="text-accent">{t("home.hero.titleLine2")}</span>
              </motion.h1>

              <motion.p
                variants={slideUp}
                className="text-warm-500 leading-relaxed mb-8 max-w-lg"
              >
                {t("home.hero.intro")}
              </motion.p>

              <motion.div variants={slideUp}>
                <div
                  onDrop={onDrop}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onClick={() => inputRef.current?.click()}
                  className={`
                    rounded-2xl border-2 border-dashed p-8 md:p-10 text-center transition-all cursor-pointer
                    ${drag
                      ? "border-accent bg-accent/5 scale-[1.01]"
                      : "border-warm-300 bg-white hover:border-accent/50 hover:shadow-md hover:shadow-warm-900/5"
                    }
                  `}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept={ACCEPT}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                      e.target.value = "";
                    }}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-warm-700 font-semibold text-lg mb-1">
                    {t("home.hero.dropTitle")}
                  </p>
                  <p className="text-warm-400">
                    {t("home.hero.dropHint")}
                  </p>
                </div>
              </motion.div>

              <motion.p variants={slideUp} className="text-sm text-warm-400 mt-3 text-center">
                {t("home.hero.privateNote")}
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
          <button
            onClick={() => nextRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="text-warm-400 hover:text-warm-600 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
          <span className="text-xs text-warm-500/80">{t("home.hero.pullDown")}</span>
        </div>
      </section>

      <div ref={nextRef} />
    </>
  );
}
