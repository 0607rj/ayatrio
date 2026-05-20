"use client";
import { createPortal } from 'react-dom'
import React, { useState, memo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import useInViewPlay from "@/components/micro/useInViewPlay";
import ChartersInterviewAi from "./Chartersinterview_ai";
import HighlightText from "../shared/HighlightObserver";

interface CardData {
    id: string;
    title: string;
    description: string;
    color: string;
    bgColor: string;
}

interface ServiceCard {
    title: string;
    description: string;
    iconColor: string;
    accentColor: string;
    features: Array<{
        icon: string;
        label: string;
    }>;
}
interface FooterFeature {
    icon: string;
    label: string;
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
    serviceCards: ServiceCard[];
    footer: {
        title: string;
        description: string;
        features: FooterFeature[];
    };
    avatar: {
        src: string;
        alt: string;
        borderColor: string;
    };
}
const heading_description = {
    description: "Learn from industry leaders | Academic experts | Experience real-world insights"
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
    }
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
        buttonText: "Charter Carrer AI Engine",
        buttonColor: "bg-none text-[#B30437]",
        imageSrc: "/home/intern.jpg",
        imageAlt: "Students in leadership mentorship program with executives",
        serviceCards: [
            {
                title: "Executive Shadowing",
                description: "Shadow C-level executives and learn leadership strategies firsthand.",
                iconColor: "text-[#B30437]",
                accentColor: "from-[#B30437] to-[#B30437]/50",
                features: [
                    { icon: "document", label: "Leadership Workshops" },
                    { icon: "search", label: "Strategic Planning" },
                    { icon: "users", label: "Boardroom Access" },
                ],
            },
            {
                title: "Mentorship Network",
                description: "Connect with industry leaders and build lasting professional relationships.",
                iconColor: "text-orange-500",
                accentColor: "from-orange-500 to-orange-300",
                features: [
                    { icon: "briefcase", label: "1:1 Mentoring" },
                    { icon: "lightning", label: "Career Guidance" },
                    { icon: "wrench", label: "Industry Insights" },
                    { icon: "users", label: "Networking Events" },
                    { icon: "database", label: "Resource Library" },
                    { icon: "check", label: "Success Tracking" },
                ],
            },
            {
                title: "Leadership Training",
                description: "Develop essential leadership skills through hands-on training programs.",
                iconColor: "text-[#B30437]",
                accentColor: "from-[#B30437] to-[#B30437]/50",
                features: [
                    { icon: "database", label: "Leadership Library" },
                    { icon: "search", label: "Skill Assessments" },
                    { icon: "check", label: "Certification" },
                ],
            },
        ],
        footer: {
            title: "AI Brand Profile Engine",
            description: "Charter Career provides the high-level exposure and brand-building tools needed to position students for elite leadership roles.",
            features: [
                { icon: "chart", label: "Brand Analytics" },
                { icon: "lightning", label: "Executive Sync" },
                { icon: "check", label: "Success Plan" },
                { icon: "document", label: "Case Notes" }
            ]
        },
        avatar: {
            src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
            alt: "Placement Officer",
            borderColor: "border-cyan-400"
        },
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
        serviceCards: [
            {
                title: "Skill Assessment",
                description: "Comprehensive evaluations to identify strengths and areas for improvement.",
                iconColor: "text-[#00D4FF]",
                accentColor: "from-[#00D4FF] to-[#00D4FF]/50",
                features: [
                    { icon: "document", label: "Aptitude Tests" },
                    { icon: "search", label: "Technical Assessments" },
                    { icon: "users", label: "Soft Skills Evaluation" },
                ],
            },
            {
                title: "Mock Interviews",
                description: "Practice interviews with industry professionals and get detailed feedback.",
                iconColor: "text-orange-500",
                accentColor: "from-orange-500 to-orange-300",
                features: [
                    { icon: "briefcase", label: "HR Rounds" },
                    { icon: "lightning", label: "Technical Rounds" },
                    { icon: "wrench", label: "Group Discussions" },
                    { icon: "users", label: "Panel Interviews" },
                    { icon: "database", label: "Video Practice" },
                    { icon: "check", label: "Feedback Reports" },
                ],
            },
            {
                title: "Interview Prep",
                description: "Targeted training to help you ace your placement interviews.",
                iconColor: "text-[#00D4FF]",
                accentColor: "from-[#00D4FF] to-[#00D4FF]/50",
                features: [
                    { icon: "database", label: "Company Research" },
                    { icon: "search", label: "Resume Review" },
                    { icon: "check", label: "Confidence Building" },
                ],
            },
        ],
        footer: {
            title: "Career Counseling Hub",
            description: "Everything you need to manage 1:1 mentorship cycles and track student progress with automated scheduling and feedback loops.",
            features: [
                { icon: "users", label: "Session Insights" },
                { icon: "lightning", label: "Auto-Scheduling" },
                { icon: "check", label: "Milestone Tracking" },
                { icon: "document", label: "Consultation Notes" }
            ]
        },
        avatar: {
            src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            alt: "Executive Mentor",
            borderColor: "border-yellow-400"
        },
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
        buttonText: "VIEW CAREER LAB REPORT →",
        buttonColor: "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90",
        imageSrc: "/home/intern3.png",
        imageAlt:
            "Students in flexible internship program working evenings and weekends",
        serviceCards: [
            {
                title: "Recruitment",
                description: "We build partnerships to recruit and give you visibility over the recruitment pipeline.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "document", label: "Document Management" },
                    { icon: "search", label: "Readiness Assessment" },
                    { icon: "users", label: "Vocational Eligibility" },
                ],
            },
            {
                title: "Training",
                description: "Hybrid job training programs with online and in-person components.",
                iconColor: "text-orange-500",
                accentColor: "from-orange-500 to-orange-300",
                features: [
                    { icon: "briefcase", label: "Job Readiness" },
                    { icon: "lightning", label: "Clean Energy" },
                    { icon: "wrench", label: "Technical Skills" },
                    { icon: "users", label: "Team Building" },
                    { icon: "database", label: "Online Modules" },
                    { icon: "check", label: "Certification" },
                ],
            },
            {
                title: "Job Placement",
                description: "Partnerships with nationwide trades associations that hire our graduates.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "database", label: "1000+ Employer Database" },
                    { icon: "search", label: "Job Matching" },
                    { icon: "check", label: "Interview Preparation" },
                ],
            },
        ],
        footer: {
            title: "Skill Development Suite",
            description: "Monitor skill acquisition in real-time. Our engine identifies gaps and suggests targeted training to keep students on their career path.",
            features: [
                { icon: "chart", label: "Skill Mapping" },
                { icon: "wrench", label: "Task Automation" },
                { icon: "lightning", label: "Growth Velocity" },
                { icon: "database", label: "Resource Logs" }
            ]
        },
        avatar: {
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            alt: "Career Coach",
            borderColor: "border-purple-500"
        },
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
        buttonText: "VIEW CAREER DEVELOPMENT →",
        buttonColor: "bg-[#8B5CF6] hover:bg-[#8B5CF6]/90",
        imageSrc: "/home/intern3.png",
        imageAlt: "Career development and coaching program",
        serviceCards: [
            {
                title: "Career Coaching",
                description: "Personalized 1:1 sessions with experienced career coaches.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "document", label: "Goal Setting" },
                    { icon: "search", label: "Strength Analysis" },
                    { icon: "users", label: "Progress Tracking" },
                ],
            },
            {
                title: "Skill Building",
                description: "Develop essential skills for your chosen career path.",
                iconColor: "text-orange-500",
                accentColor: "from-orange-500 to-orange-300",
                features: [
                    { icon: "briefcase", label: "Professional Skills" },
                    { icon: "lightning", label: "Communication" },
                    { icon: "wrench", label: "Problem Solving" },
                    { icon: "users", label: "Leadership" },
                    { icon: "database", label: "Time Management" },
                    { icon: "check", label: "Critical Thinking" },
                ],
            },
            {
                title: "Career Planning",
                description: "Create actionable roadmaps for your professional journey.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "database", label: "Career Mapping" },
                    { icon: "search", label: "Industry Research" },
                    { icon: "check", label: "Milestone Setting" },
                ],
            },
        ],
        footer: {
            title: "VRise Application Command",
            description: "Centralize the chaos of job hunting. Track every submission, follow-up, and interview within a single unified dashboard.",
            features: [
                { icon: "chart", label: "Funnel Analytics" },
                { icon: "lightning", label: "Workflow Automation" },
                { icon: "check", label: "Offer Tracking" },
                { icon: "document", label: "Interview Briefs" }
            ]
        },
        avatar: {
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            alt: "Technical Lead",
            borderColor: "border-orange-500"
        },
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
        serviceCards: [
            {
                title: "Application Tracker",
                description: "Track all your job applications in one centralized dashboard.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "document", label: "Status Updates" },
                    { icon: "search", label: "Application History" },
                    { icon: "users", label: "Interview Scheduling" },
                ],
            },
            {
                title: "Job Matching",
                description: "AI-powered recommendations based on your skills and preferences.",
                iconColor: "text-orange-500",
                accentColor: "from-orange-500 to-orange-300",
                features: [
                    { icon: "briefcase", label: "Skill Matching" },
                    { icon: "lightning", label: "Smart Filters" },
                    { icon: "wrench", label: "Salary Insights" },
                    { icon: "users", label: "Culture Fit" },
                    { icon: "database", label: "Job Alerts" },
                    { icon: "check", label: "Match Score" },
                ],
            },
            {
                title: "Application Resources",
                description: "Templates, guides, and tools to perfect your applications.",
                iconColor: "text-[#8B5CF6]",
                accentColor: "from-[#8B5CF6] to-[#8B5CF6]/50",
                features: [
                    { icon: "database", label: "Resume Templates" },
                    { icon: "search", label: "Cover Letters" },
                    { icon: "check", label: "Application Tips" },
                ],
            },
        ],
        footer: {
            title: "Placement Intelligence Engine",
            description: "Data-driven insights into placement readiness, ensuring students are 100% prepared before they face their first technical round.",
            features: [
                { icon: "chart", label: "Test Analytics" },
                { icon: "lightning", label: "Result Automation" },
                { icon: "check", label: "Readiness Score" },
                { icon: "document", label: "Review Notes" }
            ]
        },
        avatar: {
            src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop",
            alt: "HR Specialist",
            borderColor: "border-blue-500"
        },
    },
};


