import React from "react";
import PlacementReportClient from "./PlacementReportClient";

const placementReportData = {
  title: "Charter's Career Transition '24",
  description:
    "Top roles, disruptive startups | industry-leading firms | From graduation to career success",
  stats: {
    salaryJump: 3.05,
    highestSalary: 12.3,
    recruiters: 3120,
  },
  verification: {
    by: "B2K Analytics",
    verified: true,
  },
};

const PlacementReportDashboard = () => {
  return (
    <section
      className="mx-[0%] border-gray-300 bg-white text-black relative overflow-hidden"
      aria-labelledby="placement-report-heading"
    >
      {/* Report Header */}
      <div
        className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[4rem] sm:pt-14"
        role="region"
        aria-labelledby="placement-report-heading"
      >
        <div className="w-full mx-auto text-center px-4 sm:px-0">
          <div>
            <p
              className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3"
              role="text"
            >
              PLACEMENT REPORT
            </p>
            <h2
              id="placement-report-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              {placementReportData.title}
            </h2>
          </div>

          <div className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:justify-center sm:items-center gap-3 sm:gap-6 w-fit mx-auto sm:w-full">
            {placementReportData.description
              .split("|")
              .map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src="/dot-icon.svg"
                    alt=""
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base text-gray-700 font-medium leading-snug whitespace-nowrap">
                    {item.trim()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1 bg-gray-200 h-13 hidden md:block">
          <div className="flex-1 bg-white rounded-br-xl h-13 hidden md:block"></div>

        </div>

        <div className="hidden md:block md:w-[90%] max-w-[85rem] h-13 bg-gray-200 relative">
          <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-gray-50 to-gray-200"></div>
          <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-gray-50 to-gray-200"></div>
          <div className="flex-1 bg-white rounded-bl-xl rounded-br-xl h-13 hidden md:block"></div>
        </div>

        <div className="flex-1 bg-gray-200 h-13 hidden md:block">
          <div className="flex-1 bg-white rounded-bl-xl h-13 hidden md:block"></div>
        </div>
      </div>

      <div className="flex flex-row w-full">
        <div className="flex-1 bg-gray-200 hidden md:block">
          <div className="relative bg-white w-full h-full rounded-tr-xl">
            <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-gray-50 to-gray-200 rounded-tr-xl"></div>
          </div>
        </div>

        {/* Main client component */}
        <div className="md:w-[90%] max-w-[85rem] w-full">
          <PlacementReportClient
            stats={placementReportData.stats}
            verification={placementReportData.verification}
          />
        </div>
        <div className="flex-1 bg-gray-200 hidden md:block">
          <div className="relative bg-white w-full h-full rounded-tl-xl">
            <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-l from-gray-50 to-gray-200 rounded-tr-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementReportDashboard;