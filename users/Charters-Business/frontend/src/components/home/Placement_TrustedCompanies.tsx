'use client';

import { memo, useRef } from 'react';
import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import useInViewPlay from '../micro/useInViewPlay';

interface CompanyCaseStudy {
  title: string;
  description: string;
  stats: { value: string; label: string }[];
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
      title: 'How Square scaled merchant operations globally',
      description: 'Square adopted Amplitude Analytics and Amplitude Audiences, which led to optimizing data streams and instituting a robust.',
      stats: [
        { value: '5x', label: 'Faster response' },
        { value: '3x', label: 'Revenue growth' },
      ],
      author: 'Rajat Ray',
      role: 'Head of Operation',
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
    caseStudy: {
      title: 'DoorDash cuts delivery time with real-time ML',
      description: 'Rapid delivery isn\'t just a promise — it\'s a lifestyle maintained through data, real-time analytics, and efficient ML models.',
      stats: [
        { value: '2x', label: 'Faster delivery' },
        { value: '40%', label: 'Cost reduction' },
      ],
      author: 'Sarah Conner',
      role: 'Logistics Lead',
      avatar: 'https://i.pravatar.cc/150?u=doordash',
    },
  },
  {
    name: 'DoorDash',
    logo: '/logos/DoorDash.svg',
    // caseStudy: {
    //   title: 'DoorDash cuts delivery time with real-time ML',
    //   description: 'Rapid delivery isn\'t just a promise — it\'s a lifestyle maintained through data, real-time analytics, and efficient ML models.',
    //   stats: [
    //     { value: '2x', label: 'Faster delivery' },
    //     { value: '40%', label: 'Cost reduction' },
    //   ],
    //   author: 'Sarah Conner',
    //   role: 'Logistics Lead',
    //   avatar: 'https://i.pravatar.cc/150?u=doordash',
    // },
  },

  {
    name: 'Atlassian',
    logo: '/logos/Atlassian.png',
    caseStudy: {
      title: 'Atlassian improves team visibility with data',
      description: 'Collaboration processes improved vastly since integration, giving teams a clearer view into ongoing progress and metrics.',
      stats: [
        { value: '60%', label: 'Less blockers' },
        { value: '4x', label: 'Sprint velocity' },
      ],
      author: 'Alice Johnson',
      role: 'Product Manager',
      avatar: 'https://i.pravatar.cc/150?u=atlassian',
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
      title: 'Microsoft maintains 99.999% cloud uptime',
      description: 'Cloud infrastructure is at the core of the business, ensuring uptime requires incredibly talented engineers and rigorous processes.',
      stats: [
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '10x', label: 'Scale achieved' },
      ],
      author: 'Satya Nadella',
      role: 'VP of Cloud',
      avatar: 'https://i.pravatar.cc/150?u=microsoft',
    },
  },
  {
    name: 'Meta',
    logo: '/logos/Meta.svg',
    // caseStudy: {
    //   title: 'Meta connects billions with modern protocols',
    //   description: 'Connecting billions of people requires innovative data structures and networking protocols that push the boundaries of computing.',
    //   stats: [
    //     { value: '3B+', label: 'Users connected' },
    //     { value: '5x', label: 'Infra efficiency' },
    //   ],
    //   author: 'Mark Evans',
    //   role: 'Technical Lead',
    //   avatar: 'https://i.pravatar.cc/150?u=meta',
    // },
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
    caseStudy: {
      title: 'Meta connects billions with modern protocols',
      description: 'Connecting billions of people requires innovative data structures and networking protocols that push the boundaries of computing.',
      stats: [
        { value: '3B+', label: 'Users connected' },
        { value: '5x', label: 'Infra efficiency' },
      ],
      author: 'Mark Evans',
      role: 'Technical Lead',
      avatar: 'https://i.pravatar.cc/150?u=meta',
    },
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
      className="group/main relative z-10 mx-[0%] overflow-visible bg-white pb-2 border-gray-200 border-b"
    >
      {isVisible && (
        <div className="mx-auto w-full max-w-7xl py-[15px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-[30px]">
            <p className="mx-auto text-base text-black sm:text-lg lg:text-xl">
              Join 1250+ Companies Hiring Young Charter's Worldwide
            </p>
          </div>

          <div className="mb-6 w-full sm:mb-8">
            <div className="mx-auto hidden max-w-6xl flex-wrap items-center justify-center gap-x-14 gap-y-18 px-6 md:flex lg:gap-x-20 lg:gap-y-15">
              {POPULAR_COMPANIES.map((company) => (
                <div
                  key={company.name}
                  className="group relative z-10 h-10 w-[140px] cursor-pointer hover:z-50"
                >
                  <div className="relative h-10 w-full">
                    <Image src={company.logo} alt={company.name} fill className="object-contain" />
                  </div>

                  {company.caseStudy && (
                    <>
                      <div className="absolute left-1/2 top-[calc(100%+7px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-transparent bg-[#efefef] px-2 py-[2px] text-[10px] font-bold text-[#4b5563] transition-colors group-hover:border-gray-200 group-hover:bg-[#e5e7eb]">
                        Case Study
                      </div>

                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-50 invisible w-[340px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-6 text-left opacity-0 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                        <h3 className="mb-2 text-[17px] font-bold leading-snug text-gray-900">
                          {company.caseStudy.title}
                        </h3>
                        <p className="mb-5 text-[13px] leading-relaxed text-gray-500">
                          {company.caseStudy.description}
                        </p>
                        <div className="mb-5 flex gap-8">
                          {company.caseStudy.stats.map((stat) => (
                            <div key={stat.label}>
                              <div className="text-[22px] font-bold text-gray-900">{stat.value}</div>
                              <div className="text-[12px] text-gray-500">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
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
          </div>
        </div>
      )}

      <div className="flex justify-center py-2">
        <button
          className="text-sm text-black cursor-pointer opacity-50 transition-opacity duration-300 group-hover/main:opacity-100"
          onClick={() => {
            window.open(
              'https://spangled-cardinal-ac7.notion.site/2fe34c26081b800fb860c41b85555e68?v=393d012ded8a4a589d3a2d09872a78cc',
              '_blank',
              'noopener,noreferrer'
            );
          }}
        >
          View all 1253 companies
          <span className="inline-block">
            <Image
              src="/Charters-icon/top_arrow-black.svg"
              alt="Format icon"
              width={15}
              height={15}
              className="ml-[6px] w-[10px] h-[10px] object-contain"
            />
          </span>
        </button>
      </div>
    </section>
  );
}

export default memo(TrustedCompanies);