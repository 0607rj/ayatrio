"use client";

import React, { useState } from "react";

// Custom SVG Icons
const BookOpenIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3`1h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const MonitorIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

const BarChartIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
);

const TestTubeIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
        <path d="M8.5 2h7" />
        <path d="M14.5 16h-5" />
    </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
    </svg>
);

const MessageQuestionIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const FolderIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);

const LaptopIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const CircleIcon = ({ className, fill }: { className?: string; fill?: boolean }) => (
    <svg className={className} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
    </svg>
);

interface JobTrack {
    name: string;
    icon: React.ReactNode;
    badge?: string;
    badgeDate?: string;
}

interface PricingTabsProps {
    nextBatchDate?: string;
}

const PricingTabs: React.FC<PricingTabsProps> = ({
    nextBatchDate = "Feb 5th",
}) => {

    const jobTracks: JobTrack[] = [
        { name: "Java Full Stack", icon: <MonitorIcon className="w-5 h-5" /> },
        { name: "MERN Full Stack", icon: <MonitorIcon className="w-5 h-5" /> },
        {
            name: "Data Analytics",
            icon: <BarChartIcon className="w-5 h-5" />,
            badge: "Seats filled. Next batch starts on",
            badgeDate: "01 Jul 2026",
        },
        {
            name: "QA / Automation Testing",
            icon: <TestTubeIcon className="w-5 h-5" />,
            badge: "Seats filled. Next batch starts on",
            badgeDate: "01 Jul 2026",
        },
    ];

    const placementSupport = [
        "Aptitude Training",
        "Soft Skills Training",
        "Resume Preparation",
        "AI-Powered Mock Interviews",
        "Mock Interviews by Tech and HR Panels",
        "300+ Senior Interview Experiences",
        "Scheduling Interviews",
        "Access to Placement Portal",
        "Mega Offline Placement Drives",
        "Negotiation with companies for higher salaries",
    ];

    const benefits = [
        {
            icon: <MessageQuestionIcon className="w-5 h-5" />,
            text: "9AM - 9PM Doubt Clarification. 1500+ Mentors to help you.",
        },
        {
            icon: <FolderIcon className="w-5 h-5" />,
            text: "10+ Real-time Projects for strong resume",
        },
        {
            icon: <LaptopIcon className="w-5 h-5" />,
            text: "24/7 Online Lab Access",
        },
        {
            icon: <RocketIcon className="w-5 h-5" />,
            text: "NxtWave Intensive is not a Job Guarantee Program.",
            isDisclaimer: true,
        },
    ];

    return (
        <section className="bg-white py-4 sm:py-6 md:py-8 ">
            <div className="max-w-[85rem] mx-auto">
                <>
                        {/* What's Included Section - Postpaid */}
                    <div className="mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">
                                What&apos;s included ?
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                                {/* Left Column - Job Tracks */}
                                <div className="space-y-6">
                                    {/* Fundamentals */}
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <BookOpenIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <span className="text-gray-900 font-medium pt-2">
                                            Fundamentals
                                        </span>
                                    </div>

                                    {/* Multiple Job Tracks */}
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <BriefcaseIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <div>
                                            <span className="text-gray-900 font-medium">
                                                Multiple Job Tracks
                                            </span>
                                            <div className="mt-3 space-y-3 ml-2 border-l-2 border-gray-200 pl-4">
                                                {jobTracks.map((track, index) => (
                                                    <div key={index} className="flex items-start gap-2">
                                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-gray-600">
                                                            {track.icon}
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-800 text-sm font-medium">
                                                                {track.name}
                                                            </span>
                                                            {track.badge && (
                                                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                                                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded whitespace-normal">
                                                                        {track.badge}
                                                                    </span>
                                                                    <span className="text-xs text-orange-600 font-medium">
                                                                        {track.badgeDate}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3 Hours Classes */}
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <ClockIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <span className="text-gray-900 font-medium pt-2">
                                            3 Hours classes and 3 Hours Labs Everyday
                                        </span>
                                    </div>

                                    {/* Trainers */}
                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <UsersIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <span className="text-gray-900 font-medium pt-2">
                                            Trainers: IIT alumni & Top MNCs like Amazon, Microsoft
                                        </span>
                                    </div>
                                </div>

                                {/* Center Column - Placement Support */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <BuildingIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <span className="text-gray-900 font-medium pt-2">
                                            Unlimited opportunities from a pool of 3000+ companies
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                            <ShieldIcon className="w-5 h-5 text-[#B30437]" />
                                        </div>
                                        <div>
                                            <span className="text-gray-900 font-medium">
                                                Placement Support
                                            </span>
                                            <ul className="mt-3 space-y-2 text-sm text-gray-700">
                                                {placementSupport.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-gray-400 mt-1">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Benefits */}
                                <div className="space-y-5">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-start gap-3 ${benefit.isDisclaimer ? "opacity-70" : ""
                                                }`}
                                        >
                                            <div
                                                className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${benefit.isDisclaimer ? "bg-gray-50" : "bg-red-50"
                                                    }`}
                                            >
                                                <div
                                                    className={
                                                        benefit.isDisclaimer ? "text-gray-500" : "text-[#B30437]"
                                                    }
                                                >
                                                    {benefit.icon}
                                                </div>
                                            </div>
                                            <span
                                                className={`pt-2 ${benefit.isDisclaimer
                                                    ? "text-gray-500 text-sm"
                                                    : "text-gray-900 font-medium"
                                                    }`}
                                            >
                                                {benefit.text}
                                                {benefit.isDisclaimer && (
                                                    <span className="ml-1 inline-block w-4 h-4 bg-gray-200 rounded-full text-xs text-center leading-4">
                                                        ⓘ
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section - Postpaid */}
                    <div className="px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-6 sm:pt-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                                {/* Left - EMI Info */}
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="inline-block bg-red-50 text-[#B30437] px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                                        EMI AS LOW AS
                                    </div>

                                    <div className="flex items-baseline gap-2 sm:gap-4 flex-wrap">
                                        <div>
                                            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                                                ₹5,555
                                            </span>
                                            <span className="text-gray-600 text-sm sm:text-base">/month</span>
                                            <div className="text-xs sm:text-sm text-gray-500">(For 8 months)</div>
                                        </div>
                                        <span className="text-xl sm:text-2xl text-gray-400">+</span>
                                        <span className="text-lg sm:text-xl font-semibold text-gray-900">
                                            10% of Annual CTC
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                            <div>
                                                <span className="font-semibold text-gray-900">
                                                    A Free Trial Session
                                                </span>
                                                <div className="text-sm text-gray-500">No Fee Required</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                            <div>
                                                <span className="font-semibold text-gray-900">
                                                    Assured Scholarships
                                                </span>
                                                <div className="text-sm text-gray-500">After Free Trial</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right - Scholarship Banner */}
                                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 sm:p-6 text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="text-xs sm:text-sm font-medium mb-2">
                                            Additional Scholarships Up To
                                        </div>
                                        <div className="text-3xl sm:text-4xl font-bold mb-2">₹16,000/-</div>
                                        <a
                                            href="#"
                                            className="text-xs sm:text-sm underline hover:no-underline flex items-center gap-1"
                                        >
                                            Book a Free Demo to know more.
                                            <span>↗</span>
                                        </a>
                                    </div>
                                    {/* Decorative Image/Icon placeholder */}
                                    <div className="absolute right-4 bottom-4 opacity-90 hidden sm:block">
                                        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <span className="text-2xl sm:text-3xl">🎓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>


                {/* Next Batch + CTA */}
                <div className="px-4 sm:px-6 lg:px-8 border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <CircleIcon className="w-3 h-3 text-[#B30437]" fill />
                            <span className="text-sm sm:text-base text-gray-900">
                                Next batch starts on <strong>{nextBatchDate}</strong>
                            </span>
                        </div>
                        <div className="flex flex-col xs:flex-row w-full sm:w-auto gap-3">
                            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-[#B30437] hover:bg-[#9a0330] text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200">
                                Book a Free Demo
                            </button>
                            <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200">
                                Book Your Seat for 2000/-
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingTabs;
