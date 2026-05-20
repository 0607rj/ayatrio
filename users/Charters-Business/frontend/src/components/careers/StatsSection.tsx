"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// DATA
const SECTION_HEADING = {
  eyebrow: "CAREER OUTCOMES",
  title: "Our Placement Statistics",
  starIcon: "https://files.mastersunion.link/resources/svg/star.svg",
};

const KPI_METRICS = [
  {
    label: "Salary jump from Pre MBA level",
    value: "3.03",
    suffix: "x",
    icon: "https://images.mastersunion.link/uploads/21012025/v1/ArrowUp.svg",
  },
  {
    label: "Total Recruiters",
    value: "145",
    suffix: "+",
    icon: "https://images.mastersunion.link/uploads/21012025/v1/ArrowUp.svg",
  },
];

const PLACEMENT_GRAPHS = [
  {
    src: "https://images.mastersunion.link/uploads/28012025/v1/ylcgraphf.webp",
    alt: "PGP TBM YLC Placement Statistics",
  },
  {
    src: "https://images.mastersunion.link/uploads/23012025/v1/pgpTbmNewPlacement.webp",
    alt: "PGP TBM Placement Statistics",
  },
];

const COHORT_HIGHLIGHT = {
  numbers: ["₹29.12L", "₹33.10L", "₹34.07L"],
  description:
    "First, Second & Third cohorts' average CTC surpassed that of Top B Schools, making us the most valued graduates in India.",
};

const REPORTS = [
  {
    href: "https://cdn.mastersunion.org/assets/img/newmu/placementreporet2021.pdf",
    label: "Cohort 2021",
    img: "https://files.mastersunion.link/resources/img/report.webp",
    arrow: "https://files.mastersunion.link/resources/svg/gradientArow.svg",
  },
  {
    href: "https://cdn.mastersunion.org/assets/img/newmu/placementreport2022.pdf",
    label: "Cohort 2022",
    img: "https://files.mastersunion.link/resources/img/report.webp",
    arrow: "https://files.mastersunion.link/resources/svg/gradientArow.svg",
  },
  {
    href: "https://cdn.mastersunion.org/assets/imgV2/Masters_Union_Placement_Report_Cohort_Of_2023.pdf",
    label: "Cohort 2023",
    img: "https://files.mastersunion.link/resources/img/report.webp",
    arrow: "https://files.mastersunion.link/resources/svg/gradientArow.svg",
  },
  {
    href: "https://new.mastersunion.link/brochures/MasterUnion_Placement_Report_2024.pdf",
    label: "Cohort 2024",
    img: "https://files.mastersunion.link/resources/img/report.webp",
    arrow: "https://files.mastersunion.link/resources/svg/gradientArow.svg",
  },
];

const VERIFICATION_TEXT =
  "These placement reports have been verified & audited by Brickworks Analytics, an auditor for IIM Ahmedabad's placement report.";

const ECONOMICS_ARTICLE = {
  href: "https://economictimes.indiatimes.com/jobs/hr-policies-trends/masters-union-mba-cohort-2024-reports-rs-28-52-lakh-average-salary-top-offers-reach-rs-61-8-lakh/articleshow/115755571.cms?from=mdr",
  label: "Read The Economics Times article here",
};

const YLC_HIGHLIGHT = {
  title: "For PGP TBM YLC",
  numbers: ["₹23.57L", "₹27.17L", "₹27.76L"],
  description: "First, Second & Third cohort's average CTC",
};

const RECRUITER_TABS = [
  {
    id: "consulting",
    label: "Consulting",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-1.webp",
  },
  {
    id: "finance",
    label: "Finance And Fintech",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-2.webp",
  },
  {
    id: "large-tech",
    label: "Large Tech",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-3.webp",
  },
  {
    id: "vc",
    label: "Venture Capital",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-4.webp",
  },
  {
    id: "consumer",
    label: "Consumer Tech",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-5.webp",
  },
  {
    id: "emerging",
    label: "Emerging",
    img: "https://files.mastersunion.link/media/img/ug-recruiter-6.webp",
  },
];

const PGP_TBM_TABLE = [
  {
    cohort: "Cohort '24",
    avg: "28.52 L",
    median: "27.77 L",
    highest: "61.80 L",
    top25: "43.79 L",
    bottom25: "19.30 L",
    middle80: "27.05 L",
  },
  {
    cohort: "Cohort '23",
    avg: "34.07 L",
    median: "32.19 L",
    highest: "57.08 L",
    top25: "44.67 L",
    bottom25: "22.35 L",
    middle80: "34.09 L",
  },
  {
    cohort: "Cohort '22",
    avg: "33.1 L",
    median: "30.92 L",
    highest: "64.15 L",
    top25: "44.52 L",
    bottom25: "20.02 L",
    middle80: "33.73 L",
  },
  {
    cohort: "Cohort '21",
    avg: "29.12 L",
    median: "29.5 L",
    highest: "45 L",
    top25: "41.14 L",
    bottom25: "19.38 L",
    middle80: "28.76 L",
  },
];

