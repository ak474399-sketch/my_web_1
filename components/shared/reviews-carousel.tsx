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

/** 无数据或请求失败时使用的静态展示数据（真人风格头像占位） */
const FALLBACK_REVIEWS: ReviewItem[] = [
  { id: "f1", displayName: "Sarah M.", content: "Restored my grandparents' wedding photo in seconds. The result was beyond my expectations.", createdAt: "", country: undefined, avatarUrl: "https://i.pravatar.cc/96?u=f1" },
  { id: "f2", displayName: "James L.", content: "Used the scratch removal tool on an old family portrait. Simple and fast. Will definitely use again.", createdAt: "", country: undefined, avatarUrl: "https://i.pravatar.cc/96?u=f2" },
  { id: "f3", displayName: "Elena K.", content: "The black and white colorization brought my dad's childhood photo to life. So emotional to see it in color.", createdAt: "", country: undefined, avatarUrl: "https://i.pravatar.cc/96?u=f3" },
];

function getAvatarUrl(review: ReviewItem): string {
  return review.avatarUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(review.id)}`;
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

  const list = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  return (
    <section className="border-t border-warm-200 bg-warm-50 py-12 md:py-16">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 text-center mb-2">
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
        <div className="flex gap-5 md:gap-6 overflow-hidden justify-center flex-wrap px-4">
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
        <div className="overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-5 md:gap-6 min-w-0" style={{ scrollSnapType: "x mandatory" }}>
            {list.map((review) => (
              <article
                key={review.id}
                className="flex-shrink-0 w-[min(320px,85vw)] md:w-80 rounded-2xl border border-warm-300 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={getAvatarUrl(review)}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover bg-warm-100"
                  />
                  <div className="min-w-0">
                    <span className="font-semibold text-warm-800 block truncate">{review.displayName}</span>
                    {review.country && (
                      <span className="text-xs text-warm-500">{review.country}</span>
                    )}
                  </div>
                </div>
                <p className="text-warm-600 text-sm leading-relaxed">{review.content}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
