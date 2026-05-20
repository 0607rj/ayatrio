"use client";

import { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Faculty {
  name: string;
  title: string;
  company: string;
  subtitle?: string;
  experience?: string;
  teaching?: string;
  imageSrc: string;
  linkedinUrl?: string;
}

const facultyMembers: Faculty[] = [
  {
    name: "Mr. Rajat Mathur",
    title: "Managing Director",
    company: "MorganStanley",
    subtitle: "MD, India at Morgan Stanley",
    experience: "Ex Managing Director at Goldman Sachs",
    teaching: "Corporate strategy and financial markets",
    imageSrc: "/images/faculty/rajatMathur.webp",
    linkedinUrl: "#",
  },
  {
    name: "Mr. Naveen Munjal",
    title: "Managing Director",
    company: "HEROELECTRIC",
    subtitle: "Founder & MD at Hero Electric",
    experience: "Ex VP at Hero MotoCorp",
    teaching: "EV industry and startup scaling",
    imageSrc: "/images/faculty/naveenMunjal.webp",
    linkedinUrl: "#",
  },
  {
    name: "Mr. Arjun Vaidya",
    title: "Founder",
    company: "DR. VAIDYA's",
    subtitle: "Founder & CMD at Dr. Vaidya's",
    experience: "Built Ayurveda brand from scratch",
    teaching: "Founding a health-tech venture",
    imageSrc: "/images/faculty/arjunVaidya.webp",
    linkedinUrl: "#",
  },
  {
    name: "Mr. Manoj Kohli",
    title: "Former Country Head",
    company: "SoftBank",
    subtitle: "Former Country Head at SoftBank India",
    experience: "Ex MD at Bharti Airtel",
    teaching: "Tech investments and growth strategy",
    imageSrc: "/images/faculty/manojKohli.webp",
    linkedinUrl: "#",
  },
  {
    name: "Captain Raghu Raman",
    title: "Former President",
    company: "Reliance",
    subtitle: "Former President, Strategy at Reliance",
    experience: "Led energy & infrastructure divisions",
    teaching: "Corporate leadership and operations",
    imageSrc: "/images/faculty/arjunVaidya.webp",
    linkedinUrl: "#",
  },
];

function FacultyModel() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const STEP = 60;

  const getAnimationDuration = () => {
    return typeof window !== "undefined" && window.innerWidth <= 768 ? 800 : 600;
  };

  const changeSlide = (direction: number): void => {
    if (isAnimating) return;

    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;

    setIsAnimating(true);

    const scrollAmount = scrollContainer.clientWidth * (STEP / 100);
    const targetScroll = scrollContainer.scrollLeft + (direction * scrollAmount);

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, getAnimationDuration());
  };

  useEffect(() => {
    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;
      const newOffset = maxScrollLeft > 0 ? (currentScroll / maxScrollLeft) * 100 : 0;
      setOffsetPercent(newOffset);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section
        className="relative z-[5] bg-white text-black pb-8 overflow-x-hidden"
        role="region"
        aria-labelledby="faculty-heading"
      >
        <div className="max-w-[85rem] w-full mx-auto px-4 pt-8 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="relative text-center pb-[3.25rem] sm:pb-[3.25rem]">
            <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 sm:mb-6">
              LEARN FROM THE BEST
            </p>

            <h2
              id="faculty-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Meet our{" "}
              <span className="relative inline-block mx-2">
                {/* IMAGE BEHIND TEXT */}
                <img
                  src="/highlight line.svg"
                  alt="highlight line"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full scale-x-300 scale-y-155 pointer-events-none"
                />

                {/* TEXT ABOVE IMAGE */}
                <span
                  className="relative z-10 text-[#B30437] font-medium px-3"
                  style={{ fontWeight: 700 }}
                >
                  Founder
                </span>
              </span>
            </h2>

            <p className="text-black text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Learn from industry leaders, academic experts, and seasoned
              practitioners who bring real-world experience to your education.
            </p>
          </div>

          {/* Faculty Members Section with Navigation */}
          <div className="relative">
            <div
              ref={slidesContainerRef}
              className={
                `flex gap-3 sm:gap-4 md:gap-3 transition-all duration-300 ease-out ` +
                `overflow-x-auto snap-x snap-mandatory px-2 scrollbar-hide scroll-smooth`
              }
              role="list"
              aria-label="Faculty members"
            >
              {facultyMembers.map((faculty, index) => (
                <article
                  key={faculty.name}
                  className="bg-[#f6f4f2] overflow-hidden group transition-all duration-300  hover:-translate-y-1 flex flex-col flex-none w-[290px] min-w-[200px] snap-start"
                  role="listitem"
                  aria-labelledby={`faculty-name-${index}`}
                >
                  <figure className="relative bg-gray-100 aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={faculty.imageSrc}
                      alt={`Professional headshot of ${faculty.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-top transition-transform duration-300 "
                      loading="lazy"
                    />
                  </figure>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      {/* Name with LinkedIn Logo */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          id={`faculty-name-${index}`}
                          className="font-semibold text-black text-[15px] leading-tight"
                        >
                          {faculty.name}
                        </h3>
                        <a
                          href={faculty.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          aria-label={`${faculty.name} LinkedIn profile`}
                        ></a>
                      </div>

                      {/* Subtitle - Current Role */}
                      <p className="text-[11px] sm:text-xs text-gray-700 font-medium mb-1.5 leading-tight">
                        {faculty.subtitle}
                      </p>

                      {/* Divider */}
                      <div className="w-full h-px bg-gray-300 my-1.5"></div>

                      {/* Experience */}
                      {faculty.experience && (
                        <p className="text-[10px] text-gray-600 mb-1 leading-relaxed">
                          {faculty.experience}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-2 pointer-events-none">
              {offsetPercent < 95 && (
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
              {offsetPercent > 5 && (
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
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(FacultyModel);
