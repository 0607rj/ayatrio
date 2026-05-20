"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
} from "react";
import type { FC } from "react";
import useInViewPlay from "@/components/micro/useInViewPlay";

interface CounterAnimationProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  itemProp?: string;
  "data-stat-type"?: string;
  "data-category"?: string;
}

const CounterAnimation: FC<CounterAnimationProps> = ({
  from,
  to,
  duration = 2,
  suffix = "",
  decimals = 0,
  className = "",
  itemProp,
  ...dataProps
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewPlay(ref, "200px", 0.1);

  const [displayValue, setDisplayValue] = useState(
    from.toFixed(decimals) + suffix
  );
  const [isVisible, setIsVisible] = useState(false);

  const rafRef = useRef<number | null>(null);

  const animateCounter = useCallback(() => {
    const startTime = performance.now();
    const startValue = from;
    const endValue = to;
    const animationDuration = duration * 1000;

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue =
        startValue + (endValue - startValue) * easedProgress;

      if (suffix === "x") {
        setDisplayValue(
          (Math.round(currentValue * 100) / 100).toFixed(2) + suffix
        );
      } else if (decimals > 0) {
        setDisplayValue(currentValue.toFixed(decimals) + suffix);
      } else {
        setDisplayValue(Math.round(currentValue).toString() + suffix);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(updateCounter);
      }
    };

    rafRef.current = requestAnimationFrame(updateCounter);
  }, [from, to, duration, suffix, decimals]);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      animateCounter();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [inView, animateCounter]);

  return (
    <span
      ref={ref}
      className={`${className} ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      itemProp={itemProp}
      {...dataProps}
      style={{
        transform: isVisible ? "scale(1)" : "scale(0.8)",
        transition: "all 0.5s ease-out",
        willChange: "transform, opacity",
      }}
    >
      {displayValue}
    </span>
  );
};

export default memo(CounterAnimation);