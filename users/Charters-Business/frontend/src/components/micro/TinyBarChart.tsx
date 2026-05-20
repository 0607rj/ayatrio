"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  memo,
} from "react";
import useInViewPlay from "@/components/micro/useInViewPlay";

export type TinyBar = { label: string | number; value: number; active?: boolean };

function TinyBarChart({
  bars = [
    { label: 18, value: 28 },
    { label: 20, value: 48 },
    { label: 22, value: 60 },
    { label: 35, value: 85, active: true },
    { label: 15, value: 36 },
  ],
  barWidth = 20,
  gap = 14,
  durationMs = 700,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  play = false,
  replayOnHide = true,
}: {
  bars?: TinyBar[];
  barWidth?: number;
  gap?: number;
  durationMs?: number;
  easing?: string;
  play?: boolean;
  replayOnHide?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // detect when visible
  const inView = useInViewPlay(containerRef, "200px", 0.1);

  const [containerHeight, setContainerHeight] = useState(112);

  const [heights, setHeights] = useState<number[]>(bars.map(() => 0));

  // observe container height
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame: number;

    const updateHeight = () => {
      frame = requestAnimationFrame(() => {
        const height = container.offsetHeight;
        setContainerHeight(height);
      });
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const maxValue = useMemo(() => Math.max(1, ...bars.map((b) => b.value)), [bars]);

  const scaledTargets = useMemo(
    () => bars.map((b) => Math.max(8, Math.min(100, (b.value / maxValue) * 100))),
    [bars, maxValue]
  );

  useEffect(() => {
    setHeights(bars.map(() => 0));
  }, [bars.length]);

  useEffect(() => {
    if (!inView) return;

    if (play || inView) {
      setHeights(bars.map(() => 0));

      const t = setTimeout(() => {
        setHeights(scaledTargets);
      }, 30);

      return () => clearTimeout(t);
    } else if (replayOnHide) {
      setHeights(bars.map(() => 0));
    }
  }, [play, replayOnHide, scaledTargets, bars, inView]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <div className="border border-white/10 bg-[#121214] px-2 sm:px-3 py-2 sm:py-3 h-full flex flex-col">
        <div
          className="flex items-end justify-between flex-1"
          style={{ columnGap: gap }}
          role="img"
          aria-label="Bar chart"
        >
          {bars.map((b, i) => {
            const h = heights[i] ?? 0;

            return (
              <div
                key={i}
                className="flex flex-col items-center flex-1 h-full justify-end"
              >
                <div
                  className={`${b.active ? "bg-[#B30437]" : "bg-white/15"}`}
                  style={{
                    width: barWidth,
                    height: `${h}%`,
                    transition: `height ${durationMs}ms ${easing}`,
                    willChange: "height",
                  }}
                  aria-label={`${b.label}: ${Math.round(
                    (b.value / maxValue) * 100
                  )}% of max`}
                />
                <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] text-white/60">
                  {b.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(TinyBarChart);