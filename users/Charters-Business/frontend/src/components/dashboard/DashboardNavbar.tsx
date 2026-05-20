"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ChartersInterviewAi from "@/components/home/Chartersinterview_ai";

interface DashboardNavbarProps {
  pageType?: "jobs" | "internships";
  onTypeChange?: (type: "jobs" | "internships") => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  showCareerControls?: boolean;

  locations?: string[];
  selectedLocations?: string[];
  onLocationsChange?: (locs: string[]) => void;
  categories?: string[];
  selectedCategories?: string[];
  onCategoriesChange?: (cats: string[]) => void;
}

export default function DashboardNavbar({
  pageType,
  onTypeChange,
  searchQuery,
  onSearchChange,
  showCareerControls = false,
  locations = [],
  selectedLocations = [],
  onLocationsChange,
  categories = [],
  selectedCategories = [],
  onCategoriesChange,
}: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine dashboard URL based on role
  const dashboardUrl =
    user?.role === "admin" || user?.role === "recruiter"
      ? "/admin/dashboard"
      : "/dashboard";

  const dashboardText =
    user?.role === "admin" || user?.role === "recruiter"
      ? "Admin Dashboard"
      : "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200"
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-30">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Chaters_Union.webp"
            alt="Charters Business Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/*toggle + search */}
        {showCareerControls && (
          <div className="flex items-center gap-3 flex-1 max-w-2xl mx-6">

            {/* Toggle */}
            <div className="relative inline-flex flex-shrink-0">
              <select
                value={pageType}
                onChange={(e) =>
                  onTypeChange?.(e.target.value as "jobs" | "internships")
                }
                className="appearance-none px-4 py-1.5 pr-10 rounded-lg text-sm font-semibold 
               bg-gray-100 text-gray-700 shadow-sm 
               hover:bg-gray-200 
               focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:bg-white
               transition-all cursor-pointer"
              >
                <option value="jobs">Jobs</option>
                <option value="internships">Internships</option>
              </select>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Search*/}
            <div className="flex items-center bg-white border border-gray-400 rounded-full px-4 py-1 flex-1">
              <div className="relative flex-1">
                <svg className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder={pageType === "jobs" ? "Find your perfect job" : "Find your perfect internship"}
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full bg-transparent pl-8 pr-4 py-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Right: User Menu */}
        <div className="flex items-center gap-4">
          
          {/* User Info + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {/* Avatar */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#B30437] to-[#8B0329] text-white font-semibold text-sm overflow-hidden">
                  {user ? (
                    user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span>{getInitials(user.name)}</span>
                    )
                  ) : (
                    <Image
                      src="/Charters-icon/ic_user_defolt_avator.svg"
                      alt="default avatar"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  )}
                </div>

              {/* Name (hidden on mobile) */}
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">
                  {user?.name}
                </span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>

              {/* Dropdown Icon */}
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {!user ? (
                  <>
                    {/* Not Logged In */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-600">
                        You are not logged in
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setShowLoginPopup(true);
                        document.body.style.overflow = 'hidden';
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H3m0 0l4-4m-4 4l4 4m6-10h4a2 2 0 012 2v12a2 2 0 01-2 2h-4"
                        />
                      </svg>
                      <span className="text-sm text-gray-900 font-medium">
                        Login
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* User Info (mobile) */}
                    <div className="sm:hidden px-4 py-3 border-b border-gray-200">
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href={dashboardUrl}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span className="text-sm text-gray-900">{dashboardText}</span>
                    </Link>

                    {/* Conditional Menu Items based on role */}
                    {user?.role === "admin" || user?.role === "recruiter" ? (
                      <>
                        <Link
                          href="/admin/jobs"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-900">Manage Jobs</span>
                        </Link>

                        <Link
                          href="/admin/internships"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          <span className="text-sm text-gray-900">
                            Manage Internships
                          </span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                          <span className="text-sm text-gray-900">
                            Profile Settings
                          </span>
                        </Link>

                        <Link
                          href="/dashboard/application-status"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                          <span className="text-sm text-gray-900">
                            Applications
                          </span>
                        </Link>

                        <Link
                          href="/dashboard/counseling"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-gray-500"
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
                          <span className="text-sm text-gray-900">Counseling</span>
                        </Link>
                      </>
                    )}

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="text-sm text-red-600 font-medium">
                        Logout
                      </span>
                    </button>
                  </>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

      {showLoginPopup && createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60">
          <div className="w-[85vw] max-w-4xl h-[85vh] relative">
            <button
              onClick={() => {
                setShowLoginPopup(false);
                document.body.style.overflow = '';
              }}
              className="absolute -top-3 -right-3 z-40 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md text-gray-600 hover:text-red-500 transition-colors text-sm"
            >
              ✕
            </button>
            <div className="w-full h-full overflow-hidden rounded-xl shadow-2xl">
              <ChartersInterviewAi />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
