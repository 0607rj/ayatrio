"use client";

import { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import HighlightText from "../shared/HighlightObserver";

interface Student {
  name: string;
  batch: string;
  city: string;
  company: string;
  companyLogo?: string;
  role: string;
  timeToPlace: string;
  previousCollege: string;
  background: string;
  internship: string;
  researchPaper: string;
  caseStudies: string;
  imageSrc: string;
  linkedinUrl?: string;
  category: string;
}

interface StudentCategory {
  id: string;
  name: string;
}

const studentCategories: StudentCategory[] = [
  { id: "jan", name: "January" },
  { id: "apr", name: "April" },
  { id: "jul", name: "July" },
  { id: "oct", name: "October" },
  { id: "dec", name: "December" },
];
const studentMembers: Student[] = [
  {
    name: "Sunita Das",
    batch: "AUG 2025",
    city: "Kolkata",
    company: "TATA",
    role: "Executive Finance",
    timeToPlace: "Just in 7 months",
    previousCollege: "Goenka College",
    background: "2nd Year BCOM Fresher",
    internship: "Kripton PVT Ltd / Horyzen PVT Ltd — Quarter Taxation, 2025 income tax, strategy on price section",
    researchPaper: "How AI impacts on taxation automation at global countries",
    caseStudies: "Why Amule SAP automation failed 100 million revenue at 2...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886820/t6szcvb54fwgjs0swgh1_xuaz6y.avif",
    linkedinUrl: "#",
    category: "jan",
  },
  {
    name: "Rahul Sharma",
    batch: "JAN 2025",
    city: "Mumbai",
    company: "TATA",
    role: "Finance Analyst",
    timeToPlace: "Just in 7 months",
    previousCollege: "Mumbai University",
    background: "3rd Year BCOM Fresher",
    internship: "Deloitte India — Tax advisory and financial reporting",
    researchPaper: "Impact of GST on SME growth in India",
    caseStudies: "How Infosys restructured its finance division post-2020...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886819/fwwshpnqwsid71f8dgtt_ytkxtr.avif",
    linkedinUrl: "#",
    category: "jan",
  },
  {
    name: "Priya Mehta",
    batch: "JAN 2025",
    city: "Delhi",
    company: "TATA",
    role: "Operations Executive",
    timeToPlace: "Just in 6 months",
    previousCollege: "Delhi University",
    background: "Graduate Fresher",
    internship: "PwC India — Business process optimization",
    researchPaper: "Digital transformation in Indian banking sector",
    caseStudies: "Why Jet Airways failed despite strong brand equity...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886821/v56rnsmx8rkyg4qf8zlt_govysb.avif",
    linkedinUrl: "#",
    category: "jan",
  },
  {
    name: "Amit Kumar",
    batch: "APR 2025",
    city: "Bangalore",
    company: "TATA",
    role: "Business Analyst",
    timeToPlace: "Just in 7 months",
    previousCollege: "Christ University",
    background: "BBA Graduate Fresher",
    internship: "KPMG — Market research and data analysis",
    researchPaper: "Role of fintech in financial inclusion in rural India",
    caseStudies: "How Byju's lost market cap despite rapid expansion...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886818/dbubonqa0x47h1dsrjv0_nqgglk.avif",
    linkedinUrl: "#",
    category: "apr",
  },
  {
    name: "Neha Singh",
    batch: "APR 2025",
    city: "Pune",
    company: "TATA",
    role: "HR Executive",
    timeToPlace: "Just in 7 months",
    previousCollege: "Symbiosis College",
    background: "BBA HR Fresher",
    internship: "Wipro HR — Talent acquisition and onboarding",
    researchPaper: "Employee retention strategies in post-pandemic era",
    caseStudies: "How Zomato scaled its workforce from 500 to 5000...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886822/wsp4kdxh2fsyp6ehxrpp_gttfyp.avif",
    linkedinUrl: "#",
    category: "apr",
  },
  {
    name: "Ravi Patel",
    batch: "JUL 2025",
    city: "Ahmedabad",
    company: "TATA",
    role: "Marketing Executive",
    timeToPlace: "Just in 7 months",
    previousCollege: "Gujarat University",
    background: "BCOM Graduate Fresher",
    internship: "Ogilvy India — Digital marketing campaigns",
    researchPaper: "Social media influence on consumer buying behavior",
    caseStudies: "How Amul maintained brand dominance for 70+ years...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886817/bytg0uyh5ebkd2zwuzm0_yalhuk.avif",
    linkedinUrl: "#",
    category: "jul",
  },
  {
    name: "Anjali Roy",
    batch: "OCT 2025",
    city: "Kolkata",
    company: "TATA",
    role: "Finance Executive",
    timeToPlace: "Just in 7 months",
    previousCollege: "Jadavpur University",
    background: "BCOM Fresher",
    internship: "EY India — Audit and assurance services",
    researchPaper: "Blockchain applications in financial auditing",
    caseStudies: "How Paytm navigated RBI regulations post-IPO...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886817/aucg8hpb0asmjsslka0h_dvhxpz.avif",
    linkedinUrl: "#",
    category: "oct",
  },
  {
    name: "Karan Gupta",
    batch: "DEC 2025",
    city: "Hyderabad",
    company: "TATA",
    role: "Strategy Analyst",
    timeToPlace: "Just in 7 months",
    previousCollege: "BITS Pilani",
    background: "B.Tech Graduate Fresher",
    internship: "McKinsey & Company — Strategy consulting",
    researchPaper: "AI disruption in traditional consulting models",
    caseStudies: "How TCS transformed its delivery model for Gen AI...",
    imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886817/a07zod5okvybawy1kj0u_ef4niw.avif",
    linkedinUrl: "#",
    category: "dec",
  },
  {
  name: "Riya Kapoor",
  batch: "APR 2026",
  city: "Kolkata",
  company: "Jio",
  role: "Growth Engineer",
  timeToPlace: "10 Months later",
  previousCollege: "Techno India",
  background: "2nd Year MCA Fresher",
  internship: "Jio Platforms — Growth engineering and analytics",
  researchPaper: "AI-based customer engagement strategies in telecom industry",
  caseStudies: "How Jio scaled digital adoption across India...",
  imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081839/21_bnm51l.jpg",
  linkedinUrl: "#",
  category: "apr",
},

{
  name: "Sneha Dutta",
  batch: "DEC 2025",
  city: "Kolkata",
  company: "WishCare",
  role: "Digital Marketing",
  timeToPlace: "Just in 9 months",
  previousCollege: "Loreto College",
  background: "2025 Pass Out Fresher",
  internship: "WishCare — Brand marketing and influencer campaigns",
  researchPaper: "Social media growth strategies for D2C brands",
  caseStudies: "How WishCare built a beauty-first digital audience...",
  imageSrc: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081840/23_obnfxo.jpg",
  linkedinUrl: "#",
  category: "jan",
},
];

interface StudentModelProps {
  data?: {
    students?: Student[];
    categories?: StudentCategory[];
  };
}

function StudentModel({ data }: StudentModelProps) {
  const dynamicCategories = data?.categories || studentCategories;
  const studentsData = data?.students || studentMembers;
  const [isAnimating, setIsAnimating] = useState(false);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("jan");
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const filteredStudents = studentsData.filter(
    (s) => s.category === activeCategory
  );

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setIsTabSwitching(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      if (slidesContainerRef.current) {
        slidesContainerRef.current.scrollLeft = 0;
      }
      setTimeout(() => setIsTabSwitching(false), 50);
    }, 200);
  };

  const changeSlide = (direction: number) => {
    if (isAnimating) return;
    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;
    setIsAnimating(true);
    const scrollAmount = scrollContainer.clientWidth * 0.6;
    scrollContainer.scrollTo({
      left: scrollContainer.scrollLeft + direction * scrollAmount,
      behavior: "smooth",
    });
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;
    const handleScroll = () => {
      const max = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      setOffsetPercent(max > 0 ? (scrollContainer.scrollLeft / max) * 100 : 0);
    };
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        className="relative z-[5] bg-white text-black pb-12 overflow-x-hidden pt-12"
        role="region"
        aria-labelledby="students-heading"
      >
        <div className="max-w-[85rem] w-full mx-auto">
          {/* Header */}
          <div className="relative text-center pb-[3.25rem]">
            <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 sm:mb-6">
              OUR STUDENTS
            </p>
            <h2
              id="students-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Meet our{" "}
              <HighlightText className="font-bold">Achievers</HighlightText>
            </h2>
            <p className="text-black text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Real students. Real placements. See where our graduates are working today.
            </p>
          </div>

          {/* Tabs */}
          <div aria-label="Student batch categories">
            <ul className="flex overflow-scroll scrollbar-hide sm:justify-center gap-1 sm:gap-3 md:gap-6 border-b border-gray-300">
              {dynamicCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 text-nowrap sm:px-4 py-2 transition-all text-sm ${
                      activeCategory === category.id
                        ? "text-black border-b-2 border-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-pressed={activeCategory === category.id}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cards */}
          <div className="relative">
            <div
              ref={slidesContainerRef}
              className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth transition-all duration-300 ease-out ${
                isTabSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {filteredStudents.map((student, index) => (
                <article
                  key={student.name}
                  className="flex-none w-[85vw] sm:w-[420px] snap-start mr-0 first:ml-0 overflow-hidden border border-gray-200 border-r-0 bg-white"                >
                  {/* Top — full image */}
                  <div className="w-full">
                    <Image
                      src={student.imageSrc}
                      alt={student.name}
                      width={500}
                      height={600}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Bottom — white details */}
                  <div className="p-4 bg-white">
                    {/* Name + LinkedIn */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-black text-base">{student.name}</h3>
                      
                        <a
                          href={student.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={student.name + " LinkedIn"}
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                          </svg>
                        </a>
                    </div>

                    {/* Batch + City */}
                    <p className="text-gray-500 text-xs mb-3">
                      Batch - {student.batch} • {student.city}
                    </p>

                    <hr className="border-gray-200 mt-3 mb-3" />

                    {/* Internship */}
                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Internship
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {student.internship}
                      </p>
                    </div>

                    {/* Research Paper */}
                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Research Paper
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {student.researchPaper}
                      </p>
                    </div>

                    {/* Case Studies */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                        Case Studies
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {student.caseStudies}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Next button */}
            {offsetPercent < 95 && (
              <div className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none">
                <button
                  onClick={() => changeSlide(1)}
                  disabled={isAnimating}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 shadow flex items-center justify-center pointer-events-auto transition-all"
                  aria-label="Next"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}

            {/* Prev button */}
            {offsetPercent > 5 && (
              <div className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none">
                <button
                  onClick={() => changeSlide(-1)}
                  disabled={isAnimating}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 shadow flex items-center justify-center pointer-events-auto transition-all"
                  aria-label="Previous"
                  type="button"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(StudentModel);