// Icons for the feature items
const DocumentIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="document" width={16} height={16} className="w-4 h-4" />
);

const SearchIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="search" width={16} height={16} className="w-4 h-4" />
);

const UserGroupIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="users" width={16} height={16} className="w-4 h-4" />
);

const BriefcaseIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="briefcase" width={16} height={16} className="w-4 h-4" />
);

const LightningIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="lightning" width={16} height={16} className="w-4 h-4" />
);

const WrenchIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="wrench" width={16} height={16} className="w-4 h-4" />
);

const DatabaseIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="database" width={16} height={16} className="w-4 h-4" />
);

const CheckCircleIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="check" width={16} height={16} className="w-4 h-4" />
);

const ChartIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="chart" width={16} height={16} className="w-4 h-4" />
);

const StatsIcon = () => (
    <Image src="/Charters-icon/Cancel.svg" alt="stats" width={24} height={24} className="w-6 h-6 text-gray-500" />
);

const getIcon = (iconName: string) => {
    switch (iconName) {
        case "document":
            return <DocumentIcon />;
        case "search":
            return <SearchIcon />;
        case "users":
            return <UserGroupIcon />;
        case "briefcase":
            return <BriefcaseIcon />;
        case "lightning":
            return <LightningIcon />;
        case "wrench":
            return <WrenchIcon />;
        case "database":
            return <DatabaseIcon />;
        case "check":
            return <CheckCircleIcon />;
        default:
            return <DocumentIcon />;
    }
};
const StrategicExpansion: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const isVisible = useInViewPlay(sectionRef, "200px", 0.1);

    const [selectedCard, setSelectedCard] = useState<string>("shadow-cxos");
    const currentContent = React.useMemo(() => contentData[selectedCard], [selectedCard]);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleCardClick = useCallback((cardId: string) => {
        setSelectedCard(cardId);
    }, []);

    const [showInterviewAI, setShowInterviewAI] = useState(false);

    // Track scroll position for navigation buttons
    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const handleScroll = () => {
            setCanScrollLeft(slider.scrollLeft > 10);
            setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10);
        };

        handleScroll(); // Initial check
        slider.addEventListener('scroll', handleScroll, { passive: true });
        return () => slider.removeEventListener('scroll', handleScroll);
    }, [selectedCard]);

    const scrollSlider = useCallback((direction: number) => {
        const slider = sliderRef.current;
        if (!slider) return;
        const cardWidth = slider.clientWidth * 0.82; // 82vw card width
        slider.scrollTo({
            left: slider.scrollLeft + (direction * cardWidth),
            behavior: 'smooth'
        });
    }, []);

    return (
        <section ref={sectionRef} className="mx-[0%] pt-12 bg-white">
            {isVisible && (
                <>
                    <div className="flex-shrink-0 text-center mb-13 sm:mb-13">
                        <h2 className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">

                            <HighlightText className="font-bold">
                                AI-powered
                            </HighlightText>{" "} Career Labs
                        </h2>
                        <div className="flex flex-col items-start sm:flex-row sm:flex-wrap sm:justify-center sm:items-center gap-3 sm:gap-6 mb-2 sm:mb-4 w-fit mx-auto sm:w-full">
                            {heading_description.description.split("|").map((item: string, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <img
                                        src="/dot-icon.svg"
                                        alt=""
                                        className="w-4 h-4 flex-shrink-0"
                                        aria-hidden="true"
                                    />
                                    <span className="text-sm sm:text-base text-black font-medium leading-snug whitespace-nowrap">
                                        {item.trim()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tabs at the top */}
                    <div aria-label="Career Labs categories" className="border-b border-gray-300">
                        <ul className="flex w-[93%] mx-auto overflow-x-auto scrollbar-hide">
                            {cardsData.map((card) => (
                                <li
  key={card.id}
  className="flex-1 bg-white"
>
    <button
  onClick={() => handleCardClick(card.id)}
  className="w-full px-3 sm:px-4 py-4 text-left border-b border-gray-200 !bg-white hover:!bg-white active:!bg-white focus:!bg-white transition-none"
  aria-label={`${card.title} program`}
>
  <div className="flex items-center gap-3">
    <img
      src="/dot-icon.svg"
      alt=""
      className="w-5 h-5"
      aria-hidden="true"
    />

    <div>
      <span className="block text-xs font-semibold text-black uppercase tracking-wide">
        {card.description}
      </span>

      <span className="block text-lg font-semibold text-black whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] lg:max-w-[220px]">
  {card.title}
</span>
    </div>
  </div>
</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="max-w-[85rem] mx-auto">

                        <div className="bg-[#F6F4F2] px-4 sm:px-6 pt-4 sm:pt-6 pb-10 sm:pb-14 relative">


                            {/* Content Section */}
                            <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
                                {/* Left Side - Text and Stats */}
                                <div className="flex-1 space-y-6">
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black leading-tight">
                                        {currentContent.title}{" "}
                                        <em className="italic font-serif text-[#B30437]">
                                            {currentContent.highlightText}
                                        </em>
                                    </h2>

                                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                        {currentContent.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="space-y-6">
                                        <div className="relative pl-4">
                                            <div
                                                className={`absolute left-0 -top-2 w-16 h-12 ${currentContent.stats.main.bgColor} rounded-lg`}
                                            />
                                            <div className="relative z-10">
                                                <div className="text-2xl lg:text-3xl font-light text-black">
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
                                                        <div className="text-xl font-light text-black">{stat.value}</div>
                                                        <p className="text-[#B30437] text-xs font-medium">
                                                            {stat.label}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                </div>

                                {/* Right Side - Profile Image */}
                                <div className="flex-1 flex justify-center">
                                    <div className="relative w-72 h-80 lg:w-80 lg:h-96">
                                        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg overflow-hidden relative">
                                            <Image
                                                key={selectedCard}
                                                src={currentContent.imageSrc}
                                                alt={currentContent.imageAlt}
                                                fill
                                                loading="lazy"
                                                priority={false}
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 320px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Three Service Cards - Dynamic based on selected tab */}
                            <div className="relative">
                                <div
                                    ref={sliderRef}
                                    className="md:grid md:grid-cols-3 mb-2 flex overflow-x-auto scrollbar-hide snap-x snap-mandatory md:overflow-visible border border-gray-300"
                                >
                                    {currentContent.serviceCards.map((card, index) => (
                                        <div key={index} className="border-r border-gray-300 p-6 relative overflow-hidden min-w-[82vw] md:min-w-0 snap-center last:border-r-0">
                                            <h3 className="text-lg font-semibold text-black mb-2">{card.title}</h3>
                                            <p className="text-sm text-gray-600 mb-6">
                                                {card.description}
                                            </p>

                                            {/* Middle card (index 1) gets grid layout, others get list layout */}
                                            {index === 1 ? (
                                                <div className="grid grid-cols-2 -mx-6 border-t border-[#D5D0CA]">
                                                    {[0, 1, 2].map((rowIndex) => (
                                                        <React.Fragment key={rowIndex}>
                                                            {/* Left item */}
                                                            <div className="border-b border-r border-[#D5D0CA] p-3 sm:p-4 flex items-center gap-2">
                                                                <div className="shrink-0">
                                                                    {getIcon(card.features[rowIndex]?.icon || "document")}
                                                                </div>
                                                                <span className="text-xs text-gray-700">{card.features[rowIndex]?.label}</span>
                                                            </div>
                                                            {/* Right item */}
                                                            <div className="border-b border-[#D5D0CA] p-3 sm:p-4 flex items-center gap-2">
                                                                <div className="shrink-0">
                                                                    {getIcon(card.features[rowIndex + 3]?.icon || "document")}
                                                                </div>
                                                                <span className="text-xs text-gray-700">{card.features[rowIndex + 3]?.label}</span>
                                                            </div>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="-mx-6 border-t border-[#D5D0CA]">
                                                    {card.features.map((feature, featureIndex) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="border-b border-[#D5D0CA] p-3 sm:p-4 flex items-center gap-2"
                                                        >
                                                            <div className="shrink-0 px-2">
                                                                {getIcon(feature.icon)}
                                                            </div>
                                                            <span className="text-xs text-gray-700">{feature.label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="-mx-6  py-0.5 px-4">
                                                <span className="text-xs text-gray-500">And more</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Navigation Buttons */}
                                <div className="md:hidden absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none z-10">
                                    {canScrollRight && (
                                        <button
                                            onClick={() => scrollSlider(1)}
                                            className="w-10 h-10 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 shadow-md flex items-center justify-center pointer-events-auto"
                                            aria-label="Next slide"
                                            type="button"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" aria-hidden="true">
                                                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="md:hidden absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none z-10">
                                    {canScrollLeft && (
                                        <button
                                            onClick={() => scrollSlider(-1)}
                                            className="w-10 h-10 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 shadow-md flex items-center justify-center pointer-events-auto"
                                            aria-label="Previous slide"
                                            type="button"
                                        >
                                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" aria-hidden="true">
                                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Dotted Lines Connecting Cards to Bottom Section */}
                            <div className="relative h-8 hidden md:flex justify-around">
                                {/* Left dotted lines group (3 lines) */}
                                <div className="absolute left-[16.67%] top-0 h-full flex gap-1">
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                </div>
                                {/* Center dotted lines group (3 lines) */}
                                <div className="absolute left-1/2 top-0 h-full flex gap-1 transform -translate-x-1/2">
                                    <div className="h-full border-l-2 border-dashed border-orange-400/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-orange-400/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-orange-400/40"></div>
                                </div>
                                {/* Right dotted lines group (3 lines) */}
                                <div className="absolute right-[16.67%] top-0 h-full flex gap-1">
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                    <div className="h-full border-l-2 border-dashed border-[#B30437]/40"></div>
                                </div>
                            </div>

                            {/* Emerge Career Unity Section - Dynamic */}
                            <div className="border border-[#D5D0CA] p-4 my-2.5 text-center">
                                <h3 className="text-2xl font-semibold text-black mb-3">
                                    {currentContent.footer.title}
                                </h3>
                                <p className="text-gray-600 max-w-2xl mx-auto mb-2">
                                    {currentContent.footer.description}
                                </p>
                            </div>

                            {/* Feature Buttons - Dynamic */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                                {currentContent.footer.features.map((feature, idx) => (
                                    <button
                                        key={idx}
                                        className="flex items-center justify-center gap-2 px-2 md:px-4 py-3 border border-[#D5D0CA] transition-colors hover:bg-gray-50"
                                    >
                                        {getIcon(feature.icon)}
                                        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                                            {feature.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Curved Dotted Lines with Avatars Section */}
                            <div className="relative min-h-[60px] hidden md:flex justify-center items-end mt-4">
                                {/* SVG for curved dotted lines */}
                                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 80" preserveAspectRatio="none">

                                    {/* Left outer curve - Red (Smooth S-curve) */}
                                    <path
                                        d="M 125 0 L 125 5 Q 125 15, 160 15 L 390 15 Q 410 15, 410 30 L 410 35 Q 410 45, 425 48 L 439 51"
                                        fill="none"
                                        stroke="#B30437"
                                        strokeWidth="2"
                                        strokeDasharray="6 4"
                                        opacity="0.6"
                                    />

                                    {/* Left inner curve - Red (Adjusted for smooth curve) */}
                                    <path
                                        d="M 375 0 L 375 5 Q 375 15, 400 15 L 430 15 Q 445 15, 445 30 L 445 35 Q 445 42, 455 42 L 465 42"
                                        fill="none"
                                        stroke="#B30437"
                                        strokeWidth="2"
                                        strokeDasharray="6 4"
                                        opacity="0.6"
                                    />

                                    {/* Right inner curve - Orange (Adjusted for smooth curve) */}
                                    <path
                                        d="M 625 0 L 625 5 Q 625 15, 600 15 L 570 15 Q 555 15, 555 30 L 555 35 Q 555 42, 545 42 L 535 42"
                                        fill="none"
                                        stroke="#F97316"
                                        strokeWidth="2"
                                        strokeDasharray="6 4"
                                        opacity="0.6"
                                    />

                                    {/* Right outer curve - Orange (Smooth S-curve) */}
                                    <path
                                        d="M 875 0 L 875 5 Q 875 15, 840 15 L 610 15 Q 590 15, 590 30 L 590 35 Q 590 45, 575 48 L 561 51"
                                        fill="none"
                                        stroke="#F97316"
                                        strokeWidth="2"
                                        strokeDasharray="6 4"
                                        opacity="0.6"
                                    />

                                    {/* Arrow heads - Adjusted positions to match new curve ends */}
                                    <polygon points="447,52 439,47 439,56" fill="#B30437" opacity="0.6" />
                                    <polygon points="470,42 462,38 462,46" fill="#B30437" opacity="0.6" />
                                    <polygon points="530,42 538,38 538,46" fill="#F97316" opacity="0.6" />
                                    <polygon points="553,52 561,47 561,56" fill="#F97316" opacity="0.6" />
                                </svg>

                                {/* Avatar Group */}
                                <div className="relative z-10 mt-8 flex items-center justify-center -space-x-3">
                                    <div
                                        className={`w-19 h-19 rounded-full border-4 ${currentContent.avatar.borderColor} overflow-hidden shadow-lg z-20 cursor-pointer transition-transform hover:scale-110`}
                                        onClick={() => setShowInterviewAI(true)}
                                    >
                                        <img
                                            src={currentContent.avatar.src}
                                            alt={currentContent.avatar.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {showInterviewAI && createPortal(
                                <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/20">
                                    <div className="w-[80%] h-[90%] relative">
                                        <button
                                            onClick={() => setShowInterviewAI(false)}
                                            className="absolute -top-3 -right-3 z-40 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md text-gray-600 hover:text-red-500 transition-colors"
                                        >
                                            ✕
                                        </button>
                                        <div className="w-full h-full overflow-hidden rounded-xl shadow-2xl">
                                            <ChartersInterviewAi />
                                        </div>
                                    </div>
                                </div>,
                                document.body
                            )}
                        </div>
                    </div>
                </>
            )}
        </section >
    );
};

export default memo(StrategicExpansion);
