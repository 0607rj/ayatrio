'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PhoneOtpLogin from './PhoneOtpLogin';

type LoginFormMode = 'login' | 'signup';

export default function LoginForm({
  mode = 'login',
}: {
  mode?: LoginFormMode;
}) {
  const isSignup = mode === 'signup';
  const { user, isLoading, quickLogin, navigateToRemoteDashboard } = useAuth();
  const router = useRouter();
  const [isQuickLoggingIn, setIsQuickLoggingIn] = useState(false);
  const hasAttemptedQuickLogin = useRef(false);

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'admin' || user.role === 'recruiter') {
        navigateToRemoteDashboard('/admin/dashboard');
      } else {
        navigateToRemoteDashboard('/dashboard');
      }
    }
  }, [user, isLoading, navigateToRemoteDashboard]);

  if (isLoading || user) {
    return (
      <div className="bg-white p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B30437] mx-auto mb-4"></div>
          <p className="text-gray-600">
            {user ? 'Redirecting...' : 'Verifying session...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white  p-6 sm:p-8">
      <div className="mb-6">
        <div className="w-16 h-16 bg-[#B30437] rounded-full  flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {isSignup ? 'Create Your Account' : 'Login to Your Account'}
        </h2>
        <p className="text-gray-600 text-center">
          {isSignup
            ? 'Verify your phone and complete your account details'
            : 'Access your dashboard and track your application'}
        </p>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <PhoneOtpLogin mode={mode} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#B30437] hover:text-[#8B0329] font-semibold underline"
              >
                Log In
              </Link>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-[#B30437] hover:text-[#8B0329] font-semibold underline"
              >
                Sign Up
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

