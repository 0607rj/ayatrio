import { useState, useEffect} from 'react';

function getNavbarHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--navbar-height');
  return parseInt(raw || '86', 10) || 86;
}

export function useSectionObserver(sectionRefs: React.RefObject<HTMLDivElement | null>[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const navbarHeight = getNavbarHeight();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: [0, 0.4, 0.6, 1],
          rootMargin: `-${navbarHeight}px 0px -40% 0px`,
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionRefs]);

  return activeIndex;
}
