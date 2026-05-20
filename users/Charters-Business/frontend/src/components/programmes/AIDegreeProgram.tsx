"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { DegreeProgramData } from "@/lib/server/programmes";
import HighlightText from "../shared/HighlightObserver";

interface AIDegreeComponentProps {
  data: DegreeProgramData;
}

const AIDegreeProgram: React.FC<AIDegreeComponentProps> = ({ data }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    data.accordions[0]?.id || null,
  );

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <section
      className="bg-white pt-4 sm:pt-6 md:pt-8"
      aria-labelledby="degree-program-heading"
    >
      <div className="max-w-[85rem] mx-auto">
        {/* Header */}
        <header className="mb-8 lg:mb-12 text-center px-4 sm:px-6 lg:px-8">
          <p
            className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 lg:mb-6"
            role="text"
          >
            {data.badge}
          </p>

          <h2
            id="degree-program-heading"
            className="text-1xl sm:text-2xl lg:text-3xl text-black mb-4 lg:mb-6 leading-tight text-center"
          >
            {data.title.prefix}{" "}
            <HighlightText className="font-bold">
              {data.title.highlight}
            </HighlightText>{" "}
            {data.title.suffix}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-start w-full border-t border-gray-200">
          {/* Campus Image - Shows first on mobile, second on desktop */}
          <aside className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-lg lg:rounded-none">
              <Image
                src={data.campusImage.src}
                alt={data.campusImage.alt}
                width={600}
                height={500}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </aside>

          {/* Accordions Content - Shows second on mobile, first on desktop */}
          <div className="order-2 lg:order-1">
            {data.accordions.map((accordion) => (
              <div
                key={accordion.id}
                className="border-b border-r border-gray-200 bg-white overflow-hidden rounded-lg lg:rounded-none"
              >
                <button
                  onClick={() => toggleAccordion(accordion.id)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  type="button"
                  aria-expanded={openAccordion === accordion.id}
                >
                  <span className="text-black font-medium text-sm sm:text-base pr-4">
                    {accordion.title}
                  </span>
                  <div className="flex-shrink-0">
                    {openAccordion === accordion.id ? (
                      <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-[#B30437]" />
                    ) : (
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-[#B30437]" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openAccordion === accordion.id
                    ? "max-h-160 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-black space-y-3">
                    <ul className="space-y-3">
                      {accordion.items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-[#B30437] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span
                            className="text-sm sm:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: item.replace(
                                /\*\*(.*?)\*\*/g,
                                "<strong>$1</strong>",
                              ),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Partners Section */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Academic Partners */}
                <div>
                  <h3 className="text-black font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
                    Academic Partners
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    {data.academicPartners.map((partner, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {partner.logo ? (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded flex items-center justify-center">
                            <span className="text-black font-bold text-xs">
                              {partner.logo}
                            </span>
                          </div>
                        ) : null}
                        <div className="text-black text-xs sm:text-sm">
                          <div className="font-medium">{partner.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Immersions */}
                <div>
                  <h3 className="text-black font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
                    Immersions
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    {data.immersions.map((immersion, index) => (
                      <div
                        key={index}
                        className="text-black font-bold text-lg sm:text-xl"
                      >
                        {immersion.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIDegreeProgram;
