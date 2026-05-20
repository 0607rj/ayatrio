'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSectionObserver } from '@/hooks/Usementorshipscroll';
import SectionWrapper from '@/components/shared/SectionWrapper';
import HighlightText from '../shared/HighlightObserver';

export default function ComprehensivePage() {
  // State for LearnFromFinest section
  const [activeFilter, setActiveFilter] = useState('All');

  // State for RealSection typewriter effect
  const [displayedText, setDisplayedText] = useState(['', '', '']);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const words = ['Strategy', 'Solutions', 'Support'];

  // State for mentorship section tabs
  const [activeTab, setActiveTab] = useState(0);

  // Track manual tab clicks so scroll-spy doesn't override immediately
  const isManualScroll = useRef(false);

  // Card refs for the 3 mentorship cards
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Scroll animation for Real section - Fixed to use object syntax
  const realSectionRef = useScrollAnimation<HTMLElement>(
    {
      onEnter: () => {
        if (!animationTriggered) {
          setAnimationTriggered(true);
          startTypewriterAnimation();
        }
      },
    },
    { threshold: 0.3, delay: 200, rootMargin: '0px' }
  );

  // Replace the window.scroll listener with IntersectionObserver
  const observedTab = useSectionObserver(cardRefs);

  useEffect(() => {
    if (!isManualScroll.current) {
      setActiveTab(observedTab);
    }
  }, [observedTab]);

  // Handler for tab click with manual scroll guard
  const handleTabClick = useCallback((index: number) => {
    isManualScroll.current = true;
    setActiveTab(index);
    cardRefs[index].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    // Release the manual lock after smooth scroll finishes
    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  }, [cardRefs]);

  // Faculty data for LearnFromFinest section
  const facultyMembers = [
    {
      id: 1,
      name: 'Dr. Zal Phiroz',
      title: 'Adjunct Professor',
      company: 'HARVARD UNIVERSITY',
      image: 'https://i.pravatar.cc/400?img=11',
      category: 'Academicians'
    },
    {
      id: 2,
      name: 'Mr. Rajat Mathur',
      title: 'Managing Director',
      company: 'MorganStanley',
      image: 'https://i.pravatar.cc/400?img=12',
      category: 'Industry Experts'
    },
    {
      id: 3,
      name: 'Dr. Shad Morris',
      title: 'Adjunct Professor',
      company: 'MITSLOAN',
      image: 'https://i.pravatar.cc/400?img=13',
      category: 'Academicians'
    },
    {
      id: 4,
      name: 'Dr. Lan Mo',
      title: 'Adjunct Professor',
      company: 'NYU SHANGHAI',
      image: 'https://i.pravatar.cc/400?img=14',
      category: 'Academicians'
    },
    {
      id: 5,
      name: 'Mr. Naveen Munjal',
      title: 'Managing Director',
      company: 'HEROELECTRIC',
      image: 'https://i.pravatar.cc/400?img=15',
      category: 'Industry Experts'
    },
    {
      id: 6,
      name: 'Dr. Sarah Johnson',
      title: 'Professor of Strategy',
      company: 'STANFORD BUSINESS',
      image: 'https://i.pravatar.cc/400?img=16',
      category: 'Academicians'
    },
    {
      id: 7,
      name: 'Mr. Michael Chen',
      title: 'CEO',
      company: 'TECHCORP',
      image: 'https://i.pravatar.cc/400?img=17',
      category: 'Industry Experts'
    },
    {
      id: 8,
      name: 'Dr. Emily Rodriguez',
      title: 'Associate Professor',
      company: 'WHARTON SCHOOL',
      image: 'https://i.pravatar.cc/400?img=18',
      category: 'Academicians'
    },
    {
      id: 9,
      name: 'Mr. David Kumar',
      title: 'VP of Operations',
      company: 'GLOBAL SOLUTIONS',
      image: 'https://i.pravatar.cc/400?img=19',
      category: 'Industry Experts'
    },
    {
      id: 10,
      name: 'Dr. Lisa Wang',
      title: 'Professor of Finance',
      company: 'KELLOGG SCHOOL',
      image: 'https://i.pravatar.cc/400?img=20',
      category: 'Academicians'
    },
  ];

  // Business leaders data for LessonsFromBest section
  const businessLeaders = [
    {
      id: 1,
      name: 'Mr. Mohammad Arshad',
      title: 'Director, Advisory Services',
      company: 'Business Review',
      image: 'https://i.pravatar.cc/400?img=1'
    },
    {
      id: 2,
      name: 'Mr. Vaibhav Shashwat',
      title: 'Policy & Public Affairs',
      company: 'CCTV',
      image: 'https://i.pravatar.cc/400?img=2'
    },
    {
      id: 3,
      name: 'Mr. Sameer Ranjan',
      title: 'Chief Technology Officer and',
      company: 'Director, Citemate',
      image: 'https://i.pravatar.cc/400?img=3'
    },
    {
      id: 4,
      name: 'Ms. Archana Sinha',
      title: 'Former Senior Director',
      company: 'Salesforce',
      image: 'https://i.pravatar.cc/400?img=4'
    },
    {
      id: 5,
      name: 'Mr. Raja Sekhar Thota',
      title: 'CTO & Co-Founder',
      company: 'AutoNinja GmbH',
      image: 'https://i.pravatar.cc/400?img=5'
    },
    {
      id: 6,
      name: 'Mr. Amit Sharma',
      title: 'VP of Engineering',
      company: 'TechCorp',
      image: 'https://i.pravatar.cc/400?img=6'
    },
    {
      id: 7,
      name: 'Ms. Priya Patel',
      title: 'Chief Marketing Officer',
      company: 'Digital Solutions',
      image: 'https://i.pravatar.cc/400?img=7'
    },
    {
      id: 8,
      name: 'Mr. Rohit Kumar',
      title: 'Head of Product',
      company: 'Innovation Labs',
      image: 'https://i.pravatar.cc/400?img=8'
    },
    {
      id: 9,
      name: 'Ms. Neha Singh',
      title: 'Director of Operations',
      company: 'Global Ventures',
      image: 'https://i.pravatar.cc/400?img=9'
    },
    {
      id: 10,
      name: 'Mr. Karthik Reddy',
      title: 'Senior Vice President',
      company: 'Financial Services',
      image: 'https://i.pravatar.cc/400?img=10'
    }
  ];

  const filteredFaculty =
    activeFilter === 'All'
      ? facultyMembers
      : facultyMembers.filter((member) => member.category === activeFilter);

  // Typewriter animation function for RealSection
  const startTypewriterAnimation = () => {
    let currentWordIndex = 0;
    let currentCharIndex = 0;

    const typeNextChar = () => {
      if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];

        if (currentCharIndex <= currentWord.length) {
          setDisplayedText((prev) => {
            const newText = [...prev];
            newText[currentWordIndex] = currentWord.slice(0, currentCharIndex);
            return newText;
          });

          currentCharIndex++;

          if (currentCharIndex > currentWord.length) {
            currentWordIndex++;
            currentCharIndex = 0;
            setTimeout(typeNextChar, 500);
          } else {
            setTimeout(typeNextChar, 100);
          }
        }
      }
    };

    setTimeout(typeNextChar, 200);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative z-[5] pt-[72px] sm:pt-[48px] md:pt-[50px] pb-8 md:pb-12 bg-white mt-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-black">
              <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">
                WORLD-CLASS EDUCATORS
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 sm:mb-6">
                Learn from the{' '}
                <span className="italic text-[#B30437]">finest minds</span> in business
              </h1>

              <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-lg">
                From MDs, CEOs and CTOs of leading unicorns to Ivy League professors, our faculty
                brings knowledge that blends theory with real-world impact.
              </p>

              <button
                className="inline-flex items-center space-x-2 sm:space-x-3 bg-[#B30437] hover:bg-[#8B0000] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 group"
                type="button"
              >
                <span>Meet the Masters</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            <div className="relative">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#B30437] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="currentColor" />
                  </div>
                  <p className="text-xs sm:text-sm">Play Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="mx-[0%] border-b border-gray-200 bg-white text-black relative z-[5]">
        <div className="max-w-[85rem] mx-auto pt-8">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">
              INSPIRING EDUCATORS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
              Faculty that{" "}
              <HighlightText className="font-bold">
                inspire and empower
              </HighlightText>
            </h2>
          </div>
        </div>
        <div className="border-x md:mx-[5%] border-gray-200 h-13 hidden md:block" />
      </section>
      <div className="bordered-container border-x md:mx-[5%] border-gray-200 w-full md:w-[90%] mx-auto">

        {/* Component 2 */}
        <SectionWrapper hideCorners={"all"}>
          <section className="relative z-[5] pb-8 sm:pb-10 pt-6 sm:pt-6 bg-white">
            <div className="w-full mx-auto">
              <div
                className="sticky z-10 bg-white border-gray-200"
                style={{ top: 'var(--navbar-height, 86px)' }}
              >
                <div className='flex overflow-x-auto scrollbar-hide px-4 sm:px-0'>
                  {['All', 'Academicians', 'Industry Experts'].map((filter, index) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${activeTab === index
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredFaculty.slice(0, 25).map((faculty) => (
                  <div key={faculty.id} className="group pb-3 border-r border-b border-gray-300">
                    <div className="relative bg-gray-800 overflow-hidden aspect-[3/4] mb-3">
                      <Image src={faculty.image} alt={`${faculty.name}`} fill className="object-cover grayscale" />
                    </div>
                    <div className="text-left p-2 sm:p-3">
                      <h3 className="font-medium text-gray-900 text-xs mb-1 leading-tight">{faculty.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight">{faculty.title}</p>
                      <p className="text-xs text-gray-600 leading-tight">{faculty.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* ===== MENTORSHIP TYPES SECTION ===== */}

        <SectionWrapper hideCorners={"all"}>
          <section className="relative z-[5] py-8 sm:py-10 pt-3 sm:pt-3 bg-white">
            <div className="w-full mx-auto">

              {/* Tabs — sticky + updated click handler */}
              <div
                className="sticky z-10 bg-white border-gray-200"
                style={{ top: 'var(--navbar-height, 86px)' }}
              >
                <div className="flex overflow-x-auto scrollbar-hide px-4 sm:px-0">
                  {['Career Mentors', 'Domain Mentors', 'Startup Coaches'].map((label, index) => (
                    <button
                      key={label}
                      className={`whitespace-nowrap px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${activeTab === index
                        ? 'text-gray-900 border-b-2 border-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => handleTabClick(index)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-4 sm:h-6"></div>

              <div className="space-y-4 sm:space-y-6">

                {/* Card 1 - Career Coach */}
                <div
                  ref={cardRefs[0]}
                  className=" flex flex-col md:flex-row bg-white  overflow-hidden border border-gray-100 shadow-sm"
                >
                  {/* Image block */}
                  <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-auto md:min-h-[380px]">
                    <div className="grid grid-cols-3 h-full">
                      {[31, 32, 33].map((imgNum, idx) => (
                        <div key={imgNum} className="relative">
                          <Image
                            src={`https://i.pravatar.cc/300?img=${imgNum}`}
                            alt={`Career Mentor ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          {(idx === 0 || idx === 2) && (
                            <div
                              className={`absolute ${idx === 0 ? 'top-3 left-3' : 'bottom-3 right-3'
                                } w-5 h-5 bg-[#B30437] rounded`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Text block */}
                  <div className="w-full md:w-1/2 bg-white text-black p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">Go further with a Career Coach</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        'Design a compelling resume and personal pitch',
                        'Ace interviews with 100+ top recruiters',
                        'Strategize your way to senior management and leadership-level roles',
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Image src="/dot-icon.svg" alt="" width={18} height={18} className="mt-0.5 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2 - Domain Mentors */}
                <div
                  ref={cardRefs[1]}
                  className="flex flex-col md:flex-row bg-white  overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-auto md:min-h-[380px]">
                    <div className="grid grid-cols-3 h-full">
                      {[34, 35, 36].map((imgNum, idx) => (
                        <div key={imgNum} className="relative">
                          <Image
                            src={`https://i.pravatar.cc/300?img=${imgNum}`}
                            alt={`Domain Mentor ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          {(idx === 0 || idx === 2) && (
                            <div
                              className={`absolute ${idx === 0 ? 'top-3 left-3' : 'bottom-3 right-3'
                                } w-5 h-5 bg-[#B30437] rounded`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 bg-white text-black p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">Go Deep with Domain Mentors</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        'Connect with industry leaders across diverse domains',
                        'Develop a distinctive voice and online presence with expert tips',
                        'Gain the insights and leadership skills needed to stand out in your chosen domain',
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Image src="/dot-icon.svg" alt="" width={18} height={18} className="mt-0.5 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3 - StartUp Coach */}
                <div
                  ref={cardRefs[2]}
                  className="flex flex-col md:flex-row bg-white  overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-auto md:min-h-[380px]">
                    <div className="grid grid-cols-3 h-full">
                      {[37, 38, 39].map((imgNum, idx) => (
                        <div key={imgNum} className="relative">
                          <Image
                            src={`https://i.pravatar.cc/300?img=${imgNum}`}
                            alt={`Startup Mentor ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          {(idx === 0 || idx === 2) && (
                            <div
                              className={`absolute ${idx === 0 ? 'top-3 left-3' : 'bottom-3 right-3'
                                } w-5 h-5 bg-[#B30437] rounded`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 bg-white text-black p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5">Start strong with a StartUp Coach</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        'Identify business opportunities, create business plans, and develop your go-to-market strategy',
                        'Network with VCs and angels, and secure $50-$100K seed funding for your startup',
                        'Acquire your first 1000 customers, accelerate growth, and establish your market presence',
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Image src="/dot-icon.svg" alt="" width={18} height={18} className="mt-0.5 flex-shrink-0" />
                          <p className="text-sm leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </SectionWrapper>

        {/* ===== REAL-TIME MENTORSHIP SECTION ===== */}
        <SectionWrapper hideCorners={"all"}>
          <section className="relative z-[5] py-8 sm:py-10 bg-white">
            <div className="w-full mx-auto">

              {/* Card - Real-Time Mentorship */}
              <div className="flex flex-col md:flex-row bg-white overflow-hidden border border-gray-100 shadow-sm">

                {/* Image block */}
                <div className="w-full md:w-1/2 relative h-56 sm:h-72 md:h-auto md:min-h-[380px]">
                  <div className="grid grid-cols-3 h-full">
                    {[40, 41, 42].map((imgNum, idx) => (
                      <div key={imgNum} className="relative">
                        <Image
                          src={`https://i.pravatar.cc/300?img=${imgNum}`}
                          alt={`Mentor ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        {(idx === 0 || idx === 2) && (
                          <div
                            className={`absolute ${idx === 0 ? 'top-3 left-3' : 'bottom-3 right-3'
                              } w-5 h-5 bg-[#B30437] rounded`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text block */}
                <div className="w-full md:w-1/2 bg-white text-black p-4 sm:p-6 md:p-8 flex flex-col justify-center">

                  <p className="text-xs font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3">
                    EXPERT MENTORSHIP
                  </p>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 leading-tight">
                    Access{' '}
                    <span className="italic font-normal">real-time mentorship</span>{' '}
                    from 100+ experts
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 sm:mb-5 leading-relaxed">
                    From <span className="text-[#B30437] font-semibold">cybersecurity</span> to{' '}
                    <span className="text-[#B30437] font-semibold">generative AI</span>, our mentors
                    span a wide range of industries from across the globe.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    {[
                      <>
                        Whether you&apos;re building a startup or exploring jobs, our mentors provide{' '}
                        <span className="text-[#B30437] font-semibold">tailored 1:1 mentorship</span>.
                      </>,
                      <>
                        Mentors can assist with{' '}
                        <span className="text-[#B30437] font-semibold">last-minute assignments</span>,
                        interview prep or even emotional support.
                      </>,
                    ].map((text, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Image src="/dot-icon.svg" alt="" width={18} height={18} className="mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </section>
        </SectionWrapper>

        {/* Business Leaders Section */}
        <SectionWrapper hideCorners={"all"}>
          <section className="relative z-[5] py-8 sm:py-10 bg-white">
            <div className="w-full mx-auto">
              <div className="mb-8 sm:mb-12 text-center">

                <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">
                  INDUSTRY EXPERTISE
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                  Lessons from the{" "}
                  <HighlightText className="font-bold">
                    best in the business
                  </HighlightText>
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
                {businessLeaders.map((leader) => (
                  <div key={leader.id} className="group pb-3 sm:pb-3 border-r border-b border-gray-300">
                    <div className="relative bg-gray-800 overflow-hidden aspect-[3/4] mb-3">
                      <Image src={leader.image} alt={`${leader.name}`} fill className="object-cover grayscale" />
                    </div>

                    <div className="text-left p-3">
                      <h3 className="font-medium text-gray-900 text-xs mb-1 leading-tight">{leader.name}</h3>
                      <p className="text-xs text-gray-600 leading-tight">{leader.title}</p>
                      <p className="text-xs text-gray-600 leading-tight">{leader.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionWrapper>
      </div>
    </div>
  );
}