'use client';

import { useState, memo, useRef, useEffect } from 'react';
import Image from 'next/image';
import useInViewPlay from '@/components/micro/useInViewPlay';

const businesses = [
  { title: "E-Commerce", location: "Dubai", imageSrc: "/images/tetr/dubaiEmirates.webp", description: "Launch a dropshipping business of globally sourced products in Dubai.", showProgress: true },
  { title: "FMCG Brand", location: "India", imageSrc: "/images/tetr/FMCGBrandNew.webp", description: "Launch a consumer brand for suburban Indian markets.", showProgress: true },
  { title: "Kickstarter", location: "Singapore & Malaysia", imageSrc: "/images/tetr/kickstarter.webp", description: "Start a kickstarter campaign for a hardware solution inspired by design thinking.", showProgress: false },
  { title: "Social Venture", location: "Ghana", imageSrc: "/images/tetr/7ghanaNew.webp", description: "Pilot a social enterprise focused on addressing a local cause in Ghana.", showProgress: false },
  { title: "Tech Startup", location: "United States", imageSrc: "/images/tetr/TechUSNew.webp", description: "Build a SaaS tool, marketplace, AI tool or a mobile app to solve a key business problem.", showProgress: false },
  { title: "Green Venture", location: "Argentina", imageSrc: "/images/tetr/GreenArgentinaNew.webp", description: "Start a green initiative focused on renewables, EVs or Sustainability.", showProgress: false },
  { title: "Social Channel", location: "Europe", imageSrc: "/images/tetr/socialchannelEuropeNew.webp", description: "Start a lifestyle or niche YouTube channel, grow a community and land brand deals.", showProgress: false }
];

function SevenBusinessesComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPlay(sectionRef, "200px", 0.1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(Math.min(businesses.length - 1, currentIndex + 1));
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / businesses.length;
      scrollContainerRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative mt-16 z-[5] bg-white text-black"
      role="region"
      aria-labelledby="businesses-heading"
    >

      {isVisible && (

        <div className="max-w-[85rem] w-full mx-auto px-4 sm:px-6 lg:px-8">

          {/* Business Opportunities Header */}

          <div className="flex flex-col items-center mb-8 sm:mb-12 lg:mb-16 text-center">
            <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 sm:mb-6" role="text">
              LEARN BY BUILDING
            </p>

            <h2 id="businesses-heading" className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
              7 Businesses in <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#B30437]">7 Countries</span>
            </h2>

            <div className="flex justify-center">
              <p className="text-black text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed" role="doc-subtitle">
                Build an e-commerce business in Dubai, launch a social venture in Ghana
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                and explore the ins and outs of 30+ industries.
              </p>
            </div>
          </div>

          {/* Carousel Navigation */}

          <nav
            className="flex space-x-2 sm:space-x-3 justify-end mb-4 sm:mb-6"
            role="navigation"
            aria-label="Business carousel navigation"
          >

            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 disabled:bg-gray-300 disabled:text-white/70 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437]"
              aria-label="View previous business opportunities"
              type="button"
            >
              <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= businesses.length - 1}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 disabled:bg-gray-300 disabled:text-white/70 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437]"
              aria-label="View next business opportunities"
              type="button"
            >
              <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
            </button>

          </nav>

          {/* Carousel */}

          <div
            className="relative overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
            role="region"
            aria-labelledby="carousel-heading"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >

            <h3 id="carousel-heading" className="sr-only">Business Opportunities Carousel</h3>

            <div
              className="flex gap-3 sm:gap-4 lg:gap-6"
              role="group"
              aria-label="Business opportunities showcase"
              aria-live="polite"
            >

              {businesses.map((business, index) => (

                <article
                  key={index}
                  className="flex flex-col flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] xl:w-[calc((100%-48px)/3.5)]"
                  role="article"
                  aria-labelledby={`business-title-${index}`}
                >

                  <div className="mb-3 sm:mb-4">
                    <h4 id={`business-title-${index}`} className="font-semibold text-black text-base sm:text-lg mb-1">
                      {business.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-700">
                      ({business.location})
                    </p>

                    <div className="w-full h-0.5 bg-[#B30437]/70 mt-2"></div>
                  </div>

                  <figure className="bg-white overflow-hidden h-80 sm:h-96 w-full relative shadow-sm hover:shadow-lg transition-shadow duration-300">

                    <div className="relative w-full h-full">

                      <Image
                        src={business.imageSrc}
                        alt={`${business.title} business opportunity in ${business.location}`}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, (max-width: 1024px) 45vw, 30vw"
                        loading="lazy"
                        draggable={false}
                      />

                    </div>

                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">

                      <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                        {business.description}
                      </p>

                      {business.showProgress && (
                        <div className="flex items-center mt-3">
                          <span className="text-[#B30437] text-xs sm:text-sm font-medium">
                            Review Cohort 1 Progress
                          </span>

                          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 text-[#B30437]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}

                    </figcaption>

                  </figure>

                </article>

              ))}

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default memo(SevenBusinessesComponent);
