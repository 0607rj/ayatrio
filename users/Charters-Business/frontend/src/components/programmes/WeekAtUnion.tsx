"use client";

import React from "react";
import Image from "next/image";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import HighlightText from "../shared/HighlightObserver";

interface WeekAtTetrProps {
  data?: {
    imageSrc?: string;
    title?: string;
    subtitle?: string;
  };
}

const WeekAtTetr = ({ data }: WeekAtTetrProps) => {
  const timetableImage =
  data?.imageSrc ||
  "charters-business/images/weekattetr/ug-timetable";

const heading =
  data?.title || "What's a Week at Charters Business Like?";

const subtitle =
  data?.subtitle ||
  "Start your day with ambition and end it with impact. At Charters, every week pushes boundaries.";
  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#week-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50"
      >
        Skip to weekly schedule content
      </a>

      <main
        className="pt-4 sm:pt-6 md:pt-8 bg-white"
        role="main"
        aria-labelledby="week-heading"
      >
        <div className="max-w-[85rem] mx-auto">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8" id="week-content">
            <h2
              id="week-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black mb-3 sm:mb-4 text-center"
            >
              <HighlightText className="font-bold">
                {heading}
              </HighlightText>
            </h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg  ">
              {subtitle}
            </p>
          </div>

          {/* Timetable Image */}
          <section
            className="flex justify-center"
            role="region"
            aria-labelledby="timetable-heading"
          >
            <h2 id="timetable-heading" className="sr-only">
              Weekly Schedule Overview
            </h2>
            <figure className="relative w-full ">
              <Image
                src={getCloudinaryUrl(
                  timetableImage,
                  {
                    width: 1200,
                    quality: "auto",
                    format: "auto",
                  }
                )}
                alt="Weekly timetable showing daily activities at Tetr including morning sessions, afternoon workshops, evening projects, and weekend activities"
                width={1200}
                height={800}
                className="w-full h-auto  shadow-lg border border-gray-200"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
              <figcaption className="sr-only">
                Comprehensive weekly schedule displaying structured learning
                activities, practical workshops, and collaborative projects
                throughout the week at Tetr.
              </figcaption>
            </figure>
          </section>
        </div>
      </main>
    </>
  );
};

export default WeekAtTetr;
