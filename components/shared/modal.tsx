"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const BACKDROP_CLASS = "absolute inset-0 bg-black/60 backdrop-blur-sm";

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  /** 弹窗标题，用于 aria-labelledby / 无障碍 */
  titleId?: string;
  /** 是否显示右上角关闭按钮，默认 true */
  showCloseButton?: boolean;
  /** 点击遮罩是否关闭，默认 true */
  closeOnBackdrop?: boolean;
  /** 卡片最大宽度，如 "max-w-md"、"max-w-lg" */
  maxWidth?: string;
  /** 无卡片样式，仅居中内容（用于全屏加载等） */
  noCard?: boolean;
  /** 层级，默认 60；全屏加载建议 70 */
  zIndex?: number;
};

export function Modal({
  open,
  onClose,
  children,
  titleId,
  showCloseButton = true,
  closeOnBackdrop = true,
  maxWidth = "max-w-sm",
  noCard = false,
  zIndex = 60,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  if (!open) return null;

  const cardWidthClass = noCard ? "" : maxWidth;

  const content = (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId ?? undefined}
    >
      {/* 半透明黑色遮罩，覆盖整页 */}
      <div
        className={BACKDROP_CLASS}
        onClick={closeOnBackdrop && onClose ? onClose : undefined}
        aria-hidden="true"
      />
      {/* 弹窗内容：作为 flex 子元素由 flexbox 水平垂直居中，避免 transform 偏差 */}
      <div className="relative mx-4 my-4 w-full shrink-0" style={{ maxWidth: noCard ? "none" : "24rem" }}>
        <div
          className={
            noCard
              ? "flex flex-col items-center justify-center"
              : `relative w-full rounded-2xl border border-warm-300 bg-warm-50 shadow-2xl ${cardWidthClass}`
          }
        >
          {!noCard && showCloseButton && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-warm-400 hover:bg-warm-200 hover:text-warm-700 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  if (mounted && typeof document !== "undefined") {
    return createPortal(content, document.body);
  }
  return content;
}
