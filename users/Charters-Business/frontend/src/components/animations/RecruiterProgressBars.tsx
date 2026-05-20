"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  memo,
} from "react";
import useInViewPlay from "@/components/micro/useInViewPlay";

interface RecruiterProgressBarsProps {
  isHovered: boolean;
  value: number;
}

const RecruiterProgressBars: React.FC<RecruiterProgressBarsProps> = ({
  isHovered,
  value,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInViewPlay(containerRef, "200px", 0.1);

  const [animatedBars, setAnimatedBars] = useState<{ [key: string]: number }>({});
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});

  const recruiterData = useMemo(
    () => [
      { year: "2025", value: 1523, label: "Recruiters" },
      { year: "2024", value: 677, label: "Recruiters" },
      { year: "2023", value: 143, label: "Recruiters" },
    ],
    [value],
  );

  const scaleInfo = useMemo(() => {
    const maxValue = Math.max(...recruiterData.map((item) => item.value));
    const roundedMax = Math.ceil(maxValue / 50) * 50;
    const increment = roundedMax / 4;
    return {
      maxValue: roundedMax,
      markers: Array.from({ length: 5 }, (_, i) => Math.round(i * increment)),
    };
  }, [recruiterData]);

  const getBarPercentage = useCallback(
    (val: number) => (val / scaleInfo.maxValue) * 100,
    [scaleInfo.maxValue],
  );

  useEffect(() => {
    if (!inView || !isHovered) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const animationFrameIds: number[] = [];

    recruiterData.forEach((item, index) => {
      const showTimeout = setTimeout(() => {
        setVisibleItems((prev) => ({ ...prev, [item.year]: true }));
      }, index * 200);
      timeouts.push(showTimeout);

      const animateTimeout = setTimeout(() => {
        const startTime = performance.now();
        const duration = 1500;
        const targetPercentage = getBarPercentage(item.value);

        const animateBar = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          setAnimatedBars((prev) => ({
            ...prev,
            [item.year]: targetPercentage * easedProgress,
          }));

          if (progress < 1) {
            const frameId = requestAnimationFrame(animateBar);
            animationFrameIds.push(frameId);
          }
        };

        const frameId = requestAnimationFrame(animateBar);
        animationFrameIds.push(frameId);
      }, 500 + index * 300);
      timeouts.push(animateTimeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      animationFrameIds.forEach(cancelAnimationFrame);
    };
  }, [inView, isHovered, recruiterData, getBarPercentage]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white flex flex-col justify-between gap-1 px-1 sm:px-2"
    >
      <div className="mb-4 flex-shrink-0">
        <h4 className="flex flex-row">
          <p className="text-3xl font-bold">+1523 MNCs</p>
          <span className="pl-[5px] pt-[15px] text-[10px]"> | Growth 39% </span>
        </h4>
        <p className="text-sm text-gray-600">
          33% International + 67% Indian Recruiters
        </p>
      </div>

      <div className="flex-1 min-h-0">
        {recruiterData.map((item) => (
          <div
            key={item.year}
            className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3"
            style={{
              /*
                BEFORE: transition: "all 0.6s ease-out"
                `all` captures every CSS property including non-composited ones
                like color, border, font-size — triggering layout recalculation.

                AFTER: explicit opacity + transform only.
                Both are GPU-composited and never touch the layout engine.
                Removed willChange — premature promotion wastes GPU layers.
              */
              opacity: visibleItems[item.year] ? 1 : 0,
              transform: `translateX(${visibleItems[item.year] ? 0 : -50}px)`,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-gray-400 font-light w-6 sm:w-7 text-right flex-shrink-0">
              {item.year}
            </span>

            <div
              className="flex-1 bg-transparent h-8 sm:h-12 md:h-14 relative border-l min-w-0 flex items-center"
              role="progressbar"
              aria-valuenow={item.value}
              aria-valuemax={scaleInfo.maxValue}
              aria-label={`${item.year} recruiters`}
            >
              <div
                className="bg-[#F3D8C5] h-8 sm:h-10 md:h-12 transition-[width] duration-1000 ease-out"
                style={{
                  width: `${animatedBars[item.year] || 0}%`,
                  clipPath: "polygon(0 80%, 81% 81%, 100% 100%, 0% 100%)",
                  maxWidth: "100%",
                }}
              />
              <div
                className="absolute bottom-0 left-0 h-1"
                style={{
                  width: `${animatedBars[item.year] || 0}%`,
                  background: "#B30437",
                  maxWidth: "100%",
                }}
              />
            </div>

            <span
              className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] font-medium text-black min-w-[1.2rem] sm:min-w-[1.5rem] text-right flex-shrink-0"
              data-stat-type="count"
              data-year={item.year}
              style={{
                /*
                  Same fix as the row container above — explicit properties only.
                  Removed willChange for the same reason.
                */
                opacity:
                  animatedBars[item.year] > getBarPercentage(item.value) * 0.9
                    ? 1
                    : 0,
                transform: `scale(${
                  animatedBars[item.year] > getBarPercentage(item.value) * 0.9
                    ? 1
                    : 0.8
                })`,
                transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
              }}
            >
              {item.value}
            </span>

            <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] text-gray-400 w-8 sm:w-9 md:w-10 font-light truncate flex-shrink-0">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 border-t border-gray-800 pt-2 flex-shrink-0">
        <div
          className="flex justify-between text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-gray-500 mb-1 ml-7 sm:ml-9 pr-8 sm:pr-9 md:pr-10"
          role="img"
          aria-label="Scale markers"
        >
          {scaleInfo.markers.map((marker, index) => (
            <span key={index} className="flex-shrink-0">{marker}</span>
          ))}
        </div>
        <div className="text-center text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-gray-500">
          No. of Recruiters
        </div>
      </div>
    </div>
  );
};

export default memo(RecruiterProgressBars);
