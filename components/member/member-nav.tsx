"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/member", label: "会员中心" },
  { href: "/member/points", label: "积分明细" },
  { href: "/member/subscribe", label: "订阅" },
];

export function MemberNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 border-b border-warm-300 mb-8">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            pathname === tab.href
              ? "border-accent text-accent"
              : "border-transparent text-warm-500 hover:text-warm-800"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
