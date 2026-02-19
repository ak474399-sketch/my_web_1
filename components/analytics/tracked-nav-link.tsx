"use client";

import Link from "next/link";
import { logNavClick } from "@/lib/analytics";

type Props = {
  href: string;
  linkLabel?: string;
  className?: string;
  children: React.ReactNode;
};

/** 带 nav_click 埋点的导航链接，用于服务端组件中的 CTA */
export function TrackedNavLink({ href, linkLabel, className, children }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => logNavClick(href, linkLabel)}
    >
      {children}
    </Link>
  );
}
