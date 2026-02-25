"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/shared/locale-provider";

type ReviewItem = {
  id: string;
  displayName: string;
  content: string;
  country?: string;
  createdAt: string;
  avatarUrl?: string;
};

const FALLBACK_REVIEWS: ReviewItem[] = [
  { id: "f1", displayName: "Sarah M.", content: "I found my grandparents' faded wedding photo in the attic. After uploading it here, every wrinkle and smile came back crystal clear. I cried happy tears.", createdAt: "", country: "United States", avatarUrl: "/images/avatar-fallback-1.png" },
  { id: "f2", displayName: "James L.", content: "My dad's only childhood photo was full of scratches. The AI removed every single one in seconds — it looks brand new. This tool is incredible.", createdAt: "", country: "United Kingdom", avatarUrl: "/images/avatar-fallback-2.png" },
  { id: "f3", displayName: "Elena K.", content: "Seeing my great-grandmother's black-and-white portrait in full color for the first time was so emotional. The colors looked completely natural.", createdAt: "", country: "Germany", avatarUrl: "/images/avatar-fallback-3.png" },
];

const MIN_DISPLAY_COUNT = 3;

function ensureMinReviews(reviews: ReviewItem[]): ReviewItem[] {
  if (reviews.length >= MIN_DISPLAY_COUNT) return reviews;
  const ids = new Set(reviews.map((r) => r.id));
  const extras = FALLBACK_REVIEWS.filter((r) => !ids.has(r.id));
  return [...reviews, ...extras].slice(0, MIN_DISPLAY_COUNT);
}

const LOCAL_AVATARS = [
  "/images/avatar-fallback-1.png",
  "/images/avatar-fallback-2.png",
  "/images/avatar-fallback-3.png",
];

function getAvatarUrl(review: ReviewItem): string {
  return review.avatarUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(review.id)}`;
}

function getLocalFallbackAvatar(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return LOCAL_AVATARS[Math.abs(hash) % LOCAL_AVATARS.length];
}

export function ReviewsCarousel() {
  const { t } = useLocale();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/reviews")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: ReviewItem[]) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setReviews(data);
        } else if (!cancelled) {
          setReviews(FALLBACK_REVIEWS);
        }
      })
      .catch(() => {
        if (!cancelled) setReviews(FALLBACK_REVIEWS);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const list = ensureMinReviews(reviews.length > 0 ? reviews : FALLBACK_REVIEWS);

  return (
    <section className="border-t border-warm-200 bg-warm-50 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 mb-6 sm:mb-8">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-warm-800 text-center mb-2">
          {t("home.reviewsSection.title")}
        </h2>
        <p className="text-warm-500 text-center max-w-xl mx-auto mb-4">
          {t("home.reviewsSection.subtitle")}
        </p>
        <p className="text-center">
          <Link
            href="/member/review"
            className="text-sm font-medium text-accent hover:underline"
          >
            {t("home.reviewsSection.cta")}
          </Link>
        </p>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 flex gap-5 md:gap-6 overflow-hidden justify-center flex-wrap">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[min(320px,85vw)] md:w-80 rounded-2xl border border-warm-200 bg-white p-5 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-warm-200" />
                <div className="h-4 w-24 rounded bg-warm-200" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-warm-100" />
                <div className="h-3 w-4/5 rounded bg-warm-100" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-5 md:gap-6">
            {list.map((review) => (
              <article
                key={review.id}
                className="w-[min(340px,calc(100vw-2rem))] md:w-80 rounded-2xl border border-warm-300 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <img
                  src={getAvatarUrl(review)}
                  alt={review.displayName}
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fallback = getLocalFallbackAvatar(review.id);
                    if (img.src !== fallback) img.src = fallback;
                  }}
                  className="w-16 h-16 rounded-full object-cover bg-warm-100 mx-auto mb-3 ring-2 ring-warm-200"
                />
                <span className="font-semibold text-warm-800 block">{review.displayName}</span>
                {review.country && (
                  <span className="text-xs text-warm-500 block mb-3">{review.country}</span>
                )}
                <p className="text-warm-600 text-sm leading-relaxed mt-2 line-clamp-4">{review.content}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
