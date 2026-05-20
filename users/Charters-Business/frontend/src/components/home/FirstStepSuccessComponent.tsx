'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import HighlightText from '../shared/HighlightObserver';
import Link from "next/link";
// Company tabs data
const companyTabs = [
  { id: 'google', name: 'Google', logo: '/logos/google.svg' },
  { id: 'amazon', name: 'amazon', logo: '/logos/amazon.svg' },
  { id: 'nvidia', name: 'NVIDIA', logo: '/logos/nvidia.svg' },
  { id: 'accenture', name: 'accenture', logo: '/logos/accenture.svg' },
  { id: 'deloitte', name: 'Deloitte.', logo: '/logos/deloitte.png' },
  { id: 'bofa', name: 'Bank of America', logo: '/logos/bofa.png' },
];

// Video cards data by company
const videoCardsByCompany: Record<string, Array<{
  id: string;
  title: string;
  speaker: string;
  role: string;
  company: string;
  university: string;
  thumbnail: string;
}>> = {
  google: [
    {
      id: 'g1',
      title: 'Meet the Tetr Tribe: Class of 2028',
      speaker: 'Srividya Pranavi',
      role: 'Machine Learning Scientist',
      company: 'Apple',
      university: 'Carnegie Mellon University, IIT Kharagpur',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop',
    },
    {
      id: 'g2',
      title: 'Commencement Address: Natalia Stefanowski',
      speaker: 'Srividya Pranavi',
      role: 'Machine Learning Scientist',
      company: 'Apple',
      university: 'Carnegie Mellon University, IIT Kharagpur',
      thumbnail: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=250&fit=crop',
    },
    {
      id: 'g3',
      title: 'Cracking the Tetr Admissions Code',
      speaker: 'Srividya Pranavi',
      role: 'Machine Learning Scientist',
      company: 'Apple',
      university: 'Carnegie Mellon University, IIT Kharagpur',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    },
    {
      id: 'g4',
      title: 'Path to Success at Google',
      speaker: 'Srividya Pranavi',
      role: 'Machine Learning Scientist',
      company: 'Apple',
      university: 'Carnegie Mellon University, IIT Kharagpur',
      thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop',
    },
  ],
  amazon: [
    {
      id: 'a1',
      title: 'Amazon Leadership Principles in Action',
      speaker: 'Rahul Sharma',
      role: 'Senior Product Manager',
      company: 'Amazon',
      university: 'Stanford University, IIT Delhi',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    },
    {
      id: 'a2',
      title: 'Building at Scale: AWS Stories',
      speaker: 'Priya Menon',
      role: 'Solutions Architect',
      company: 'Amazon',
      university: 'MIT, IIT Bombay',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
    },
    {
      id: 'a3',
      title: 'From Campus to Amazon',
      speaker: 'Vikram Patel',
      role: 'Software Development Engineer',
      company: 'Amazon',
      university: 'UC Berkeley, BITS Pilani',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    },
    {
      id: 'a4',
      title: 'Innovation at Amazon',
      speaker: 'Sneha Gupta',
      role: 'Technical Program Manager',
      company: 'Amazon',
      university: 'Harvard, IIT Kanpur',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop',
    },
  ],
  nvidia: [
    {
      id: 'n1',
      title: 'GPU Computing Revolution',
      speaker: 'Alex Chen',
      role: 'Senior GPU Architect',
      company: 'NVIDIA',
      university: 'Caltech, IIT Madras',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
    },
    {
      id: 'n2',
      title: 'AI Hardware: The Future',
      speaker: 'Maya Johnson',
      role: 'AI Research Scientist',
      company: 'NVIDIA',
      university: 'Oxford, IISc Bangalore',
      thumbnail: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=250&fit=crop',
    },
    {
      id: 'n3',
      title: 'Deep Learning Infrastructure',
      speaker: 'Karthik Reddy',
      role: 'Principal Engineer',
      company: 'NVIDIA',
      university: 'Georgia Tech, NIT Trichy',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    },
    {
      id: 'n4',
      title: 'Gaming to AI: NVIDIA Journey',
      speaker: 'Sarah Williams',
      role: 'Product Director',
      company: 'NVIDIA',
      university: 'Princeton, IIT Roorkee',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    },
  ],
  accenture: [
    {
      id: 'ac1',
      title: 'Digital Transformation Stories',
      speaker: 'Anjali Verma',
      role: 'Managing Director',
      company: 'Accenture',
      university: 'Wharton, IIM Ahmedabad',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
    },
    {
      id: 'ac2',
      title: 'Consulting Career Path',
      speaker: 'David Miller',
      role: 'Senior Consultant',
      company: 'Accenture',
      university: 'Columbia, XLRI',
      thumbnail: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=250&fit=crop',
    },
    {
      id: 'ac3',
      title: 'Tech Consulting Insights',
      speaker: 'Ritu Kapoor',
      role: 'Technology Architect',
      company: 'Accenture',
      university: 'Carnegie Mellon, IIT Guwahati',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
    },
    {
      id: 'ac4',
      title: 'Strategy at Scale',
      speaker: 'Michael Brown',
      role: 'Strategy Lead',
      company: 'Accenture',
      university: 'INSEAD, ISB',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
    },
  ],
  deloitte: [
    {
      id: 'd1',
      title: 'Audit to Advisory Journey',
      speaker: 'Neha Saxena',
      role: 'Partner',
      company: 'Deloitte',
      university: 'London Business School, IIM Bangalore',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    },
    {
      id: 'd2',
      title: 'Risk Management Excellence',
      speaker: 'James Wilson',
      role: 'Risk Advisory Director',
      company: 'Deloitte',
      university: 'NYU Stern, FMS Delhi',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop',
    },
    {
      id: 'd3',
      title: 'Financial Services Transformation',
      speaker: 'Pooja Nair',
      role: 'Senior Manager',
      company: 'Deloitte',
      university: 'Kellogg, SPJIMR',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    },
    {
      id: 'd4',
      title: 'Tax Technology Innovation',
      speaker: 'Robert Lee',
      role: 'Tax Technology Lead',
      company: 'Deloitte',
      university: 'MIT Sloan, IIM Calcutta',
      thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop',
    },
  ],
  bofa: [
    {
      id: 'b1',
      title: 'Investment Banking Insights',
      speaker: 'Arun Kumar',
      role: 'Vice President',
      company: 'Bank of America',
      university: 'Harvard Business School, IIM Lucknow',
      thumbnail: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=400&h=250&fit=crop',
    },
    {
      id: 'b2',
      title: 'Wealth Management Strategies',
      speaker: 'Emily Davis',
      role: 'Managing Director',
      company: 'Bank of America',
      university: 'Stanford GSB, JBIMS',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
    },
    {
      id: 'b3',
      title: 'FinTech at BofA',
      speaker: 'Sanjay Mehta',
      role: 'Technology Director',
      company: 'Bank of America',
      university: 'Berkeley Haas, IIT BHU',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop',
    },
    {
      id: 'b4',
      title: 'Global Markets Career',
      speaker: 'Lisa Thompson',
      role: 'Global Markets Head',
      company: 'Bank of America',
      university: 'Chicago Booth, MDI Gurgaon',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop',
    },
  ],
};

