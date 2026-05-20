"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Image from "next/image";
import HighlightText from "@/components/shared/HighlightObserver";

const hanson_heading = {
  description: "Innovative learning programs | Practical, hands-on experience | Real-world business exposure"
}

type CategoryKey =
  | "No-code AI Development"
  | "Creator Challenge"
  | "Specialization"
  | "CXO Mentorship Programme"
  | "Dropshipping Challenge";

interface ProgramData {
  title?: string;
  description?: string;
  achievement?: string;
  linkText?: string;
  image?: string;

  // Dropshipping
  stores?: Array<{ name: string; url: string | null; logo: string | null }>;

  // Creator
  profiles?: Array<{ name: string; handle: string; avatar: string }>;
  specializationTracks?: string[];
  skills?: string[];
  projects?: Array<{
    name: string;
    description: string;
    icon: string;
    color: string;
  }>;
  subjectsLink?: string;
  mentors?: Array<{ name: string; title: string; avatar: string }>;
  specializations?: string[];
  tools?: Array<{ name: string; icon: string }>;
  techniques?: Array<{ name: string; icon: string }>;
}
const MenuItem = memo<{
  category: CategoryKey;
  index: number;
  isActive: boolean;
  onClick: () => void;
}>(({ category, index, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center border-b border-[#efefef] px-2 sm:px-[15px] py-2 sm:py-3 bg-white text-[#272C18]"
      aria-pressed={isActive}
      type="button"
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-shrink-0 relative">
        <Image
          src="/Charters-icon/new_campas.svg"
          alt="Format icon"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>

      <div className="flex-1 text-left min-w-0">
        <p
          className={`uppercase tracking-wider font-semibold text-[11px] sm:text-[14px] transition-colors text-black
            }`}
        >
          Month {index + 1}
        </p>
        <div
          className={`font-semibold text-[18px] transition-colors text-xs md:text-sm  text-black
            }`}
        >
          {category}
        </div>
      </div>
    </button>
  );
});

MenuItem.displayName = "MenuItem";

// Content Card Component
const ContentCard = memo<{
  category: CategoryKey;
  index: number;
  activeIndex: number;
  slideDistance: number;
  fadeThreshold: number;
  zoomOutAmount: number;
  fadeAmount: number;
  contentData: Record<string, ProgramData>;
}>(
  ({
    category,
    index,
    activeIndex,
    slideDistance,
    fadeThreshold,
    zoomOutAmount,
    fadeAmount,
    contentData,
  }) => {
    const currentCardIndex = Math.floor(activeIndex);
    const nextCardIndex = currentCardIndex + 1;
    const scrollProgress = activeIndex - currentCardIndex;

    const isCurrentCard = index === currentCardIndex;
    const isNextCard = index === nextCardIndex;
    const isVisible = isCurrentCard || isNextCard;

    let yPosition = 0;
    let opacity = 1;
    let zIndex = 1000;
    let scale = 1;

    if (isCurrentCard) {
      yPosition = 0;
      zIndex = 1010;

      if (scrollProgress > fadeThreshold) {
        const fadeProgress =
          (scrollProgress - fadeThreshold) / (1 - fadeThreshold);
        scale = 1 - fadeProgress * zoomOutAmount;
        opacity = 1 - fadeProgress * fadeAmount;
      } else {
        scale = 1;
        opacity = 1;
      }
    } else if (isNextCard) {
      yPosition = slideDistance * (1 - scrollProgress);
      opacity = 1;
      zIndex = 1020;
      scale = 1;
    } else if (index > currentCardIndex) {
      yPosition = slideDistance;
      opacity = 0;
      zIndex = 1000 - (index - currentCardIndex);
      scale = 1;
    } else {
      yPosition = -8 * (currentCardIndex - index);
      opacity = 0;
      zIndex = 1000 - (currentCardIndex - index);
      scale = 1;
    }
    // ===== PRODUCTION-READY MAPPING LAYER =====
    const allTools = contentData[category]?.tools || [];

    const specializationToolMap: Record<string, string[]> = {
      "Foundations of AI & No-Code Product Building": [
        "OpenAI",
        "Canva",
        "Notion",
        "Typedream",
      ],
      "Voice, Multimodal & Agentic AI": ["OpenAI", "Descript", "Cloud", "Bolt"],
      "AI Automation & Workflow Design": [
        "Make",
        "Zapier",
        "Airtable",
        "Notion",
      ],
      "AI SaaS Prototyping": ["Typedream", "Bolt", "Cloud", "OpenAI"],
    };
    const specializationTechniqueMap: Record<string, string[]> = {
      "Foundations of AI & No-Code Product Building": [
        "Prompt Engineering",
        "Reading API Docs",
        "No-code Deployment",
      ],

      "Voice, Multimodal & Agentic AI": [
        "Prompt Engineering",
        "Voice Transcription",
      ],

      "AI Automation & Workflow Design": [
        "Reading API Docs",
        "No-code Deployment",
      ],

      "AI SaaS Prototyping": [
        "Prompt Engineering",
        "Reading API Docs",
        "No-code Deployment",
      ],
    };

    const specializations = contentData[category]?.specializations || [];
    const [activeSpec, setActiveSpec] = useState(specializations[0]);

    const getToolsForSpecialization = (spec: string) => {
      const allowedToolNames = specializationToolMap[spec] || [];
      return allTools.filter((tool) => allowedToolNames.includes(tool.name));
    };
    const allTechniques = contentData[category]?.techniques || [];

    const getTechniquesForSpecialization = (spec: string) => {
      const allowedNames = specializationTechniqueMap[spec] || [];
      return allTechniques.filter((tech) => allowedNames.includes(tech.name));
    };

    return (
      <div
        className="absolute w-full h-full flex items-start justify-center hands-on-card-container "
        style={{
          transform: `translateY(${yPosition}px)`,
          opacity: isVisible ? opacity : 0,
          zIndex,
          pointerEvents: isVisible ? "auto" : "none",
          inset: "0",
        }}
      >
        <div
          className="w-full max-w-5xl bg-white overflow-hidden mx-2 sm:mx-auto hands-on-card-scale flex flex-col sm:flex-row"
          style={{
            transform: `scale(${scale})`,
            height: "calc(100dvh - 2rem)",
            maxHeight: "calc(100dvh - 2rem)",
          }}
        >
          {/* Mobile Image - Horizontal at top (visible only on mobile) */}
          <div className="block sm:hidden w-full h-40 flex-shrink-0 overflow-hidden bg-gray-100">
            <Image
              src={
                contentData[category]?.image ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
              }
              alt={`Visual representation of ${contentData[category]?.title || category
                } program`}
              width={640}
              height={160}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>



          {/* Right Section - Content */}
          <div className="w-full sm:w-4/5 flex flex-col overflow-hidden">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 h-full flex flex-col overflow-hidden">
              {/* Program Header */}
              <div className="mb-1 sm:mb-2 flex-shrink-0 relative">
                {(() => {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const InsideHeading =
                      require("../shared/InsideHeading").default;
                    return (
                      <InsideHeading
                        title={contentData[category]?.title || "Coming Soon"}
                        description={
                          contentData[category]?.description ||
                          "Program details will be available soon."
                        }
                      />
                    );
                  } catch (e) {
                    return (
                      <>
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-black mb-1">
                          {contentData[category]?.title || "Coming Soon"}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                          {contentData[category]?.description ||
                            "Program details will be available soon."}
                        </p>
                      </>
                    );
                  }
                })()}
                {/* YEAR-3 badge */}
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  YEAR-3
                </div>
              </div>

              {/* Category-Specific Content */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 flex-1 overflow-y-auto min-h-0 scrollbar-hide">
                {category === "Specialization" && contentData[category] && (
                  <section
                    aria-labelledby="specialization-heading"
                    className="bg-white rounded-xl"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] font-medium mb-2">
                        🎯 Students choose one of the following specialization
                        tracks
                      </div>

                      <ol className="list-decimal list-inside flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-gray-700 mb-1">
                        {contentData[category].specializationTracks?.map(
                          (track) => (
                            <li
                              key={track}
                              className=" inline-flex  w-max whitespace-nowrap"
                            >
                              {track}
                            </li>
                          ),
                        )}
                      </ol>

                      <p className="text-[10px] text-gray-500 italic">
                        Students build complex systems and applications in their
                        chosen track.
                      </p>
                    </div>

                    {/* ================= PART 2: PROJECTS ================= */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-semibold mb-2">
                        🧩 High-impact projects
                      </div>

                      <div
                        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                        role="list"
                        aria-label="High impact projects"
                      >
                        {contentData[category].projects?.map((project) => (
                          <div
                            key={project.name}
                            role="listitem"
                            className="flex-shrink-0 w-[180px]"
                          >
                            <h5 className="text-[10px] font-semibold text-gray-900 leading-tight h-[28px] line-clamp-2 mb-1">
                              {project.name}
                            </h5>

                            <div
                              className={`${project.color} h-[90px] rounded-lg flex items-center justify-center mb-1`}
                            >
                              <span className="text-3xl scale-75">
                                {project.icon}
                              </span>
                            </div>

                            <p className="text-[9px] text-gray-600 leading-tight line-clamp-3">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ================= PART 3: SKILLS ================= */}
                    <div>
                      <div className="inline-flex items-center gap-3 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-[10px] font-semibold mb-1">
                        ✨ Skills you’ll build
                      </div>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-700 mb-3">
                        {contentData[category].skills?.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="w-full border border-dashed border-blue-400 text-blue-700 text-[11px] font-medium py-2 rounded-lg hover:bg-blue-50 transition"
                      >
                        📘 View subjects list
                      </button>
                    </div>
                  </section>
                )}

                {category === "Creator Challenge" && contentData[category] && (
                  <section aria-labelledby="influencers-heading">
                    <h4
                      id="influencers-heading"
                      className="text-xs sm:text-sm md:text-base font-semibold text-black mb-2 sm:mb-3 md:mb-4"
                    >
                      Meet Our Resident Influencers
                    </h4>

                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4"
                      role="list"
                      aria-label="Student influencers"
                    >
                      {contentData[category].profiles
                        ?.slice(0, 4)
                        .map((profile, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                            role="listitem"
                          >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-300"></div>
                            <div>
                              <p
                                className="font-semibold text-black text-xs sm:text-sm"
                                role="text"
                              >
                                {profile.name}
                              </p>
                              <p
                                className="text-[10px] sm:text-xs text-gray-600"
                                role="text"
                              >
                                {profile.handle}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {category === "CXO Mentorship Programme" &&
                  contentData[category] && (
                    <section aria-labelledby="mentors-heading">
                      <h4
                        id="mentors-heading"
                        className="text-xs sm:text-sm md:text-base font-semibold text-black mb-2 sm:mb-3 md:mb-4"
                      >
                        Our Mentors Include
                      </h4>

                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4"
                        role="list"
                        aria-label="CXO mentors"
                      >
                        {contentData[category].mentors
                          ?.slice(0, 4)
                          .map((mentor, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-2"
                              role="listitem"
                            >
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-300"></div>
                              <div>
                                <p
                                  className="font-semibold text-black text-xs sm:text-sm"
                                  role="text"
                                >
                                  {mentor.name}
                                </p>
                                <p
                                  className="text-[10px] sm:text-xs text-gray-600"
                                  role="text"
                                >
                                  {mentor.title}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </section>
                  )}

                {category === "Dropshipping Challenge" &&
                  contentData[category] && (
                    <section aria-labelledby="student-stores-heading">
                      <p
                        className="text-xs sm:text-sm md:text-base text-black mb-2 sm:mb-3"
                        role="text"
                      >
                        Students have dropshipped products ranging from pet
                        supplies to green stationery worth over{" "}
                        <span className="font-bold">INR 2 Cr.</span>
                      </p>

                      <h4
                        id="student-stores-heading"
                        className="text-xs sm:text-sm md:text-base font-semibold text-black mb-2 sm:mb-3 md:mb-4"
                      >
                        Shop At Our Students' Stores
                      </h4>

                      <div
                        className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4"
                        role="list"
                        aria-label="Student e-commerce stores"
                      >
                        {contentData[category].stores?.map(
                          (store, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-50 hands-on-store-card cursor-pointer"
                              role="listitem"
                            >
                              <span
                                className="font-bold text-[10px] sm:text-xs text-gray-800"
                                role="text"
                              >
                                {store.name}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </section>
                  )}

                {category === "No-code AI Development" &&
                  contentData[category] && (
                    <section className="flex flex-col gap-3  ">
                      {/* ===== BADGE ===== */}
                      <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] font-medium w-fit ">
                        Students choose one of the following specialization
                        tracks
                      </div>

                      {/* ===== SPECIALIZATION TABS ===== */}
                      <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-hide">
                        {specializations.map((spec) => {
                          const isActive = spec === activeSpec;

                          return (
                            <button
                              key={spec}
                              onClick={() => setActiveSpec(spec)}
                              className={`flex-shrink-0 px-2 py-1 max-w-[160px] border-b-2 transition-all duration-300 hover:-translate-y-1 cursor-pointer
                                ${isActive
                                  ? "border-b-gray-500 bg-white"
                                  : "border-b-transparent bg-gray-50 hover:border-b-gray-300"
                                }`}
                            >
                              <p className="text-[10px] text-gray-700 leading-snug line-clamp-2 text-left">
                                {spec}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* ===== TOOLS (DYNAMIC, CORRECT) ===== */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {getToolsForSpecialization(activeSpec).map((tool) => {
                          return (
                            <div
                              key={tool.name}
                              className="bg-[#01212c] text-white px-2 py-1 rounded-full text-[13px] flex items-center gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
                            >
                              <Image src={tool.icon} alt={tool.name} width={12} height={12} className="w-4 h-4" />
                              <span>{tool.name}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* ===== TECHNIQUES ===== */}
                      <div>
                        <h4 className="text-[11px] font-semibold text-black mb-1">
                          Techniques
                        </h4>

                        <div className="grid grid-cols-4 gap-1.5">
                          {getTechniquesForSpecialization(activeSpec).map(
                            (tech) => {
                              return (
                                <div
                                  key={tech.name}
                                  className="border border-gray-200 rounded-md p-1.5 text-center"
                                >
                                  <div className="mb-0.5 flex justify-center">
                                    <Image src={tech.icon} alt={tech.name} width={12} height={12} className="w-5 h-5 text-gray-700" />
                                  </div>
                                  <p className="text-[10px] text-gray-700 leading-tight">
                                    {tech.name}
                                  </p>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>

                      {/* ===== PROJECTS ===== */}

                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-1.5 mb-2 text-green-700 text-[11px] font-semibold">
                          <span>✅</span>
                          <span>High-impact projects</span>
                        </div>

                        {/* Horizontal Cards */}
                        <div className="flex gap-3 overflow-x-auto pb-2 crollbar-hide">
                          {contentData[category]?.projects?.map((project) => (
                            <div key={project.name} className="w-[180px]">
                              <h5 className="text-[10px] font-semibold text-gray-900 h-[28px] leading-tight mb-1">
                                {project.name}
                              </h5>
                              <div
                                className={`${project.color} h-[96px] rounded-lg flex items-center justify-center`}
                              >
                                <span className="text-3xl">{project.icon}</span>
                              </div>
                              <p className="text-[9px]">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                {/* Call-to-Action Button */}
                {category !== "No-code AI Development" &&
                  category !== "Specialization" && (
                    <div className="mt-auto pt-2 sm:pt-3 md:pt-4 flex-shrink-0">
                      <button
                        className="bg-[#B30437] hover:bg-[#8B0329] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base hands-on-cta-button flex items-center space-x-2"
                        aria-label={`View all ${category} details`}
                        type="button"
                      >
                        <span>Explore {category}</span>
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {/* Left Section - Vertical Image (hidden on mobile) */}
          <div className="hidden sm:block sm:w-[23%] flex-shrink-0 overflow-hidden h-full">
            <Image
              src={
                contentData[category]?.image ||
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
              }
              alt={`Visual representation of ${contentData[category]?.title || category
                } program`}
              width={300}
              height={400}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    );
  },
);

ContentCard.displayName = "ContentCard";

function HandsOnLearningComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [shouldMenuScroll, setShouldMenuScroll] = useState(false);

  // Refs for performance-critical values
  const rafId = useRef<number | null>(null);
  const lastProgress = useRef(0);

  const categories: CategoryKey[] = [
    "No-code AI Development",
    "Creator Challenge",
    "Specialization",
    "CXO Mentorship Programme",
    "Dropshipping Challenge",
  ];

  const contentData: Record<string, ProgramData> = {
    "Dropshipping Challenge": {
      title: "Launch & Run an E-commerce Store",
      description:
        "From running marketing campaigns to managing supply chains, students build their own websites and compete for revenue.",
      achievement:
        "Students have dropshipped products ranging from pet supplies to green stationery worth over INR 2 Cr.",
      linkText: "Shop At Our Students' Stores",
      image:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081795/vgq4vkzkcvefkpv1lss2_h6ydos.avif",
      stores: [
        { name: "LIGHTRANCE", url: null, logo: null },
        { name: "kaRaR", url: null, logo: null },
        { name: "NAVA", url: null, logo: null },
        { name: "URBANA BIJOUX", url: null, logo: null },
        { name: "Auphery", url: null, logo: null },
        { name: "SOUL", url: null, logo: null },
      ],
    },
    "Creator Challenge": {
      title: "Become a Creator-preneur",
      description:
        "From identifying a content niche to building an audience, students are trained to grow their personal brands on Youtube, Instagram, and LinkedIn.",
      achievement: "Meet Our Resident Influencers",
      linkText: "Meet Our Resident Influencers",
      image:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081795/pnh1arwigr92tkawxv6t_wetftd.avif",
      profiles: [
        { name: "Anurag Bansal", handle: "@businesswithbansal", avatar: "" },
        { name: "Sunakshi", handle: "@the_humming_snitch", avatar: "" },
        { name: "Sahil Kumrah", handle: "@kumrahplanet", avatar: "" },
        { name: "chandrayee", handle: "@chandrayee_bose", avatar: "" },
        { name: "Yash Shah", handle: "@mediummasala", avatar: "" },
      ],
    },
    Specialization: {
      title: "Specialization",
      description:
        "After mastering the fundamentals, students choose a specialization and build real-world, scalable systems.",

      image:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081795/m64yqpshdiwiztfj3xry_e03vqn.avif",

      specializationTracks: [
        "Software Development",
        "Artificial Intelligence & Machine Learning",
        "Blockchain & Cybersecurity",
        "Algorithmic Trading (High-Frequency Trading)",
      ],

      projects: [
        {
          name: "Blockchain Decentralized Marketplace",
          description:
            "Build a decentralized marketplace with smart contracts, custom tokens, and NFT integration.",
          icon: "₿",
          color: "bg-yellow-100",
        },
        {
          name: "Fake News Detection System",
          description:
            "Design an NLP-powered AI system to detect misinformation across news platforms.",
          icon: "📰",
          color: "bg-pink-100",
        },
        {
          name: "Text Summarisation Engine",
          description:
            "Create an NLP-based engine to summarize large documents and research papers.",
          icon: "📄",
          color: "bg-purple-100",
        },
      ],

      skills: [
        "Blockchain Fundamentals",
        "Cloud Computing",
        "Deep Learning",
        "Natural Language Processing (NLP)",
        "Cybersecurity",
        "Algorithmic Trading",
        "Low-Level Design (LLD)",
        "High-Level Design (HLD)",
        "Microservices Architecture",
        "Generative AI",
      ],

      subjectsLink: "/curriculum/local-consulting",
    },

    "CXO Mentorship Programme": {
      title: "Get Mentored by Top CXOs",
      description:
        "Experience one-on-one mentorship, coaching and guidance from CXOs across industries.",
      achievement: "Our Mentors Include",
      linkText: "Meet Our Mentors",
      image:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081794/k9yb4pex58iqxdce2zru_xjcckt.avif",
      mentors: [
        {
          name: "Rajnish Virmani",
          title: "Ex President, COO at Reliance",
          avatar: "",
        },
        {
          name: "Sandeep Bidani",
          title: "Ex Executive Director-HR at IBM",
          avatar: "",
        },
        {
          name: "Andrea Stone",
          title: "Ex CMO at Mahindra Comviva",
          avatar: "",
        },
        {
          name: "Sandeep Suri",
          title: "Former Country Head at Fidelity Investments, Ireland",
          avatar: "",
        },
      ],
    },
    "No-code AI Development": {
      title: "AI on Curriculum",
      description:
        "After mastering the basics, it's time to choose your path and specialize.",
      image:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081794/dmmnhtok1iwgjpzvzgjw_l3zfw9.avif",

      specializations: [
        "Foundations of AI & No-Code Product Building",
        "Voice, Multimodal & Agentic AI",
        "AI Automation & Workflow Design",
        "AI SaaS Prototyping",
      ],

      tools: [
        { name: "Make", icon: "/Charters-icon/Cancel.svg" },
        { name: "OpenAI", icon: "/Charters-icon/Cancel.svg" },
        { name: "Canva", icon: "/Charters-icon/Cancel.svg" },
        { name: "Zapier", icon: "/Charters-icon/Cancel.svg" },
        { name: "Typedream", icon: "/Charters-icon/Cancel.svg" },
        { name: "Airtable", icon: "/Charters-icon/Cancel.svg" },
        { name: "Cloud", icon: "/Charters-icon/Cancel.svg" },
        { name: "Bolt", icon: "/Charters-icon/Cancel.svg" },
        { name: "Descript", icon: "/Charters-icon/Cancel.svg" },
        { name: "Notion", icon: "/Charters-icon/Cancel.svg" },
      ],

      techniques: [
        { name: "Prompt Engineering", icon: "/Charters-icon/Cancel.svg" },
        { name: "Reading API Docs", icon: "/Charters-icon/Cancel.svg" },
        { name: "Voice Transcription", icon: "/Charters-icon/Cancel.svg" },
        { name: "No-code Deployment", icon: "/Charters-icon/Cancel.svg" },
      ],

      projects: [
        {
          name: "Blockchain Decentralized Marketplace",
          description:
            "Create a blockchain-based marketplace with custom tokens and NFT integration",
          icon: "₿",
          color: "bg-yellow-100",
        },
        {
          name: "Fake News Detection",
          description:
            "Develop an AI model to identify and filter fake news using NLP",
          icon: "📰",
          color: "bg-pink-100",
        },
        {
          name: "Text Summarisation",
          description: "Build an NLP-powered tool for summarising large texts",
          icon: "📄",
          color: "bg-purple-100",
        },
      ],
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentItemIndex = Math.round(activeIndex);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      // Cancel any pending animation frame to prevent buildup
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (containerRect.top <= 0 && containerRect.bottom >= windowHeight) {
          const scrollableHeight =
            containerRef.current.offsetHeight - windowHeight;
          const currentScroll = Math.abs(containerRect.top);
          const progress = Math.max(
            0,
            Math.min(1, currentScroll / scrollableHeight),
          );

          const smoothActiveIndex = progress * (categories.length - 1);

          // Only update state if value has changed significantly
          const diff = Math.abs(progress - lastProgress.current);
          if (diff > 0.001) {
            setActiveIndex(smoothActiveIndex);
            lastProgress.current = progress;

            const isNearLastCard = smoothActiveIndex >= categories.length - 1.2;
            setShouldMenuScroll(isNearLastCard);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mounted, categories.length]);

  // Auto-scroll mobile navigation to center active month
  useEffect(() => {
    if (!mobileNavRef.current || !mounted) return;

    const activeButton = mobileNavRef.current.querySelector(
      `button:nth-child(${currentItemIndex + 1})`,
    ) as HTMLElement;

    if (activeButton) {
      const container = mobileNavRef.current;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.offsetWidth;
      const containerWidth = container.offsetWidth;

      // Calculate scroll position to center the button
      const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentItemIndex, mounted]);

  const handleMenuClick = useCallback(
    (targetIndex: number) => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollableHeight = containerHeight - windowHeight;

      const targetProgress = targetIndex / (categories.length - 1);
      const targetScrollOffset = targetProgress * scrollableHeight;
      const finalScrollPosition = containerTop + targetScrollOffset;

      window.scrollTo({
        top: finalScrollPosition,
        behavior: "smooth",
      });
    },
    [categories.length],
  );

  if (!mounted) {
    return null;
  }

  return (
    <section className="mx-[0%] relative">
      {/* Header Section  */}
      <div
        className="relative z-[5] flex items-start justify-center py-2 sm:py-3 md:py-4 lg:py-5 bg-white"
        role="region"
        aria-labelledby="hands-on-heading"
      >
        <div className="w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="relative text-center" role="article">
            {/* Title Section */}
            <div className="">
              <p
                className="text-xs sm:text-sm text-[#B30437] pb-2 sm:pb-3 md:pb-4"
                role="text"
              >
                HANDS-ON APPROACH
              </p>
              <h2
                id="hands-on-heading"
                className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
              >
                Hands-on.
                <HighlightText className="mx-1 sm:mx-2 font-bold">
                  Disruptive.
                </HighlightText>
                Experiential.
              </h2>
            </div>

            {/* Description */}
            <div className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:justify-center sm:items-center gap-3 sm:gap-6 mb-2 sm:mb-4 w-fit mx-auto sm:w-full">
              {hanson_heading.description.split("|").map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src="/dot-icon.svg"
                    alt=""
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base text-gray-700 font-medium leading-snug whitespace-nowrap">
                    {item.trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Container */}
      <div ref={containerRef} className="relative hands-on-container">
        <div
          className={`sticky flex flex-col h-dvh sm:h-screen hands-on-sticky-transition ${shouldMenuScroll ? "top-0" : "top-12 sm:top-16"
            }`}
        >
          {/* Mobile Month Navigation - Horizontal at top */}
          <div
            ref={mobileNavRef}
            className="lg:hidden w-full bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide flex-shrink-0"
          >
            <div className="flex gap-2 px-2 py-3 min-w-max">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => handleMenuClick(index)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg border transition-all ${index === currentItemIndex
                    ? "bg-[#B30437] text-white border-[#B30437]"
                    : "bg-white text-[#272C18] border-[#efefef]"
                    }`}
                  aria-pressed={index === currentItemIndex}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex-shrink-0 relative">
                      <Image
                        src={
                          index === currentItemIndex
                            ? "/Charters-icon/new store white.svg"
                            : "/Charters-icon/new_campas.svg"
                        }
                        alt="Format icon"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <p
                        className={`uppercase tracking-wider font-semibold text-[9px] ${index === currentItemIndex
                          ? "text-white"
                          : "text-[#272C18]"
                          }`}
                      >
                        Month {index + 1}
                      </p>
                      <div
                        className={`font-semibold text-[11px] whitespace-nowrap ${index === currentItemIndex
                          ? "text-white"
                          : "text-[#272C18]"
                          }`}
                      >
                        {category}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-[85rem] border-t border-gray-200  mx-auto mt-2 flex flex-1 min-h-0">
            {/* Left Section - menu (Desktop only) */}
            <div className="w-1/4 hidden lg:block relative border-r border-gray-300">
              <div ref={menuRef} className="flex flex-col">
                <div className=" flex-1 flex flex-col ">
                  {/* Header */}
                  <div className="mb-6 pt-4">
                    {/* <h3 className="text-xl font-light text-black mb-2">
                      100+ Top MNC's in class
                    </h3> */}
                    <div className="mb-3">
                      <Image
                        src="/home/charters-faculty-member.avif"
                        alt="Charters Faculty Member"
                        width={330}
                        height={104}
                        className="h-25 w-full p-[7px] object-contain rounded"
                        sizes="(max-width: 768px) 100vw, 330px"
                      />
                    </div>
                    <p className="text-gray-400 text-xs pl-4">
                      Built by Harvard Scholars, Led by Industry-
                    </p>
                  </div>

                  <nav
                    className="flex-1 overflow-y-auto"
                    aria-label="Program navigation"
                  >
                    {categories.map((category, index) => (
                      <MenuItem
                        key={category}
                        category={category}
                        index={index}
                        isActive={index === currentItemIndex}
                        onClick={() => handleMenuClick(index)}
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-3/4 relative">
              <div className="h-full overflow-visible bg-white relative">
                {categories.map((category, index) => (
                  <ContentCard
                    key={category}
                    category={category}
                    index={index}
                    activeIndex={activeIndex}
                    slideDistance={600}
                    fadeThreshold={0.4}
                    zoomOutAmount={0.2}
                    fadeAmount={0.2}
                    contentData={contentData}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HandsOnLearningComponent);
