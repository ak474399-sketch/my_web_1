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
  "https://your-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Restore Your Precious Memories — Free Online", template: "%s | Photo Restore AI" },
  description:
    "Bring old, faded, and damaged family photos back to life with AI. Free, simple, and safe — your memories deserve to be seen again.",
  alternates: {
    canonical: "/",
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
