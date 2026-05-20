'use client';

import { memo, useRef } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import useInViewPlay from '../micro/useInViewPlay';

interface CompanyCaseStudy {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface Company {
  name: string;
  logo: string;
  caseStudy?: CompanyCaseStudy;
}

const POPULAR_COMPANIES: Company[] = [
  {
    name: 'Square',
    logo: '/logos/Square.png',
    caseStudy: {
      quote:
        'Square has enabled our merchants to easily adopt omnichannel strategies that drive higher conversion and satisfaction rates across all our diverse consumer touchpoints.',
      author: 'Jane Doe',
      role: 'Head of Payments',
      avatar: 'https://i.pravatar.cc/150?u=square',
    },
  },
  {
    name: 'Amplitude',
    logo: '/logos/Amplitude.svg',
    // caseStudy: {
    //   quote:
    //     "Amplitude has been central to building a more holistic view of the customer and gaining better control of our data to understand customers' mobile journeys, flows, and funnels.",
    //   author: 'Sherry Thomas-Zon',
    //   role: 'Director of Mobile Marketing',
    //   avatar: 'https://i.pravatar.cc/150?u=amplitude',
    // },
  },
  {
    name: 'Walmart',
    logo: '/logos/Walmart.svg',
    // caseStudy: {
    //   quote:
    //     "Walmart's supply chain relies heavily on data-driven models for efficiency. Our team relies on this data for making our delivery fleet performant.",
    //   author: 'John Smith',
    //   role: 'VP of Engineering',
    //   avatar: 'https://i.pravatar.cc/150?u=walmart',
    // },
  },
  {
    name: 'DoorDash',
    logo: '/logos/DoorDash.svg',
    caseStudy: {
      quote:
        "Rapid delivery isn't just a promise, it's a lifestyle we maintain through data, real-time analytics, and efficient ML models.",
      author: 'Sarah Conner',
      role: 'Logistics Lead',
      avatar: 'https://i.pravatar.cc/150?u=doordash',
    },
  },
  {
    name: 'Atlassian',
    logo: '/logos/Atlassian.png',
    caseStudy: {
      quote:
        'Our collaboration processes have improved vastly since the integration, giving teams a clearer view into their ongoing progress and metrics.',
      author: 'Alice Johnson',
      role: 'Product Manager',
      avatar: 'https://i.pravatar.cc/150?u=atlassian',
    },
  },
  {
    name: 'Zoom',
    logo: '/logos/Zoom.svg',
    // caseStudy: {
    //   quote:
    //     'Creating seamless video connections at scale is harder than it looks, and robust infrastructure provides our main competitive advantage.',
    //   author: 'Alex Morgan',
    //   role: 'Infrastructure Lead',
    //   avatar: 'https://i.pravatar.cc/150?u=zoom',
    // },
  },
  {
    name: 'Adidas',
    logo: '/logos/Adidas.svg',
    // caseStudy: {
    //   quote:
    //     'Innovation in athletic wear requires understanding our athletes better than anyone else, relying on continuous data flows.',
    //   author: 'Emma Wilson',
    //   role: 'Head of Product',
    //   avatar: 'https://i.pravatar.cc/150?u=adidas',
    // },
  },
  {
    name: 'Capital One',
    logo: '/logos/Capital_One.svg',
    // caseStudy: {
    //   quote:
    //     'Financial technology moves fast, and our tooling must keep up to ensure reliability, security, and top-notch user experiences for our customers.',
    //   author: 'David Chen',
    //   role: 'VP Engineering',
    //   avatar: 'https://i.pravatar.cc/150?u=capitalone',
    // },
  },
  {
    name: 'NBCUniversal',
    logo: '/logos/NBCUniversal.svg',
    // caseStudy: {
    //   quote:
    //     'Media delivery at scale requires extremely robust backend architectures, especially when broadcasting major live events worldwide.',
    //   author: 'Tom Baker',
    //   role: 'Director of Media Tech',
    //   avatar: 'https://i.pravatar.cc/150?u=nbc',
    // },
  },
  {
    name: 'Qualtrics',
    logo: '/logos/Qualtrics.svg',
    caseStudy: {
      quote:
        'Experience management relies heavily on precise survey data and fast processing. The platform provides insights at unprecedented speeds.',
      author: 'Olivia Clark',
      role: 'Data Scientist',
      avatar: 'https://i.pravatar.cc/150?u=qualtrics',
    },
  },
  {
    name: 'Google',
    logo: '/logos/google.svg',
    // caseStudy: {
    //   quote:
    //     'Our massive-scale applications rely on well-architected systems to deliver sub-second responses globally, improving our overall user experience.',
    //   author: 'Sundar Chen',
    //   role: 'Engineering Director',
    //   avatar: 'https://i.pravatar.cc/150?u=google',
    // },
  },
  {
    name: 'Microsoft',
    logo: '/logos/Microsoft.svg',
    caseStudy: {
      quote:
        'Cloud infrastructure is at the core of our business, and ensuring 99.999% uptime requires incredibly talented engineers and rigorous processes.',
      author: 'Satya Nadella',
      role: 'VP of Cloud',
      avatar: 'https://i.pravatar.cc/150?u=microsoft',
    },
  },
  {
    name: 'Meta',
    logo: '/logos/Meta.svg',
    caseStudy: {
      quote:
        'Connecting billions of people requires innovative data structures and networking protocols that push the boundaries of modern computing.',
      author: 'Mark Evans',
      role: 'Technical Lead',
      avatar: 'https://i.pravatar.cc/150?u=meta',
    },
  },
  {
    name: 'Netflix',
    logo: '/logos/Netflix.svg',
    // caseStudy: {
    //   quote:
    //     'Delivering high-quality video content to every device across the globe seamlessly relies heavily on our advanced content delivery networks.',
    //   author: 'Reed Hastings',
    //   role: 'Director of Streaming',
    //   avatar: 'https://i.pravatar.cc/150?u=netflix',
    // },
  },
  {
    name: 'Amazon',
    logo: '/logos/amazon.svg',
    // caseStudy: {
    //   quote:
    //     'From e-commerce to cloud computing, operational efficiency is our main priority, driven by data science and machine learning models.',
    //   author: 'Jeff Wilke',
    //   role: 'Head of Operations',
    //   avatar: 'https://i.pravatar.cc/150?u=amazon',
    // },
  },
];

function TrustedCompanies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewPlay(sectionRef, '200px', 0.1);

