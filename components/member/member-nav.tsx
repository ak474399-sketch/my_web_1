"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale } from "@/components/shared/locale-provider";

const TABS = [
  { href: "/member", labelKey: "memberNav.home" as const, exact: true },
  { href: "/member/points", labelKey: "memberNav.points" as const, exact: false },
  { href: "/member/subscribe", labelKey: "memberNav.subscribe" as const, exact: false, hideWhenSubscribed: true },
  { href: "/member/feedback", labelKey: "memberNav.feedback" as const, exact: false },
  { href: "/member/review", labelKey: "memberNav.review" as const, exact: false },
];

export function MemberNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const { data: session } = useSession();
  const [membershipType, setMembershipType] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/user/credits")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.membershipType) setMembershipType(d.membershipType); })
      .catch(() => {});
  }, [session?.user]);

  const isSubscribed = membershipType && membershipType !== "free";

  return (
    <nav className="flex flex-wrap gap-1 border-b border-warm-300 mb-8">
      {TABS.filter((tab) => !(tab.hideWhenSubscribed && isSubscribed)).map((tab) => {
        const isActive = tab.exact ? pathname === tab.href : pathname === tab.href || (tab.href !== "/member" && pathname.startsWith(tab.href));
        const label = t(tab.labelKey);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              isActive ? "border-accent text-accent" : "border-transparent text-warm-500 hover:text-warm-800"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
