"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import HighlightText from "../shared/HighlightObserver";

const STORIES_DATA = [
  {
    name: "Shreya Kulkarni",
    role: "Product Manager II, Microsoft",
    image: "https://files.mastersunion.link/media/img/pl-shreya.png",
    linkedin: "https://www.linkedin.com/in/shreyaakulkarni/",
    testimonial:
      "Mentors like Aditya Turalapati (PM2, Microsoft) and Sumit Kumar provided vital guidance, while the PM curriculum, live projects, and global placement approach thoroughly prepared me.",
  },
  {
    name: "Deep Bhatia",
    role: "Investment Banking Associate, Axis Capital",
    image: "https://files.mastersunion.link/media/img/pl-deep.png",
    linkedin: "https://www.linkedin.com/in/deep-bhatia/",
    testimonial:
      "The support at Masters' Union was incredible—faculty, the career prep team made the placement journey seamless. Mock interviews honed my technical skills for Investment Banking roles.",
  },
  {
    name: "CA Harsh Nahar",
    role: "Senior Business Analyst, Kearney",
    image: "https://files.mastersunion.link/media/img/pl-harsh.png",
    linkedin: "https://www.linkedin.com/in/harsh-nahar/",
    testimonial:
      "From being elected Vice President to organizing Case Union, India's largest case competition conclave, the experience was filled with rewarding challenges.",
  },
  {
    name: "Shruti Kumari",
    role: "Manager - Brand Marketing, Flipkart",
    image: "https://files.mastersunion.link/media/img/pl-shruti.png",
    linkedin: "https://www.linkedin.com/in/shruti-kumaari/",
    testimonial:
      "Masters' Union provided me with unparalleled exposure to the e-commerce landscape, which significantly shaped my understanding of the sector.",
  },
  {
    name: "Kakaraparthi Sri Badarinadh",
    role: "Senior Specialist- Strategic Accounts, Talabat (Dubai)",
    image: "https://files.mastersunion.link/media/img/pl-kakara.png",
    linkedin: "https://www.linkedin.com/in/sri-badarinadh/",
    testimonial:
      "Masters' Union's innovative case-based teaching was key to my interview success, helping me approach real-world challenges with a structured and analytical mindset.",
  },
  {
    name: "Tilottama Ghosh",
    role: "Associate, Kotak Investment Bank",
    image: "https://files.mastersunion.link/media/img/pl-tilottama.png",
    linkedin: "https://www.linkedin.com/in/tilottamaghosh/",
    testimonial:
      "The program's focus on financial modelling and investment strategies helped me build a strong foundation, while industry mentorship enhanced my ability to solve complex challenges.",
  },
];

const LINKEDIN_ICON = "https://files.mastersunion.link/resources/svg/linkedin.svg";

export default function PlacementStories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <section
      id="stories"
      aria-label="Stories"
      className="w-full bg-white pb-8 sm:pb-12 md:pb-16 pt-4 sm:pt-6 md:pt-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-4 sm:mb-6 px-4 sm:px-5">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Placements{" "}
            <HighlightText className="font-extrabold">
              Stories
            </HighlightText>
          </h2>
        </div>

        {/* Scroll area + arrow buttons */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className={`
              flex absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10
              items-center justify-center
              w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-lg
              transition-all duration-200
              ${canScrollLeft
                ? "opacity-100 pointer-events-auto bg-[#B30437] hover:bg-[#96032d]"
                : "opacity-0 pointer-events-none bg-[#B30437]"
              }
            `}
          >
            <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className={`
              flex absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-10
              items-center justify-center
              w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-lg
              transition-all duration-200
              ${canScrollRight
                ? "opacity-100 pointer-events-auto bg-[#B30437] hover:bg-[#96032d]"
                : "opacity-0 pointer-events-none bg-[#B30437]"
              }
            `}
          >
            <svg width="14" height="14" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Cards scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {STORIES_DATA.map((story, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] snap-start border-l border-b border-t border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Photo */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] bg-gray-100">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover object-top"
                    sizes="360px"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start justify-between mb-1 sm:mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug pr-2">
                      {story.name}
                    </h3>
                    <Link
                      href={story.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 hover:opacity-75 transition mt-0.5"
                    >
                      <Image
                        src={LINKEDIN_ICON}
                        alt="LinkedIn"
                        width={18}
                        height={18}
                      />
                    </Link>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4" style={{ color: "#B30437" }}>
                    {story.role}
                  </p>

                  <hr className="border-gray-200 mb-3 sm:mb-4" />

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {story.testimonial}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}