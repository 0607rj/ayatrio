"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function CounselingPage() {
  const { counselings, refreshCounselings } = useAuth();

  useEffect(() => {
    refreshCounselings();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return 'Not scheduled';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    };
    return badges[status as keyof typeof badges] || badges.scheduled;
  };

  if (!counselings || counselings.length === 0) {
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-2">No Counseling Sessions</div>
        <p className="text-gray-600 text-center mb-6">
          You haven't scheduled any counseling sessions yet.
        </p>
        <a
          href="/apply?type=counseling"
          className="flex items-center gap-2 bg-[#B30437] hover:bg-[#8B0329] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Book Counseling Session
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  mx-auto px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Counseling Sessions</h1>
        <p className="text-gray-600">
          You have {counselings.length} counseling session{counselings.length > 1 ? 's' : ''}
        </p>
      </div>

      {counselings.map((counseling: any, index: number) => (
        <div
          key={counseling.counselingNumber || index}
          className="flex flex-col bg-white border border-gray-200 "
        >
          <div className="flex flex-col p-4 sm:p-6 gap-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-200">
              <div className="flex flex-col gap-1">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {counseling.program || 'Program Not Specified'}
                </div>
                <p className="text-sm text-gray-500">
                  Session #{counseling.counselingNumber}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold border self-start ${getStatusBadge(
                  counseling.status
                )}`}
              >
                {counseling.status.toUpperCase()}
              </span>
            </div>

            {/* Date & Time Cards  */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Date Card */}
              <div className="flex flex-col flex-1 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600 font-medium">Date</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatDate(counseling.counselingDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Card */}
              <div className="flex flex-col flex-1 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-600 font-medium">Time</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatTime(counseling.counselingTime)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Message */}
            {counseling.status === 'scheduled' && (
              <div className="flex flex-row items-start gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs text-gray-700 flex-1">
                  Our counselor will contact you at the scheduled time via email or phone.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
