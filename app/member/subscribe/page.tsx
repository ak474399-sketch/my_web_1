"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, Zap, ArrowRight } from "lucide-react";

const PLANS = [
  {
    id: "credits" as const,
    name: "轻量包",
    subname: "积分套餐",
    price: "0.99",
    unit: "一次性",
    priceNote: "约 2 张照片修复",
    features: [
      "10 积分一次性到账",
      "约 2 张照片修复",
      "无需续费，随用随买",
      "适合尝鲜体验",
    ],
    cta: "立即购买",
    ctaLoading: "购买中…",
    highlight: false,
    isPurchase: true,
  },
  {
    id: "weekly" as const,
    name: "周会员",
    subname: "周套餐",
    price: "9.99",
    unit: "/ 周",
    priceNote: "约 20 张/周，折合不到 $0.5/张",
    features: [
      "每周 100 积分",
      "约 20 张照片修复/周",
      "折合不到 $0.5/张",
      "周期按开通日自动刷新",
    ],
    cta: "立即订阅",
    ctaLoading: "开通中…",
    highlight: false,
    isPurchase: false,
  },
  {
    id: "yearly" as const,
    name: "年会员",
    subname: "年套餐",
    price: "39.99",
    unit: "/ 年",
    priceNote: "约 2000 张/年，折合不到 $0.02/张",
    features: [
      "每年 10000 积分",
      "约 2000 张照片修复/年",
      "折合不到 $0.02/张",
      "全年最低单价，最划算",
    ],
    cta: "立即订阅",
    ctaLoading: "开通中…",
    highlight: true,
    isPurchase: false,
  },
] as const;

export default function SubscribePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<"credits" | "weekly" | "yearly" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreditsPurchase = async () => {
    if (!session?.user) return;
    setError(null);
    setLoading("credits");
    try {
      const res = await fetch("/api/membership/purchase-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: "10" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? data.error ?? "购买失败");
        return;
      }
      router.push("/member");
      router.refresh();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(null);
    }
  };

  const handleSubscribe = async (plan: "weekly" | "yearly") => {
    if (!session?.user) return;
    setError(null);
    setLoading(plan);
    try {
      const res = await fetch("/api/membership/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message ?? data.error ?? "订阅失败");
        return;
      }
      router.push("/member");
      router.refresh();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(null);
    }
  };

  const handleCta = (plan: (typeof PLANS)[number]) => {
    if (plan.isPurchase) handleCreditsPurchase();
    else if (plan.id === "weekly" || plan.id === "yearly") handleSubscribe(plan.id);
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <p className="text-warm-600 mb-4">请先登录后再选择套餐。</p>
        <Link
          href="/?login=1"
          className="rounded-xl bg-accent hover:bg-accent-muted text-white px-6 py-3 font-medium transition-colors"
        >
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Header */}
      <header className="text-center mb-12 md:mb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-800 mb-3">
          选择套餐
        </h1>
        <p className="text-warm-500 text-lg max-w-2xl mx-auto">
          按需选择积分包或会员订阅，获得更多修复次数与更低单价。
        </p>
      </header>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-center">
          {error}
        </div>
      )}

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {PLANS.map((plan) => {
          const isLoading = loading === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 bg-white p-6 md:p-7 flex flex-col transition-all ${
                plan.highlight
                  ? "border-accent shadow-lg shadow-accent/10"
                  : "border-warm-300 hover:border-warm-400 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-accent/15 text-accent px-3 py-1 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5" />
                  最划算
                </div>
              )}

              <div className="mb-5">
                <p className="text-sm text-warm-500 uppercase tracking-wide">
                  {plan.subname}
                </p>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-warm-800 mt-1">
                  {plan.name}
                </h2>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-warm-600 font-medium">$</span>
                  <span className="font-serif text-4xl font-bold text-warm-800 tabular-nums">
                    {plan.price}
                  </span>
                  <span className="text-warm-500 text-sm ml-1">{plan.unit}</span>
                </div>
                <p className="text-sm text-warm-500 mt-1">{plan.priceNote}</p>
              </div>

              <button
                type="button"
                onClick={() => handleCta(plan)}
                disabled={!!loading}
                className={`w-full rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60 ${
                  plan.highlight
                    ? "bg-accent hover:bg-accent-muted text-white"
                    : "bg-warm-800 hover:bg-warm-700 text-white"
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
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <ul className="mt-6 pt-6 border-t border-warm-200 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-warm-600"
                  >
                    <Check className="w-5 h-5 shrink-0 text-accent mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-warm-400 mt-10">
        当前为演示环境，开通/购买后积分即时到账，后续将接入真实支付。
      </p>
    </div>
  );
}
