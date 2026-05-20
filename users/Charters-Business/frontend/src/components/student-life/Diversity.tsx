// components/KaleidoscopeSection.tsx
"use client";

import HighlightText from "../shared/HighlightObserver";

function PhotoTile({ image, number, numberSub, label, className = "" }: {
    image: string;
    number: string;
    numberSub?: string;
    label: string;
    className?: string;
}) {
    return (
        <div className={`relative overflow-hidden group ${className}`}>
            <img
                src={image}
                alt={label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-4xl sm:text-5xl font-bold text-white leading-none">
                    {number}
                    {numberSub && (
                        <span className="font-sans text-2xl font-normal text-white/50 ml-1">
                            {numberSub}
                        </span>
                    )}
                </p>
                <p className="text-white/80 text-xs font-medium tracking-widest uppercase mt-1.5">
                    {label}
                </p>
            </div>
        </div>
    );
}

function DarkTile({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-[#1c1c1c] flex flex-col justify-center px-6 py-7 ${className}`}>
            <div className="flex gap-6 mb-5">
                <div>
                    <p className="text-4xl font-bold text-white leading-none">50+</p>
                    <p className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mt-1.5">Countries</p>
                </div>
                <div>
                    <p className="text-4xl font-bold text-white leading-none">45+</p>
                    <p className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mt-1.5">Languages</p>
                </div>
            </div>
        </div>
    );
}

function GenderTile({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white flex flex-col justify-center px-6 py-7 ${className}`}>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-5">
                Gender Split
            </p>
            <div className="space-y-4">
                {[
                    { label: "Male", pct: 60, fillClass: "bg-gray-900" },
                    { label: "Female", pct: 40, fillClass: "bg-gray-400" },
                ].map(({ label, pct, fillClass }) => (
                    <div key={label}>
                        <div className="flex justify-between items-baseline mb-1.5">
                            <span className="text-xs font-medium text-gray-500">{label}</span>
                            <span className="text-2xl font-bold text-gray-900">{pct}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${fillClass}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Diversity() {
    return (
        <section className="bg-white py-16">
            <h2 className="text-center text-3xl sm:text-4xl text-gray-900 mb-10 tracking-tight font-bold">
                A{" "}
                <HighlightText className="font-bold">
                    Kaleidoscope
                </HighlightText>{" "}
                of Diversity
            </h2>

            {/* gap-px gives the hairline grid-line effect using bg-[#dedad4] showing through */}
            <div
                className="grid gap-px bg-[#dedad4] border-t-1 border-b-1 border-gray-200"
                style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "260px 260px" }}
            >
                {/* Row 1 */}
                <PhotoTile
                    image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                    number="300+"
                    label="Students"
                />

                <DarkTile />

                <PhotoTile
                    image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
                    number="1490"
                    numberSub="/ 1600"
                    label="Average SAT Score"
                    className="col-span-2"
                />

                {/* Row 2 */}
                <PhotoTile
                    image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80"
                    number="10"
                    label="National-level Athletes"
                />

                <PhotoTile
                    image="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80"
                    number="18"
                    numberSub="yrs"
                    label="Average Age"
                />

                <GenderTile />

                <PhotoTile
                    image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"
                    number="4"
                    label="Student TEDx Speakers"
                />
            </div>
        </section>
    );
}