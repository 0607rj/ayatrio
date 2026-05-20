'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function CommunitySection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [currentCard, setCurrentCard] = useState(0);

  const communityCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Community group photo with people raising hands",
      title: "Community Celebration",
      description: "Annual gathering of 1000+ ambitious learners",
      members: "250+ attendees",
      location: "Global Campus"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Team collaboration meeting",
      title: "Collaboration Sessions",
      description: "Weekly team building and project work",
      members: "15-20 per group",
      location: "Study Halls"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Conference presentation",
      title: "Industry Talks",
      description: "Expert sessions with business leaders",
      members: "100+ participants",
      location: "Main Auditorium"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Workshop session",
      title: "Skill Workshops",
      description: "Hands-on learning experiences",
      members: "25-30 learners",
      location: "Workshop Labs"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Team building activity",
      title: "Team Building",
      description: "Fun activities to strengthen bonds",
      members: "50+ participants",
      location: "Outdoor Campus"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Networking event",
      title: "Networking Mixer",
      description: "Connect with peers and mentors",
      members: "80+ professionals",
      location: "Community Lounge"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollerRef.current) return;

      const rect = scrollerRef.current.getBoundingClientRect();
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const elementHeight = scrollerRef.current.offsetHeight;

      // Calculate scroll progress
      const scrollTop = -rect.top;
      const maxScroll = elementHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Calculate discrete sections with clear boundaries
      const totalSections = communityCards.length;
      const scrollZoneSize = 1 / (totalSections - 1);

      let newIndex = 0;

      if (progress <= 0) {
        newIndex = 0;
      } else if (progress >= 1) {
        newIndex = totalSections - 1;
      } else {
        const zoneIndex = Math.floor(progress / scrollZoneSize);
        newIndex = Math.min(zoneIndex, totalSections - 1);
      }

      if (newIndex !== currentCard) {
        setCurrentCard(newIndex);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentCard, communityCards.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % communityCards.length);
    }, 5000); // changed from 3000 to 5000

    return () => clearInterval(interval);
  }, [communityCards.length]);

  return (
    <>
      {/* Spacer to create scroll height */}
      <div
        ref={scrollerRef}
        className="relative w-full mt-8 md:mt-4"
        style={{ height: `${(communityCards.length - 1) * 100 + 100}vh` }}
      >
        {/* Sticky container - accounts for navbar height */}
        <div className="sticky top-[var(--navbar-height,86px)] h-[calc(100vh-var(--navbar-height,86px))] overflow-hidden ">
          <div className="relative h-full flex items-start sm:items-center py-4 sm:py-8 lg:py-16">
            <section className="bg-white py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 w-full" role="region" aria-labelledby="community-heading">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
                  {/* Left Content */}
                  <div className="space-y-4 sm:space-y-6 md:space-y-8">
                    {/* Header */}
                    <header>
                      <p className="text-xs sm:text-sm font-semibold text-[#B30437] tracking-wider mb-2 sm:mb-3" role="text">MASTER UNION COMMUNITY</p>
                      <h2 id="community-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-black leading-tight mb-4 sm:mb-6 md:mb-8">
                        A ready-made<br />
                        <span className="italic font-serif text-[#B30437]">community</span> for life.
                      </h2>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-3xl mb-6 sm:mb-8 md:mb-10">
                        We&apos;re a 1000+ bunch of ambitious go-getters from all walks of life. Here&apos;s a slice of what it&apos;s like within.
                      </p>
                    </header>

                    {/* Action Links */}
                    <nav className="space-y-3 sm:space-y-4" role="navigation" aria-label="Community links">
                      <a href="#" className="flex items-center gap-2 sm:gap-3 text-[#B30437] font-medium hover:text-black transition-colors group" aria-label="Visit Master Union on Instagram">
                        <span className="text-sm sm:text-base md:text-lg uppercase tracking-wide">@MASTERUNION ON INSTAGRAM</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </a>

                      <a href="#" className="flex items-center gap-2 sm:gap-3 text-[#B30437] font-medium hover:text-black transition-colors group" aria-label="Read Community Stories">
                        <span className="text-sm sm:text-base md:text-lg uppercase tracking-wide">COMMUNITY DIGEST</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </a>

                      <a href="#" className="flex items-center gap-2 sm:gap-3 text-[#B30437] font-medium hover:text-black transition-colors group" aria-label="Join the program">
                        <span className="text-sm sm:text-base md:text-lg uppercase tracking-wide">JOIN THE PROGRAM</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </a>
                    </nav>
                  </div>

                  {/* Right Content - Community Showcase */}
                  <div className="relative">
                    <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] xl:h-[550px] overflow-hidden">
                      <Image
                        src={communityCards[currentCard].image}
                        alt={communityCards[currentCard].alt}
                        fill
                        className="object-cover transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {/* Content overlay */}
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="w-2 h-2 bg-[#B30437] rounded-full"></div>
                          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">{communityCards[currentCard].location}</span>
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{communityCards[currentCard].title}</h3>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-2 sm:mb-3">{communityCards[currentCard].description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm md:text-base text-gray-300">{communityCards[currentCard].members}</span>
                          <div className="flex items-center gap-1">
                            {communityCards.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentCard ? 'bg-[#B30437]' : 'bg-white/40'
                                  }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Separate CTA Section */}
      <div className="relative mx-2 sm:mx-4 mb-4 sm:mb-6 md:mb-10 mt-6 sm:mt-10 md:mt-16">
        <section className="bg-[#B30437] py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 xl:px-16 text-center" role="region" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto">
            <h3 id="cta-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight mb-3 sm:mb-4 md:mb-6">
              Love what you see?<br />
              Join the program to be a part of it!
            </h3>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
              Become part of our thriving community of entrepreneurs, innovators, and changemakers who are building the future together.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a href="#" className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#B30437] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-gray-100 transition-colors group" aria-label="Learn about the program">
                <span className="text-sm sm:text-base md:text-lg uppercase tracking-wide">ABOUT THE PROGRAM</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>

              <a href="#" className="inline-flex items-center gap-2 sm:gap-3 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-white hover:text-[#B30437] transition-colors group" aria-label="Apply now">
                <span className="text-sm sm:text-base md:text-lg uppercase tracking-wide">APPLY NOW</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
