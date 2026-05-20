"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import HighlightText from "../shared/HighlightObserver";
import testimonials from "@/data/testimonials.json";

interface Testimonial {
  id: string;
  company: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  category: string;
}

interface TeamCategory {
  id: string;
  name: string;
}

const teamCategories: TeamCategory[] = [
  { id: "product", name: "SaaS, Tech & AI" },
  { id: "engineering", name: "Consumer Tech & Services" },
  { id: "design", name: "FMCG, FMCD & Retail" },
  { id: "it", name: "Consultant" },
  { id: "marketing", name: "D2C" },
  { id: "startups", name: "Startups" },
];

const OneSpaceForEveryTeam = () => {
  const [activeCategory, setActiveCategory] = useState<string>("engineering");
  const [activeTestimonial, setActiveTestimonial] = useState<string>("openai");

  const filteredTestimonials = testimonials.filter(
    (t) => t.category === activeCategory,
  );
  const currentTestimonial =
    testimonials.find((t) => t.id === activeTestimonial) ||
    filteredTestimonials[0] ||
    testimonials[0];

  // Update active testimonial when category changes
  useEffect(() => {
    const firstTestimonialInCategory = filteredTestimonials[0];
    if (
      firstTestimonialInCategory &&
      !filteredTestimonials.find((t) => t.id === activeTestimonial)
    ) {
      setActiveTestimonial(firstTestimonialInCategory.id);
    }
  }, [activeCategory, filteredTestimonials, activeTestimonial]);

  return (
    <section
      className="mx-[0%] bg-white pt-16 relative z-[5]"
      aria-labelledby="team-collaboration-heading"
      role="main"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <p
            className="text-sm font-semibold text-[#B30437] tracking-wider mb-3"
            role="text"
          >
            In class intranshiph at Top Companys{" "}
          </p>
          <h2 className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
            Class curriculum aling{" "}
            <HighlightText className="font-bold">
              every Sector
            </HighlightText>
          </h2>
          <div className="flex justify-center">
            <p className="text-black text-sm sm:text-base md:text-lg max-w-4xl">
              Learn from industry leaders, academic experts, and seasoned
              practitioners who bring real-world experience to your education.
            </p>
          </div>
        </div>

        {/* Navigation Tags */}
        <div aria-label="Team categories">
          <ul className="flex overflow-scroll scrollbar-hide sm:justify-center gap-1 sm:gap-3 md:gap-6">
            {teamCategories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 text-nowrap sm:px-4 py-2  transition-all focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-[#B30437] text-sm ${activeCategory === category.id
                    ? " text-black border-b-2 "
                    : "text-gray-700  hover:bg-gray-50"
                    }`}
                  aria-label={`${category.name} teams`}
                  aria-pressed={activeCategory === category.id}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="bg-[#F4F2EE] p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-col">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 lg:mb-10 py-5">
            {/* Quote and Company Info */}
            <article
              className="space-y-6 lg:space-y-8 order-2 lg:order-none"
              role="article"
              aria-label="Company testimonial"
            >
              {/* Company Logo */}
              <div className="text-base sm:text-lg font-semibold lg:visible hidden text-black">
                {currentTestimonial.company}
              </div>

              {/* Quote Section */}
              <blockquote className="space-y-4 lg:space-y-6">
                <p className="text-xl sm:text-2xl lg:text-3xl   text-black leading-relaxed font-light">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </p>
                <footer>
                  <cite className="text-xs sm:text-sm text-gray-600">
                    {currentTestimonial.role}
                  </cite>
                </footer>
              </blockquote>

              {/* Participant Avatars */}
              <section aria-labelledby="participants-heading">
                <h3 id="participants-heading" className="sr-only">
                  Course Participants
                </h3>
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Avatar 1 */}
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                        alt="Ananya Sharma"
                        width={48}
                        height={48}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="text-black font-medium">Ananya Sharma</p>
                      <p className="text-gray-600">Finance analysis</p>
                    </div>
                  </div>

                  {/* Avatar 2 */}
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-400 overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        alt="Rohan Patel"
                        width={48}
                        height={48}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="text-black font-medium">Rohan Patel</p>
                      <p className="text-gray-600">Finance analysis</p>
                    </div>
                  </div>

                  {/* Avatar 3 */}
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-400 overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                        alt="Priya Singh"
                        width={48}
                        height={48}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs">
                      <p className="text-black font-medium">Priya Singh</p>
                      <p className="text-gray-600">Finance analysis</p>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            {/* Right Image */}
            <aside
              className="relative flex justify-center order-1 lg:order-none"
              aria-label="Team member portrait"
            >
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-90 lg:h-90 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={currentTestimonial.image}
                      alt={`${currentTestimonial.company} team member`}
                      width={360}
                      height={360}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Company Testimonial Grid */}
          <section aria-labelledby="testimonials-grid">
            <h2 id="testimonials-grid" className="sr-only">
              Company Testimonials
            </h2>
            <div className="flex overflow-scroll scrollbar-hide lg:flex-wrap gap-1 sm:gap-3 mx-auto">
              {filteredTestimonials.slice(0, 6).map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(testimonial.id)}
                  className={`text-left space-y-3 p-2 transition-all hover:shadow-md relative flex-1 min-w-[calc(100%-1rem)] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] ${activeTestimonial === testimonial.id
                    ? "bg-[#e3dfd2] border-l-2 border-black"
                    : "hover:bg-[#fafafa]"
                    }`}
                  role="button"
                  aria-pressed={activeTestimonial === testimonial.id}
                  aria-label={`Select ${testimonial.company} testimonial`}
                >
                  <div className="font-semibold text-black text-sm">
                    {testimonial.logo}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {index === 0 &&
                      "Streamlined workflows to reduce timelines by 3x. →"}
                    {index === 1 &&
                      `"${testimonial.quote.substring(0, 50)}..." →`}
                    {index === 2 &&
                      `"${testimonial.quote.substring(0, 50)}..." →`}
                    {index === 3 &&
                      `"${testimonial.quote.substring(0, 50)}..." →`}
                    {index === 4 &&
                      `"${testimonial.quote.substring(0, 50)}..." →`}
                    {index === 5 &&
                      "From six apps to one: Scaling faster with all teams running on Notion AI. →"}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Statistics Footer */}
        <footer className="pt-1 relative overflow-hidden">
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="relative">
            <div className="flex overflow-hidden">
              <dl
                className="flex gap-8 text-center whitespace-nowrap py-4 animate-infinite-scroll"
                aria-label="Platform statistics"
              >
                {/* First set of items */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <dt className="sr-only">Community members:</dt>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 2a3 3 0 100 6 3 3 0 000-6zM5 5a3 3 0 116 0 3 3 0 01-6 0zM8 9c-2.25 0-4.31.84-5.56 2.22A.75.75 0 003.5 12.5h9a.75.75 0 001.06-1.28C12.31 9.84 10.25 9 8 9z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    1.4M+ community members
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <dt className="sr-only">Users worldwide:</dt>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 1a7 7 0 100 14A7 7 0 008 1zM2 8a6 6 0 1112 0A6 6 0 012 8z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 2v12M2 8h12M5.5 3.5c1.5-.5 3.5-.5 5 0M5.5 12.5c1.5.5 3.5.5 5 0"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    Over 100M users worldwide
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <dt className="sr-only">Knowledge base experience:</dt>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    #1 knowledge base 3 years running (G2)
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <dt className="sr-only">Fortune 100 adoption:</dt>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 2a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H3zm0-1a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H3z"
                        fill="currentColor"
                      />
                      <path
                        d="M4 6h8M4 8h8M4 10h4"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    82% of Fortune 100 use Notion
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <dt className="sr-only">Rating:</dt>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    #1 rated
                  </dd>
                </div>
              </dl>

              {/* Duplicate for seamless loop */}
              <dl
                className="flex gap-8 text-center whitespace-nowrap py-4 animate-infinite-scroll"
                aria-hidden="true"
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 2a3 3 0 100 6 3 3 0 000-6zM5 5a3 3 0 116 0 3 3 0 01-6 0zM8 9c-2.25 0-4.31.84-5.56 2.22A.75.75 0 003.5 12.5h9a.75.75 0 001.06-1.28C12.31 9.84 10.25 9 8 9z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    1.4M+ community members
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 1a7 7 0 100 14A7 7 0 008 1zM2 8a6 6 0 1112 0A6 6 0 012 8z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 2v12M2 8h12M5.5 3.5c1.5-.5 3.5-.5 5 0M5.5 12.5c1.5.5 3.5.5 5 0"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    Over 100M users worldwide
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    #1 knowledge base 3 years running (G2)
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 2a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V3a1 1 0 00-1-1H3zm0-1a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H3z"
                        fill="currentColor"
                      />
                      <path
                        d="M4 6h8M4 8h8M4 10h4"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    82% of Fortune 100 use Notion
                  </dd>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <dd className="text-sm text-gray-600 font-medium">
                    #1 rated
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <style jsx>{`
            @keyframes infinite-scroll {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }

            .animate-infinite-scroll {
              animation: infinite-scroll 30s linear infinite;
            }

            .animate-infinite-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </footer>
      </div>
    </section>
  );
};

export default memo(OneSpaceForEveryTeam);