"use client";

import { useState, memo, useRef, useEffect } from "react";
import Image from "next/image";
import HighlightText from "../shared/HighlightObserver";

const immersionData = [
  {
    location: "India",
flag: "https://flagcdn.com/w40/in.png", // India
    business: {
      imageSrc: "/images/tetr/indiaMarket.webp",
      title: "Business Immersions",
      subtitle: "Gurgaon's Banjara Market",
      description:
        "Learn grassroots selling strategies | Observe real-time bargaining skills | Understand high-volume, low-margin business models",
    },
    cultural: {
      imageSrc: "/images/tetr/indiaParade.webp",
      title: "Cultural Immersions",
      subtitle: "Republic Day Parade",
      description:
        "Experience national pride and unity | Witness military and cultural showcases | Explore India's diverse traditions in one event",
    },
  },
  {
    location: "United States",
flag: "https://flagcdn.com/w40/us.png", // US
    business: {
      imageSrc: "/images/tetr/usGoogle.webp",
      title: "Business Immersions",
      subtitle: "Googleplex",
      description:
        "Explore cutting-edge tech innovation | Understand product development cycles | Observe workplace culture in top tech firms",
    },
    cultural: {
      imageSrc: "/images/tetr/usNasdaq.webp",
      title: "Cultural Immersions",
      subtitle: "NASDAQ, NYC",
      description:
        "Witness high-stakes financial moments | Learn about IPO processes | Experience the energy of Wall Street",
    },
  },
  {
    location: "Canada",
flag: "https://flagcdn.com/w40/ca.png", // Canada
    business: {
      imageSrc: "/images/tetr/arGrobo.webp",
      title: "Business Immersions",
      subtitle: "Los Grobo HQ",
      description:
        "Understand agribusiness operations | Learn about large-scale supply chains | Explore innovation in farming technology",
    },
    cultural: {
      imageSrc: "/images/tetr/arFootball.webp",
      title: "Cultural Immersions",
      subtitle: "La Bombonera",
      description:
        "Experience passionate football culture | Engage with local fan traditions | Feel the intensity of live matches",
    },
  },
  {
    location: "Saudi Arabia",
flag: "https://flagcdn.com/w40/sa.png", // Saudi
    business: {
      imageSrc: "/images/tetr/dubaiEmirates.webp",
      title: "Business Immersions",
      subtitle: "Dubai World Expo",
      description:
        "Explore global innovation showcases | Understand international trade dynamics | Experience luxury retail ecosystems",
    },
    cultural: {
      imageSrc: "/images/tetr/dubaiSafari.webp",
      title: "Cultural Immersions",
      subtitle: "Desert Safari",
      description:
        "Experience traditional desert life | Enjoy cultural performances and cuisine | Learn Bedouin heritage and customs",
    },
  },
  {
    location: "Dubai",
flag: "https://flagcdn.com/w40/ae.png", // Dubai/UAE
    business: {
      imageSrc: "/images/tetr/dubaiEmirates.webp",
      title: "Business Immersions",
      subtitle: "Dubai World Expo",
      description:
        "Explore global innovation showcases | Understand international trade dynamics | Experience luxury retail ecosystems",
    },
    cultural: {
      imageSrc: "/images/tetr/dubaiSafari.webp",
      title: "Cultural Immersions",
      subtitle: "Desert Safari",
      description:
        "Experience traditional desert life | Enjoy cultural performances and cuisine | Learn Bedouin heritage and customs",
    },
  },
  {
    location: "Qatar",
flag: "https://flagcdn.com/w40/qa.png", // Qatar
    business: {
      imageSrc: "/images/tetr/dubaiEmirates.webp",
      title: "Business Immersions",
      subtitle: "Dubai World Expo",
      description:
        "Explore global innovation showcases | Understand international trade dynamics | Experience luxury retail ecosystems",
    },
    cultural: {
      imageSrc: "/images/tetr/dubaiSafari.webp",
      title: "Cultural Immersions",
      subtitle: "Desert Safari",
      description:
        "Experience traditional desert life | Enjoy cultural performances and cuisine | Learn Bedouin heritage and customs",
    },
  },
  {
    location: "Singapore",
    flag: "https://flagcdn.com/w40/sg.png", // Singapore
    business: {
      imageSrc: "/images/tetr/singSkyline.webp",
      title: "Business Immersions",
      subtitle: "MAS, Singapore",
      description:
        "Learn global financial systems | Explore fintech innovation | Understand regulatory frameworks in banking",
    },
    cultural: {
      imageSrc: "/images/tetr/singVip.webp",
      title: "Cultural Immersions",
      subtitle: "National Day",
      description:
        "Celebrate national identity and unity | Enjoy grand parades and fireworks | Experience multicultural performances",
    },
  },
];

const FALLBACK_IMAGE = "/images/placeholder.webp";

const SLIDE_WIDTH_PERCENT = 100; // For mobile slides
const STEP = 100;


