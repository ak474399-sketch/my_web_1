import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restoration Cases & Family Stories",
  description: "See real restoration results and family stories shared by users. Learn how AI helps preserve precious memories.",
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
