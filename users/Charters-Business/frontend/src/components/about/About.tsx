"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";

const TetrLandingPage = () => {
  const [activeSection, setActiveSection] = useState<
    "values" | "exposure" | "experiences" | "skills"
  >("values");
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    values: null,
    exposure: null,
    experiences: null,
    skills: null,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sectionRefs.current).forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(
              key as "values" | "exposure" | "experiences" | "skills"
            );
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionContent = {
    values: {
      title: "Focus on core values that shape character",
      subtitle: "of superficial learning",
      description:
        "Tetr's curriculum emphasizes Values that nurture the right mindsets, helping students develop integrity, empathy, and leadership qualities essential for success.",
      points: [
        "Character development through real-world challenges and ethical decision-making",
        "Leadership training with mentors who exemplify strong moral principles",
        "Community service projects that build empathy and social responsibility",
      ],
      workshops: [
        {
          title: "Build ethical leadership skills with a former UN Ambassador",
          image: "photo-1560472354-b33ff0c44a43",
        },
        {
          title:
            "Develop emotional intelligence with a Harvard Psychology Professor",
          image: "photo-1573496359142-b8d87734a5a2",
        },
        {
          title: "Learn conflict resolution from a Nobel Peace Prize winner",
          image: "photo-1551836022-d5d88e9218df",
        },
      ],
    },
    exposure: {
      title: "Gain global exposure and diverse perspectives",
      subtitle: "beyond textbook knowledge",
      description:
        "Tetr's curriculum provides Exposure that cultivates perspective, connecting students with diverse cultures, industries, and thought leaders worldwide.",
      points: [
        "International immersion programs in major business hubs across continents",
        "Cross-cultural collaboration projects with students from partner universities",
        "Industry exposure through visits to leading companies and startups globally",
      ],
      workshops: [
        {
          title:
            "Explore fintech innovations with Singapore's top banking executives",
          image: "photo-1551288049-bebda4e38f71",
        },
        {
          title: "Study sustainable business models in Scandinavian companies",
          image: "photo-1542744173-8e7e53415bb0",
        },
        {
          title:
            "Learn from Silicon Valley entrepreneurs about scaling startups",
          image: "photo-1519389950473-47ba0277781c",
        },
      ],
    },
    experiences: {
      title: "Gain hands-on experiences in real environments",
      subtitle: "not simulated scenarios",
      description:
        "Tetr's curriculum centers on Experiences that hone internalization, providing authentic business challenges and real-world problem-solving opportunities.",
      points: [
        "Live consulting projects with actual companies facing real business challenges",
        "Internships integrated into curriculum with performance-based evaluations",
        "Entrepreneurship incubator where students launch and run actual businesses",
      ],
      workshops: [
        {
          title:
            "Solve supply chain challenges for a Fortune 500 manufacturing company",
          image: "photo-1586528116311-ad8dd3c8310d",
        },
        {
          title: "Design marketing strategies for emerging market expansion",
          image: "photo-1460925895917-afdab827c52f",
        },
        {
          title: "Build and pitch a tech solution to real investors and VCs",
          image: "photo-1559136555-9303baea8ebd",
        },
      ],
    },
    skills: {
      title: "Focus on applicable skills instead",
      subtitle: "of rote memorization",
      description:
        "Tetr's curriculum is rooted in Workshops, where students learn applied skills in a real world context from experienced practitioners.",
      points: [
        "Students enroll in gamified & engaging workshops, rather than long theoretical courses",
        "Inspiring practitioners teach what they live for and what they practice everyday",
        "Learning is driven by real life applicability, rather than by an outdated syllabi & exams",
      ],
      workshops: [
        {
          title:
            "Learn how to find frauds in real balance sheets from a Goldman Sachs Banker",
          image: "photo-1554224155-6726b3ff858f",
        },
        {
          title:
            "Dive into how to build viral IG campaigns with TikTok's content strategist",
          image: "photo-1611224923853-80b023f02d71",
        },
        {
          title:
            "Explore how to build AI driven products with OpenAI's Engineering Lead",
          image: "photo-1485827404703-89b55fcc595e",
        },
      ],
    },
  };

  const founders = [
    {
      name: "Mr. Pratham Mittal",
      role: "Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Founder, Tetr | Masters' Union | Outgrow",
    },
    {
      name: "Mr. Vinay Swafney",
      role: "Strategic Advisor",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description:
        "Professor, Harvard University | President, National Capital Partners",
    },
    {
      name: "Dr. Edward Rogers",
      role: "Chief Learning Officer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Former Chief Knowledge Officer, NASA",
    },
    {
      name: "Mr. Fawaris Stephane",
      role: "Chief Evangelist",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description:
        "Executive Group President, Eddie Lauder | Ex-VP Marketing, L'Oreal USA",
    },
    {
      name: "Dr. Daniel Garrett Van Der Vliet",
      role: "Strategic Advisor",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Executive Director, Cornell University",
    },
    {
      name: "Mr. Manoj Kohli",
      role: "Chief Evangelist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Former Country Head, SoftBank | Ex-CEO, Bharti Airtel",
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Head of Innovation",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b169d5b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Former Director of Innovation, MIT | AI Research Leader",
    },
    {
      name: "Prof. Michael Chen",
      role: "Head of Technology",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Professor, Stanford University | Tech Industry Veteran",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative z-[5] pt-12 md:pt-20 pb-8 md:pb-12 bg-white">
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          {/* Mobile Layout */}
          <div className="block md:hidden">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold leading-tight text-black">
                Learn to Build
              </h1>
              <h1 className="text-3xl font-bold leading-tight text-black mt-1">
                Build to Learn.
              </h1>
            </div>

            <div className="relative w-full h-[50vh] mb-6">
              <div className="w-full h-full bg-gray-200 overflow-hidden shadow-2xl rounded-lg">
                <Image
                  src="https://cdn.tetr.com/assets/ih-images/tetr-about-hero.webp"
                  alt="Students collaborating and learning"
                  className="w-full h-full object-cover"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="absolute -top-2 -right-2 text-[#B30437] text-2xl">
                ✦
              </div>
            </div>

            <div className="bg-[#B30437] p-5 rounded-2xl shadow-xl">
              <p className="text-white text-sm font-medium mb-4 leading-relaxed">
                At Tetr, students learn business by building businesses while
                traveling across the world and getting mentored by top
                professors & practitioners.
              </p>
              <button className="bg-white text-[#B30437] px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2 text-sm">
                OUR PEDAGOGY <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative">
            <div className="absolute top-8 left-0 z-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] text-black">
                Learn
                <br />
                to Build —————
              </h1>
            </div>

            <div className="flex justify-center relative">
              <div className="relative w-1/2 h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                <div className="w-full h-full bg-gray-200 overflow-hidden shadow-2xl">
                  <Image
                    src="https://cdn.tetr.com/assets/ih-images/tetr-about-hero.webp"
                    alt="Students collaborating and learning"
                    className="w-full h-full object-cover"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="absolute -top-3 -right-3 text-[#B30437] text-2xl sm:text-3xl">
                  ✦
                </div>
              </div>
            </div>

            <div className="absolute top-20 right-0 z-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] text-black text-right">
                Build to
                <br />
                Learn.
              </h1>
            </div>

            <div className="absolute bottom-8 left-1/4 transform -translate-x-1/2 bg-[#B30437] p-6 rounded-2xl shadow-xl max-w-xs sm:max-w-sm z-10">
              <p className="text-white text-xs sm:text-sm font-medium mb-4 leading-relaxed">
                At Tetr, students learn business by building businesses while
                traveling across the world and getting mentored by top
                professors & practitioners.
              </p>
              <button className="bg-white text-[#B30437] px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium flex items-center gap-2 text-sm">
                OUR PEDAGOGY <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Layers Section */}
      <section
        className="relative z-[5] pt-6 pb-6 bg-white text-black"
        id="transformation-section"
      >
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6">
          <div className="mb-12">
            <div className="text-center">
              <div
                className="inline-flex items-center bg-[#B30437] text-white px-4 py-2 rounded-full text-xs font-medium mb-4"
                role="status"
              >
                <span>Transformation Layers</span>
              </div>
              <p
                className="text-xs font-semibold text-[#B30437] tracking-wider mb-2"
                role="text"
              >
                TETR METHODOLOGY
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-black leading-tight">
                Rooted in{" "}
                <span className="italic text-[#B30437]">
                  science & first principles
                </span>
              </h2>
              <p className="text-lg text-black mb-6 max-w-3xl mx-auto">
                Our curriculum is structured around{" "}
                <span className="font-semibold">four key tenets.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Mobile: Horizontal scrollable tabs, Desktop: Sticky sidebar */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:sticky lg:top-20 scrollbar-hide">
              <button
                onClick={() => setActiveSection("values")}
                className={`relative min-w-[140px] lg:min-w-0 lg:w-full flex-shrink-0 text-left p-3 transition-all overflow-hidden rounded-lg lg:rounded-none ${activeSection === "values"
                  ? "bg-[#B30437]"
                  : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-1 ${activeSection === "values" ? "text-white" : "text-black"
                      }`}
                  >
                    Values
                  </h3>
                  <p
                    className={`text-sm ${activeSection === "values"
                      ? "text-white"
                      : "text-gray-600"
                      }`}
                  >
                    Nurtures Mindsets
                  </p>
                </div>
                <div
                  className={`absolute top-3 right-3 text-6xl font-bold opacity-20 ${activeSection === "values" ? "text-white" : "text-gray-300"
                    }`}
                >
                  4
                </div>
              </button>

              <button
                onClick={() => setActiveSection("exposure")}
                className={`relative min-w-[140px] lg:min-w-0 lg:w-full flex-shrink-0 text-left p-3 transition-all overflow-hidden rounded-lg lg:rounded-none ${activeSection === "exposure"
                  ? "bg-[#B30437]"
                  : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-1 ${activeSection === "exposure" ? "text-white" : "text-black"
                      }`}
                  >
                    Exposure
                  </h3>
                  <p
                    className={`text-sm ${activeSection === "exposure"
                      ? "text-white"
                      : "text-gray-600"
                      }`}
                  >
                    Cultivates Perspective
                  </p>
                </div>
                <div
                  className={`absolute top-3 right-3 text-6xl font-bold opacity-20 ${activeSection === "exposure"
                    ? "text-white"
                    : "text-gray-300"
                    }`}
                >
                  3
                </div>
              </button>

              <button
                onClick={() => setActiveSection("experiences")}
                className={`relative min-w-[160px] lg:min-w-0 lg:w-full flex-shrink-0 text-left p-3 transition-all overflow-hidden rounded-lg lg:rounded-none ${activeSection === "experiences"
                  ? "bg-[#B30437]"
                  : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-1 ${activeSection === "experiences"
                      ? "text-white"
                      : "text-black"
                      }`}
                  >
                    Experiences
                  </h3>
                  <p
                    className={`text-sm ${activeSection === "experiences"
                      ? "text-white"
                      : "text-gray-600"
                      }`}
                  >
                    Helps Internalization
                  </p>
                </div>
                <div
                  className={`absolute top-3 right-3 text-6xl font-bold opacity-20 ${activeSection === "experiences"
                    ? "text-white"
                    : "text-gray-300"
                    }`}
                >
                  2
                </div>
              </button>

              <button
                onClick={() => setActiveSection("skills")}
                className={`relative min-w-[140px] lg:min-w-0 lg:w-full flex-shrink-0 text-left p-3 transition-all overflow-hidden rounded-lg lg:rounded-none ${activeSection === "skills"
                  ? "bg-[#B30437]"
                  : "bg-white hover:bg-gray-50 shadow-md"
                  }`}
              >
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-1 ${activeSection === "skills" ? "text-white" : "text-black"
                      }`}
                  >
                    Skills
                  </h3>
                  <p
                    className={`text-sm ${activeSection === "skills"
                      ? "text-white"
                      : "text-gray-600"
                      }`}
                  >
                    Build Employability
                  </p>
                </div>
                <div
                  className={`absolute top-3 right-3 text-6xl font-bold opacity-20 ${activeSection === "skills" ? "text-white" : "text-gray-300"
                    }`}
                >
                  1
                </div>
              </button>
            </div>

            <div className="space-y-16">
              <div
                ref={(el) => {
                  if (el) sectionRefs.current.values = el;
                }}
                className="min-h-[50vh]"
              >
                <div className="bg-[#B30437] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                  Values
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black leading-tight">
                  {sectionContent.values.title}{" "}
                  <span className="text-[#B30437]">
                    {sectionContent.values.subtitle}
                  </span>
                </h3>

                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {sectionContent.values.description}
                </p>

                <div className="space-y-3 mb-6">
                  {sectionContent.values.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#B30437] text-lg">★</span>
                      <p className="text-gray-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sectionContent.values.workshops.map((workshop, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden"
                    >
                      <Image
                        src={`https://images.unsplash.com/${workshop.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                        alt="Workshop"
                        width={300}
                        height={96}
                        className="object-cover w-full md:w-auto"
                      />
                      <div className="p-3">
                        <p className="text-black text-xs font-medium">
                          {workshop.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) sectionRefs.current.exposure = el;
                }}
                className="min-h-[50vh]"
              >
                <div className="bg-[#B30437] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                  Exposure
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black leading-tight">
                  {sectionContent.exposure.title}{" "}
                  <span className="text-[#B30437]">
                    {sectionContent.exposure.subtitle}
                  </span>
                </h3>

                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {sectionContent.exposure.description}
                </p>

                <div className="space-y-3 mb-6">
                  {sectionContent.exposure.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#B30437] text-lg">★</span>
                      <p className="text-gray-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sectionContent.exposure.workshops.map((workshop, index) => (
                    <div key={index} className="bg-white overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/${workshop.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                        alt="Workshop"
                        width={300}
                        height={96}
                        className="object-cover w-full md:w-auto"
                      />
                      <div className="p-3">
                        <p className="text-black text-xs font-medium">
                          {workshop.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) sectionRefs.current.experiences = el;
                }}
                className="min-h-[50vh]"
              >
                <div className="bg-[#B30437] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                  Experiences
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black leading-tight">
                  {sectionContent.experiences.title}{" "}
                  <span className="text-[#B30437]">
                    {sectionContent.experiences.subtitle}
                  </span>
                </h3>

                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {sectionContent.experiences.description}
                </p>

                <div className="space-y-3 mb-6">
                  {sectionContent.experiences.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#B30437] text-lg">★</span>
                      <p className="text-gray-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sectionContent.experiences.workshops.map(
                    (workshop, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg overflow-hidden"
                      >
                        <Image
                          src={`https://images.unsplash.com/${workshop.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                          alt="Workshop"
                          width={300}
                          height={96}
                          className="object-cover w-full md:w-auto"
                        />
                        <div className="p-3">
                          <p className="text-black text-xs font-medium">
                            {workshop.title}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div
                ref={(el) => {
                  if (el) sectionRefs.current.skills = el;
                }}
                className="min-h-[50vh]"
              >
                <div className="bg-[#B30437] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-block">
                  Skills
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black leading-tight">
                  {sectionContent.skills.title}{" "}
                  <span className="text-[#B30437]">
                    {sectionContent.skills.subtitle}
                  </span>
                </h3>

                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  {sectionContent.skills.description}
                </p>

                <div className="space-y-3 mb-6">
                  {sectionContent.skills.points.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#B30437] text-lg">★</span>
                      <p className="text-gray-700 text-sm">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sectionContent.skills.workshops.map((workshop, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden"
                    >
                      <Image
                        src={`https://images.unsplash.com/${workshop.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                        alt="Workshop"
                        width={300}
                        height={96}
                        className="object-cover w-full md:w-auto"
                      />
                      <div className="p-3">
                        <p className="text-black text-xs font-medium">
                          {workshop.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team & CTA Combined Section */}
      <section className="relative z-[5] pt-6 pb-6 bg-white px-4 md:px-0">
        <div className="max-w-7xl w-full mx-auto">
          <div className="mb-12">
            <div className="mb-8 text-center">
              <div
                className="inline-flex items-center bg-[#B30437] text-white px-4 py-2 rounded-full text-xs font-medium mb-4"
                role="status"
              >
                <span>Leadership Team</span>
              </div>
              <p
                className="text-xs font-semibold text-[#B30437] tracking-wider mb-2"
                role="text"
              >
                OUR FOUNDERS
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-black leading-tight">
                Meet our{" "}
                <span className="italic text-[#B30437]">
                  founding academic council
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {founders.slice(0, 4).map((founder, index) => (
                <div key={index} className="text-left">
                  <div className="relative mb-3">
                    <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative rounded-lg shadow-sm">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute bottom-2 left-2 bg-[#B30437] text-white px-2 py-1 rounded text-xs font-medium">
                        {founder.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-black mb-1">
                    {founder.role}
                  </h3>
                  <p className="text-gray-600 text-xs">{founder.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {founders.slice(4, 8).map((founder, index) => (
                <div key={index + 4} className="text-left">
                  <div className="relative mb-3">
                    <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative rounded-lg shadow-sm">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute bottom-2 left-2 bg-[#B30437] text-white px-2 py-1 rounded text-xs font-medium">
                        {founder.name}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-black mb-1">
                    {founder.role}
                  </h3>
                  <p className="text-gray-600 text-xs">{founder.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <div
                className="inline-flex items-center bg-[#B30437] text-white px-4 py-2 rounded-full text-xs font-medium mb-4"
                role="status"
              >
                <span>Get Started</span>
              </div>
              <p
                className="text-xs font-semibold text-[#B30437] tracking-wider mb-2"
                role="text"
              >
                READY TO BEGIN?
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-black">
                Its time to get{" "}
                <span className="italic text-[#B30437]">
                  out there
                </span>
                .
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 md:p-6 overflow-hidden rounded-lg shadow-sm">
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="NYC Skyline"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="relative z-10">
                  <h3 className="text-base font-bold mb-3">
                    US Mailing Address:
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>401 Park Ave,</p>
                    <p>New York, NY 10016,</p>
                    <p>United States of America</p>
                  </div>

                  <div className="mt-4 space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">
                        International (Toll):
                      </span>{" "}
                      +12025396151
                    </p>
                    <p>
                      <span className="font-semibold">
                        United States (Toll Free):
                      </span>{" "}
                      +18333829232
                    </p>
                    <p>
                      <span className="font-semibold">
                        United Kingdom (Toll Free):
                      </span>{" "}
                      +448008089010
                    </p>
                    <p>
                      <span className="font-semibold">Mexico (Toll Free):</span>{" "}
                      +528002230302
                    </p>
                    <p>
                      <span className="font-semibold">
                        Argentina (Toll Free):
                      </span>{" "}
                      +548002220302
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#B30437] rounded-full"></div>
                    <span className="text-xs font-semibold">REACH US</span>
                  </div>

                  <div className="mt-2 text-xs">
                    <p className="font-semibold">Operational Hours</p>
                    <p>5 AM UTC - 9 PM UTC</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0f2922] text-white p-6 md:p-8 relative h-28 md:h-36">
                  <div className="absolute top-4 right-4">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-sm mb-1">Write to Us</p>
                    <p className="text-base font-bold">info@tetr.org</p>
                  </div>
                </div>

                <div className="bg-[#B30437] text-white p-6 md:p-8 relative h-28 md:h-36">
                  <div className="absolute top-4 right-4">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <p className="text-base font-bold leading-tight">
                      Schedule a call with our
                      <br />
                      Admissions Counsellor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TetrLandingPage;
