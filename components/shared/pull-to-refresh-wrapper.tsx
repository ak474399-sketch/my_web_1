"use client";

import { usePathname } from "next/navigation";
import { PullToRefresh } from "./pull-to-refresh";

export function PullToRefreshWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Only enable pull-to-refresh on homepage (pathname null during SSR → assume home)
  if (pathname === "/" || pathname === null) {
    return <PullToRefresh>{children}</PullToRefresh>;
  }
  return <>{children}</>;
}
