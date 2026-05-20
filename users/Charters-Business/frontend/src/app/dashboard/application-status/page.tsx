"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ApplicationStatusPage() {
  const { applications, refreshApplications } = useAuth();

  useEffect(() => {
    refreshApplications();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!applications || applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-600 text-lg mb-4">No applications found</p>
        <a
          href="/apply"
          className="flex items-center gap-2 bg-[#B30437] hover:bg-[#8B0329] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Apply Now
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Application Status</h1>
        <p className="text-gray-600">
          You have {applications.length} application{applications.length > 1 ? 's' : ''}
        </p>
      </div>

      {applications.map((application: any, index: number) => (
        <article
          key={application.applicationNumber || index}
          className="flex flex-col bg-white border border-gray-200 overflow-hidden"
        >
          <div className="flex flex-col p-4 sm:p-6 gap-6">
            <div className="flex flex-col gap-1 pb-4 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {application.program || 'Program Not Specified'}
              </h2>
              <p className="text-sm text-gray-500">
                Application #{application.applicationNumber}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Application Details
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Application Number</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.applicationNumber}
                  </span>
                </div>

                <div className="flex flex-row justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Program</span>
                  <span className="text-sm font-semibold text-gray-900 text-right">
                    {application.program || 'N/A'}
                  </span>
                </div>

                <div className="flex flex-row justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Submitted On</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatDate(application.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
