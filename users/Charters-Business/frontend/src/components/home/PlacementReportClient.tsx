"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import useInViewPlay from "@/components/micro/useInViewPlay";
import Placement_TrustedCompanies from "./Placement_TrustedCompanies";

const SalaryGrowthChart = dynamic(
  () => import("../animations/SalaryGrowthChart"),
  { ssr: false }
);
const SalaryBarsChart = dynamic(
  () => import("../animations/SalaryBarsChart"),
  { ssr: false }
);
const RecruiterProgressBars = dynamic(
  () => import("../animations/RecruiterProgressBars"),
  { ssr: false }
);

interface PlacementReportClientProps {
  stats: {
    salaryJump: number;
    highestSalary: number;
    recruiters: number;
  };
  verification: {
    by: string;
    verified: boolean;
  };
}

const SkeletonCard = () => (
  <div className="flex-1 flex flex-col justify-center items-center animate-pulse">
    <div className="w-full h-32 bg-gray-100 rounded mb-4"></div>
    <div className="h-6 w-24 bg-gray-100 rounded mb-2"></div>
    <div className="h-4 w-32 bg-gray-100 rounded"></div>
  </div>
);

const PlacementReportClient: React.FC<PlacementReportClientProps> = ({
  stats,
  verification,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInViewPlay(sectionRef, "200px", 0.1);

  useEffect(() => {
    if (!inView) return;
    setShouldMount(true);
    setIsVisible(true);
  }, [inView]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/home/Capdsdsfture.JPG"; 
    link.download = "placement-report.JPG";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full border-t border-gray-200"></div>

      <div className="md:border-x border-gray-200 max-w-[85rem] w-full">
        <div
          ref={sectionRef}
          className="pb-4"
          role="region"
          aria-labelledby="statistics-heading"
        >
          <h3 id="statistics-heading" className="sr-only">
            Placement Statistics Overview
          </h3>

          {/* ── MOBILE: horizontal scroll ── */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-none px-4">
            <div className="flex pb-2" style={{ width: "max-content" }}>

              {/* Card 1 */}
              <article
                className="bg-white border-l-1 border-r-1 border-b-1 border-gray-200 p-4 flex flex-col"
                style={{ width: "82vw", minHeight: "300px" }}
              >
                {shouldMount ? (
                  <SalaryGrowthChart isHovered={isVisible} value={stats.salaryJump} />
                ) : (
                  <SkeletonCard />
                )}
              </article>

              {/* Card 2 */}
              <article
                className="bg-white border-l-1 border-r-1 border-b-1 border-gray-200 p-4 flex flex-col"
                style={{ width: "82vw", minHeight: "300px" }}
              >
                {shouldMount ? (
                  <SalaryBarsChart isHovered={isVisible} value={stats.highestSalary} />
                ) : (
                  <SkeletonCard />
                )}
              </article>

              {/* Card 3 — intentionally slightly cut off to hint scrollability */}
              <article
                className="bg-white border-l-1 border-r-1 border-b-1 border-gray-200 p-4 flex flex-col"
                style={{ width: "82vw", minHeight: "300px" }}
              >
                {shouldMount ? (
                  <RecruiterProgressBars isHovered={isVisible} value={stats.recruiters} />
                ) : (
                  <SkeletonCard />
                )}
              </article>

            </div>
          </div>

          {/* ── DESKTOP: original grid ── */}
          <div className="hidden md:block w-full">
            <div className="w-full h-full border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-gray-200">
              <article className="bg-white p-3 sm:p-4 flex flex-col min-h-[280px] sm:min-h-[320px] rounded-t-xl hover:shadow-sm transition-shadow">
                {shouldMount ? (
                  <SalaryGrowthChart isHovered={isVisible} value={stats.salaryJump} />
                ) : <SkeletonCard />}
              </article>
              <article className="bg-white p-3 sm:p-4 flex flex-col min-h-[280px] sm:min-h-[320px] rounded-t-xl hover:shadow-sm transition-shadow">
                {shouldMount ? (
                  <SalaryBarsChart isHovered={isVisible} value={stats.highestSalary} />
                ) : <SkeletonCard />}
              </article>
              <article className="bg-white p-3 sm:p-4 flex flex-col min-h-[280px] sm:min-h-[320px] rounded-t-xl hover:shadow-sm transition-shadow">
                {shouldMount ? (
                  <RecruiterProgressBars isHovered={isVisible} value={stats.recruiters} />
                ) : <SkeletonCard />}
              </article>
            </div>
          </div>

        </div>

        <Placement_TrustedCompanies />
        <div
          className="px-4 sm:px-6 lg:px-8 text-center border-b border-gray-200"
          role="region"
          aria-labelledby="download-section-heading"
        >
          <div className="mx-auto flex flex-col md:flex-row items-center justify-between py-4">
            <div className="w-full md:w-3/4 text-center md:text-left flex flex-col text-gray-800">
              <h3 id="download-section-heading" className="leading-snug">
                Proven track record of outcomes{" "}
                {verification.verified && (
                  <span className="inline-flex items-center gap-1">
                    verified by
                    <Image
                      src="/home/charters-adit-partners.avif"
                      alt="Verification logo"
                      width={104}
                      height={24}
                      sizes="(min-width: 768px) 104px, 87px"
                      className="w-auto h-7 md:h-7 inline-block object-contain"
                    />
                  </span>
                )}{" "}
                through our programs
              </h3>
              <p className="text-[10px] md:text-[11px] text-gray-600 mt-1 px-2 md:px-0">
                Source: *(a)¹Charter Career Center and Past outcomes are not
                indicative of future placements for subsequent cohorts.
              </p>
            </div>
            <div className="w-full md:w-1/4 mt-6 md:mt-0 flex justify-center md:justify-end">
              <button
                onClick={handleDownload}
                className="bg-black rounded-full text-sm text-white px-8 py-2.5 font-semibold flex items-center gap-2 hover:bg-gray-900 transition-colors"
                aria-label="Download the complete placement report PDF"
              >
                Placement Report
                <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PlacementReportClient);
