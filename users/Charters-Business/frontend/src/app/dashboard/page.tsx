"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CounsellorContact from '@/components/dashboard/CounsellorContact';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  // Redirect admin/recruiter to their dashboard
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect admin/recruiter to admin dashboard
    if (user.role === 'admin' || user.role === 'recruiter') {
      router.push('/admin/dashboard');
      return;
    }

    const justLoggedIn = sessionStorage.getItem('justLoggedIn');
    if (justLoggedIn === 'true') {
      setShowWelcome(true);
      sessionStorage.removeItem('justLoggedIn');
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, [user, isLoading, router]);

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#B30437] border-r-transparent"></div>
      </div>
    );
  }

  // Don't render for admin/recruiter
  if (!user || user.role === 'admin' || user.role === 'recruiter') {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Banner */}
      {showWelcome && (
        <div className="bg-gradient-to-r from-[#B30437] to-[#8B0329] p-6 text-white animate-fade-in">
          <div className="flex flex-row items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-xl font-bold mb-1">Welcome to Your Dashboard</div>
              <p className="text-white/90">
                Your submission was successful. You can now track your progress here.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#B30437] to-[#8B0329] p-6 sm:p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-white/90">
          Here's an overview of your applications and counseling sessions.
        </p>
      </div>

      {/* Counsellor Contact Section */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
        <CounsellorContact />
      </div>
    </div>
  );
}
