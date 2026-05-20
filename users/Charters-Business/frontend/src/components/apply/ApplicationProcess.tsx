'use client';

import React from 'react';
import Link from 'next/link';
import { applicationSteps, pageContent } from '@/data/applyPageData';

export default function ApplicationProcess() {
  return (
    <section className="bg-white py-8 sm:py-16 lg:py-24">
      <div className="container mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {pageContent.applicationSection.title}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-500">
              {pageContent.applicationSection.subtitle}
            </span>
            <br />
            <em className="italic text-gray-700 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              {pageContent.applicationSection.subtitleItalic}
            </em>
          </h2>
        </header>

        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8 px-2">
            {pageContent.applicationSection.processHeading}
          </h3>

          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {applicationSteps.map((step, index) => (
              <li key={step.number} className="flex flex-col items-center text-center relative">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${step.color} text-white rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold mb-3 sm:mb-4 shadow-lg`}
                >
                  {step.number}
                </div>



                <p className="text-sm sm:text-base text-gray-700 font-medium whitespace-pre-line mb-2 px-2">
                  {step.title}
                </p>

                {step.duration && (
                  <p className="text-xs sm:text-sm text-gray-500">({step.duration})</p>
                )}

                {index < applicationSteps.length - 1 && (
                  <div className="hidden sm:block absolute left-full top-6 sm:top-8 w-full h-0.5 bg-gray-300 -translate-x-1/2 -z-10" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="#application-form"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base transition-all duration-300 transform hover:scale-105 "
          >
            APPLY NOW
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
