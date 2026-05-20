"use client";

import React, { useState, useRef, useEffect } from "react";
import { LearnApplyData } from "@/data/programmes";
import HighlightText from "../shared/HighlightObserver";

interface LearnApplyReflectRepeatProps {
  data: LearnApplyData;
}

const LearnApplyReflectRepeat: React.FC<LearnApplyReflectRepeatProps> = ({
  data,
}) => {
  const [activeCategory, setActiveCategory] = useState(
    data.categories[0]?.id || "",
  );
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, [activeCategory]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons, { passive: true });
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Reset scroll position when category changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const currentCourseSet = data.courseData[activeCategory] || [];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-[#B30437]"
      >
        Skip to main content
      </a>

      <section
        id="main-content"
        className="bg-white text-black pt-4 sm:pt-6 md:pt-8"
        role="main"
        aria-labelledby="main-heading"
      >
        <div className="max-w-[85rem] mx-auto">
          {/* Header Section */}
          <header className="mb-4 sm:mb-6 md:mb-8">
            <h2
              id="main-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 md:mb-6 leading-tight text-center px-2"
            >
              Learn. Apply. Reflect.{" "}
              <HighlightText className="font-bold">
                Repeat.
              </HighlightText>
            </h2>
            <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed text-center px-4">
              Hands-on courses and workshops designed to build real businesses—
              <br className="hidden sm:block" />
              because real learning comes from real applications.
            </p>
          </header>

          {/* Subject Categories Navigation */}
          <nav
            className="mb-4"
            role="navigation"
            aria-labelledby="category-nav-heading"
          >
            <h3 id="category-nav-heading" className="sr-only">
              Course Subject Categories
            </h3>
            <div
              className="flex overflow-x-auto scrollbar-hide gap-0 px-5 sm:mx-2 justify-start sm:justify-center"
              role="tablist"
              aria-label="Course categories"
            >
              {data.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative px-3 sm:px-4 py-3 sm:py-4 text-left focus:outline-none border-r border-gray-200 last:border-r-0 ${activeCategory === category.id
                      ? "text-black"
                      : "text-black hover:bg-gray-100"
                    }`}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  aria-controls={`tabpanel-${category.id}`}
                  id={`tab-${category.id}`}
                  tabIndex={activeCategory === category.id ? 0 : -1}
                >
                  <div className="text-xs sm:text-sm font-bold" aria-hidden="true">
                    {category.label}
                  </div>
                  <div className="text-[10px] sm:text-xs">{category.title}</div>

                  {/* Bottom focus line */}
                  {activeCategory === category.id && (
                    <span className="absolute left-2 right-2 bottom-0 h-[2px] bg-black" />
                  )}
                </button>
              ))}
            </div>
          </nav>

          {/* Course Content Panel */}
          <div
            role="tabpanel"
            id={`tabpanel-${activeCategory}`}
            aria-labelledby={`tab-${activeCategory}`}
            className="relative"
          >
            <h3 className="sr-only">
              Course Modules for{" "}
              {data.categories.find((c) => c.id === activeCategory)?.title}
            </h3>

            {/* Cards Container with Border */}
            <div
              className="relative bg-white/50"
              role="region"
              aria-label="Course cards carousel"
            >
              {/* Navigation Buttons - Vertically Centered */}
              {showLeftButton && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-[#B30437]/80 hover:bg-[#B30437] text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#8B0329]"
                  type="button"
                  aria-label="Scroll to previous courses"
                  title="Previous courses"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {showRightButton && (
                <button
                  onClick={scrollRight}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-[#B30437]/80 hover:bg-[#B30437] text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#8B0329]"
                  type="button"
                  aria-label="Scroll to next courses"
                  title="Next courses"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide py-3 sm:py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                role="list"
                aria-label={`${data.categories.find((c) => c.id === activeCategory)?.title} course locations`}
              >
                {currentCourseSet.map((courseSet, index) => (
                  <article
                    key={`${activeCategory}-${index}`}
                    className="bg-white text-black p-4 sm:p-5 space-y-2 sm:space-y-3 flex-shrink-0 w-[280px] sm:w-80 md:w-96 h-[280px] sm:h-[300px] md:h-[320px] flex flex-col overflow-hidden border-r border-b border-t  border-gray-200"
                    role="listitem"
                    aria-labelledby={`course-set-${activeCategory}-${index}-heading`}
                  >
                    {/* Course Set Header */}
                    <header className="border-b border-gray-200 pb-2 sm:pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 bg-[#B30437] rounded-full"
                          aria-hidden="true"
                        ></div>
                        <span className="text-[10px] sm:text-xs font-bold text-black tracking-wider">
                          {courseSet.term}
                        </span>
                      </div>
                      <h3
                        id={`course-set-${activeCategory}-${index}-heading`}
                        className="text-base sm:text-lg font-bold text-black"
                      >
                        {courseSet.location}
                      </h3>
                    </header>

                    {/* Course List */}
                    <div className="flex-1">
                      <h4 className="sr-only">Available Courses</h4>
                      <ul
                        className="space-y-2"
                        aria-label={`Courses available in ${courseSet.location}`}
                      >
                        {courseSet.courses
                          .slice(0, 4)
                          .map((course, courseIndex) => (
                            <li
                              key={`${activeCategory}-${index}-${courseIndex}`}
                              className="flex items-start space-x-2 sm:space-x-3 py-0.5 sm:py-1"
                            >
                              <div
                                className="w-1.5 h-1.5 bg-[#B30437] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                                aria-hidden="true"
                              ></div>
                              <div className="flex-1 min-w-0">
                                <span
                                  className="text-[10px] sm:text-xs font-bold text-black mr-1 sm:mr-2"
                                  aria-label="Course code"
                                >
                                  {course.code}:
                                </span>
                                <span className="text-xs sm:text-sm text-black leading-relaxed">
                                  {course.title}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LearnApplyReflectRepeat;
