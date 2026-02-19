export const SUPPORTED_LOCALES = [
  "en",
  "de",
  "fr",
  "zh-CN",
  "zh-TW",
  "es",
  "pt",
  "ar",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE_DAYS = 365;

/** 根据浏览器语言解析出支持的 locale，未匹配则 en */
export function getLocaleFromBrowser(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || "";
  const lower = lang.toLowerCase();
  if (lower.startsWith("zh")) {
    if (lower.includes("tw") || lower.includes("hk") || lower === "zh-hant") return "zh-TW";
    return "zh-CN";
  }
  if (lower.startsWith("de")) return "de";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("ar")) return "ar";
  return "en";
}

export function getStoredLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  if (value && SUPPORTED_LOCALES.includes(value as Locale)) return value as Locale;
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)}; path=/; max-age=${60 * 60 * 24 * COOKIE_MAX_AGE_DAYS}; SameSite=Lax`;
}

/** 默认语言：先读 cookie，再读浏览器 */
export function getDefaultLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;
  return getLocaleFromBrowser();
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  es: "Español",
  pt: "Português",
  ar: "العربية",
};
