"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

const PLANS = [
  {
    id: "weekly" as const,
    name: "周会员",
    points: 100,
    period: "每周",
    desc: "每周获得 100 积分，周期按开通时间刷新",
  },
  {
    id: "yearly" as const,
    name: "年会员",
    points: 10000,
    period: "一年",
    desc: "开通即得 10000 积分，每年同一天刷新",
  },
];

export default function SubscribePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscribing, setSubscribing] = useState<"weekly" | "yearly" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: "weekly" | "yearly") => {
    if (!session?.user) return;
    setError(null);
    setSubscribing(plan);
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
    } catch (e) {
      setError("网络错误，请重试");
    } finally {
      setSubscribing(null);
    }
  };

  if (status === "loading" || !session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 text-warm-500">
        请先登录后再订阅。
        <Link href="/?login=1" className="block mt-4 text-accent hover:underline">
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-serif text-2xl font-bold text-warm-800">会员订阅</h1>
      <p className="text-warm-500">
        当前为演示：点击订阅即可立即开通，无需支付。后续将接入真实支付。
      </p>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className="rounded-2xl border-2 border-warm-300 bg-white p-6 shadow-sm hover:border-accent/50 transition-colors"
          >
            <h2 className="font-serif text-xl font-bold text-warm-800 mb-1">
              {plan.name}
            </h2>
            <p className="text-2xl font-bold text-accent tabular-nums mb-2">
              {plan.points} 积分 / {plan.period}
            </p>
            <p className="text-sm text-warm-500 mb-6">{plan.desc}</p>
            <button
              type="button"
              onClick={() => handleSubscribe(plan.id)}
              disabled={!!subscribing}
              className="w-full rounded-xl bg-accent hover:bg-accent-muted text-white py-3 font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {subscribing === plan.id ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  开通中…
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  立即订阅
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