const PGP_YLC_TABLE = [
  { cohort: "Cohort '24", avg: "23.59 L", median: "22.69 L", highest: "36 L" },
  { cohort: "Cohort '23", avg: "27.76 L", median: "26 L", highest: "38 L" },
  { cohort: "Cohort '22", avg: "27.17 L", median: "25 L", highest: "42 L" },
  { cohort: "Cohort '21", avg: "23.57 L", median: "24 L", highest: "30 L" },
];

const SALARY_COMPONENTS = {
  title: "Salary Components",
  desktop:
    "https://images.mastersunion.link/uploads/19052025/v1/Group1171279927.webp",
  mobile: "https://files.mastersunion.link/resources/img/ctccomponentmob.webp",
};

const SALARY_DISTRIBUTION = {
  title: "Salary Distribution",
  img: "https://files.mastersunion.link/media/img/pgp-salary-distribution.png",
};

// COMPONENT
export default function StatsSection() {
  const [activeTab, setActiveTab] = useState(RECRUITER_TABS[0].id);

  return (
    <>
      {/*Placement Statistics Header */}
      <section
        id="statistics"
        aria-label="Placement statistics"
        className="w-full border-gray-200 border-b"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-200">

          {/* LEFT — Heading + Left Graph */}
          <div className="flex flex-col">
            {/* Heading */}
            <div className="px-6 sm:px-8 py-4 sm:py-6">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400 mb-2 sm:mb-3 block">
                {SECTION_HEADING.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                {SECTION_HEADING.title}
              </h2>
            </div>

            {/* Left Graph */}
            <div className="flex justify-center items-start p-4 sm:p-6 mt-2 sm:mt-3">
              <Image
                src={PLACEMENT_GRAPHS[0].src}
                alt={PLACEMENT_GRAPHS[0].alt}
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* RIGHT — KPIs + Right Graph */}
          <div className="flex flex-col">
            {/* KPIs */}
            <div className="flex items-stretch divide-x divide-gray-300 px-6 sm:px-8 py-4 sm:py-6">
              {KPI_METRICS.map((kpi, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start justify-start px-6 sm:px-10 first:pl-6"
                >
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm text-gray-600 leading-snug">
                      {kpi.label}
                    </span>
                    <Image
                      src={kpi.icon}
                      alt=""
                      width={14}
                      height={14}
                      className="flex-shrink-0 sm:w-4 sm:h-4"
                    />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-none">
                    {kpi.value}
                    <span style={{ color: "#B30437" }}>{kpi.suffix}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Graph */}
            <div className="flex justify-center items-start p-4 sm:p-6 mt-2 sm:mt-3">
              <Image
                src={PLACEMENT_GRAPHS[1].src}
                alt={PLACEMENT_GRAPHS[1].alt}
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Main Cohort Section */}
      <section className="w-full py-4 sm:py-6 mt-2 sm:mt-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-5">

          {/* Row 1: Big title */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-black leading-snug mb-2 sm:mb-3">
            {COHORT_HIGHLIGHT.numbers.map((num, i) => (
              <span key={i}>
                <span style={{ color: "#B30437" }}>{num}</span>
                {i < COHORT_HIGHLIGHT.numbers.length - 1 && (
                  <span className="text-[#B30437] text-3xl sm:text-4xl md:text-5xl">
                    {i === COHORT_HIGHLIGHT.numbers.length - 2 ? " & " : ", "}
                  </span>
                )}
              </span>
            ))}
          </h3>

          {/* Row 2: Description below title */}
          <p className="text-sm sm:text-base md:text-lg text-black mb-8 sm:mb-12 leading-relaxed">
            {COHORT_HIGHLIGHT.description}
          </p>

          {/* Row 3: Cards left + Verification right */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 sm:gap-12">

            {/* Left: Report Cards */}
            <div className="flex flex-row flex-1">
              {REPORTS.map((rep, i) => (
                <Link
                  key={rep.label}
                  href={rep.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-2 flex-1"
                >
                  <Image
                    src={rep.img}
                    alt={rep.label}
                    width={200}
                    height={130}
                    className={`w-full h-auto object-cover border-l border-t border-b border-gray-700 group-hover:border-gray-400 transition-all ${i === REPORTS.length - 1 ? "border-r" : ""
                      }`}
                  />
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-xs sm:text-sm font-semibold text-black underline underline-offset-2 leading-tight">
                      {rep.label}
                    </p>
                    <Image
                      src={rep.arrow}
                      alt=""
                      width={12}
                      height={12}
                      className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity invert"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Right: Verification text + CTA */}
            <div className="flex flex-col gap-4 lg:max-w-sm xl:max-w-md flex-shrink-0">
              <p className="text-black text-sm sm:text-base leading-relaxed">
                {VERIFICATION_TEXT}
              </p>
              <Link
                href={ECONOMICS_ARTICLE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 sm:px-6 py-1 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm hover:border-gray-400 transition-colors w-fit"
              >
                {ECONOMICS_ARTICLE.label}
                <Image
                  src={REPORTS[0]?.arrow}
                  alt=""
                  width={12}
                  height={12}
                  className="invert"
                />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Our Recruiters */}
      <section className="w-full bg-white mt-6 py-12">
        <div className="mx-auto max-w-7xl ">

          {/* Header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                Placement
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Our Recruiters
            </h3>
          </div>

          {/* Tabs */}
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex justify-start sm:justify-center min-w-max sm:min-w-0 sm:flex-wrap gap-x-1 gap-y-2 px-4 sm:px-5">
              {RECRUITER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition whitespace-nowrap *:${activeTab === tab.id
                    ? "text-black"
                    : "text-black hover:bg-gray-100"
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            {RECRUITER_TABS.map(
              (tab) =>
                activeTab === tab.id && (
                  <Image
                    key={tab.id}
                    src={tab.img}
                    alt={tab.label}
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                )
            )}
          </div>

        </div>
      </section>

      {/* PGP TBM Table */}
      <section className="w-full py-12">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                Placement Statistics
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              PGP TBM
            </h3>
          </div>

          {/* Table — 7 columns so always scrollable on mobile */}
          <div className="overflow-x-auto">
            <table className="w-full text-gray-900 border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Cohort
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Avg. CTC
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Median CTC
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Highest CTC
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Top 25%<br />Avg. CTC
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Bottom 25%<br />Avg. CTC
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-600">
                    Middle 80%<br />Avg. CTC
                  </th>
                </tr>
              </thead>
              <tbody>
                {PGP_TBM_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-700">
                      {row.cohort}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.avg}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.median}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.highest}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.top25}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.bottom25}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-xs sm:text-sm font-semibold">
                      {row.middle80}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <p className="text-xs text-gray-500 mt-4">
            *Please note that the YLC numbers have been taken from the students
            having 0-1 years of experience from PGP TBM Cohort
          </p>

        </div>
      </section>

      {/* PGP TBM YLC Table */}
      < section className="w-full py-12" >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex-col items-center text-center">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                Placement Statistics
              </span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight text-gray-900">
              PGP TBM YLC
            </h3>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full text-gray-900 border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600"></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                    Avg. CTC
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                    Median CTC
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">
                    Highest CTC
                  </th>
                </tr>
              </thead>
              <tbody>
                {PGP_YLC_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">{row.cohort}</td>
                    <td className="py-4 px-4 text-center font-semibold">
                      {row.avg}
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">
                      {row.median}
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">
                      {row.highest}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-4 px-5">
            *Please note that the YLC numbers have been taken from the students
            having 0-1 years of experience from PGP TBM Cohort
          </p>
        </div>
      </section >

      {/* Salary Components + Distribution  */}
      < section className="w-full  py-12" >
        <div className="mx-auto max-w-7xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            {/* Salary Components */}
            <div className="border-r border-b border-t border-gray-200">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6 px-5 pt-2">
                {SALARY_COMPONENTS.title}
              </h3>
              <div className=" p-6 ">
                <Image
                  src={SALARY_COMPONENTS.desktop}
                  alt="Salary Components"
                  width={600}
                  height={400}
                  className="hidden md:block w-full h-auto invert"
                />
                <Image
                  src={SALARY_COMPONENTS.mobile}
                  alt="Salary Components Mobile"
                  width={400}
                  height={300}
                  className="md:hidden w-full h-auto invert"
                />
              </div>
              <p className="text-gray-500 text-xs mt-4 text-center">
                Cohort '24 Placement Statistics
              </p>
            </div>

            {/* Salary Distribution */}
            <div className="border-b border-t border-gray-200">
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6 px-5 pt-2">
                {SALARY_DISTRIBUTION.title}
              </h3>
              <div className=" p-6 ">
                <Image
                  src={SALARY_DISTRIBUTION.img}
                  alt="Salary Distribution"
                  width={600}
                  height={400}
                  className="w-full h-auto invert"
                />
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
