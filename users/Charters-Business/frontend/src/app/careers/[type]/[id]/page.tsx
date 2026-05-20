"use client";

import { use, useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getJobById, getInternshipById, applyForPosition } from '@/lib/server/api';
import { useAuth } from '@/context/AuthContext';

type PageType = 'jobs' | 'internships';

export default function CareerDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = use(params);
  const router = useRouter();
  const { user, token } = useAuth();

  if (type !== 'jobs' && type !== 'internships') {
    notFound();
  }

  const pageType = type as PageType;
  const isJobs = pageType === 'jobs';

  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Show success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch job/internship details
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = isJobs ? await getJobById(id) : await getInternshipById(id);
        setItem(response.data);
      } catch (err: any) {
        console.error('Error fetching details:', err);
        setError(err.message || 'Failed to load details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, isJobs]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (file.type !== 'application/pdf') {
        setSubmitError('Please upload a PDF file only');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size must be less than 5MB');
        return;
      }

      setResumeFile(file);
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Check if user is logged in
    if (!user || !token) {
      // Store current URL to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
      return;
    }

    if (!resumeFile) {
      setSubmitError('Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map pageType ('jobs' | 'internships') to API type ('job' | 'internship')
      const apiType = pageType === 'jobs' ? 'job' : 'internship';
      await applyForPosition(apiType, id, resumeFile, token);

      setSubmitSuccess(true);
      setShowSuccessModal(true);
      setResumeFile(null);
    } catch (err: any) {
      console.error('Application error:', err);
      setSubmitError(err.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#B30437] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || 'Not found'}</p>
          <Link
            href={`/careers/${pageType}`}
            className="mt-4 inline-block text-[#B30437] hover:underline"
          >
            Back to {isJobs ? 'Jobs' : 'Internships'}
          </Link>
        </div>
      </div>
    );
  }

  const isJob = 'salary' in item;

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white  -mx-[9%]" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/careers" className="hover:text-[#B30437] transition-colors">
                Careers
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/careers/${pageType}`}
                className="hover:text-[#B30437] transition-colors"
              >
                {isJobs ? 'Jobs' : 'Internships'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium">{item.title}</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <article className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto bg-white shadow-lg">
            {/* Header Section */}
            <header className="p-8 mb-8">
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                {item.title}
              </h1>

              <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{isJob ? item.jobType : item.internshipType}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-lg bg-red-50 px-4 py-2">
                  <div className="text-sm text-gray-600">{isJob ? 'Salary' : 'Stipend'}</div>
                  <div className="font-semibold" style={{ color: '#B30437' }}>
                    {isJob ? item.salary : item.stipend}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 px-4 py-2">
                  <div className="text-sm text-gray-600">
                    {isJob ? 'Experience' : 'Duration'}
                  </div>
                  <div className="font-semibold text-gray-900">
                    {isJob ? item.experience : item.duration}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 px-4 py-2">
                  <div className="text-sm text-gray-600">Posted</div>
                  <time className="font-semibold text-gray-900" dateTime={item.createdAt}>
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Description - Rich HTML Content */}
            <section className="p-8">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              </div>
              <div
                className="prose prose-lg max-w-none rich-text-content"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </section>

            {/* Add CSS for display */}
            <style jsx global>{`
  .rich-text-content h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .rich-text-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .rich-text-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .rich-text-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .rich-text-content ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  .rich-text-content ol {
    list-style-type: decimal;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  .rich-text-content li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .rich-text-content blockquote {
    border-left: 4px solid #B30437;
    padding-left: 1rem;
    margin-bottom: 1rem;
    font-style: italic;
    color: #4b5563;
  }

  .rich-text-content hr {
    border: none;
    border-top: 2px solid #e5e7eb;
    margin: 2rem 0;
  }
`}</style>

          </div>
        </div>
      </article>

      {/* Application Form Section */}
      <section className="pb-16" aria-labelledby="apply-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 id="apply-heading" className="mb-6 text-2xl font-bold text-gray-900">
                Apply for this {isJob ? 'Position' : 'Internship'}
              </h2>

              {submitError && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-600">
                  Application submitted successfully!
                </div>
              )}

              {!user ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    You need to login to apply for this position
                  </p>
                  <button
                    onClick={() => {
                      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                      router.push('/login');
                    }}
                    className="rounded-lg px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#B30437' }}
                  >
                    Login to Apply
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Auto-filled user info */}
                  <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Applying as:</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  {/* Resume Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume (PDF only, Max 5MB) *
                    </label>

                    {/* Previous Resume Info */}
                    {user.lastResumeUrl && !resumeFile && (
                      <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
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
                          <div className="flex-1">
                            <p className="font-medium text-blue-900">
                              Previously uploaded resume available
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              Your resume from{' '}
                              {user.lastResumeUploadedAt &&
                                new Date(user.lastResumeUploadedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                            </p>
                            <p className="text-xs text-blue-600 mt-2">
                              ✓ We'll use your previous resume, or upload a new one below
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Custom File Upload */}
                    <div className="relative">
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
                        className="flex items-center justify-center gap-3 w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 cursor-pointer hover:border-[#B30437] hover:bg-red-50 transition-all duration-200"
                      >
                        <svg
                          className="w-8 h-8 text-gray-400"
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
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">
                            Click to upload {user.lastResumeUrl ? 'a new resume' : 'your resume'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF format, maximum 5MB
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Selected File Display */}
                    {resumeFile && (
                      <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5 text-green-600"
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
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Remove file"
                          >
                            <svg
                              className="w-5 h-5"
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

                    {/* Help Text */}
                    <p className="mt-2 text-xs text-gray-500">
                      {user.lastResumeUrl && !resumeFile
                        ? 'Upload a new resume to replace your previous one, or leave empty to use the existing one.'
                        : 'Make sure your resume is up to date and highlights your relevant experience.'}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ backgroundColor: '#B30437' }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
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

              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Application Submitted!
              </h3>
              <p className="mb-6 text-gray-600">
                We've received your application. Our team will review it and get back to you
                soon.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/careers/${isJobs ? 'jobs' : 'internships'}`}
                  className="rounded-lg px-6 py-3 text-center font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: '#B30437' }}
                >
                  Explore More {isJobs ? 'Jobs' : 'Internships'}
                </Link>

                <Link
                  href="/"
                  className="rounded-lg border-2 border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
