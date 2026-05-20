"use client";

import { memo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import HighlightObserver from "@/components/shared/HighlightObserver";
import HighlightText from "@/components/shared/HighlightObserver";
const randomLogos = [
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cocacola.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/colgate.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/epicgames.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
  "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
];
interface Faculty {
  name: string;
  title: string;
  company: string;
  subtitle?: string;
  experience?: string;
  teaching?: string;
  imageSrc: string;
  linkedinUrl?: string;
  category: string;
  logos?: string[];
}

interface FacultyCategory {
  id: string;
  name: string;
}

const facultyCategories: FacultyCategory[] = [
  { id: "leadership", name: "Leadership" },
  { id: "entrepreneurship", name: "Entrepreneurship" },
  { id: "finance", name: "Finance" },
  { id: "technology", name: "Technology" },
  { id: "consulting", name: "Consulting" },
];

const facultyMembers: Faculty[] = [
  // Leadership Category
  {
    name: "Mr. Rajat Mathur",
    title: "Managing Director",
    company: "MorganStanley",
    subtitle: "MD, India at Morgan Stanley",
    experience: "Ex Managing Director at Goldman Sachs",
    teaching: "Corporate strategy and financial markets",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "leadership",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Leadership Expert 2",
    title: "CEO",
    company: "LeaderCorp",
    subtitle: "Chief Executive Officer",
    experience: "25+ years in leadership",
    teaching: "Executive leadership",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "leadership",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Leadership Expert 3",
    title: "Managing Partner",
    company: "PartnerCo",
    subtitle: "Managing Partner",
    experience: "20+ years in management",
    teaching: "Leadership development",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "leadership",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  // Entrepreneurship Category
  {
    name: "Mr. Naveen Munjal",
    title: "Managing Director",
    company: "HEROELECTRIC",
    subtitle: "Founder & MD at Hero Electric",
    experience: "Ex VP at Hero MotoCorp",
    teaching: "EV industry and startup scaling",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "entrepreneurship",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Arjun Vaidya",
    title: "Founder",
    company: "DR. VAIDYA's",
    subtitle: "Founder & CMD at Dr. Vaidya's",
    experience: "Built Ayurveda brand from scratch",
    teaching: "Founding a health-tech venture",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "entrepreneurship",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Entrepreneur Expert 3",
    title: "Serial Entrepreneur",
    company: "StartupCo",
    subtitle: "Founder of multiple startups",
    experience: "Built 5+ successful ventures",
    teaching: "Startup fundamentals",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "entrepreneurship",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  // Finance Category
  {
    name: "Mr. Finance Expert 1",
    title: "CFO",
    company: "FinanceCo",
    subtitle: "Chief Financial Officer",
    experience: "22+ years in finance",
    teaching: "Financial management",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "finance",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Finance Expert 2",
    title: "Investment Banker",
    company: "InvestBank",
    subtitle: "Senior Investment Banker",
    experience: "18+ years in banking",
    teaching: "Investment banking",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "finance",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Finance Expert 3",
    title: "Fund Manager",
    company: "FundCorp",
    subtitle: "Portfolio Manager",
    experience: "15+ years in fund management",
    teaching: "Portfolio management",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "finance",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  // Technology Category
  {
    name: "Mr. Manoj Kohli",
    title: "Former Country Head",
    company: "SoftBank",
    subtitle: "Former Country Head at SoftBank India",
    experience: "Ex MD at Bharti Airtel",
    teaching: "Tech investments and growth strategy",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "technology",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Tech Expert 2",
    title: "CTO",
    company: "TechGiant",
    subtitle: "Chief Technology Officer",
    experience: "20+ years in technology",
    teaching: "Technology strategy",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "technology",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Tech Expert 3",
    title: "VP Engineering",
    company: "SoftwareCorp",
    subtitle: "VP of Engineering",
    experience: "17+ years in software",
    teaching: "Software architecture",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "technology",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  // Consulting Category
  {
    name: "Captain Raghu Raman",
    title: "Former President",
    company: "Reliance",
    subtitle: "Former President, Strategy at Reliance",
    experience: "Led energy & infrastructure divisions",
    teaching: "Corporate leadership and operations",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "consulting",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Consulting Expert 2",
    title: "Senior Partner",
    company: "ConsultCo",
    subtitle: "Senior Partner",
    experience: "22+ years in consulting",
    teaching: "Management consulting",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "consulting",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
  {
    name: "Mr. Consulting Expert 3",
    title: "Strategy Consultant",
    company: "StrategyCo",
    subtitle: "Principal Consultant",
    experience: "18+ years in strategy",
    teaching: "Strategic consulting",
    imageSrc: "/images/faculty/home.jpeg",
    linkedinUrl: "#",
    category: "consulting",
    logos: randomLogos.sort(() => 0.5 - Math.random()).slice(0, 3),
  },
];

interface FacultyModelProps {
  data?: {
    faculty?: Faculty[];
    categories?: FacultyCategory[];
  };
}

function FacultyModel({ data }: FacultyModelProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [offsetPercent, setOffsetPercent] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("leadership");
  const [isTabSwitching, setIsTabSwitching] = useState(false);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const dynamicCategories = data?.categories || facultyCategories;
  const facultyData = data?.faculty || facultyMembers;
  const filteredFaculty = facultyData.filter(
    (faculty) => faculty.category === activeCategory
  );

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setIsTabSwitching(true);
    setTimeout(() => {
      setActiveCategory(categoryId);
      if (slidesContainerRef.current) {
        slidesContainerRef.current.scrollLeft = 0;
      }
      setTimeout(() => {
        setIsTabSwitching(false);
      }, 50);
    }, 200);
  };

  const STEP = 60;

  const getAnimationDuration = () => {
    return typeof window !== "undefined" && window.innerWidth <= 768 ? 800 : 600;
  };

  const changeSlide = (direction: number): void => {
    if (isAnimating) return;

    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;

    setIsAnimating(true);

    const scrollAmount = scrollContainer.clientWidth * (STEP / 100);
    const targetScroll = scrollContainer.scrollLeft + (direction * scrollAmount);

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, getAnimationDuration());
  };

  useEffect(() => {
    const scrollContainer = slidesContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;
      const newOffset = maxScrollLeft > 0 ? (currentScroll / maxScrollLeft) * 100 : 0;
      setOffsetPercent(newOffset);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section
        className="mx-[0%] relative z-[5] bg-white text-black overflow-x-hidden pt-12"
        role="region"
        aria-labelledby="faculty-heading"
      >
        <div className="max-w-[85rem] w-full mx-auto  ">
          {/* Section Header */}
          <div className="relative text-center pb-[3.25rem] sm:pb-[3.25rem]">
            <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-4 sm:mb-6">
              LEARN FROM THE BEST
            </p>

            <h2
              id="faculty-heading"
              className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]"
            >
              Meet your{" "}
              <HighlightText className="mx-1 sm:mx-2 font-bold">
                Faculty
              </HighlightText>
            </h2>

            <p className="text-black text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
              Learn from industry leaders, academic experts, and seasoned
              practitioners who bring real-world experience to your education.
            </p>
          </div>

          {/* Category Tabs */}
          <div aria-label="Faculty categories">
            <ul className="flex overflow-scroll scrollbar-hide sm:justify-center gap-1 sm:gap-3 md:gap-6 border-b border-gray-300">
              {dynamicCategories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 text-nowrap sm:px-4 py-2 transition-all focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-[#B30437] text-sm ${activeCategory === category.id
                      ? "text-black border-b-2 border-black"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                    aria-label={`${category.name} faculty`}
                    aria-pressed={activeCategory === category.id}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Faculty Members Section with Navigation */}
          <div className="relative">
            <div
              ref={slidesContainerRef}
              className={
                // change gap
                `flex  transition-all duration-300 ease-out ` +
                `overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth ` +
                `${isTabSwitching ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`
              }
              style={{ transition: 'opacity 200ms ease-out, transform 200ms ease-out' }}
              role="list"
              aria-label="Faculty members"
            >
              {filteredFaculty.map((faculty, index) => (
  <article
  key={faculty.name}
  className="bg-[#F4F2EE] border-r border-b border-gray-300 flex flex-col flex-none w-[340px] snap-start"
>
  {/* Image */}
  <div className="w-full h-[280px] bg-gray-200">
    <Image
      src={faculty.imageSrc}
      alt={faculty.name}
      width={400}
      height={400}
      className="w-full h-full object-contain"
    />
  </div>

  {/* Content */}
  <div className="p-5">
    <h2 className="text-2xl font-semibold text-black">
      {faculty.title}
    </h2>

    <p className="text-gray-700 font-medium mt-1">
      by {faculty.name}
    </p>

    <div className="h-px bg-gray-400 my-3" />

    <p className="text-sm text-gray-700 mb-4">
      {faculty.experience}
    </p>

    <p className="font-semibold text-black mb-2">
      Research Publications
    </p>

    <p className="text-sm text-gray-700 mb-4">
      {faculty.teaching}
    </p>

    {/* Logos */}
    <div className="flex gap-3 mt-2">
      {faculty.logos?.map((logo, i) => (
        <img
          key={i}
          src={logo}
          className="h-8 w-auto object-contain bg-white rounded-md px-2 py-1"
        />
      ))}
    </div>
  </div>
</article>
))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-2 pointer-events-none">
              {offsetPercent < 95 && (
                <button
                  onClick={() => changeSlide(1)}
                  disabled={isAnimating}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437] pointer-events-auto"
                  aria-label="Next slide"
                  type="button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-2 pointer-events-none">
              {offsetPercent > 5 && (
                <button
                  onClick={() => changeSlide(-1)}
                  disabled={isAnimating}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 transition-all duration-300 ease-in-out shadow-sm hover:shadow flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437] pointer-events-auto"
                  aria-label="Previous slide"
                  type="button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(FacultyModel);
