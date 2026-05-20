"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { ScholarshipData } from "@/data/programmes";
import HighlightText from "../shared/HighlightObserver";

interface ScholarshipsSectionProps {
  scholarships: ScholarshipData[];
}

const ScholarshipsSection: React.FC<ScholarshipsSectionProps> = ({
  scholarships = [],
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(
    scholarships[0].id,
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  // Initialize on mount
  useEffect(() => {
    if (scholarships && scholarships.length > 0) {
      setExpandedItem(scholarships[0].id);
      setCurrentImageSrc(scholarships[0].image);
    }
  }, []);

  const toggleExpanded = (id: string) => {
    const newExpandedItem = expandedItem === id ? null : id;

    if (
      newExpandedItem !== expandedItem &&
      scholarships &&
      scholarships.length > 0
    ) {
      setImageLoading(true);
      const newScholarship = scholarships.find((s) => s.id === newExpandedItem);

      if (newScholarship) {
        const img = new window.Image();
        img.onload = () => {
          setCurrentImageSrc(newScholarship.image);
          setTimeout(() => setImageLoading(false), 100);
        };
        img.onerror = () => setImageLoading(false);
        img.src = newScholarship.image;
      }
    }
    setExpandedItem(newExpandedItem);
  };

  const getCurrentScholarship = () => {
    if (!scholarships || scholarships.length === 0) return null;
    return scholarships.find((s) => s.id === expandedItem) || scholarships[0];
  };

  // Early return if no scholarships
  if (!scholarships || scholarships.length === 0) {
    return null;
  }

  const currentScholarship = getCurrentScholarship();
  if (!currentScholarship) return null;

  return (
    <section
      className="bg-white pt-4 sm:pt-6 md:pt-8"
      aria-labelledby="scholarships-heading"
    >
      <div className="max-w-[85rem] mx-auto">
        <header className="px-4 sm:px-6 text-center mb-13 sm:mb-14">
          <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 sm:mb-6">
            Financial Aid
          </p>
          <h2
            id="scholarships-heading"
            className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black leading-tight mb-3 sm:mb-4"
          >
            Empowering Dreams Through{" "}
            <HighlightText className="font-bold">
              Scholarships
            </HighlightText>
          </h2>
          <p className="text-lg text-black leading-relaxed">
            We never let financial hardships stand in the way of quality
            education. Scholarships cover up to 100% of the tuition.
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          {/* Left Content */}
            <div className="">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="border-b border-r border-gray-200 first:border-t last:border-b-0"
                >
                  <button
                    onClick={() => toggleExpanded(scholarship.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer hover:bg-gray-50 transition-colors duration-200 py-4 px-2 rounded-sm"
                    type="button"
                    aria-expanded={expandedItem === scholarship.id}
                  >
                    <h3 className="text-lg font-medium text-black">
                      {scholarship.title}
                    </h3>
                    <div className="ml-4 flex-shrink-0">
                      {expandedItem === scholarship.id ? (
                        <Minus className="w-5 h-5 text-[#B30437]" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#B30437]" />
                      )}
                    </div>
                  </button>

                  {expandedItem === scholarship.id && (
                    <div className="mt-4 space-y-3 px-4 sm:px-6">
                      <p className="text-black leading-relaxed">
                        {scholarship.description}
                      </p>
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-medium text-[#B30437] mt-0.5">
                          📋
                        </span>
                        <div>
                          <span className="text-sm font-medium text-black">
                            Eligibility Criteria:{" "}
                          </span>
                          <span className="text-sm text-black">
                            {scholarship.eligibility}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          {/* Right Image */}
          <aside className="relative">
            <div className="aspect-[4/3] overflow-hidden relative">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {currentImageSrc && (
                <Image
                  src={currentImageSrc}
                  alt={currentScholarship.alt}
                  fill
                  className={`object-cover transition-all duration-700 ease-in-out ${imageLoading
                    ? "opacity-0 scale-105"
                    : "opacity-100 scale-100"
                    }`}
                  onLoad={() => setImageLoading(false)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className="absolute top-0 right-0 w-2 h-16 bg-[#B30437]"></div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
