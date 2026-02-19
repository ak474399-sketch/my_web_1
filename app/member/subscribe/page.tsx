"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Check, Loader2, Zap, ArrowRight, Crown, Sparkles } from "lucide-react";
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
    <div className="w-full max-w-6xl mx-auto px-4 -mx-4 md:mx-0">
      {/* Hero header — 强视觉区 */}
      <header className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-12 md:mb-16">
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background: "linear-gradient(135deg, #2A1F10 0%, #3D2E1C 50%, #5C4D3C 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,83,0.25),transparent)]" />
        <div className="relative px-6 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent-light px-4 py-1.5 text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            {t("member.subscribeBadge")}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            {t("member.subscribeTitle")}
          </h1>
          <p className="text-warm-200/90 text-lg md:text-xl max-w-2xl mx-auto">
            {t("member.subscribeSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-light" />
              {t("member.perPhotoCredits")}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-accent-light" />
              {t("member.instantCredits")}
            </span>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 rounded-xl bg-red-50 border-2 border-red-200 px-5 py-4 text-red-700 text-center font-medium">
          {error}
        </div>
      )}

      {/* Plans — 大卡片 + 推荐突出 */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {PLANS.map((plan) => {
          const isLoading = loading === plan.id;
          const isHighlight = plan.highlight;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col transition-all duration-300 ${
                isHighlight ? "md:-mt-2 md:mb-2 md:scale-[1.03]" : ""
              }`}
            >
              <div
                className={`relative rounded-2xl md:rounded-3xl flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
                  isHighlight
                    ? "border-2 border-accent bg-white shadow-2xl shadow-accent/20 ring-4 ring-accent/10"
                    : "border-2 border-warm-300 bg-white shadow-lg shadow-warm-900/10 hover:border-warm-400 hover:shadow-xl"
                }`}
              >
                {isHighlight && (
                  <>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      <Zap className="w-3.5 h-3.5" />
                      {t("member.bestValue")}
                    </div>
                  </>
                )}

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-warm-500 uppercase tracking-widest">
                      {plan.subname}
                    </p>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-warm-800 mt-2">
                      {plan.name}
                    </h2>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl font-bold text-warm-600">$</span>
                      <span className="font-serif text-5xl md:text-6xl font-bold text-warm-800 tabular-nums leading-none">
                        {plan.price}
                      </span>
                      <span className="text-warm-500 text-base ml-1">{plan.unit}</span>
                    </div>
                    <p className="text-warm-500 mt-2 font-medium">{plan.priceNote}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCta(plan)}
                    disabled={!!loading}
                    className={`w-full rounded-xl py-4 text-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60 ${
                      isHighlight
                        ? "bg-accent hover:bg-accent-muted text-white shadow-lg shadow-accent/30 hover:shadow-accent/40"
                        : "bg-warm-800 hover:bg-warm-700 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {plan.ctaLoading}
                      </>
                    ) : (
                      <>
                        {plan.cta}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <ul className="mt-8 pt-8 border-t-2 border-warm-200 space-y-4 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-base text-warm-700 font-medium"
                      >
                        <Check className="w-6 h-6 shrink-0 text-accent mt-0.5" />
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

      <p className="text-center text-sm text-warm-500 mt-12">
        {t("member.checkoutNote")}
      </p>
    </div>
  );
}
