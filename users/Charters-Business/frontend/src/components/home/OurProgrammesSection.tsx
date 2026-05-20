import Image from "next/image";
import Link from "next/link";
import { programmes } from "@/data/programmes";

export default function OurProgrammesSection() {
  return (
    <section
      className="mx-[0%]  bg-white text-black relative overflow-hidden"
      role="region"
      aria-labelledby="programmes-heading"
    >
      {/* Header Section */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-13 mb-2">
        <div className="w-full mx-auto text-center">
          <div>
            <p
              className="text-sm font-semibold text-[#B30437] tracking-wider mb-3"
              role="text"
            >
              PROGRAMMES OVERVIEW
            </p>
            <h2
              id="programmes-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Explore Programmes
            </h2>
          </div>
          <p className="text-base sm:text-lg text-[#5f6368]">
            Choose from our range of programmes designed to build future leaders
            and entrepreneurs.
          </p>
        </div>
      </div>

      {/* Programme Cards Section */}
      <div className="max-w-[85rem] mx-auto">
        <h3 className="sr-only">Available Academic Programmes</h3>

        <div className="relative overflow-x-auto overflow-y-hidden scrollbar-hide ">
          <div className="flex">
            {programmes.map((programme, index) => (
              <article
                key={programme.id}
                className="flex-shrink-0 w-[330px] sm:w-[450px] lg:w-[525px] overflow-hidden hover:bg-[#f6f4f2] border-l-0 border-b-0 border border-[#D5D0CA] flex flex-col"
                aria-labelledby={`programme-title-${programme.id}`}
              >
                {/* Programme Image */}
                <figure className="relative h-36 sm:h-[10.5rem] bg-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={programme.card.image}
                    alt={programme.card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) calc(100vw - 1rem), (max-width: 1023px) 450px, 525px"
                    quality={60}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </figure>

                {/* Programme Content */}
                <div className="flex flex-col flex-1 p-4 space-y-2">
                  {/* Title and Description */}
                  <div>
                    <h3
                      id={`programme-title-${programme.id}`}
                      className="text-base sm:text-lg font-bold text-black mb-1"
                    >
                      {programme.card.title}
                    </h3>

                    <p className="text-xs text-gray-700 leading-tight">
                      {programme.card.description}
                    </p>
                  </div>

                  {/* Main Details Section - 3:7 Layout */}
                  <div className="flex gap-4 flex-1 md:flex-row flex-col pt-[15px]">
                    {/* Left Column (30%) - Format, Eligibility, Duration, Job, Salary */}
                    <div className="flex md:flex-col gap-5 md:w-[30%] flex-row  flex-shrink-0 overflow-scroll scrollbar-hide">
                      {/* Format */}
                      <div className="flex flex-col gap-2">
                        <div className="flex md:flex-row items-center flex-shrink-0 relative">
                          <Image
                            src="/Charters-icon/new_campas.svg"
                            alt="Format icon"
                            width={15}
                            height={15}
                            className=" w-5 h-5 object-contain"
                          />
                          <h4 className="text-[0.7rem] pl-[7px] font-bold text-gray-900">
                            Format
                          </h4>
                        </div>
                        <div className=" min-w-0">
                          <p className="text-xs text-gray-700 font-medium break-words">
                            {programme.card.format.type}
                          </p>
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div className="flex flex-col gap-2">
                        <div className="flex md:flex-row items-center flex-shrink-0 relative">
                          <Image
                            src="/Charters-icon/profile.svg"
                            alt="Eligibility icon"
                            width={15}
                            height={15}
                            className=" w-5 h-5 object-contain"
                          />
                          <h4 className="text-[0.7rem] pl-[7px] font-bold text-gray-900">
                            Eligibility
                          </h4>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 font-medium break-words">
                            {programme.card.eligibility.type}
                          </p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col gap-2">
                        <div className="flex md:flex-row items-center flex-shrink-0 relative">
                          <Image
                            src="/Charters-icon/schudle.svg"
                            alt="Duration icon"
                            width={15}
                            height={15}
                            className=" w-5 h-5 object-contain"
                          />
                          <h4 className="text-[0.7rem] pl-[7px] font-bold text-gray-900">
                            Duration
                          </h4>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 font-medium break-words">
                            {programme.card.duration.type}
                          </p>
                        </div>
                      </div>

                      {/* Job Openings */}
                      <div className="flex flex-col gap-2">
                        <div className="flex md:flex-row items-center flex-shrink-0 relative">
                          <Image
                            src="/Charters-icon/offer.svg"
                            alt="Job openings icon"
                            width={15}
                            height={15}
                            className=" w-5 h-5 object-contain"
                          />
                          <h4 className="text-[0.7rem] pl-[7px] font-bold text-gray-900">
                            Job openings
                          </h4>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-700 font-medium">
                            2.12 Cr (Time&apos;s News)
                            <sup className="text-xs text-gray-500">**</sup>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex md:flex-row items-center flex-shrink-0 relative">
                          <Image
                            src="/Charters-icon/offer.svg"
                            alt="Job openings icon"
                            width={15}
                            height={15}
                            className=" w-5 h-5 object-contain"
                          />
                          <h4 className="text-[0.7rem] pl-[7px] font-bold text-gray-900">
                            Expected CTC
                          </h4>
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center gap-1 text-[0.65rem]">
                            <div className="flex bg-[#E1B2A8] text-[#382D29] px-2 py-[3px] rounded-r-[1.5px] font-semibold">
                              Traditional
                              <span className="ml-[7px] font-bold text-gray-900 flex-shrink-0">
                                2.8L
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-[0.65rem]">
                            <div className="flex-1 bg-[#B30437] text-white px-2 py-[3px] rounded-r-[1.5px] font-semibold">
                              CMP
                              <span className="ml-[7px] font-bold flex-shrink-0">
                                7.3L
                                <sup className="text-[0.5rem] ml-0.5">
                                  **
                                </sup>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-[0.5px] bg-[#CCCBC9] h-auto flex-shrink-0"></div>

                    {/* Right Column (70%) - Curriculum, Fee Structure & Program Partners */}
                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                      {/* Curriculum */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 flex  flex-shrink-0 relative">
                            <Image
                              src="/Charters-icon/new_campas.svg"
                              alt="Curriculum icon"
                              width={15}
                              height={15}
                              className=" w-5 h-5 object-contain"
                            />
                          </div>
                          <h4 className="text-[0.65rem] font-bold text-gray-900">
                            Curriculum
                          </h4>
                        </div>
                        <ul className="space-y-1 ml-2">
                          {programme.card.careerOutcomes
                            .slice(0, 5)
                            .map((outcome, idx) => (
                              <li
                                key={idx}
                                className="text-[0.65rem] text-gray-700 flex items-start gap-1"
                              >
                                <span className="text-gray-600 flex-shrink-0">
                                  •
                                </span>
                                <span className="break-words">{outcome}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Program Partners */}
                      <div className="mt-[25px]">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 flex flex-shrink-0 relative">
                            <Image
                              src="/Charters-icon/new_campas.svg"
                              alt="Partners icon"
                              width={15}
                              height={15}
                              className=" w-5 h-5 object-contain"
                            />
                          </div>
                          <h4 className="text-[0.65rem] font-bold text-gray-900">
                            Partners
                          </h4>
                        </div>

                        <div className="flex items-center gap-1 items-center flex-wrap">
                          <div className="relative h-8 w-[272px] flex flex-shrink-0">
                            <Image
                              src="/charter-partner/chater-accounating-partner.avif"
                              alt="Partner 1"
                              fill
                              sizes="240px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Fee Structure */}
                      <div className="mt-[10px] space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 flex flex-shrink-0 relative">
                            <Image
                              src="/Charters-icon/new_campas.svg"
                              alt="Curriculum icon"
                              width={15}
                              height={15}
                              className=" w-5 h-5 object-contain"
                            />
                          </div>
                          <h3 className="text-[0.65rem] font-bold text-gray-900">
                            Global Internships Partners
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 items-center flex-wrap">
                          <div className="relative h-8 w-[272px] flex flex-shrink-0">
                            <Image
                              src="/charter-partner/chater-accounating-partner.avif"
                              alt="Partner 1"
                              fill
                              sizes="240px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call-to-Action Button */}
                  <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-3 pt-6 md:pt-8 mt-1">
                    <Link
                      href={`/${programme.slug}`}
                      className="block w-full md:w-auto md:flex-1"
                    >
                      <button
                        className="w-full hover:bg-[#ffffff] text-black py-2 px-4 md:px-3 flex items-center justify-center gap-2 transition-all duration-300 font-semibold text-sm md:text-xs whitespace-nowrap"
                        aria-label={`Explore ${programme.card.title} programme details`}
                        type="button"
                      >
                        <span className="truncate">
                          Explore {programme.card.title}
                        </span>
                        <Image
                          src="/Charters-icon/top_arrow-black.svg"
                          alt="Format icon"
                          width={15}
                          height={15}
                          className=" w-[12px] h-[12px] object-contain"
                        />
                      </button>
                    </Link>

                    <Link
                      href={`/${programme.slug}`}
                      className="block w-full md:w-auto"
                    >
                      <button
                        className="w-full md:w-auto bg-[#B30437] hover:bg-[#8B0329] text-white py-2 px-6 md:px-4 rounded-[5px] flex items-center justify-center gap-2 font-semibold text-sm md:text-xs transition-all duration-300 whitespace-nowrap"
                        aria-label={`Download ${programme.card.title} brochure`}
                        type="button"
                      >
                        <span>Brochure</span>
                        <Image
                          src="/Charters-icon/top_arrow-black.svg"
                          alt="Format icon"
                          width={15}
                          height={15}
                          className=" w-[12px] h-[12px] object-contain"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
