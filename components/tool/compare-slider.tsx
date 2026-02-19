"use client";

import { useState, useRef, useCallback } from "react";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPosition(x);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons !== 1) return;
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div className="rounded-2xl bg-white border border-warm-300 shadow-sm overflow-hidden">
      <div className="flex justify-between px-4 py-2.5 text-sm text-warm-400 border-b border-warm-200">
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>
      <div
        ref={containerRef}
        className="relative aspect-video max-h-96 bg-warm-100 select-none touch-none"
      >
        <div className="absolute inset-0">
          <img src={afterSrc} alt={afterLabel} className="w-full h-full object-contain" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={beforeSrc} alt={beforeLabel} className="w-full h-full object-contain" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-accent shadow-lg cursor-ew-resize"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md border border-warm-300">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
