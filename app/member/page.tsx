"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Coins, Crown } from "lucide-react";

type CreditsData = {
  credits: number;
  membershipType: string;
  membershipStartedAt: string | null;
  lastRefillAt: string | null;
};

export default function MemberCenterPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<CreditsData | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/user/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then(setData)
      .catch(() => setData(null));
  }, [status]);

  if (status === "loading" || !session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 text-warm-500">
        请先登录后查看会员中心。
      </div>
    );
  }

  const planLabel =
    data?.membershipType === "yearly"
      ? "年会员"
      : data?.membershipType === "weekly"
        ? "周会员"
        : "未开通";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-serif text-2xl font-bold text-warm-800">会员中心</h1>

      <div className="rounded-2xl border border-warm-300 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-warm-500">当前积分</span>
          <span className="flex items-center gap-2 text-2xl font-bold text-warm-800 tabular-nums">
            <Coins className="w-6 h-6 text-accent" />
            {data?.credits ?? "—"}
          </span>
        </div>
        <p className="text-sm text-warm-400">
          每次修复照片消耗 5 积分。查看
          <Link href="/member/points" className="text-accent hover:underline ml-1">
            积分明细
          </Link>
        </p>
      </div>

      <div className="rounded-2xl border border-warm-300 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-warm-500">会员状态</span>
          <span className="flex items-center gap-2 font-semibold text-warm-800">
            <Crown className="w-5 h-5 text-accent" />
            {planLabel}
          </span>
        </div>
        {data?.membershipStartedAt && (
          <p className="text-sm text-warm-400">
            开通时间：{new Date(data.membershipStartedAt).toLocaleString("zh-CN")}
          </p>
        )}
        {planLabel === "未开通" && (
          <Link
            href="/member/subscribe"
            className="inline-block mt-3 rounded-xl bg-accent hover:bg-accent-muted text-white px-5 py-2.5 font-medium transition-colors"
          >
            去订阅
          </Link>
        )}
      </div>
    </div>
  );
}
