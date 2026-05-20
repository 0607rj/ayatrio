"use client";
import { useState } from "react";
import HighlightText from "../shared/HighlightObserver";

const tabs = [
    { id: "masterclass", label: "Masterclass" },
    { id: "mentorship", label: "Mentorship Roundtable" },
    { id: "fireside", label: "Fireside" },
] as const;

type Tab = (typeof tabs)[number]["id"];

interface ImageItem {
    src: string;
    caption: string;
}

const masterclassImages: ImageItem[] = [
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-masterclass.webp", caption: "Sven Herzing, CTO, Talabat" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-masterclass.webp", caption: "Nishant Sukumaran, Marketing Head, Dabur International" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-masterclass.webp", caption: "Jeff Strachen, VP, Dubai's Department of Economy and Tourism" },
];

const mentorshipImages: ImageItem[] = [
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-mentorship.webp", caption: "Ziad Shaltuni, Chief Commercial Officer, REALM" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-mentorship.webp", caption: "Yusuf Saber, Ex VP, Talabat" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-mentorship.webp", caption: "Sameer Rana, Group CMO, Beyond ONE" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-mentorship.webp", caption: "Maryam Shahin, Head of Marketing, Ministry of Education UAE" },
];

const firesideImages: ImageItem[] = [
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-fireside.webp", caption: "Manish Mathur, CFO, Dabur International" },
    { src: "https://cdn.tetr.com/assets/ih-images/V2/las-fireside.webp", caption: "Sylvain Perret, Co-Founder, The Healthy Ice Cream Company" },
];

function ImageCard({ src, caption, className = "" }: ImageItem & { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-gray-100 group ${className}`}>
            <img
                src={src}
                alt={caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-3 pb-2.5 pt-7">
                <p className="text-white text-xs font-medium">{caption}</p>
            </div>
        </div>
    );
}

function MasterclassGrid() {
    return (
        <div className="grid grid-cols-[1.35fr_1fr] gap-2.5">
            <ImageCard
                src={masterclassImages[0].src}
                caption={masterclassImages[0].caption}
                className="row-span-2 min-h-[430px]"
            />
            <ImageCard
                src={masterclassImages[1].src}
                caption={masterclassImages[1].caption}
                className="min-h-[210px]"
            />
            <ImageCard
                src={masterclassImages[2].src}
                caption={masterclassImages[2].caption}
                className="min-h-[210px]"
            />
        </div>
    );
}

function MentorshipGrid() {
    return (
        <div className="grid grid-cols-[1fr_0.85fr] gap-2.5">
            <ImageCard
                src={mentorshipImages[0].src}
                caption={mentorshipImages[0].caption}
                className="row-span-2 min-h-[430px]"
            />
            <ImageCard
                src={mentorshipImages[1].src}
                caption={mentorshipImages[1].caption}
                className="min-h-[210px]"
            />
            <ImageCard
                src={mentorshipImages[2].src}
                caption={mentorshipImages[2].caption}
                className="min-h-[210px]"
            />
            <ImageCard
                src={mentorshipImages[3].src}
                caption={mentorshipImages[3].caption}
                className="col-span-2 min-h-[180px]"
            />
        </div>
    );
}

function FiresideGrid() {
    return (
        <div className="grid grid-cols-2 gap-2.5">
            <ImageCard
                src={firesideImages[0].src}
                caption={firesideImages[0].caption}
                className="min-h-[390px]"
            />
            <ImageCard
                src={firesideImages[1].src}
                caption={firesideImages[1].caption}
                className="min-h-[390px]"
            />
        </div>
    );
}

export default function LifeAtCharters() {
    const [active, setActive] = useState<Tab>("masterclass");

    return (
        <div>
            {/* Hero */}
            <div className="bg-[#F4F2EE] px-6 sm:px-10 lg:px-16 py-10 sm:py-12 border-b border-gray-200">
                <p className="text-gray-900 text-2xl sm:text-3xl font-normal leading-snug">
                    Life at Charters
                    <br />
                    <HighlightText className="font-bold italic text-3xl sm:text-4xl">
                        Real-World Learning in Action
                    </HighlightText>
                </p>
            </div>

            {/* Academic Immersions */}
            <div className="bg-white  py-10 sm:py-14 border-b border-gray-200">

                {/* Header */}
                <div className="flex justify-between items-start px-1 sm:px-2 lg:px-4 mb-2">
                    <h2 className="text-gray-900 text-2xl sm:text-3xl font-semibold">
                        Academic Immersions
                    </h2>
                    {/* Dot grid — now gray */}
                    <div className="grid grid-cols-3 gap-1 mt-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span key={i} className="w-2.5 h-2.5 bg-gray-300 block" />
                        ))}
                    </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed px-1 sm:px-2 lg:px-4 mb-7 max-w-xl">
                    Solve real-world problems through regular mentorship sessions and masterclasses with CXOs and Industry leaders.
                </p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-0 mb-7 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[2px] whitespace-nowrap ${active === tab.id
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid panels */}
                {active === "masterclass" && <MasterclassGrid />}
                {active === "mentorship" && <MentorshipGrid />}
                {active === "fireside" && <FiresideGrid />}
            </div>
        </div>
    );
}