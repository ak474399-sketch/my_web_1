"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Coins, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";
import { hasLocalBonusRecord, setLocalBonusRecord } from "@/lib/initial-bonus-storage";

type Item = {
  id: string;
  amount: number;
  reason: string;
  created_at: string;
};

const REASON_KEYS: Record<string, string> = {
  subscribe_weekly: "member.reasonSubscribeWeekly",
  subscribe_yearly: "member.reasonSubscribeYearly",
  refill_weekly: "member.reasonRefillWeekly",
  refill_yearly: "member.reasonRefillYearly",
  restore_photo: "member.reasonRestorePhoto",
  refund_restore_failed: "member.reasonRefundRestoreFailed",
  signup_bonus: "member.reasonSignupBonus",
  initial_bonus: "member.reasonInitialBonus",
};

export default function PointsHistoryPage() {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<number | null>(null);
  const initialBonusFetched = useRef(false);

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
    if (status !== "authenticated" || !session?.user) return;
    if (initialBonusFetched.current) return;
    initialBonusFetched.current = true;
    const userId = (session.user as { id?: string })?.id;
    if (userId && hasLocalBonusRecord(userId)) return;
    fetch("/api/user/initial-bonus", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.granted && userId) {
          setLocalBonusRecord(userId);
          fetch("/api/user/credits", { credentials: "include" })
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => d != null && setCredits(d.credits));
          fetch("/api/user/points-history?page=1", { credentials: "include" })
            .then((r) => (r.ok ? r.json() : { items: [] }))
            .then((d) => setItems(d.items ?? []));
        }
      })
      .catch(() => {});
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
        <p className="mb-4">{t("member.signInFirstPoints")}</p>
        <Link href="/?login=1" className="text-accent hover:underline font-medium">
          {t("member.goLogin")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-warm-800">{t("member.pointsTitle")}</h1>
        <span className="flex items-center gap-2 text-lg font-semibold text-warm-800 tabular-nums">
          <Coins className="w-5 h-5 text-accent" />
          {credits !== null ? Math.max(0, credits) : 0} {t("member.creditsUnit")}
        </span>
      </div>

      <div className="rounded-2xl border border-warm-300 bg-white overflow-hidden shadow-sm">
        <ul className="divide-y divide-warm-200">
          {items.length === 0 && !loading && (
            <li className="px-4 py-8 text-center text-warm-500">{t("member.noRecords")}</li>
          )}
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-warm-800">
                  {REASON_KEYS[item.reason] ? t(REASON_KEYS[item.reason]) : item.reason}
                </p>
                <p className="text-xs text-warm-400">
                  {new Date(item.created_at).toLocaleString()}
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
              {loading ? t("member.loading") : t("member.loadMore")}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