  const mobileImageUrl = getCloudinaryUrl('hiring-companies-mobile_htt4q8', {
    quality: 'auto',
    format: 'auto',
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mx-[0%] mt-[70px] overflow-visible bg-white pb-8"
    >
      {isVisible && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-[30px]">
            <p className="mx-auto text-base text-black sm:text-lg lg:text-xl">
              Join 1250+ Companies Hiring Young Charter's Worldwide
            </p>
          </div>

          <div className="mb-12 w-full sm:mb-16">
            <div className="mx-auto hidden max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-18 px-6 md:flex lg:gap-x-20 lg:gap-y-18">
              {POPULAR_COMPANIES.map((company) => (
                <div
                  key={company.name}
                  className="group relative z-10 h-10 w-[140px] cursor-pointer hover:z-50"
                >
                  {/* Logo */}
                  <div className="relative h-10 w-full">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      sizes="140px"
                      className="object-contain"
                    />
                  </div>

                  {/* Case Study button + tooltip — only if caseStudy exists */}
                  {company.caseStudy && (
                    <>
                      <div className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-transparent bg-[#efefef] px-2 py-[2px] text-[10px] font-bold text-[#4b5563] transition-colors group-hover:border-gray-200 group-hover:bg-[#e5e7eb]">
                        Case Study
                      </div>

                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 invisible w-[340px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-6 text-left opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                        <p className="mb-6 text-[15px] font-medium leading-relaxed text-[#374151]">
                          &quot;{company.caseStudy.quote}&quot;
                        </p>
                        <div className="relative z-10 flex items-center gap-3">
                          <Image
                            src={company.caseStudy.avatar}
                            alt={company.caseStudy.author}
                            width={40}
                            height={40}
                            sizes="40px"
                            className="h-10 w-10 rounded-full border border-gray-100 bg-gray-100 object-cover"
                          />
                          <div>
                            <div className="text-sm font-semibold leading-tight text-gray-900">
                              {company.caseStudy.author}
                            </div>
                            <div className="mt-0.5 text-[13px] text-gray-500">
                              {company.caseStudy.role}
                            </div>
                          </div>
                        </div>
                        <div className="absolute left-1/2 top-full z-0 h-4 w-4 -translate-x-1/2 -mt-[9px] rotate-45 border-b border-r border-gray-100 bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.03)]" />
                        <div className="absolute left-1/2 top-full z-0 h-8 w-full -translate-x-1/2 bg-transparent" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center px-4 md:hidden">
              <Image
                src={mobileImageUrl}
                alt="Hiring companies logos grid"
                width={448}
                height={300}
                className="h-auto w-full max-w-md"
                loading="lazy"
                sizes="(max-width: 768px) 448px, 0vw"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="px-4 py-2 rounded-full text-black py-2 px-4 md:px-4 flex items-center justify-center gap-2 transition-all duration-300 font-semibold text-[16px] md:text-[16px] whitespace-nowrap"
              onClick={() => {
                window.open(
                  'https://spangled-cardinal-ac7.notion.site/2fe34c26081b800fb860c41b85555e68?v=393d012ded8a4a589d3a2d09872a78cc',
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            >
              View all Companies

              <Image
                src="/Charters-icon/top_arrow-black.svg"
                alt="Format icon"
                width={15}
                height={15}
                className=" w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(TrustedCompanies);