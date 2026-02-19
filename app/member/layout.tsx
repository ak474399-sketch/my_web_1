import type { Metadata } from "next";
import { MemberNav } from "@/components/member/member-nav";

export const metadata: Metadata = {
  title: "会员中心",
  description: "积分明细与会员订阅",
};

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <MemberNav />
      {children}
    </div>
  );
}
