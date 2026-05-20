"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { scholarships } from "@/data/applyPageData";

const ScholarshipsSection: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  // Scholarship images mapping
  const scholarshipImages: { [key: string]: { image: string; alt: string } } = {
    "1": {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      alt: "The Outliers Scholarship - Celebrating exceptional talents beyond academics",
    },
    "2": {
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      alt: "The Community Leaders Scholarship - Supporting community service leaders",
    },
    "3": {
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      alt: "The Entrepreneur & Innovation Scholarship - Supporting young entrepreneurs",
    },
    "4": {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
      alt: "The SAT Merit Scholarship - Recognizing academic excellence",
    },
    "5": {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      alt: "The Pathfinders Scholarship - Supporting resilient students",
    },
    "6": {
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
      alt: "The Transfer Students Scholarship - Supporting transfer students",
    },
    "7": {
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      alt: "The Aspire Grant - Need-based financial support",
    },
    "8": {
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      alt: "The Women in Business Scholarship - Empowering female leaders",
    },
  };

  // Initialize on mount
  useEffect(() => {
    if (scholarships && scholarships.length > 0) {
      setExpandedItem(scholarships[0].id);
      setCurrentImageSrc(scholarshipImages[scholarships[0].id]?.image || "");
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
      const imageData = scholarshipImages[newExpandedItem || "1"];

      if (imageData) {
        const img = new window.Image();
        img.onload = () => {
          setCurrentImageSrc(imageData.image);
          setTimeout(() => setImageLoading(false), 100);
        };
        img.onerror = () => setImageLoading(false);
        img.src = imageData.image;
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

  const currentImageData = scholarshipImages[currentScholarship.id];

  return (
    <section
      className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6"
      aria-labelledby="scholarships-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <header>
              <h2
                id="scholarships-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-black leading-tight mb-3 sm:mb-4"
              >
                Empowering Dreams Through{" "}
                <span className="bg-[#B30437] text-white px-2 py-1 rounded inline-block">
                  Scholarships
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed max-w-lg">
                We never let financial hardships stand in the way of quality
                education. Scholarships cover up to 100% of the tuition.
              </p>
            </header>

            <div className="space-y-4">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => toggleExpanded(scholarship.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer hover:bg-gray-50 transition-colors duration-200 py-2 px-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B30437]"
                    type="button"
                    aria-expanded={expandedItem === scholarship.id}
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-black group-hover:text-[#B30437] transition-colors">
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
                    <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                      <p className="text-sm sm:text-base text-black leading-relaxed">
                        {scholarship.description}
                      </p>
                      <div className="flex items-start gap-2">
                        <span className="text-xs sm:text-sm font-medium text-[#B30437] mt-0.5">
                          📋
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-black">
                            Eligibility Criteria:{" "}
                          </span>
                          <span className="text-xs sm:text-sm text-black">
                            {scholarship.eligibility.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <aside className="relative order-1 lg:order-2">
            <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] overflow-hidden relative rounded-sm">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 flex items-center justify-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {currentImageSrc && currentImageData && (
                <Image
                  src={currentImageSrc}
                  alt={currentImageData.alt}
                  fill
                  className={`object-cover transition-all duration-700 ease-in-out ${imageLoading
                      ? "opacity-0 scale-105"
                      : "opacity-100 scale-100"
                    }`}
                  onLoad={() => setImageLoading(false)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
            <div className="absolute top-0 right-0 w-1.5 sm:w-2 h-12 sm:h-16 bg-[#B30437]"></div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
