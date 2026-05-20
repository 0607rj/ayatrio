"use client";
import React, { useState, memo, useCallback } from "react";
import Image from "next/image";

interface CardData {
  id: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface ContentData {
  title: string;
  highlightText: string;
  description: string;
  stats: {
    main: {
      value: string;
      label: string;
      bgColor: string;
    };
    secondary: Array<{
      value: string;
      label: string;
      bgColor: string;
    }>;
  };
  buttonText: string;
  buttonColor: string;
  imageSrc: string;
  imageAlt: string;
}

const cardsData: CardData[] = [
  {
    id: "shadow-cxos",
    title: "Build Your Brand",
    description: "Month 1",
    color: "bg-pink-500",
    bgColor: "hover:bg-pink-50",
  },
  {
    id: "not-summer",
    title: "1&1 Career Counselling",
    description: "Month 2",
    color: "bg-purple-500",
    bgColor: "hover:bg-purple-50",
  },
  {
    id: "not-summer-month3",
    title: "1&1 Career Counselling",
    description: "Month 3",
    color: "bg-purple-500",
    bgColor: "hover:bg-purple-50",
  },
  {
    id: "not-summer-month4",
    title: "VRise: Your Job Application Hub",
    description: "Month 4",
    color: "bg-purple-500",
    bgColor: "hover:bg-purple-50",
  },
  {
    id: "real-assignments",
    title: "Placement Readiness Test",
    description: "Month 5",
    color: "bg-cyan-400",
    bgColor: "hover:bg-cyan-50",
  },
];

const contentData: Record<string, ContentData> = {
  "shadow-cxos": {
    title: "Leadership",
    highlightText: "Mentorship",
    description:
      "Work directly alongside C-level executives and senior management teams. Students get unprecedented access to boardroom discussions, strategic planning sessions, and high-level decision making processes across multiple industries.",
    stats: {
      main: {
        value: "250,000+ USD",
        label: "Average Executive Exposure Value",
        bgColor: "bg-gradient-to-r from-[#FF5A9D]/20 to-transparent",
      },
      secondary: [
        {
          value: "50+",
          label: "C-Level Mentors",
          bgColor: "bg-[#000000]/10",
        },
        {
          value: "12+",
          label: "Industry Sectors",
          bgColor: "bg-[#000000]/10",
        },
      ],
    },
    buttonText: "Charter's career ai intelligent",
    buttonColor: "bg-[#000000] hover:bg-[#000000]/90",
    imageSrc: "/home/intern.jpg",
    imageAlt: "Students in leadership mentorship program with executives",
  },
  "real-assignments": {
    title: "Placement",
    highlightText: "Readiness",
    description:
      "Prepare comprehensively for placements with our readiness test program. Assess your skills, get personalized feedback, and access targeted training to excel in interviews and assessments.",
    stats: {
      main: {
        value: "88%",
        label: "Placement Success Rate",
        bgColor: "bg-gradient-to-r from-[#00D4FF]/20 to-transparent",
      },
      secondary: [
        {
          value: "15+",
          label: "Skill Assessments",
          bgColor: "bg-[#00D4FF]/10",
        },
        {
          value: "200+",
          label: "Mock Interviews",
          bgColor: "bg-[#00D4FF]/10",
        },
      ],
    },
    buttonText: "START READINESS TEST →",
    buttonColor: "bg-[#00D4FF] hover:bg-[#00D4FF]/90",
    imageSrc: "/home/intern2.png",
    imageAlt: "Placement readiness test and training",
  },
  "not-summer": {
    title: "Flexible",
    highlightText: "Internships",
    description:
      "Unlike traditional summer-only programs, our internships run year-round with flexible scheduling. Students can gain practical experience while maintaining their academic commitments through evening and weekend opportunities.",
    stats: {
      main: {
        value: "131,760+ USD",
        label: "Cumulative Stipend (in the first year)",
        bgColor: "bg-gradient-to-r from-[#8B5CF6]/20 to-transparent",
      },
      secondary: [
        {
          value: "110+",
          label: "Internships (in the first year)",
          bgColor: "bg-[#8B5CF6]/10",
        },
        {
          value: "15+",
          label: "Countries",
          bgColor: "bg-[#8B5CF6]/10",
        },
      ],
    },
    buttonText: "Charter's career ai intelligent",
    buttonColor: "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90",
    imageSrc: "/home/intern3.png",
    imageAlt:
      "Students in flexible internship program working evenings and weekends",
  },
  "not-summer-month3": {
    title: "Career",
    highlightText: "Development",
    description:
      "Structured career development programs tailored to your goals. Work with career coaches to identify your strengths, overcome challenges, and create actionable plans for your professional growth.",
    stats: {
      main: {
        value: "95%",
        label: "Career Goals Achievement Rate",
        bgColor: "bg-gradient-to-r from-[#8B5CF6]/20 to-transparent",
      },
      secondary: [
        {
          value: "1:1",
          label: "Career Coaching Sessions",
          bgColor: "bg-[#8B5CF6]/10",
        },
        {
          value: "100+",
          label: "Career Paths Supported",
          bgColor: "bg-[#8B5CF6]/10",
        },
      ],
    },
    buttonText: "Charter's career ai intelligent",
    buttonColor: "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90",
    imageSrc: "/home/intern3.png",
    imageAlt: "Career development and coaching program",
  },
  "not-summer-month4": {
    title: "Job",
    highlightText: "Applications",
    description:
      "VRise is your comprehensive job application hub. Track applications, get real-time updates, manage interviews, and access resources to perfect your application strategy across multiple employers.",
    stats: {
      main: {
        value: "75,000+",
        label: "Jobs Listed",
        bgColor: "bg-gradient-to-r from-[#8B5CF6]/20 to-transparent",
      },
      secondary: [
        {
          value: "500+",
          label: "Partner Companies",
          bgColor: "bg-[#8B5CF6]/10",
        },
        {
          value: "30+",
          label: "Job Categories",
          bgColor: "bg-[#8B5CF6]/10",
        },
      ],
    },
    buttonText: "VIEW JOB APPLICATIONS →",
    buttonColor: "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90",
    imageSrc: "/home/intern3.png",
    imageAlt: "VRise job application hub",
  },
};

const TetrCareerLabs: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>("shadow-cxos");
  const currentContent = contentData[selectedCard];

