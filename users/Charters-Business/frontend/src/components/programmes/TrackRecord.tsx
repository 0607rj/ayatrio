'use client';
import { useRef, useEffect, useState } from 'react';
import React from "react";
import { TrackRecordData } from "@/data/programmes";
import HighlightText from "../shared/HighlightObserver";

// when 20% of element scrolls into view
function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function useCountUp(end: number, duration: number, active: boolean, delay: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let rafId: number;
    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [active]);
  return count;
}

interface BarItem { value: number; percentage: string; label: string; }

function ExperienceBar({ item, index, maxValue, inView }: {
  item: BarItem; index: number; maxValue: number; inView: boolean;
}) {
  const numericEnd = parseInt(item.percentage.replace(/\D/g, ''), 10) || 0;
  const suffix = item.percentage.replace(/[0-9]/g, '');
  const delay = index * 100;
  const count = useCountUp(numericEnd, 1000, inView, delay);

  return (
    <div className="flex flex-col items-center justify-end flex-1 h-full min-w-0">
      <div className="text-[10px] sm:text-xs md:text-base font-semibold text-black mb-1 sm:mb-2">
        {count}{suffix}
      </div>
      <div
        className="w-full bg-[#C4A574]"
        style={{
          height: `${(item.value / maxValue) * 100}%`,
          transformOrigin: 'bottom',
          animationName: inView ? 'growUp' : 'none',
          animationDuration: '1s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'both',
          animationDelay: `${delay}ms`,
        }}
      />
      <div className="text-[8px] sm:text-[10px] md:text-sm text-[#5f6368] mt-1 sm:mt-2 md:mt-3 text-center font-medium leading-tight w-full min-w-[56px]">
        {item.label}
      </div>
    </div>
  );
}

function BackgroundBarVertical({ item, index, maxValue, inView }: {
  item: BarItem; index: number; maxValue: number; inView: boolean;
}) {
  const numericEnd = parseInt(item.percentage.replace(/\D/g, ''), 10) || 0;
  const suffix = item.percentage.replace(/[0-9]/g, '');
  const delay = index * 100;
  const count = useCountUp(numericEnd, 600, inView, delay);

  return (
    <div className="flex flex-col items-center justify-end flex-1 h-full min-w-0">
      <div className="text-base font-semibold text-black mb-2">
        {count}{suffix}
      </div>
      <div
        className="w-full bg-[#C4A574]"
        style={{
          height: `${(item.value / maxValue) * 100}%`,
          transformOrigin: 'bottom',
          animationName: inView ? 'growUp' : 'none',
          animationDuration: '1s',
          animationTimingFunction: 'ease-out',
          animationFillMode: 'both',
          animationDelay: `${delay}ms`,
        }}
      />
      <div className="text-[10px] text-gray-800 mt-3 text-center font-medium leading-tight w-full overflow-hidden truncate px-0.5">
        {item.label}
      </div>
    </div>
  );
}

function BackgroundBarHorizontal({ item, index, maxValue, inView }: {
  item: BarItem; index: number; maxValue: number; inView: boolean;
}) {
  const numericEnd = parseInt(item.percentage.replace(/\D/g, ''), 10) || 0;
  const suffix = item.percentage.replace(/[0-9]/g, '');
  const delay = index * 100;
  const count = useCountUp(numericEnd, 600, inView, delay);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="text-[10px] sm:text-xs md:text-sm text-gray-800 font-medium w-[80px] sm:w-[100px] md:w-[120px] flex-shrink-0 leading-tight">
        {item.label}
      </div>
      <div className="flex-1 flex items-center gap-2 sm:gap-3">
        <div
          className="h-5 sm:h-6 md:h-8 bg-[#C4A574] min-w-[4px]"
          style={{
            width: `${(item.value / maxValue) * 100}%`,
            transformOrigin: 'left',
            animationName: inView ? 'growRight' : 'none',
            animationDuration: '1s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
            animationDelay: `${delay}ms`,
          }}

        />
        <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-black flex-shrink-0 min-w-[28px] sm:min-w-[36px] md:min-w-[40px]">
          {count}{suffix}
        </div>
      </div>
    </div>
  );
}


interface TrackRecordProps { data: TrackRecordData; }