// University logos for featured section
const universityLogos = [
  { name: 'Stanford University', logo: '/logos/Stanford.svg' },
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'IIT Bombay', logo: '/logos/iit_bombay.svg' },
];

export default function FirstStepSuccessComponent() {
  const blogSliderRef = useRef<HTMLDivElement>(null);

const scrollBlogs = () => {
  if (!blogSliderRef.current) return;

  blogSliderRef.current.scrollBy({
    left: 420,
    behavior: "smooth",
  });
};
  const [mainTab, setMainTab] = useState('mentor');
  const [activeTab, setActiveTab] = useState('google');
  const videoSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Main tabs data — ai_interview added
  const mainTabs = [
    { id: 'mentor', label: 'Mentor Networking' },
    { id: 'cocurriculars', label: 'Co-curriculars' },
    { id: 'localempact', label: 'Local Empact' },
  ];

  // Track scroll position for navigation buttons
  useEffect(() => {
    const slider = videoSliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      setCanScrollLeft(slider.scrollLeft > 10);
      setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10);
    };

    handleScroll();
    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const scrollVideoSlider = (direction: number) => {
    const slider = videoSliderRef.current;
    if (!slider) return;
    const cardWidth = window.innerWidth * 0.8;
    slider.scrollTo({
      left: slider.scrollLeft + (direction * cardWidth),
      behavior: 'smooth',
    });
  };

  const renderMentorTab = () => (
    <>
    <div>
        {/* Mobile Navigation Buttons */}
        <div className="lg:hidden absolute top-1/3 -translate-y-1/2 right-0 pointer-events-none z-10">
          {canScrollRight && (
            <button
              onClick={() => scrollVideoSlider(1)}
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
        <div className="lg:hidden absolute top-1/3 -translate-y-1/2 left-0 pointer-events-none z-10">
          {canScrollLeft && (
            <button
              onClick={() => scrollVideoSlider(-1)}
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
    </>
  );

  const renderOtherTab = () => (
    <><div>
      <div>
          <div className="relative group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
                alt="Featured video thumbnail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Play video"
                >
                  <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-6 h-6 sm:w-8 sm:h-8 text-[#B30437] ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 text-center">
        <p className="text-gray-500 text-lg">No additional data available for {mainTabs.find((t) => t.id === mainTab)?.label}</p>
      </div>
    </>
  );
  const blogs = [
  {
    title: "AI Agent Frameworks: What It Is & How It Works",
    author: "Agnish Rawat",
    time: "20 min read",
    link: "/blog/ai-agent-frameworks",
  },
  {
    title: "Will AI Replace Software Engineers? Truth, Opinions and Career Impact",
    author: "Team Scaler",
    time: "14 min read",
    link: "/blog/ai-vs-engineers",
  },
  {
    title: "SQL Roadmap 2026: Learning Paths, Career Roles and Tools",
    author: "Tushar Bisht",
    time: "18 min read",
    link: "/blog/sql-roadmap",
  },
  {
  title: "Top AI Skills Every Student Should Learn in 2026",
  author: "Charters Team",
  time: "12 min read",
  link: "/blog/top-ai-skills",
},
{
  title: "How to Build a Career in Data Analytics from Scratch",
  author: "Career Desk",
  time: "16 min read",
  link: "/blog/data-analytics-career",
},
];

return (
  <section className="relative z-[5] bg-white text-black pt-10 pb-0">
    <div className="max-w-[85rem] w-full mx-auto px-4">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-[#B30437] tracking-wider mb-3">
          FROM OUR BLOGS
        </p>

        <h2 className="leading-none text-black text-2xl sm:text-3xl md:text-[35px] font-bold pb-[17px]">
          Latest insights for your{" "}
          <HighlightText className="font-bold italic">
            career growth
          </HighlightText>
        </h2>
      </div>
      </div>


      <div className="relative">
  <div
    ref={blogSliderRef}
    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
  >
        {blogs.map((blog) => (
          <a
            key={blog.title}
            href={blog.link}
className="flex-none w-[85vw] sm:w-[380px] lg:w-[420px] snap-start border-t border-b border-r border-gray-200 border-l-0 bg-white p-6 min-h-[170px] flex flex-col justify-between"          >
            <h3 className="text-xl font-bold leading-snug text-black mb-6">
              {blog.title}
            </h3>

            <div className="border-t border-gray-200 pt-4 flex items-center justify-between text-sm text-gray-600">
              <span>{blog.author}</span>
              <span>{blog.time}</span>
            </div>
          </a>
        ))}
      </div>
      {true && (
  <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
    <button
      onClick={scrollBlogs}
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B30437] hover:bg-red-700 shadow flex items-center justify-center pointer-events-auto transition-all"
      aria-label="Next"
      type="button"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
        <path
          d="M9 18l6-6-6-6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </button>
  </div>
)}
    </div>
  </section>
);
}