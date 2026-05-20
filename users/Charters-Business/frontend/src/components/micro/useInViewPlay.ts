"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

export default function useInViewPlay(
  ref: RefObject<HTMLElement | null>,
  rootMargin: string = "0px",
  threshold: number = 0.25
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          hasTriggered = true;
          setInView(true);
          observer.unobserve(node);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return inView;
}