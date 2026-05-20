'use client';

import React from 'react';
import Link from 'next/link';
import { counsellors } from '@/data/applyPageData';

export default function CounsellorContact() {
  return (
    <aside className="bg-white ">
      <header className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Need Help? Contact Our Team
        </h3>
        <p className="text-gray-600">
          Our admissions counsellors are here to guide you through the application process!
        </p>
      </header>

      <div className="space-y-6 flex gap-2">
        {counsellors.map((counsellor) => (
          <div
            key={counsellor.id}
            className="  p-5 "
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start  gap-4">
              

              <div className="flex-1 text-center sm:text-left w-full">
                <h4 className="text-lg font-bold text-gray-900">{counsellor.name}</h4>
                <p className="text-green-700 font-medium text-sm mb-3">{counsellor.role}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start justify-center sm:justify-start gap-2">
                    <span className="text-gray-500 font-semibold mt-0.5">Email:</span>
                    <a
                      href={`mailto:${counsellor.email}`}
                      className="text-green-700 hover:text-green-800 hover:underline transition-colors break-all"
                    >
                      {counsellor.email}
                    </a>
                  </div>

                  <div className="flex items-start justify-center sm:justify-start gap-2">
                    <span className="text-gray-500 font-semibold mt-0.5">Phone:</span>
                    <a
                      href={`tel:${counsellor.phone.replace(/\s/g, '')}`}
                      className="text-green-700 hover:text-green-800 hover:underline transition-colors"
                    >
                      {counsellor.phone}
                    </a>
                  </div>

                  <div className="flex items-start justify-center sm:justify-start gap-2">
                    <span className="text-gray-500 font-semibold mt-0.5">Available:</span>
                    <span className="text-gray-700">{counsellor.availability}</span>
                  </div>

                  {counsellor.specialization && counsellor.specialization.length > 0 && (
                    <div className="flex items-start justify-center sm:justify-start gap-2 pt-2">
                      <span className="text-gray-500 font-semibold mt-0.5">Specializes in:</span>
                      <span className="text-gray-700">
                        {counsellor.specialization.join(', ')}
                      </span>
                    </div>
                  )}

                  {counsellor.languages && counsellor.languages.length > 0 && (
                    <div className="flex items-start justify-center sm:justify-start gap-2">
                      <span className="text-gray-500 font-semibold mt-0.5">Languages:</span>
                      <span className="text-gray-700">
                        {counsellor.languages.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link
                    href={`mailto:${counsellor.email}?subject=Application Inquiry`}
                    className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    Send Email
                  </Link>

                  <a
                    href={`tel:${counsellor.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-6 text-center p-4 ">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">General Inquiries:</span>{' '}
          <a 
            href="mailto:admissions@chartersbusiness.com" 
            className="text-green-700 font-semibold hover:underline"
          >
            admissions@chartersbusiness.com
          </a>
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Our team typically responds within 24 hours during business days
        </p>
      </footer>
    </aside>
  );
}