function WorldImmersion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const handleLocationClick = (index: number) => {
    if (index === activeIndex) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      // Reset slider when changing location
      if (slidesContainerRef.current?.parentElement) {
        slidesContainerRef.current.parentElement.scrollLeft = 0;
      }
      setIsTransitioning(false);
    }, 300);
  };

  const changeSlide = (direction: number): void => {
    if (isAnimating) return;
    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    setIsAnimating(true);
    const scrollAmount = scrollContainer.clientWidth;
    const targetScroll = scrollContainer.scrollLeft + (direction * scrollAmount);

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (n: number): void => {
    if (isAnimating) return;
    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    setIsAnimating(true);
    const targetScroll = n * scrollContainer.clientWidth;

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const scrollContainer = slidesContainerRef.current?.parentElement;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const activeIdx = Math.round(scrollContainer.scrollLeft / scrollContainer.clientWidth);
      setCurrentIndex(activeIdx);
      const newOffset = scrollContainer.scrollLeft > 1 ? (scrollContainer.scrollLeft / scrollContainer.clientWidth) * 100 : 0;
      setOffsetPercent(newOffset);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const getSafeImageSrc = (imageSrc: string) => {
    return imageSrc && imageSrc.trim() !== "" ? imageSrc : FALLBACK_IMAGE;
  };

  const active = immersionData[activeIndex] || immersionData[0];

  return (
    <section className="bg-white text-black pt-16 isolate mx-[0%]">
      {/* Header Section */}
      <div className="max-w-[85rem] mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
            Internship,{" "}
            <HighlightText className=" font-bold">
              Across the World
            </HighlightText>
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Global business and culture — 7 countries, 1 program.
          </p>
        </div>

        {/* Location Navigation - Horizontal at top */}
        <div aria-label="Locations">
          <ul className="flex overflow-scroll scrollbar-hide sm:justify-center gap-1 sm:gap-3 md:gap-6">
            {immersionData.map((d, i) => {
              const isActive = i === activeIndex;
              return (
                <li key={d.location}>
                  <button
                    type="button"
                    onClick={() => handleLocationClick(i)}
                    className={`px-3 text-nowrap sm:px-4 py-2 transition-all focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-[#B30437] text-sm ${isActive
                      ? "text-black border-b-2 border-black"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                    aria-label={`${d.location} immersion`}
                    aria-pressed={isActive}
                  >
<div className="flex items-center gap-2">
  <img
  src={d.flag}
  alt={d.location}
  className="w-5 h-5 rounded-sm object-cover"
/>

  <span>{d.location}</span>
</div>                
</button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Content Section  */}
        <div className="w-full relative group">
          <div
            className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"
              }`}
          >
            <div className="relative w-full">

              <div className="w-full bg-gray-200 overflow-x-auto lg:overflow-x-visible scrollbar-hide snap-x snap-mandatory lg:snap-none scroll-smooth">

                <div
                  ref={slidesContainerRef}
                  className="w-full flex flex-nowrap lg:flex-nowrap justify-start lg:justify-center"
                >
                  {[
                    { type: "biz", data: active.business },
                    { type: "cul", data: active.cultural },
                    { type: "biz-repeat", data: active.business },
                  ].map((item, index) => (
                    <article
                      key={`${item.type}-${activeIndex}`}
                      className="flex flex-col shrink-0 lg:shrink bg-white border-r border-t border-gray-200 min-h-[420px] lg:min-h-[480px] w-[85vw] sm:w-[calc(50%-0.25rem)] lg:flex-1 snap-center lg:snap-align-none hover:shadow-sm transition-shadow"
                    >
                      <div className="w-full mb-4 overflow-hidden">
<div className="relative w-full h-[250px] bg-gray-50">
  <Image src={getSafeImageSrc(item.data.imageSrc)}
                            alt={`${item.data.title} — ${item.data.subtitle}`}
                            fill
                            sizes="160px"
                            className="object-cover"
                            loading={activeIndex === 0 && index < 2 ? undefined : "lazy"}
                            quality={75}
                          />
                        </div>
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-start">
                        <h3 className="text-xl font-medium text-black mb-2 leading-tight">
                          {item.data.title}
                        </h3>
                        <p className="text-[14px] text-gray-600 mb-2  leading-relaxed">Experience one-on-one mentorship, coaching and guidance from CXOs across industries.</p>
                        <div className="flex flex-col gap-2 mt-2">
                          {item.data.description.split("|").map((point: string, i: number) => (
                            <div key={i} className="flex items-start gap-2">
                              <img
                                src="/dot-icon.svg"
                                alt=""
                                className="w-4 h-4 mt-0.5 flex-shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-sm text-gray-700 font-medium leading-snug">
                                {point.trim()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

              </div>

              {/* Navigation Buttons (Visible on Mobile/Tablet if overflow exists) */}
              <div className="lg:hidden">
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 sm:left-0 z-20">
                  {offsetPercent > 0 && (
                    <button
                      onClick={() => changeSlide(-1)}
                      disabled={isAnimating}
                      className="w-10 h-10 rounded-full bg-[#B30437] text-white shadow-lg flex items-center justify-center transition-opacity"
                      aria-label="Previous slide"
                      type="button"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:right-0 z-20">
                  {currentIndex < 3 && (
                    <button
                      onClick={() => changeSlide(1)}
                      disabled={isAnimating}
                      className="w-10 h-10 rounded-full bg-[#B30437] text-white shadow-lg flex items-center justify-center transition-opacity"
                      aria-label="Next slide"
                      type="button"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      type="button"
                      className={`w-2 h-2 rounded-full transition-all ${currentIndex === idx ? "bg-[#B30437] w-4" : "bg-gray-300"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(WorldImmersion);
