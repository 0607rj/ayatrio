"use client";
import { createPortal } from "react-dom";
import { use, useState, useEffect, useCallback } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAllJobs,
  getAllInternships,
  getJobById,
  getInternshipById,
  applyForPosition,
} from "@/lib/server/api";
import { useAuth } from "@/context/AuthContext";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import MultiSelectDropdown from "@/components/careers/Type_FilterDropdown";
import ChipMultiSelect from "@/components/careers/ChipMultiSelect";
import ChartersInterviewAi from "@/components/home/Chartersinterview_ai";

type PageType = "jobs" | "internships";

interface ListItem {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt: string;
  jobType?: string;
  salary?: string;
  experience?: string;
  internshipType?: string;
  stipend?: string;
  duration?: string;
}

function Spinner({ size = 8 }: { size?: number }) {
  return (
    <div
      className={`inline-block h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-[#B30437] border-r-transparent`}
    />
  );
}

function JobCard({
  item,
  isSelected,
  isJob,
  onClick,
}: {
  item: ListItem;
  isSelected: boolean;
  isJob: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`w-full text-left p-3 border-b border-gray-100 transition-all duration-200 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B30437] ${isSelected
          ? "bg-red-50 border-l-4 border-l-[#B30437]"
          : "border-l-4 border-l-transparent"
          }`}
      >
        <h3
          className={`text-base font-semibold mb-1 leading-snug ${isSelected ? "text-[#B30437]" : "text-gray-900"
            }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{item.company}</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-xs rounded-full bg-red-100 text-[#B30437] px-2.5 py-0.5 font-medium">
            {item.location}
          </span>
          <span className="text-xs rounded-full bg-gray-100 text-gray-600 px-2.5 py-0.5">
            {isJob ? item.jobType : item.internshipType}
          </span>
          <span className="text-xs rounded-full bg-blue-100 text-blue-700 px-2.5 py-0.5">
            {item.category}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {isJob ? item.salary : item.stipend}
          </span>
          <time className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </button>
    </li>
  );
}

function ApplySection({
  item,
  pageType,
  itemId,
}: {
  item: any;
  pageType: PageType;
  itemId: string;
}) {
  const router = useRouter();
  const { user, token } = useAuth();
  const isJob = "salary" in item;

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showInterviewAI, setShowInterviewAI] = useState(false);

  useEffect(() => {
    setResumeFile(null);
    setSubmitSuccess(false);
    setSubmitError(null);
  }, [itemId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setSubmitError("Please upload a PDF file only");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user || !token) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/login");
      return;
    }

    if (!resumeFile && !user.lastResumeUrl) {
      setSubmitError("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiType = pageType === "jobs" ? "job" : "internship";
      await applyForPosition(apiType, itemId, resumeFile, token);
      setSubmitSuccess(true);
      setShowSuccessModal(true);
      setResumeFile(null);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 border-r border-b border-gray-200">
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Apply for this {isJob ? "Position" : "Internship"}
        </h2>

        {submitError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
            Application submitted successfully!
          </div>
        )}

        {!user ? (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-4 text-sm">
              You need to login to apply for this position
            </p>
            <button
              onClick={() => {
                setShowInterviewAI(true);
                document.body.style.overflow = 'hidden';
              }}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#B30437" }}
            >
              Login to Apply
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-lg bg-gray-50 p-3.5 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Applying as:</p>
              <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {user.lastResumeUrl && !resumeFile && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3.5">
                <div className="flex items-start gap-2.5">
                  <svg
                    className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
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
                  <div>
                    <p className="font-medium text-blue-900 text-sm">
                      Previously uploaded resume available
                    </p>
                    {user.lastResumeUploadedAt && (
                      <p className="text-xs text-blue-700 mt-0.5">
                        Uploaded on{" "}
                        {new Date(user.lastResumeUploadedAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </p>
                    )}
                    <p className="text-xs text-blue-600 mt-1">
                      ✓ We'll use your previous resume, or upload a new one
                      below
                    </p>
                  </div>
                </div>
              </div>
            )}


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume (PDF only, Max 5MB){!user.lastResumeUrl && " *"}
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                required={!user.lastResumeUrl}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="flex items-center justify-center gap-3 w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 cursor-pointer hover:border-[#B30437] hover:bg-red-50 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload{" "}
                    {user.lastResumeUrl ? "a new resume" : "your resume"}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    PDF format, maximum 5MB
                  </p>
                </div>
              </label>

              {resumeFile && (
                <div className="mt-2.5 rounded-lg bg-green-50 border border-green-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-green-700">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove file"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-1.5 text-xs text-gray-500">
                {user.lastResumeUrl && !resumeFile
                  ? "Upload a new resume to replace your previous one, or leave empty to use the existing one."
                  : "Make sure your resume is up to date and highlights your relevant experience."}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg px-6 py-3 font-semibold text-white shadow transition-all duration-300 hover:scale-[1.02] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ backgroundColor: "#B30437" }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        )}
      </div>

      {showInterviewAI && createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60">
          <div className="w-[85vw] max-w-4xl h-[85vh] relative">
            <button
              onClick={() => {
                setShowInterviewAI(false);
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

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-7 w-7 text-green-600"
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
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Application Submitted!
              </h3>
              <p className="mb-6 text-sm text-gray-600">
                We've received your application. Our team will review it and get
                back to you soon.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="rounded-lg px-6 py-2.5 font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: "#B30437" }}
                >
                  View More {isJob ? "Jobs" : "Internships"}
                </button>
                <Link
                  href="/"
                  className="rounded-lg border-2 border-gray-300 px-6 py-2.5 text-center font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 text-sm"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main Page ──

export default function CareersPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);

  if (type !== "jobs" && type !== "internships") {
    notFound();
  }

  const [pageType, setPageType] = useState<PageType>(type as PageType);
  const isJob = pageType === "jobs";

  // Left panel state
  const [list, setList] = useState<ListItem[]>([]);
  const [locations, setLocations] = useState<string[]>(["All"]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Right panel state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Fetch list
  useEffect(() => {
    let cancelled = false;

    const fetchList = async () => {
      setListLoading(true);
      setListError(null);

      try {
        // Fetch without location/category filters — let backend handle search only
        const queryParams = {
          search: searchQuery || undefined,
        };

        const response = isJob
          ? await getAllJobs(queryParams)
          : await getAllInternships(queryParams);

        const allItems: ListItem[] = isJob
          ? response.data.jobPostings
          : response.data.internshipPostings;

        if (cancelled) return;

        // ── Client-side filtering ──
        const filtered = allItems.filter((item) => {
          const locationMatch =
            selectedLocations.length === 0 ||
            selectedLocations.includes(item.location);

          const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(item.category);

          return locationMatch && categoryMatch;
        });

        setList(filtered);

        // Always derive options from the FULL list, not filtered
        const uniqueLocations = Array.from(
          new Set(allItems.map((i) => i.location))
        ) as string[];
        setLocations(uniqueLocations);

        const uniqueCategories = Array.from(
          new Set(allItems.map((i) => i.category))
        ) as string[];
        setCategories(uniqueCategories);

        if (filtered.length > 0) {
          setSelectedId(filtered[0]._id);
        } else {
          setSelectedId(null);
          setSelectedItem(null);
        }
      } catch (err: any) {
        if (!cancelled) setListError(err.message || "Failed to load listings");
      } finally {
        if (!cancelled) setListLoading(false);
      }
    };

    fetchList();
    return () => { cancelled = true; };
  }, [isJob, selectedLocations, selectedCategories, searchQuery]);

  // Fetch detail
  useEffect(() => {
    if (!selectedId) return;

    let cancelled = false;

    const fetchDetail = async () => {
      setDetailLoading(true);
      setDetailError(null);

      try {
        const response = isJob
          ? await getJobById(selectedId)
          : await getInternshipById(selectedId);

        if (!cancelled) setSelectedItem(response.data);
      } catch (err: any) {
        if (!cancelled)
          setDetailError(err.message || "Failed to load details");
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    };

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [selectedId, isJob]);

  // Page type toggle: reset all filters
  const handleTypeChange = useCallback((newType: PageType) => {
    setPageType(newType);
    setSearchQuery("");
    setSelectedLocations([]);
    setSelectedCategories([]);
    setSelectedId(null);
    setSelectedItem(null);
  }, []);

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-[#F4F2EE]">
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <DashboardNavbar
        showCareerControls
        pageType={pageType}
        onTypeChange={handleTypeChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locations={locations.filter((l) => l !== "All")}
        selectedLocations={selectedLocations}
        onLocationsChange={setSelectedLocations}
        categories={categories.filter((c) => c !== "All")}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
      />
      <div className="pt-16 pb-1 mx-[5%] bg-white px-2 border-b border-gray-200 flex flex-row items-center justify-between">
        <div className="w-full max-w-[70%]">
          <ChipMultiSelect
            options={categories.filter((c) => c !== "All")}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
        <MultiSelectDropdown
          label="Location"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          options={locations.filter((l) => l !== "All")}
          selected={selectedLocations}
          onChange={setSelectedLocations}
        />
      </div>

      {/* Split Layout */}
      <div className="bg-[#F4F2EE] flex flex-1 overflow-hidden ">

        {/* LEFT PANEL */}
        <aside className="w-full sm:w-[38%] border-r border-gray-200 flex flex-col bg-white overflow-hidden ml-[5%]">
          <div className="font-sans p-3 pl-4 border-b border-gray-200 py-2 mt-2">
            <h2 className="text-m font-normal text-gray-900 tracking-tight">
              Top {isJob ? "job" : "internship"} picks for you
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              {listLoading ? (
                <span className="animate-pulse">
                  Loading your recommendations...
                </span>
              ) : (
                <>
                  Based on your profile, preferences, and location...
                  <span className="block mt-1 font-light text-gray-600">
                    {list.length} results
                  </span>
                </>
              )}
            </p>
          </div>

          <div className="custom-scroll flex-1 overflow-y-auto">
            {listLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Spinner />
                <p className="text-sm text-gray-500">
                  Loading {isJob ? "jobs" : "internships"}...
                </p>
              </div>
            ) : listError ? (
              <div className="p-6 text-center">
                <p className="text-sm text-red-600">{listError}</p>
              </div>
            ) : list.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500">
                  No {isJob ? "jobs" : "internships"} found matching your
                  criteria.
                </p>
              </div>
            ) : (
              <ul>
                {list.map((item) => (
                  <JobCard
                    key={item._id}
                    item={item}
                    isSelected={selectedId === item._id}
                    isJob={isJob}
                    onClick={() => setSelectedId(item._id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <section className="custom-scroll hidden sm:flex flex-col flex-1 overflow-y-auto bg-gray-50 mr-[5%]">
          {detailLoading ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3">
              <Spinner size={10} />
              <p className="text-gray-500">Loading details...</p>
            </div>
          ) : detailError ? (
            <div className="flex items-center justify-center flex-1">
              <p className="text-red-600">{detailError}</p>
            </div>
          ) : !selectedItem ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-2 text-gray-400">
              <svg
                className="w-12 h-12 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">Select a listing to view details</p>
            </div>
          ) : (
            <div className="w-full mx-auto">

              {/* Detail Header */}
              <div className="relative bg-white border-r border-b border-gray-200 p-6">

                {/* filter pills */}
                <div className="absolute top-4 right-4 flex items-center gap-2">

                  {/* Location */}


                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedItem.title}
                </h1>
                <p className="text-gray-600 mb-4">{selectedItem.company}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-5">
                  <span>{selectedItem.location}</span>
                  <span className="text-gray-300">•</span>
                  <span>
                    {isJob ? selectedItem.jobType : selectedItem.internshipType}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-blue-600">{selectedItem.category}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-lg bg-red-50 px-4 py-2.5">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {isJob ? "Salary" : "Stipend"}
                    </div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: "#B30437" }}
                    >
                      {isJob ? selectedItem.salary : selectedItem.stipend}
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-4 py-2.5 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {isJob ? "Experience" : "Duration"}
                    </div>
                    <div className="font-semibold text-sm text-gray-900">
                      {isJob ? selectedItem.experience : selectedItem.duration}
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-4 py-2.5 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-0.5">Posted</div>
                    <time className="font-semibold text-sm text-gray-900">
                      {new Date(selectedItem.createdAt).toLocaleDateString(
                        "en-IN",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </time>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border-r border-b border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Job Description
                </h2>
                <div
                  className="prose prose-sm max-w-none rich-text-content"
                  dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                />
              </div>

              {/* Apply Section */}
              {selectedId && (
                <ApplySection
                  item={selectedItem}
                  pageType={pageType}
                  itemId={selectedId}
                />
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}