"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
interface NewsItem {
  id: number;
  image: string;
  mobileImage: string;
  title: string;
  description: string;
  link: string;
}

interface NewsSliderComponentProps {
  newsItems?: NewsItem[];
}

const NewsSliderComponent: React.FC<NewsSliderComponentProps> = ({
  newsItems = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const defaultNews: NewsItem[] = [
    {
      id: 1,
      image: "/images/newsslider/news1.webp",
      mobileImage: "/images/newsslider/news1.webp",
      title: "Latest Updates from Charters",
      description: "Read our latest updates and announcements",
      link: "#",
    },
    {
      id: 2,
      image: "/images/newsslider/news2.webp",
      mobileImage: "/images/newsslider/news2.webp",
      title: "Success Stories",
      description: "Check out what's new in our organization",
      link: "#",
    },
    {
      id: 3,
      image: "/images/newsslider/news3.webp",
      mobileImage: "/images/newsslider/news3.webp",
      title: "Campus Highlights",
      description: "Stay updated with recent developments",
      link: "#",
    },
    {
      id: 4,
      image: "/images/newsslider/news4.webp",
      mobileImage: "/images/newsslider/news4.webp",
      title: "Faculty Achievements",
      description: "Discover more about our initiatives",
      link: "#",
    },
    {
      id: 5,
      image: "/images/newsslider/news5.webp",
      mobileImage: "/images/newsslider/news5.webp",
      title: "Events & Activities",
      description: "Important announcements and updates",
      link: "#",
    },
    {
      id: 6,
      image: "/images/newsslider/news6.webp",
      mobileImage: "/images/newsslider/news6.webp",
      title: "Student Spotlight",
      description: "Explore our latest achievements",
      link: "#",
    },
  ];

  const items = newsItems.length > 0 ? newsItems : defaultNews;
  const totalRealSlides = items.length;

  const SLIDE_WIDTH = 30;
  const STEP = 60; // Increased from 30 to 60 for faster scrolling
  const maxOffset = Math.max(0, totalRealSlides * SLIDE_WIDTH - 100);
  const [offsetPercent, setOffsetPercent] = useState(0);

  const isMobileView = () => {
    return typeof window !== "undefined" && window.innerWidth <= 768;
  };

  const getAnimationDuration = () => {
    return isMobileView() ? 800 : 600; // Reduced from 1800/1300 for faster animation
  };

  const updateDots = (index: number): void => {
    const dots = document.querySelectorAll("[data-dot]");
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-[#B30437]", i === index);
      dot.classList.toggle("bg-slate-300/60", i !== index);
    });
  };

  const moveSlide = (direction: number): void => {
    if (isAnimating) return;

    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    setIsAnimating(true);

    // Calculate scroll amount based on container width
    const scrollAmount = scrollContainer.clientWidth * (STEP / 100);
    const targetScroll = scrollContainer.scrollLeft + (direction * scrollAmount);

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      // Update current index based on scroll position
      const newScrollLeft = scrollContainer.scrollLeft;
      const slideWidth = scrollContainer.clientWidth * (SLIDE_WIDTH / 100);
      const activeIndex = Math.round(newScrollLeft / slideWidth);
      setCurrentIndex(activeIndex);
      updateDots(activeIndex);
      setIsAnimating(false);
    }, getAnimationDuration());
  };

  const changeSlide = (direction: number): void => {
    moveSlide(direction);
  };

  const goToSlide = (n: number): void => {
    if (isAnimating) return;

    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    setIsAnimating(true);

    const slideWidth = scrollContainer.clientWidth * (SLIDE_WIDTH / 100);
    const targetScroll = n * slideWidth;

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setCurrentIndex(n);
      updateDots(n);
      setIsAnimating(false);
    }, getAnimationDuration());
  };

  useEffect(() => {
    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const slideWidth = scrollContainer.clientWidth * (SLIDE_WIDTH / 100);
      const activeIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
      setCurrentIndex(activeIndex);
      updateDots(activeIndex);

      // Update offset for button visibility
      const newOffset = scrollContainer.scrollLeft > 1 ? (scrollContainer.scrollLeft / scrollContainer.clientWidth) * 100 : 0;
      setOffsetPercent(newOffset);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mx-[0%] w-full m-0 p-0 box-border">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-13 ">
        <div className="w-full mx-auto text-center">
          <div>
            <h2
              id="programmes-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Charter's in the News
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#5f6368]">
            Choose from our range of programmes designed to build future leaders
            and entrepreneurs.
          </p>
        </div>
      </div>

      {/* Wrapper for slider and buttons */}
      <div className="relative w-full h-100 md:h-90 sm:h-90 m-0">
        {/* Scrolling Container */}
        <div className="w-full h-full overflow-x-auto scrollbar-hide overflow-y-hidden rounded-lg scroll-smooth">
          {/* Slides Container */}
          <div
            className="flex w-full h-full snap-x snap-mandatory"
            style={{
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            ref={slidesContainerRef}
            id="news-slides"
          >
            {/* All news items*/}
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-[30%] h-full flex-shrink-0 overflow-hidden relative snap-start border-r border-t border-gray-200 pb-13"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 py-8 sm:py-5 bg-gradient-to-t from-black via-black/80 to-transparent text-white z-10 transform translate-y-full hover:translate-y-0 transition-transform duration-400 delay-200">
                  <h3 className="m-0 mb-2 text-xl sm:text-lg font-semibold leading-snug text-[#B30437]">
                    {item.title}
                  </h3>
                  <p className="m-0 mb-3 text-sm sm:text-xs opacity-95 leading-relaxed text-[#B30437]">
                    {item.description}
                  </p>
                  {item.link && item.link !== "#" && (
                    <a
                      href={item.link}
                      className="inline-block text-[#B30437] text-sm sm:text-xs font-medium py-2 border border-[#B30437]/50 rounded transition-all hover:bg-[#B30437]/10 hover:border-[#B30437]"
                    >
                      Read More →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Outside scroll container */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-2 pointer-events-none">
          {offsetPercent < maxOffset && (
            <button
              onClick={() => changeSlide(1)}
              disabled={isAnimating}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437] pointer-events-auto"
              aria-label="Next slide"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                aria-hidden="true"
              >
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-2 pointer-events-none">
          {offsetPercent > 0 && (
            <button
              onClick={() => changeSlide(-1)}
              disabled={isAnimating}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437] pointer-events-auto"
              aria-label="Previous slide"
              type="button"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                aria-hidden="true"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        {/* <div className="absolute bottom-6 md:bottom-5 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 md:gap-2 sm:gap-1.5 z-30 pointer-events-none">
          {items.map((item, index) => (
            <button
              key={index}
              data-dot
              className={`rounded-sm border-0 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#B30437] focus-visible:outline-offset-1 pointer-events-auto ${index === Math.round(offsetPercent / SLIDE_WIDTH)
                ? "bg-[#B30437] w-1 h-1"
                : "w-1 h-1 bg-white hover:bg-slate-500"
                }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default NewsSliderComponent;
