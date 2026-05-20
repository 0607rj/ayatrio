"use client";
import { useState } from "react";
import Image from "next/image";
import HighlightText from "../shared/HighlightObserver";

const STAR_ICON = "https://files.mastersunion.link/resources/svg/star.svg";
const SMALL_STAR_ICON =
  "https://files.mastersunion.link/resources/svg/smallGradientStar.svg";

const ROADMAP_DATA = [
  {
    id: 1,
    term: "Term 1",
    items: [
      "Psychometric Assessment",
      "1-1 Mentor Allocation",
      "Resume Formatting for Profile Building",
      "LinkedIn Profiling",
      "Professional Photography & Class Photos",
      "Institution of PlaCom",
      "Know all Domains",
      "Case and Business Plan Competition Workshop",
      "Placement Policies",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap1.webp",
  },
  {
    id: 2,
    term: "Term 2",
    items: [
      "Finalisation of Company Lists",
      "Company Outreach Plan",
      "Shortlisting Your Top 3 Domains",
      "Presentation Skills Workshop",
      "Industry Engagement Sessions",
      "Personal Branding Workshop",
      "Storytelling Workshop",
      "Career Practicums",
      "Corporate Competitions",
      "Self Assessment Exercises (Tool Based like MBT, Big 5)",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap2.webp",
  },
  {
    id: 3,
    term: "Term 3",
    items: [
      "Resume Review #1",
      "Resume Formatting for Profile Building",
      "Behavioural Mocks",
      "Consulting Case Training",
      "Domain-Specific Seminars and Workshops",
      "Team Work & Conflict Management Workshop",
      "Industry/Functional/Role Based Workshops",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap3.webp",
  },
  {
    id: 4,
    term: "Term 4",
    items: [
      "Resume Review #2",
      "Stress Management Sessions",
      "Domain-Specific Seminars",
      "Corporate Competitions",
      "Industry/Functional/Role Based Workshops",
      "Mock Interviews",
      "Last Mile Preps",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap4.webp",
  },
  {
    id: 5,
    term: "Term 5",
    items: [
      "Business Etiquette & Grooming",
      "Mock Interviews",
      "Last Mile Preps",
      "One-on-one With the Director of Career Preparation",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap5.webp",
  },
  {
    id: 6,
    term: "Term 6",
    items: [
      "Peer Best Practices & Experience Sharing",
      "Salary Negotiation Workshops",
      "Mock Interviews",
      "Last Mile Preps",
    ],
    image: "https://files.mastersunion.link/media/img/career-roadmap6.webp",
  },
  {
    id: 7,
    term: "Term 7",
    items: ["Mock Interviews", "Placement Drives", "Last Mile Preps"],
    image: "https://files.mastersunion.link/media/img/career-roadmap7.webp",
  },
  {
    id: 8,
    term: "Term 8",
    items: ["Placement Drives", "Last Mile Preps"],
    image: "https://files.mastersunion.link/media/img/career-roadmap8.webp",
  },
];

export default function CareerGuidance() {
  const [activeTerm, setActiveTerm] = useState(1);

  const activeData = ROADMAP_DATA.find((item) => item.id === activeTerm);

  return (
    <section
      id="guidance"
      aria-label="Guidance"
      className="w-full bg-white pb-8 sm:pb-12 md:pb-16 pt-2 sm:pt-3 md:pt-4"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 sm:mb-8 px-4 sm:px-5">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <Image
              src={STAR_ICON}
              alt="star"
              width={14}
              height={14}
              className="sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
              ANNUAL ROADMAP
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 mb-2 sm:mb-3">
              Benefit From a{" "}
              <HighlightText className="font-extrabold">
                Career Pathway
              </HighlightText>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-3xl">
              Leverage the opportunity to engage in workshops, training, panel
              discussions, counselling sessions, and personalised career
              progression plans.
            </p>
          </div>
        </div>

        {/* Tabs*/}
        <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide px-4 sm:px-5">
          <div className="flex justify-center min-w-max sm:min-w-0 sm:flex-wrap">
            {ROADMAP_DATA.map((term) => (
              <button
                key={term.id}
                onClick={() => setActiveTerm(term.id)}
                className={`relative px-4 sm:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap border-r border-gray-200 last:border-r-0
          ${activeTerm === term.id
                    ? "text-black"
                    : "text-black hover:bg-gray-100"
                  }`}
              >
                {term.term}
                {activeTerm === term.id && (
                  <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeData && (
          <div
            key={activeData.id}
            className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 animate-fadeIn mx-4 sm:mx-5 lg:mx-0"
          >
            {/* List */}
            <div className="bg-gray-100 p-4 sm:p-6 md:p-8 h-[240px] sm:h-[260px] lg:h-[280px] overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200">
              <ul className="space-y-3 sm:space-y-4">
                {activeData.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 text-gray-900"
                  >
                    <Image
                      src={SMALL_STAR_ICON}
                      alt="small star"
                      width={12}
                      height={12}
                      className="flex-shrink-0 mt-0.5 sm:mt-1 sm:w-4 sm:h-4"
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[280px] overflow-hidden bg-gray-100">
              <Image
                src={activeData.image}
                alt={`${activeData.term} roadmap`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
