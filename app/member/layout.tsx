import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MemberNav } from "@/components/member/member-nav";
import { getTranslations } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as Locale;
  const T = getTranslations(locale);
  return {
    title: T.member.layoutTitle,
    description: T.member.layoutDescription,
  };
}

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
