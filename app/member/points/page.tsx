"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Coins, ChevronDown } from "lucide-react";

type Item = {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
};

const REASON_LABEL: Record<string, string> = {
  subscribe_weekly: "开通周会员",
  subscribe_yearly: "开通年会员",
  refill_weekly: "周会员周期刷新",
  refill_yearly: "年会员周期刷新",
  restore_photo: "修复照片",
  refund_restore_failed: "修复失败退回",
};

export default function PointsHistoryPage() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/user/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => d != null && setCredits(d.credits))
      .catch(() => setCredits(null));
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    setLoading(true);
    fetch(`/api/user/points-history?page=${page}`)
      .then((res) => (res.ok ? res.json() : { items: [], pageSize: 20 }))
      .then((data) => {
        setItems((prev) => (page === 1 ? data.items : [...prev, ...(data.items ?? [])]));
        setHasMore((data.items?.length ?? 0) >= (data.pageSize ?? 20));
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
  }, [status, page]);

  if (status === "loading" || !session) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 text-warm-500">
        请先登录后查看积分明细。
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-warm-800">积分明细</h1>
        <span className="flex items-center gap-2 text-lg font-semibold text-warm-800 tabular-nums">
          <Coins className="w-5 h-5 text-accent" />
          {credits !== null ? credits : "—"} 积分
        </span>
      </div>

      <div className="rounded-2xl border border-warm-300 bg-white overflow-hidden shadow-sm">
        <ul className="divide-y divide-warm-200">
          {items.length === 0 && !loading && (
            <li className="px-4 py-8 text-center text-warm-500">暂无记录</li>
          )}
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-warm-800">
                  {REASON_LABEL[item.reason] ?? item.reason}
                </p>
                <p className="text-xs text-warm-400">
                  {new Date(item.created_at).toLocaleString("zh-CN")}
                </p>
              </div>
              <span
                className={`font-semibold tabular-nums ${
                  item.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.amount >= 0 ? "+" : ""}
                {item.amount}
              </span>
            </li>
          ))}
        </ul>
        {hasMore && items.length > 0 && (
          <div className="border-t border-warm-200 p-2 text-center">
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline disabled:opacity-50"
            >
              {loading ? "加载中…" : "加载更多"}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
