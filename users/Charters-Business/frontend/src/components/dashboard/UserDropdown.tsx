'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserDropdown() {
  const { user, logout, navigateToRemoteDashboard } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Determine if user is admin/recruiter
  const isAdminOrRecruiter = user?.role === 'admin' || user?.role === 'recruiter';
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001';
  const dashboardText = isAdminOrRecruiter ? 'Admin Dashboard' : 'Dashboard';

  // Handle back-navigation and mount reset
  useEffect(() => {
    // Reset loading state on mount
    setRedirectTarget(null);

    // Reset loading state if user returns via back button (bfcache)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setRedirectTarget(null);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleRedirect = async (remotePath: string, localPath: string, targetId: string) => {
    setRedirectTarget(targetId);
    try {
      await navigateToRemoteDashboard(remotePath);
    } catch (error) {
      console.error(`${targetId} redirect error:`, error);
    } finally {
      setRedirectTarget(null);
      setIsOpen(false);
    }
  };



  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 py-2 transition-colors"
      >
        <span className="hidden text-[13px] font-medium md:block text-gray-600">{user.name}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            {isAdminOrRecruiter && (
              <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                {user.role === 'admin' ? 'Admin' : 'Recruiter'}
              </span>
            )}
          </div>

          <button
            onClick={() => handleRedirect('/dashboard', '/dashboard', 'dashboard')}
            disabled={!!redirectTarget}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {redirectTarget === 'dashboard' ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            )}
            <span>{redirectTarget === 'dashboard' ? 'Redirecting...' : dashboardText}</span>
          </button>

          {/* Conditional Menu Items based on role */}
          {isAdminOrRecruiter ? (
            <>
              <button
                onClick={() => handleRedirect('/admin/jobs', '/admin/jobs', 'jobs')}
                disabled={!!redirectTarget}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {redirectTarget === 'jobs' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                <span>{redirectTarget === 'jobs' ? 'Redirecting...' : 'Manage Jobs'}</span>
              </button>

              <button
                onClick={() => handleRedirect('/admin/internships', '/admin/internships', 'internships')}
                disabled={!!redirectTarget}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {redirectTarget === 'internships' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                )}
                <span>{redirectTarget === 'internships' ? 'Redirecting...' : 'Manage Internships'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleRedirect('/profile', '/dashboard/profile', 'profile')}
                disabled={!!redirectTarget}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {redirectTarget === 'profile' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
                <span>{redirectTarget === 'profile' ? 'Redirecting...' : 'View Profile'}</span>
              </button>

              <button
                onClick={() => handleRedirect('/application-status', '/dashboard/application-status', 'applications')}
                disabled={!!redirectTarget}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {redirectTarget === 'applications' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                <span>{redirectTarget === 'applications' ? 'Redirecting...' : 'My Applications'}</span>
              </button>

              <button
                onClick={() => handleRedirect('/counseling', '/dashboard/counseling', 'counseling')}
                disabled={!!redirectTarget}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {redirectTarget === 'counseling' ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
                <span>{redirectTarget === 'counseling' ? 'Redirecting...' : 'My Counseling'}</span>
              </button>
            </>
          )}

          <div className="border-t border-gray-100 my-2"></div>

          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
