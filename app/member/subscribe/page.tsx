"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Check, Loader2, Zap, ArrowRight, Crown } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { POLAR_PRODUCT_IDS, getCheckoutUrl } from "@/lib/polar";

function usePlans(t: (key: string) => string) {
  return [
    {
      id: "credits" as const,
      name: t("member.planCreditsName"),
      subname: t("member.planCreditsSub"),
      price: "0.99",
      unit: t("member.planCreditsUnit"),
      priceNote: t("member.planCreditsNote"),
      features: [t("member.planCreditsF1"), t("member.planCreditsF2"), t("member.planCreditsF3"), t("member.planCreditsF4")],
      cta: t("member.planCreditsCta"),
      ctaLoading: t("member.planCreditsCtaLoading"),
      highlight: false,
      isPurchase: true,
    },
    {
      id: "weekly" as const,
      name: t("member.planWeeklyName"),
      subname: t("member.planWeeklySub"),
      price: "9.99",
      unit: t("member.planWeeklyUnit"),
      priceNote: t("member.planWeeklyNote"),
      features: [t("member.planWeeklyF1"), t("member.planWeeklyF2"), t("member.planWeeklyF3"), t("member.planWeeklyF4")],
      cta: t("member.planWeeklyCta"),
      ctaLoading: t("member.planWeeklyCtaLoading"),
      highlight: false,
      isPurchase: false,
    },
    {
      id: "yearly" as const,
      name: t("member.planYearlyName"),
      subname: t("member.planYearlySub"),
      price: "39.99",
      unit: t("member.planYearlyUnit"),
      priceNote: t("member.planYearlyNote"),
      features: [t("member.planYearlyF1"), t("member.planYearlyF2"), t("member.planYearlyF3"), t("member.planYearlyF4")],
      cta: t("member.planYearlyCta"),
      ctaLoading: t("member.planYearlyCtaLoading"),
      highlight: true,
      isPurchase: false,
    },
  ] as const;
}

export default function SubscribePage() {
  const { t } = useLocale();
  const PLANS = usePlans(t);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<"credits" | "weekly" | "yearly" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const customerParams =
    session?.user?.email || session?.user?.id
      ? {
          customerEmail: session.user.email ?? undefined,
          customerExternalId: typeof session.user.id === "string" ? session.user.id : undefined,
        }
      : undefined;

  const handleCreditsPurchase = () => {
    if (!session?.user) return;
    setError(null);
    setLoading("credits");
    window.location.href = getCheckoutUrl(POLAR_PRODUCT_IDS.credits10, customerParams);
  };

  const handleSubscribe = (plan: "weekly" | "yearly") => {
    if (!session?.user) return;
    setError(null);
    setLoading(plan);
    const productId = plan === "weekly" ? POLAR_PRODUCT_IDS.weekly : POLAR_PRODUCT_IDS.yearly;
    window.location.href = getCheckoutUrl(productId, customerParams);
  };

  const handleCta = (plan: (typeof PLANS)[number]) => {
    if (plan.isPurchase) handleCreditsPurchase();
    else if (plan.id === "weekly" || plan.id === "yearly") handleSubscribe(plan.id);
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 -mx-4 -mt-8 rounded-2xl bg-warm-100/80">
        <p className="text-warm-600 text-lg mb-4">{t("member.subscribeSignInFirst")}</p>
        <Link
          href="/?login=1"
          className="rounded-xl bg-accent hover:bg-accent-muted text-white px-8 py-4 font-semibold transition-colors shadow-lg shadow-accent/20"
        >
          {t("member.goLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
      {/* 缩短的粽色模块，便于套餐首屏展示 */}
      <header className="relative rounded-2xl overflow-hidden mb-6 md:mb-8 w-full max-w-3xl">
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background: "linear-gradient(135deg, #2A1F10 0%, #3D2E1C 50%, #5C4D3C 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,83,0.25),transparent)]" />
        <div className="relative px-5 py-6 md:py-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent-light px-3 py-1 text-xs font-medium mb-3">
            <Crown className="w-3.5 h-3.5" />
            {t("member.subscribeBadge")}
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            {t("member.subscribeTitle")}
          </h1>
          <p className="text-warm-200/90 text-sm md:text-base max-w-xl mx-auto">
            {t("member.subscribeSubtitle")}
          </p>
        </div>
      </header>

      {error && (
        <div className="w-full max-w-2xl mb-6 rounded-xl bg-red-50 border-2 border-red-200 px-5 py-4 text-red-700 text-center font-medium">
          {error}
        </div>
      )}

      {/* 整张卡片可点击跳转支付 */}
      <div className="grid md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-5xl">
        {PLANS.map((plan) => {
          const isLoading = loading === plan.id;
          const isHighlight = plan.highlight;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col transition-all duration-300 ${
                isHighlight ? "md:-mt-1 md:mb-1 md:scale-[1.02]" : ""
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleCta(plan)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCta(plan);
                  }
                }}
                className={`relative rounded-2xl flex flex-col flex-1 overflow-hidden transition-all duration-300 cursor-pointer select-none ${
                  isHighlight
                    ? "border-2 border-accent bg-white shadow-2xl shadow-accent/20 ring-4 ring-accent/10 hover:shadow-accent/30"
                    : "border-2 border-warm-300 bg-white shadow-lg shadow-warm-900/10 hover:border-warm-400 hover:shadow-xl"
                } ${loading ? "pointer-events-none opacity-70" : ""}`}
              >
                {isHighlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                      <Zap className="w-3 h-3" />
                      {t("member.bestValue")}
                    </div>
                  </>
                )}

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-warm-500 uppercase tracking-widest">
                      {plan.subname}
                    </p>
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-warm-800 mt-1">
                      {plan.name}
                    </h2>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-xl font-bold text-warm-600">$</span>
                      <span className="font-serif text-4xl md:text-5xl font-bold text-warm-800 tabular-nums leading-none">
                        {plan.price}
                      </span>
                      <span className="text-warm-500 text-sm ml-1">{plan.unit}</span>
                    </div>
                    <p className="text-warm-700 mt-1 text-sm font-bold">{plan.priceNote}</p>
                  </div>

                  <div
                    className={`w-full rounded-xl py-3 text-base font-bold flex items-center justify-center gap-2 ${
                      isHighlight
                        ? "bg-accent/90 text-white"
                        : "bg-warm-800/90 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {plan.ctaLoading}
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </div>

                  <ul className="mt-6 pt-6 border-t-2 border-warm-200 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-warm-700 font-medium"
                      >
                        <Check className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-warm-500 mt-8">
        {t("member.checkoutNote")}
      </p>
    </div>
  );
}
