import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restoration History",
  description: "View your past photo restorations.",
};

export default function HistoryLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
