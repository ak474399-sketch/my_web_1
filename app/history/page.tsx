"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { History, ImageIcon, Loader2 } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import { useLocale } from "@/components/shared/locale-provider";
import { logNavClick } from "@/lib/analytics";

type HistoryItem = {
  id: string;
  original_url: string;
  restored_url: string;
  status: string;
  created_at: string;
};

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch("/api/restore/history")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = (data.message || data.error) as string | undefined;
          throw new Error(msg || "Failed to load history");
        }
        return data;
      })
      .then((data) => {
        if (!cancelled) setItems(data.items ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <Modal open noCard showCloseButton={false} closeOnBackdrop={false} zIndex={70}>
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-10 h-10 animate-spin" aria-hidden />
          <p className="text-lg font-medium">{t("history.loadingHistory")}</p>
        </div>
      </Modal>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <History className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-warm-800 mb-2">
            {t("history.signInToSeeHistory")}
          </h1>
          <p className="text-warm-500 mb-6">
            {t("history.signInToSeeHistoryDesc")}
          </p>
          <Link
            href="/?login=1"
            onClick={() => logNavClick("/?login=1", "history_signin")}
            className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-6 py-3 font-medium transition-colors active:scale-[0.98]"
          >
            {t("nav.signIn")}
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-warm-800 mb-2">
          {t("history.restorationHistory")}
        </h1>
        <p className="text-warm-500 mb-8">
          {t("history.photosRestoredWhileSignedIn")}
        </p>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white border border-warm-300 shadow-sm p-12 text-center">
            <ImageIcon className="w-12 h-12 text-warm-300 mx-auto mb-4" />
            <p className="text-warm-500 mb-6">
              {t("history.noRestorationsYet")}
            </p>
            <Link
              href="/restore"
              onClick={() => logNavClick("/restore", "history_empty_cta")}
              className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-muted text-white px-6 py-3 font-medium transition-colors active:scale-[0.98]"
            >
              {t("history.restoreAPhoto")}
            </Link>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={item.restored_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-white border border-warm-300 shadow-sm overflow-hidden hover:shadow-md hover:border-accent/30 transition-all"
                >
                  <div className="grid grid-cols-2 aspect-square">
                    <img
                      src={item.original_url}
                      alt={t("common.before")}
                      className="w-full h-full object-cover"
                    />
                    <img
                      src={item.restored_url}
                      alt={t("common.after")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3 py-2 border-t border-warm-200 flex justify-between items-center text-xs text-warm-400">
                    <span>{t("history.beforeAfter")}</span>
                    <time dateTime={item.created_at}>
                      {new Date(item.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
