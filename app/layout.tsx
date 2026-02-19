import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { AuthProvider } from "@/components/shared/auth-provider";
import { LocaleProvider } from "@/components/shared/locale-provider";
import { LoginSuccessToast } from "@/components/shared/login-success-toast";
import { PullToRefreshWrapper } from "@/components/shared/pull-to-refresh-wrapper";
import { FirebaseAnalytics } from "@/components/analytics/firebase-analytics";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://restorepic.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AI RestorePic - Professional AI Photo Restoration", template: "%s | AI RestorePic" },
  description:
    "AI RestorePic helps you restore, colorize, and sharpen old photos in seconds. Professional AI photo restoration — free, simple, and safe.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI RestorePic - Professional AI Photo Restoration",
    description: "AI RestorePic helps you restore, colorize, and sharpen old photos in seconds. Free, simple, and safe.",
    url: siteUrl,
    siteName: "AI RestorePic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI RestorePic - Professional AI Photo Restoration",
    description: "AI RestorePic helps you restore, colorize, and sharpen old photos in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lora.variable} font-sans min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <LocaleProvider>
          <FirebaseAnalytics />
          <PageViewTracker />
          <PullToRefreshWrapper>
            <Suspense fallback={<header className="h-16 border-b border-warm-300 bg-warm-50/90" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </PullToRefreshWrapper>
          <Suspense fallback={null}>
            <LoginSuccessToast />
          </Suspense>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
