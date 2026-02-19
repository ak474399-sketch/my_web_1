"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PULL_THRESHOLD = 70;
const MAX_PULL = 100;

type Props = { children: React.ReactNode };

/**
 * When user is at the top of the page and pulls down (touch or mouse), refreshes the page.
 * Only active on first screen (scrollY ~ 0).
 */
export function PullToRefresh({ children }: Props) {
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);
  const isTouch = useRef(false);
  const pullYRef = useRef(0);

  const atTop = useCallback(() => typeof window !== "undefined" && window.scrollY <= 60, []);

  const handleStart = useCallback(
    (clientY: number) => {
      if (!atTop()) return;
      startY.current = clientY;
      isTouch.current = true;
    },
    [atTop]
  );

  const handleMove = useCallback(
    (clientY: number) => {
      if (!isTouch.current) return;
      const delta = clientY - startY.current;
      if (delta > 0 && atTop()) {
        const y = Math.min(delta, MAX_PULL);
        pullYRef.current = y;
        setPullY(y);
      } else {
        pullYRef.current = 0;
        setPullY(0);
      }
    },
    [atTop]
  );

  const handleEnd = useCallback(() => {
    if (pullYRef.current >= PULL_THRESHOLD) {
      window.location.reload();
    }
    pullYRef.current = 0;
    setPullY(0);
    isTouch.current = false;
  }, []);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY);
    const onTouchEnd = () => handleEnd();

    const onMouseDown = (e: MouseEvent) => {
      if (atTop()) {
        startY.current = e.clientY;
        isTouch.current = true;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch.current) handleMove(e.clientY);
    };
    const onMouseUp = () => handleEnd();

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseUp);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseUp);
    };
  }, [handleStart, handleMove, handleEnd, atTop]);

  return (
    <>
      {children}
      {pullY > 0 && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center pointer-events-none transition-opacity"
          style={{
            height: Math.min(pullY, MAX_PULL),
            background: "linear-gradient(to bottom, rgba(253,252,248,0.95), transparent)",
          }}
        >
          <span className="text-warm-500 text-sm mt-2">
            {pullY >= PULL_THRESHOLD ? "Release to refresh" : "Pull down to refresh"}
          </span>
        </div>
      )}
    </>
  );
}
