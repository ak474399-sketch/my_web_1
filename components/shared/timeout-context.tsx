"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@/components/shared/modal";
import { useLocale } from "@/components/shared/locale-provider";

export type TimeoutActionKey = "login" | "subscribe" | "restore";

type TimeoutState = {
  open: boolean;
  actionKey: TimeoutActionKey;
  onRetry: (() => void) | undefined;
};

const actionKeyToTKey: Record<TimeoutActionKey, string> = {
  login: "timeout.actionLogin",
  subscribe: "timeout.actionSubscribe",
  restore: "timeout.actionRestore",
};

const TimeoutContext = createContext<{
  showTimeout: (params: { actionKey: TimeoutActionKey; onRetry?: () => void }) => void;
} | null>(null);

export function useTimeout() {
  const ctx = useContext(TimeoutContext);
  if (!ctx) throw new Error("useTimeout must be used within TimeoutProvider");
  return ctx;
}

/** Must be used inside LocaleProvider. Renders the global timeout modal and provides showTimeout. */
export function TimeoutProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  const [state, setState] = useState<TimeoutState>({
    open: false,
    actionKey: "restore",
    onRetry: undefined,
  });

  const showTimeout = useCallback((params: { actionKey: TimeoutActionKey; onRetry?: () => void }) => {
    setState({
      open: true,
      actionKey: params.actionKey,
      onRetry: params.onRetry,
    });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false, onRetry: undefined }));
  }, []);

  const handleRetry = useCallback(() => {
    state.onRetry?.();
    close();
  }, [state.onRetry, close]);

  const actionLabel = t(actionKeyToTKey[state.actionKey]);
  const suffix = t("timeout.suffix");
  const message = `${actionLabel} ${suffix}`;

  return (
    <TimeoutContext.Provider value={{ showTimeout }}>
      <Modal
        open={state.open}
        onClose={close}
        titleId="timeout-modal-title"
        showCloseButton={true}
        closeOnBackdrop={true}
        maxWidth="max-w-sm"
      >
        <div className="pt-8 pb-6 px-6 bg-warm-50">
          <h2 id="timeout-modal-title" className="font-serif text-xl font-bold text-warm-800 mb-3">
            {message}
          </h2>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={close}
              className="rounded-xl border border-warm-300 bg-white hover:bg-warm-100 text-warm-700 font-medium px-4 py-2.5 transition-colors"
            >
              {t("timeout.close")}
            </button>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl bg-accent hover:bg-accent-muted text-white font-medium px-4 py-2.5 transition-colors"
            >
              {t("timeout.retry")}
            </button>
          </div>
        </div>
      </Modal>
      {children}
    </TimeoutContext.Provider>
  );
}
