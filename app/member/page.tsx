"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Coins, Crown, CheckCircle } from "lucide-react";
import { useLocale } from "@/components/shared/locale-provider";

type CreditsData = {
  credits: number;
  membershipType: string;
  membershipStartedAt: string | null;
  lastRefillAt: string | null;
};

function MemberCenterContent() {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [data, setData] = useState<CreditsData | null>(null);

  const checkoutSuccess = searchParams.get("checkout") === "success";
  const checkoutId = searchParams.get("checkout_id") ?? searchParams.get("checkoutId") ?? null;

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
        <p className="mb-4">{t("member.signInFirst")}</p>
        <Link href="/?login=1" className="text-accent hover:underline font-medium">
          {t("member.goLogin")}
        </Link>
      </div>
    );
  }

  const planLabel =
    data?.membershipType === "yearly"
      ? t("member.planYearly")
      : data?.membershipType === "weekly"
        ? t("member.planWeekly")
        : t("member.notSubscribed");

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {checkoutSuccess && (
        <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4 md:p-5 text-green-800">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 shrink-0 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold">{t("member.checkoutSuccessTitle")}</p>
              <p className="text-sm mt-1 text-green-700">
                {t("member.checkoutSuccessDetail")}
                {checkoutId ? (
                  <code className="ml-1 px-1.5 py-0.5 rounded bg-green-100 font-mono text-xs break-all">
                    {checkoutId}
                  </code>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="font-serif text-2xl font-bold text-warm-800">{t("member.memberCenter")}</h1>

      <div className="rounded-2xl border border-warm-300 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-warm-500">{t("member.currentCredits")}</span>
          <span className="flex items-center gap-2 text-2xl font-bold text-warm-800 tabular-nums">
            <Coins className="w-6 h-6 text-accent" />
            {typeof data?.credits === "number" ? Math.max(0, data.credits) : 0}
          </span>
        </div>
        <p className="text-sm text-warm-400">
          {t("member.creditsPerRestore")}
          <Link href="/member/points" className="text-accent hover:underline ml-1">
            {t("member.pointsDetail")}
          </Link>
        </p>
      </div>

      <div className="rounded-2xl border border-warm-300 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-warm-500">{t("member.membershipStatus")}</span>
          <span className="flex items-center gap-2 font-semibold text-warm-800">
            <Crown className="w-5 h-5 text-accent" />
            {planLabel}
          </span>
        </div>
        {data?.membershipStartedAt && (
          <p className="text-sm text-warm-400">
            {t("member.subscribedAt")}: {new Date(data.membershipStartedAt).toLocaleString()}
          </p>
        )}
        {planLabel === t("member.notSubscribed") && (
          <Link
            href="/member/subscribe"
            className="inline-block mt-3 rounded-xl bg-accent hover:bg-accent-muted text-white px-5 py-2.5 font-medium transition-colors"
          >
            {t("member.goSubscribe")}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function MemberCenterPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto py-16 text-center text-warm-500">Loading…</div>}>
      <MemberCenterContent />
    </Suspense>
  );
}