const TrackRecord: React.FC<TrackRecordProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef);

  return (
    <div className="bg-white py-4 sm:py-6 md:py-8">
      <style>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes growRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="mx-auto max-w-[85rem]">

        {/*Track Record Header*/}
        <div aria-labelledby="track-record-heading">
          <div className="text-center mb-8 sm:mb-12 mt-2 sm:mt-3">
            <h2
              id="track-record-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-black mb-4 sm:mb-6"
            >
              A Proven{" "}
              <HighlightText className="font-medium">track record</HighlightText>
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:flex md:flex-nowrap md:justify-between md:items-center pb-6 border-b border-gray-200">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center px-4 sm:px-6 py-3 md:py-0 md:flex-1
                  ${index % 2 === 0 && index !== data.stats.length - 1 ? 'border-r border-gray-200' : ''}
                  ${index < data.stats.length - 2 ? 'border-b border-gray-200 md:border-b-0' : ''}
                  ${index > 0 ? 'md:border-l md:border-gray-200' : ''}
                `}
              >
                <div className="text-xl sm:text-2xl lg:text-5xl font-light text-black mb-1 sm:mb-2 whitespace-nowrap">
                  {stat.value}
                  <span className="text-lg sm:text-2xl lg:text-4xl">{stat.unit}</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Diversity Charts ── */}
        <div
          ref={chartRef}
          className="mb-4 sm:mb-6 border-b border-gray-200"
          aria-labelledby="diversity-heading"
        >
          <h3 id="diversity-heading" className="sr-only">Student Diversity Statistics</h3>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 lg:divide-x lg:divide-gray-200 lg:items-stretch">

            {/* Chart Work Experience */}
            <div className="w-full lg:flex-[1.2] flex flex-col lg:pr-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#5f6368] mb-4 sm:mb-6 text-left">
                Our Young Charter's around the world
              </h3>
              <div className="h-32 sm:h-40 lg:h-48 flex items-end justify-between gap-1 sm:gap-2 md:gap-4">
                {data.experienceData.map((item, index) => {
                  const maxValue = Math.max(...data.experienceData.map((d) => d.value));
                  return (
                    <ExperienceBar
                      key={index}
                      item={item}
                      index={index}
                      maxValue={maxValue}
                      inView={inView}
                    />
                  );
                })}
              </div>
            </div>

            {/* Chart Background Distribution */}
            <div className="w-full lg:flex-[2.8] flex flex-col lg:pl-3 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#5f6368] mb-4 sm:mb-6 text-left">
                Young Charter's jobs various sectors
              </h3>

              {/* Mobile: Horizontal bars */}
              <div className="lg:hidden flex flex-col gap-2 sm:gap-3 md:gap-4">
                {data.backgroundData.map((item, index) => {
                  const maxValue = Math.max(...data.backgroundData.map((d) => d.value));
                  return (
                    <BackgroundBarHorizontal
                      key={index}
                      item={item}
                      index={index}
                      maxValue={maxValue}
                      inView={inView}
                    />
                  );
                })}
              </div>

              {/* Desktop: Vertical bars */}
              <div className="hidden lg:flex h-48 items-end justify-between gap-1">
                {data.backgroundData.map((item, index) => {
                  const maxValue = Math.max(...data.backgroundData.map((d) => d.value));
                  return (
                    <BackgroundBarVertical
                      key={index}
                      item={item}
                      index={index}
                      maxValue={maxValue}
                      inView={inView}
                    />
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Career Impact Cards ── */}
        <div className="mb-4 sm:mb-6 text-center" aria-labelledby="career-impact-heading">
          <div className="flex flex-col sm:flex-row sm:flex-wrap">
            {data.impactCards.map((card, index) => (
              <div
                key={index}
                className="bg-[#F8F9FA] p-4 sm:p-6 lg:p-8 transition-all duration-300 w-full sm:flex-1 sm:min-w-[260px] md:min-w-[300px] border-r border-b border-t border-gray-200"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black mb-2 sm:mb-4 text-left">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed line-clamp-3 text-left">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Company Logos ── */}
        <div className="text-center" aria-labelledby="companies-heading">
          <div className="flex flex-wrap gap-3 sm:gap-5 md:gap-6 lg:gap-8 justify-center items-center">
            {data.companyLogos.map((company) => (
              <div key={company.name} className="flex items-center justify-center h-8 sm:h-12 md:h-14 lg:h-16">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-6 sm:h-8 md:h-10 lg:h-12 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&size=120`;
                  }}
                />
                <span className="sr-only">{company.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackRecord;