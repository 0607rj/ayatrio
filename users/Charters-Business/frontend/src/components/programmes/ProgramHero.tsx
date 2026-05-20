'use client';

import Image from 'next/image';
import { HeroData } from '@/data/programmes';
import Link from 'next/link';

interface ProgramHeroProps {
  data: HeroData;
  programmeSlug: string;
}

const ProgramHero = ({ data, programmeSlug }: ProgramHeroProps) => {
  return (
    <div
      className="mx-[1%] sm:mx-[2%] md:mx-[3%] relative z-[5] mt-10 bg-white pb-4 sm:pb-6 md:pb-8"
      aria-labelledby="programme-heading"
      role="region"
    >
      <div className="max-w-[85rem] w-full mx-auto">
        <div className="flex flex-col-reverse  xl:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Content Section */}
          <div className="flex-1 space-y-4 w-full">
            <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-3">
              {data.categoryLabel}
            </p>

            <h2
              id="programme-heading"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-black leading-tight"
            >
              {data.title.main}{' '}
              <span className="italic font-serif text-[#B30437]">{data.title.highlight}</span>{' '}
              {data.title.suffix}
            </h2>

            <p className="text-sm sm:text-base text-black leading-relaxed line-clamp-2">
              {data.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-black">
              {data.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="sr-only">{stat.label}:</span>
                  <span className="font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4">
              <div className="text-xs sm:text-sm text-black">Find our Alumni at -</div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {data.alumniCompanies.map((company, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#B30437] rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">{company.name.slice(0, 4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-black">{data.instructors.badge}</p>
                  <p className="text-xs sm:text-sm text-[#B30437] font-medium">{data.instructors.title}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Link
                href={`/apply?type=application&programme=${programmeSlug}`}
                className="flex items-center justify-center gap-2 bg-[#B30437] hover:bg-[#8B0329] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex-shrink-0"
              >
                <span>Apply Now</span>
              </Link>

              <Link
                href={`/apply?type=counseling&programme=${programmeSlug}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#B30437] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-[#B30437] text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex-shrink-0"
              >
                <span>Book Counseling</span>
              </Link>

              <button
                type="button"
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex-shrink-0"
                aria-label="Download programme brochure"
              >
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          {/* Right Image Section - UPDATED */}
          <div className="flex-1 w-full">
            <div className="relative w-full">
              {/* Image Container with relative positioning for cards */}
              <div className="relative w-full">
                <Image
                  src={data.heroImage}
                  alt={`${data.title.main} ${data.title.highlight} programme`}
                  width={600}
                  height={400}
                  className="object-cover w-full"
                  priority
                />

                {/* Floating Card - Top Right - FIXED with vw units */}
                <div className="absolute -top-1 sm:-top-2 md:-top-4 -right-1 sm:-right-2 md:-right-4 bg-white p-[2px] sm:p-2 md:p-4 shadow-md border border-gray-100 w-[15vw] sm:w-[12vw] md:w-[10vw] lg:w-[180px] max-w-[180px] min-w-[60px] rounded">
                  <div className="space-y-[1px] sm:space-y-1 md:space-y-2">
                    <div className="flex items-center gap-[2px] sm:gap-1">
                      <div className="w-[6px] h-[6px] sm:w-2 sm:h-2 md:w-3 md:h-3 bg-[#B30437] rounded-full flex-shrink-0"></div>
                      <span className="text-[6px] sm:text-[9px] md:text-xs font-medium text-black line-clamp-1">{data.floatingCards.topRight.badge}</span>
                    </div>
                    <div className="text-[9px] sm:text-sm md:text-base font-bold text-black leading-tight">{data.floatingCards.topRight.students}</div>
                    <div className="text-[5px] sm:text-[8px] md:text-[10px] text-black line-clamp-1">Students</div>
                    <div className="flex items-center gap-[2px]">
                      <div className="flex text-yellow-400 text-[5px] sm:text-[8px] md:text-[10px]">★★★★★</div>
                      <span className="text-[5px] sm:text-[8px] md:text-[10px] text-black">{data.floatingCards.topRight.rating}/5</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card - Bottom Left - FIXED with vw units */}
                <div className="absolute -bottom-1 sm:-bottom-2 md:-bottom-6 -left-1 sm:-left-2 md:-left-4 bg-white p-[2px] sm:p-2 md:p-4 shadow-md border border-gray-100 w-[15vw] sm:w-[12vw] md:w-[10vw] lg:w-[170px] max-w-[170px] min-w-[55px] rounded">
                  <div className="space-y-0 sm:space-y-1 md:space-y-2">
                    <div className="flex items-center gap-[2px] sm:gap-1">
                      <div className="w-[10px] h-[10px] sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#B30437] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[5px] sm:text-[8px] md:text-[10px] font-bold">📊</span>
                      </div>
                      <span className="text-[6px] sm:text-[9px] md:text-xs font-medium text-black line-clamp-1">{data.floatingCards.bottomLeft.label}</span>
                    </div>
                    <div className="text-[9px] sm:text-base md:text-xl font-bold text-[#B30437] leading-tight">{data.floatingCards.bottomLeft.percentage}</div>
                    <div className="text-[5px] sm:text-[8px] md:text-[10px] text-black line-clamp-1">{data.floatingCards.bottomLeft.subLabel}</div>
                    <div className="bg-red-100 text-[#B30437] px-[2px] sm:px-1.5 py-[1px] sm:py-0.5 rounded text-[5px] sm:text-[8px] md:text-[10px] font-medium inline-block">
                      {data.floatingCards.bottomLeft.ctcIncrease}
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramHero;
