"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

const DEMO_VIDEOS = [
  { src: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4", labelKey: "home.hero.carousel0" as const },
  { src: "https://videos.pexels.com/video-files/5532771/5532771-sd_640_360_25fps.mp4", labelKey: "home.hero.carousel1" as const },
  { src: "https://videos.pexels.com/video-files/4812205/4812205-sd_640_360_25fps.mp4", labelKey: "home.hero.carousel2" as const },
];

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
  const [current, setCurrent] = useState(0);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % DEMO_VIDEOS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + DEMO_VIDEOS.length) % DEMO_VIDEOS.length);
  const next = () => setCurrent((c) => (c + 1) % DEMO_VIDEOS.length);

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
            {/* left — video carousel */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="order-2 lg:order-1"
            >
              <motion.div variants={slideUp} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-warm-900/10 ring-1 ring-warm-300 aspect-video bg-warm-200">
                  {DEMO_VIDEOS.map((v, i) => (
                    <video
                      key={v.src}
                      src={v.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === current ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-warm-900/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-medium text-white bg-warm-800/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      {t(DEMO_VIDEOS[current].labelKey)}
                    </span>
                  </div>

                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center text-warm-600 hover:text-warm-800 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 shadow flex items-center justify-center text-warm-600 hover:text-warm-800 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                  {DEMO_VIDEOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === current
                          ? "w-6 bg-accent"
                          : "w-2 bg-warm-300 hover:bg-warm-400"
                      }`}
                    />
                  ))}
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
