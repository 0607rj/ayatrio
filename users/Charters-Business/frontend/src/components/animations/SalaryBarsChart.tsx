"use client";
import React, { useEffect, useState, useMemo } from "react";

interface SalaryBarsChartProps {
  isHovered: boolean;
  value: number;
}

const SalaryBarsChart: React.FC<SalaryBarsChartProps> = ({
  isHovered,
  value,
}) => {
  const [animatedBars, setAnimatedBars] = useState<{ [key: number]: number }>(
    {},
  );
  const [visibleLabels, setVisibleLabels] = useState<{
    [key: number]: boolean;
  }>({});

  const salaryData = useMemo(
    () => [
      {
        value: "₹5.66 Lakhs",
        label: "Domestic Average CTC",
        label_sub: "72% Placed Indian StartUp's",
        height: 90,
        color: "#E87D1E",
        hasPattern: true,
      },
      {
        value: "₹8.52 Lakhs",
        label: "Top 25% Average CTC",
        label_sub: "25% Placd Gulf & Asian MNCs",
        height: 140,
        color: "#B30437",
        hasPattern: true,
      },
      {
        value: `₹${value.toFixed(2)} Lakhs`,
        label: "Highest CTC",
        label_sub: "3% Placed USA MNCs",
        height: 180,
        color: "#6578b4",
        hasPattern: true,
      },
    ],
    [value],
  );

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const animationFrameIds: number[] = [];

    if (isHovered) {
      salaryData.forEach((item, index) => {
        // Show label with stagger
        const showTimeout = setTimeout(() => {
          setVisibleLabels((prev) => ({ ...prev, [index]: true }));
        }, index * 200);
        timeouts.push(showTimeout);

        // Animate bar with stagger
        const animateTimeout = setTimeout(
          () => {
            const startTime = Date.now();
            const duration = 1200;

            const animateBar = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = 1 - Math.pow(1 - progress, 3);

              setAnimatedBars((prev) => ({
                ...prev,
                [index]: item.height * easedProgress,
              }));

              if (progress < 1) {
                const frameId = requestAnimationFrame(animateBar);
                animationFrameIds.push(frameId);
              }
            };

            const frameId = requestAnimationFrame(animateBar);
            animationFrameIds.push(frameId);
          },
          500 + index * 300,
        );
        timeouts.push(animateTimeout);
      });
    } else {
      setAnimatedBars({});
      setVisibleLabels({});
    }

    // Cleanup
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      animationFrameIds.forEach((frameId) => cancelAnimationFrame(frameId));
    };
  }, [isHovered, salaryData]);

  const chartHeight = 200;
  const labelHeight = 34;

  return (
    <div className="flex flex-col h-full">
      {/* Heading */}
      <div className="mb-4 flex-shrink-0">
        <h4 className="flex flex-row" >
          <p className="text-3xl font-bold">{value.toFixed(2)} Lakhs</p>  <span className="pl-[5px] pt-[15px] text-[10px]"> | Growth 39% </span>
        </h4>
        <p className="text-sm text-gray-600">Highest CTC In Aug/25 Cohort</p>
      </div>

      {/* Chart  */}
      <div className="flex-1 flex flex-col justify-end bg-white text-black">
        {/* Bars Container */}
        <div className="flex items-end w-full" style={{ height: chartHeight }}>
          {salaryData.map((item, index) => {
            const h = Math.min(chartHeight, animatedBars[index] || 0);
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end"
                style={{ height: chartHeight }}
              >
                {/* Value label above bar */}
                <div
                  className="text-center text-black font-bold text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] leading-tight transition-all duration-800 ease-out mb-4"
                  style={{
                    opacity: visibleLabels[index] ? 1 : 0,
                    transform: `translateY(${visibleLabels[index] ? 0 : -10
                      }px)`,
                  }}
                >
                  {item.value}{" "}
                  <p className="text-gray-400 px-[15px] leading-tight font-normal text-[10px] text-center">
                    {" "}
                    {item.label}{" "}
                  </p>
                </div>

                {/* Bar */}
                <div className="relative w-full">
                  {/* Baseline */}
                  <div
                    className="absolute left-0 right-0 bottom-0"
                    style={{ height: 2, background: "rgba(232,125,30, 0.8)" }}
                  />

                  {/* Bar body */}
                  <div
                    className="relative w-full p-0"
                    style={{
                      height: `${h}px`,
                      backgroundColor: item.color,
                      borderTop: "1px solid rgb(0, 0, 0)",
                      borderRight: "1px solid rgba(0, 0, 0, 0.2)",
                      borderLeft: "1px solid rgb(0, 0, 0)",
                      boxShadow: "inset 0 0 7px rgba(0, 0, 0, 0.2)",
                      transition: "height 300ms linear",
                    }}
                    role="img"
                    aria-label={`${item.label} bar`}
                  >
                    {/* Pattern */}
                    {item.hasPattern && (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0, 0, 0, 0.2) 4px, rgba(0, 0, 0, 0.2) 6px)",
                          opacity: h > 50 ? 1 : 0,
                          transition: "opacity 200ms ease-out",
                        }}
                      />
                    )}
                    {/* Bevel top */}
                    <div
                      className="absolute -top-[20.5px] left-0 right-0 h-5"
                      style={{
                        backgroundColor: item.color,
                        clipPath:
                          "polygon(18% 51%, 74% 50%, 100% 100%, 0% 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Labels Container  */}
        <div
          className="flex w-full"
          style={{ height: labelHeight, marginTop: 8 }}
        >
          {salaryData.map((item, index) => (
            <div
              key={index}
              className="flex-1 flex items-start justify-center transition-all duration-500 ease-out"
              style={{
                opacity: visibleLabels[index] ? 1 : 0,
                transform: `translateY(${visibleLabels[index] ? 0 : 10}px)`,
              }}
            >
              <div className="text-gray-400 text-[10px] text-center">
                {item.label_sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalaryBarsChart;
