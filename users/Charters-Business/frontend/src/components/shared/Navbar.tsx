"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import UserDropdown from "@/components/dashboard/UserDropdown";
const AcademicsDropdown = dynamic(() => import("./AcademicsDropdown"), { ssr: false });
import { createPortal } from "react-dom";
const ChartersInterviewAi = dynamic(() => import("../home/Chartersinterview_ai"), { ssr: false });


function Navbar() {
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [selectedSecondaryTab, setSelectedSecondaryTab] = useState("for-you");
  const [dropdownTop, setDropdownTop] = useState(0);
  const [showInterviewAI, setShowInterviewAI] = useState(false);

  const messages = [
    "Talk to us at 08045579576 or Request Callback",
    "Round 2 Phase 1 Deadline: 1st May 2026",
    "Request for 1:1 Placement Guidance",
  ];

  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);


  const { user, navigateToRemoteDashboard } = useAuth();

  const headerRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const academicsButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const dashboardUrl =
    user?.role === "admin" || user?.role === "recruiter"
      ? "/admin/dashboard"
      : "/dashboard";

  const dashboardText =
    user?.role === "admin" || user?.role === "recruiter"
      ? "Admin Dashboard"
      : "Dashboard";

  const handleCourseClick = useCallback(
    (sectionId: string) => {
      setIsAcademicsOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/courses#${sectionId}`);
    },
    [router],
  );

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const calculateDropdownPosition = useCallback(() => {
    if (!primaryRef.current) return;

    const primaryRect = primaryRef.current.getBoundingClientRect();
    let totalTop = primaryRect.bottom;

    if (isSecondaryVisible && secondaryRef.current) {
      const secondaryRect = secondaryRef.current.getBoundingClientRect();
      totalTop = secondaryRect.bottom;
    }

    setDropdownTop(totalTop);
  }, [isSecondaryVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgVisible(false);
      setTimeout(() => {
        setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
        setMsgVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        academicsButtonRef.current &&
        academicsButtonRef.current.contains(target)
      ) {
        return;
      }

      if (dropdownRef.current && dropdownRef.current.contains(target)) {
        return;
      }

      if (isAcademicsOpen) {
        setIsAcademicsOpen(false);
      }
    };

    if (isAcademicsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAcademicsOpen]);

  useEffect(() => {
    calculateDropdownPosition();
  }, [calculateDropdownPosition, isSecondaryVisible, isNavbarVisible]);

  useEffect(() => {
    // Use ResizeObserver to watch primary and secondary navbar elements
    const resizeObserver = new ResizeObserver(() => {
      calculateDropdownPosition();
    });

    if (primaryRef.current) resizeObserver.observe(primaryRef.current);
    if (secondaryRef.current) resizeObserver.observe(secondaryRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateDropdownPosition]);

  useEffect(() => {
    const updateNavbarHeight = () => {
      const primaryHeight = primaryRef.current?.offsetHeight || 0;
      const secondaryHeight = secondaryRef.current?.offsetHeight || 0;
      const fullHeight = primaryHeight + secondaryHeight;
      document.documentElement.style.setProperty('--navbar-height', `${fullHeight}px`);
    };

    updateNavbarHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateNavbarHeight();
    });

    if (primaryRef.current) resizeObserver.observe(primaryRef.current);
    if (secondaryRef.current) resizeObserver.observe(secondaryRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const atTop = currentScrollY < 10;

      const primaryHeight = primaryRef.current?.offsetHeight || 0;
      const secondaryHeight = secondaryRef.current?.offsetHeight || 0;

      if (atTop) {
        setIsNavbarVisible(true);
        setIsSecondaryVisible(true);
        document.documentElement.style.setProperty('--navbar-height', `${primaryHeight + secondaryHeight}px`);
      } else if (scrollingDown) {
        setIsNavbarVisible(false);
        setIsSecondaryVisible(false);
        document.documentElement.style.setProperty('--navbar-height', `0px`);
      } else {
        setIsNavbarVisible(true);
        setIsSecondaryVisible(false);
        document.documentElement.style.setProperty('--navbar-height', `${primaryHeight}px`);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isAcademicsOpen) {
      calculateDropdownPosition();
    }
  }, [isAcademicsOpen, calculateDropdownPosition]);

  return (
    <div
      ref={headerRef}
      className={`fixed left-0 right-0 z-[100] text-gray-900 w-full font-sans navbar-transition ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      style={{ top: 0 }}
      role="banner"
    >
      <div className="flex flex-col w-full">
        {/* Secondary Navigation */}
        <div
          ref={secondaryRef}
          className={`border-none hidden sm:flex items-center navbar-secondary-transition bg-[#f5f5f7] ${isSecondaryVisible
            ? "h-[30px] opacity-100 transform translate-y-0"
            : "h-0 opacity-0 transform -translate-y-full overflow-hidden"
            }`}
          style={{
            transitionDelay: isSecondaryVisible ? "0ms" : "0ms",
          }}
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-1 w-full flex items-center relative">
              {/* Left nav */}
              <nav aria-label="Secondary navigation">
                <ul className="flex text-[13px] text-[#0F1419] font-semibold items-center space-x-3 sm:space-x-4 lg:space-x-6">
                  <li>

                    <a href="/for-companies"
                      className={`cursor-pointer hover:text-[#B30437] transition-colors ${selectedSecondaryTab === "for-companies"
                        ? "border-b-3 border-[#B30437] text-[#B30437]"
                        : ""
                        }`}
                      onClick={() => setSelectedSecondaryTab("for-companies")}
                    >
                      Companies + Recruiters
                    </a>
                  </li>
                </ul>
              </nav>

              {/* Center text */}
              <div
                onClick={() => {
                  setShowInterviewAI(true);
                  document.body.style.overflow = 'hidden';
                }}
                className="absolute left-1/2 -translate-x-1/2 flex text-[13px] text-[#0F1419] font-semibold items-center whitespace-nowrap cursor-pointer"
              >
                <p className="{msgVisible ? 'msg-visible' : 'msg-hidden'} m-0">
                  {messages[currentMsgIndex]}
                </p>
                <Image
                  src="/Charters-icon/top_arrow-black.svg"
                  alt="Format icon"
                  width={15}
                  height={15}
                  className="ml-[6px] w-[10px] h-[10px] object-contain"
                />
              </div>

              {/* Right nav */}
              <nav aria-label="Quick links" className="ml-auto">
                <ul className="flex text-[13px] font-semibold text-[#000] items-center space-x-3 sm:space-x-4 lg:space-x-6">
                  <li>
                    <a
                      href="/careers/internships"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cursor-pointer hover:text-[#B30437] transition-colors ${selectedSecondaryTab === "internships"
                          ? "border-b-2 border-[#B30437] text-[#B30437] pb-1"
                          : ""
                        }`}
                      onClick={() => setSelectedSecondaryTab("internships")}
                    >
                      Find Internship
                    </a>
                  </li>

                  <li>
                    <a
                      href="/careers/jobs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cursor-pointer hover:text-[#B30437] transition-colors ${selectedSecondaryTab === "jobs"
                          ? "border-b-2 border-[#B30437] text-[#B30437] pb-1"
                          : ""
                        }`}
                      onClick={() => setSelectedSecondaryTab("jobs")}
                    >
                      Find Jobs
                    </a>
                  </li>
                  {user ? (
                    <li><UserDropdown /></li>
                  ) : (
                    <li>

                      <button
                        onClick={() => {
                          setShowInterviewAI(true);
                          document.body.style.overflow = 'hidden';
                        }}
                        className={`cursor-pointer hover:text-[#B30437] transition-colors ${selectedSecondaryTab === "login"
                          ? "border-b-2 border-[#B30437] text-[#B30437] pb-1"
                          : ""
                          }`}
                      >
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Primary Navigation*/}
        <nav
          ref={primaryRef}
          className={`border-white/30 navbar-primary-slide relative z-[110] ${isNavbarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
            }`}
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transitionDelay:
              isNavbarVisible && isSecondaryVisible ? "100ms" : "0ms",
          }}
          aria-label="Main navigation"
        >
          <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 sm:py-2 w-full">
              <div
                className="w-28 sm:w-36 md:w-40 h-6 sm:h-7 md:h-8 relative cursor-pointer hover:opacity-80 transition-opacity duration-200 shrink-0"
                onClick={handleLogoClick}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleLogoClick()}
              >
                <Image
                  src="/Chaters_Union.webp"
                  alt="Charters Union of Business - Home"
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                  className="object-contain object-left"
                  priority
                />
              </div>

              <ul className="hidden lg:flex text-[14px] uppercase font-semibold justify-start text-[#000] items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                <li className="relative">
                  <button
                    ref={academicsButtonRef}
                    className="flex items-center justify-start gap-2 hover:underline decoration-black hover:text-[#B30437] transition-colors duration-300 cursor-pointer bg-transparent border-none"
                    aria-expanded={isAcademicsOpen}
                    aria-haspopup="true"
                    onClick={() => setIsAcademicsOpen(!isAcademicsOpen)}
                  >
                    <span>ACADEMICS</span>

                    <Image
                      src="/Charters-icon/Dropdown.svg"
                      alt="dropdown"
                      width={12}
                      height={12}
                      className={`w-2 h-2 lg:w-3 lg:h-3 transition-transform duration-200 ${isAcademicsOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </li>

                <li>
                  <a
                    href="/faculties"
                    className="gap-2 hover:underline decoration-black hover:text-[#B30437] transition-colors duration-300 cursor-pointer"
                  >
                    <span>FACULTY + RESEARCH</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/student-life"
                    className="gap-2 hover:underline decoration-black hover:text-[#B30437] transition-colors duration-300 cursor-pointer"
                  >
                    <span>STUDENT LIFE</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="gap-2 hover:underline decoration-black hover:text-[#B30437] transition-colors duration-300 cursor-pointer"
                  >
                    <span>PLACEMENTS++</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="gap-2 hover:underline decoration-black hover:text-[#B30437] transition-colors duration-300 cursor-pointer"
                  >
                    <span>COMMUNITY</span>
                  </a>
                </li>
              </ul>

              {/* Mobile Apply Button and Menu */}
              <div className="lg:hidden flex items-center gap-2">
                <a
                  href="/apply"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#B30437] hover:bg-[#8B0329] rounded-md transition-colors"
                >
                  APPLY
                </a>
                <button
                  className="p-2 rounded-md hover:bg-gray-100/60 transition-colors duration-150 relative z-[9999]"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-expanded={isMobileMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {isMobileMenuOpen ? (
                    <Image
                      src="/Charters-icon/Cancel.svg"
                      alt="dropdown"
                      width={14}
                      height={14} className="w-4 h-4 text-gray-700" />
                  ) : (
                      <Image
                        src="/Charters-icon/manu.svg"
                        alt="dropdown"
                        width={14}
                        height={14}
                        className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Academics Dropdown Component */}
        <AcademicsDropdown
          ref={dropdownRef}
          isOpen={isAcademicsOpen}
          dropdownTop={dropdownTop}
          onCourseClick={handleCourseClick}
          isSecondaryVisible={isSecondaryVisible}
        />

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-[50] navbar-mobile-transition ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          style={{ top: `${dropdownTop}px` }}
        >
          <div
            className="absolute inset-0 backdrop-blur-sm bg-white/95"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className={`relative bg-white w-full min-h-screen navbar-mobile-slide ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
              }`}
          >
            <nav className="px-4 sm:px-6 py-6" aria-label="Mobile navigation">
              <ul className="space-y-4">
                <li>
                  <a
                    href="/about"
                    className="block py-3 text-sm font-medium text-gray-900 hover:text-[#B30437] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <button
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-900 hover:text-[#B30437] transition-colors"
                    onClick={() => setIsAcademicsOpen(!isAcademicsOpen)}
                  >
                    <span>ACADEMICS</span>
                    <Image
                      src="/Charters-icon/Dropdown.svg"
                      alt="dropdown"
                      width={16}
                      height={16}
                      className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${isAcademicsOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isAcademicsOpen && (
                    <div className="pl-4 pb-2 space-y-2">
                      <button
                        onClick={() => handleCourseClick("curriculum-section")}
                        className="block py-2 text-xs text-gray-600 hover:text-[#B30437] w-full text-left"
                      >
                        Business Strategy
                      </button>
                      <button
                        onClick={() =>
                          handleCourseClick("google-workspace-education")
                        }
                        className="block py-2 text-xs text-gray-600 hover:text-[#B30437] w-full text-left"
                      >
                        Financial Management
                      </button>
                      <button
                        onClick={() => handleCourseClick("week-at-tetr")}
                        className="block py-2 text-xs text-gray-600 hover:text-[#B30437] w-full text-left"
                      >
                        Marketing Management
                      </button>
                      <button
                        onClick={() =>
                          handleCourseClick("learn-apply-reflect-repeat")
                        }
                        className="block py-2 text-xs text-gray-600 hover:text-[#B30437] w-full text-left"
                      >
                        Operations Management
                      </button>
                    </div>
                  )}
                </li>
                <li>
                  <a
                    href="/faculties"
                    className="block py-3 text-sm font-medium text-gray-900 hover:text-[#B30437] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FACULTY + RESEARCH
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="block py-3 text-sm font-medium text-gray-900 hover:text-[#B30437] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    CAREERS
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="block py-3 text-sm font-medium text-gray-900 hover:text-[#B30437] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    COMMUNITY
                  </a>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/for-you"
                      className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "for-you"
                        ? "text-[#B30437] font-medium"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedSecondaryTab("for-you");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      For Individuals
                    </a>
                  </li>
                  <li>
                    <a
                      href="/for-companies"
                      className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "for-companies"
                        ? "text-[#B30437] font-medium"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedSecondaryTab("for-companies");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      For Companies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers/internships"
                      className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "internships"
                        ? "text-[#B30437] font-medium"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedSecondaryTab("internships");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Find Internship
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers/jobs"
                      className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "jobs"
                        ? "text-[#B30437] font-medium"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedSecondaryTab("jobs");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Find Jobs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/events"
                      className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "events"
                        ? "text-[#B30437] font-medium"
                        : ""
                        }`}
                      onClick={() => {
                        setSelectedSecondaryTab("events");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Events
                    </a>
                  </li>

                  {user ? (
                    <>
                      <li>
                        <button
                          className="block w-full text-left py-2 text-xs text-gray-600 hover:text-[#B30437]"
                          onClick={() => { 
                            setIsMobileMenuOpen(false); 
                            navigateToRemoteDashboard(dashboardUrl);
                          }}
                        >
                          {dashboardText}
                        </button>
                      </li>
                      {user.role !== "admin" && user.role !== "recruiter" && (
                        <li>
                          <button
                            className="block w-full text-left py-2 text-xs text-gray-600 hover:text-[#B30437]"
                            onClick={() => { 
                              setIsMobileMenuOpen(false); 
                              navigateToRemoteDashboard('/profile');
                            }}
                          >
                            Profile
                          </button>
                        </li>
                      )}
                    </>
                  ) : (
                    <li>
                      <button
                        className={`block py-2 text-xs text-gray-600 hover:text-[#B30437] ${selectedSecondaryTab === "login"
                          ? "text-[#B30437] font-medium"
                          : ""
                          }`}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setShowInterviewAI(true);
                          document.body.style.overflow = 'hidden';
                        }}
                      >
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {showInterviewAI && createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/20">
          <div className="w-[80%] h-[90%] relative">
            <button
              onClick={() => {
                setShowInterviewAI(false);
                document.body.style.overflow = '';
              }}
              className="absolute -top-3 -right-3 z-40 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md text-gray-600 hover:text-red-500 transition-colors"
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
    </div>
  );
}

export default memo(Navbar);