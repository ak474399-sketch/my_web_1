"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams, usePathname } from "next/navigation";
import { Heart, ChevronDown, FileText, Shield, LogIn, LogOut, History, Coins, Crown, Images } from "lucide-react";
import { LoginModal } from "@/components/shared/login-modal";
import { LanguageSelector } from "@/components/shared/language-selector";
import { useLocale } from "@/components/shared/locale-provider";
import { ALL_SLUGS, RESTORE_SLUGS } from "@/lib/seo-data";
import { SlugIcon } from "@/lib/icons";

export function Navbar() {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [avatarBroken, setAvatarBroken] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const toolsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getInitial = () => {
    const name = session?.user?.name?.trim();
    const email = session?.user?.email?.trim();
    const raw = name || email || "U";
    const ch = raw[0]?.toUpperCase() || "U";
    return ch;
  };

  const openTools = () => {
    if (toolsTimeout.current) clearTimeout(toolsTimeout.current);
    setToolsOpen(true);
  };
  const closeTools = () => {
    toolsTimeout.current = setTimeout(() => setToolsOpen(false), 150);
  };

  const openUser = () => {
    if (userTimeout.current) clearTimeout(userTimeout.current);
    setUserMenuOpen(true);
  };
  const closeUser = () => {
    userTimeout.current = setTimeout(() => setUserMenuOpen(false), 150);
  };

  // 通过 URL ?login=1 打开登录弹窗（如从 /login 跳转）
  useEffect(() => {
    if (searchParams.get("login") === "1") setLoginModalOpen(true);
  }, [searchParams]);

  // 未登录用户每次到达首页自动弹出登录弹窗
  useEffect(() => {
    if (pathname === "/" && status === "unauthenticated") setLoginModalOpen(true);
  }, [pathname, status]);

  useEffect(() => {
    setAvatarBroken(false);
  }, [session?.user?.image]);

  useEffect(() => {
    if (!session?.user) {
      setCredits(null);
      return;
    }
    fetch("/api/user/credits")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data != null && typeof data.credits === "number" && setCredits(data.credits))
      .catch(() => setCredits(null));
  }, [session?.user]);

  const closeLoginModal = () => {
    setLoginModalOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("login");
    const newUrl = url.pathname + (url.search || "") + url.hash;
    window.history.replaceState({}, "", newUrl);
  };

  useEffect(() => {
    return () => {
      if (toolsTimeout.current) clearTimeout(toolsTimeout.current);
      if (userTimeout.current) clearTimeout(userTimeout.current);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-warm-300 bg-warm-50/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-warm-800 font-serif font-bold text-lg hover:text-accent transition-colors"
        >
          <Heart className="w-5 h-5 text-accent" />
          <span className="hidden sm:inline">{t("nav.memoryRestore")}</span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href="/cases"
            className="flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors"
          >
            <Images className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">案例</span>
          </Link>
          <Link
            href="/member"
            className="flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors"
          >
            <Crown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">会员</span>
          </Link>
          {session?.user && (
            <Link
              href="/history"
              className="flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("nav.history")}</span>
            </Link>
          )}

          {/* Tools dropdown */}
          <div
            className="relative"
            onMouseEnter={openTools}
            onMouseLeave={closeTools}
          >
            <button className="flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors">
              {t("nav.tools")}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {toolsOpen && (
              <div className="absolute top-full right-0 mt-2 w-[420px] max-h-[70vh] overflow-y-auto rounded-2xl border border-warm-300 bg-white shadow-xl shadow-warm-900/8 p-2">
                <div className="grid grid-cols-2 gap-1">
                  {ALL_SLUGS.map((slug) => {
                    const d = RESTORE_SLUGS[slug];
                    const kwKey = `home.toolKeywords.${slug}`;
                    const descKey = `home.toolDescriptions.${slug}`;
                    const keyword = t(kwKey) === kwKey ? d.keyword : t(kwKey);
                    const description = t(descKey) === descKey ? d.description : t(descKey);
                    return (
                      <Link
                        key={slug}
                        href={`/restore/${slug}`}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-warm-100 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/15 transition-colors">
                          <SlugIcon name={d.iconName} className="w-4 h-4 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-warm-700 group-hover:text-warm-800 transition-colors truncate">
                            {keyword}
                          </p>
                          <p className="text-xs text-warm-400 line-clamp-1 mt-0.5">
                            {description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <LanguageSelector />

          <Link
            href="/terms"
            className="hidden md:inline-flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            {t("nav.terms")}
          </Link>
          <Link
            href="/privacy"
            className="hidden md:inline-flex items-center gap-1 text-warm-500 hover:text-warm-800 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            {t("nav.privacy")}
          </Link>

          {/* Auth: 积分与头像合并，点击头像展开下拉 */}
          {status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-warm-200 animate-pulse" />
          ) : session?.user ? (
            <div
              className="relative flex items-center"
              onMouseEnter={openUser}
              onMouseLeave={closeUser}
            >
              <Link href="/member/points" className="relative flex shrink-0 rounded-full ring-2 ring-transparent hover:ring-accent/40 transition-all" title="积分明细">
                {session.user.image && !avatarBroken ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={() => setAvatarBroken(true)}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center border border-warm-300">
                    <span className="text-sm font-semibold text-warm-700 select-none">{getInitial()}</span>
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-md bg-accent text-white text-xs font-medium flex items-center justify-center tabular-nums">
                  {credits !== null ? credits : "—"}
                </span>
              </Link>

              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-warm-300 bg-white shadow-xl shadow-warm-900/10 p-2">
                  <div className="px-3 py-2.5 border-b border-warm-100 mb-2">
                    <p className="text-sm font-medium text-warm-800 truncate">{session.user.name}</p>
                    <p className="text-xs text-warm-400 truncate">{session.user.email}</p>
                    <Link
                      href="/member/points"
                      onClick={() => setUserMenuOpen(false)}
                      className="mt-2 flex items-center gap-1.5 text-xs text-accent hover:underline"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{credits !== null ? credits : "—"} 积分 · 查看明细</span>
                    </Link>
                  </div>
                  <Link
                    href="/history"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-warm-600 hover:bg-warm-50 transition-colors"
                  >
                    <History className="w-4 h-4" />
                    {t("nav.history")}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-warm-500 hover:bg-warm-50 hover:text-warm-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.signOut")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-4 py-2 font-medium transition-colors text-sm active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4" />
                {t("nav.signIn")}
              </button>
              <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