  const handleCardClick = useCallback((cardId: string) => {
    setSelectedCard(cardId);
  }, []);

  return (
    <section className="min-h-screen pt-16 bg-white isolate">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Header Section */}
        <div className="flex-shrink-0 text-center mb-13 sm:mb-13">
          <h2 className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
            <span className="text-[#B30437]">AI-powered</span>career Career Labs
          </h2>
          <div className="flex justify-center">
            <p className="text-black text-sm sm:text-base md:text-lg max-w-4xl">
              Learn from industry leaders, academic experts, and seasoned
              practitioners who bring real-world experience to your education.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT NAVIGATION (Tabs) */}
          <div className="w-full lg:w-[14%] flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-hide">
            {cardsData.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="p-2 text-left text-nowrap border border-transparent hover:bg-gray-50"
              >
                <p className="text-xs text-gray-600 leading-relaxed">
                  {card.description}
                </p>
                <h3
                  className="font-semibold text-sm mb-1 text-black"
                >
                  {card.title}
                </h3>
              </button>
            ))}
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-[80%] flex flex-col lg:flex-row items-start">
            {/* TEXT CONTENT */}
            <div className="flex-1 text-black space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light">
                {currentContent.title}{" "}
                <em className="italic text-[#B30437]">
                  {currentContent.highlightText}
                </em>
              </h3>

              <p className="text-sm sm:text-base leading-relaxed">
                {currentContent.description}
              </p>

              {/* STATS */}
              <div className="space-y-6">
                <div className="relative pl-4">
                  <div
                    className={`absolute left-0 -top-2 w-16 h-12 ${currentContent.stats.main.bgColor} rounded-lg`}
                  />
                  <div className="relative z-10">
                    <div className="text-2xl lg:text-3xl font-light">
                      {currentContent.stats.main.value}
                    </div>
                    <p className="text-[#B30437] text-xs font-medium">
                      {currentContent.stats.main.label}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  {currentContent.stats.secondary.map((stat, i) => (
                    <div key={i} className="relative pl-4">
                      <div
                        className={`absolute left-0 top-0 w-8 h-8 ${stat.bgColor} rounded-lg`}
                      />
                      <div className="relative z-10">
                        <div className="text-xl font-light">{stat.value}</div>
                        <p className="text-[#B30437] text-xs font-medium">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className={`${currentContent.buttonColor} text-white px-6 py-3 rounded-lg text-sm font-semibold`}
              >
                {currentContent.buttonText}
              </button>
            </div>

            {/* IMAGE — REDUCED WIDTH */}
            <div className="w-full h-full lg:w-[39%]">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  key={selectedCard}
                  src={currentContent.imageSrc}
                  alt={currentContent.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TetrCareerLabs);
