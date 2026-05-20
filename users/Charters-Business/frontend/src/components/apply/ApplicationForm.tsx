'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { submitApplication, submitCounseling } from '@/lib/server/api';
import { getAllProgrammes } from "@/lib/server/programmes";
import { useAuth } from '@/context/AuthContext';
import { getTrackingSnapshot } from '@/lib/Tracking';
import PhoneOtpLogin from '../auth/PhoneOtpLogin';

type FormType = 'application' | 'counseling';

interface FormData {
  name: string;
  email: string;
  location: string;
  program: string;
  countryCode: string;
  mobileNo: string;
  counselingDate: string;
  counselingTime: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  location?: string;
  program?: string;
  mobileNo?: string;
  counselingDate?: string;
  counselingTime?: string;
  agreeToTerms?: string;
}

const timeSlots = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

export default function ApplicationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, token, login, navigateToRemoteDashboard } = useAuth();

  const [formType, setFormType] = useState<FormType>('application');
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const allProgrammes = getAllProgrammes();
  const programNames = allProgrammes.map((programme) => programme.dropdown.title);

  const getProgramTitleFromSlug = (slug: string): string => {
    const programme = allProgrammes.find((p) => p.slug === slug);
    return programme ? programme.dropdown.title : '';
  };

  const typeParam = searchParams.get('type');
  const programmeParam = searchParams.get('programme');

  useEffect(() => {
    if (typeParam === 'counseling') {
      setFormType('counseling');
    } else {
      setFormType('application');
    }
  }, [typeParam]);

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    location: '',
    program: programmeParam ? getProgramTitleFromSlug(programmeParam) : '',
    countryCode: '+91',
    mobileNo: user?.id && 'phoneNumber' in user ? (user as any).phoneNumber : '',
    counselingDate: '',
    counselingTime: '',
    agreeToTerms: true,
  });

  useEffect(() => {
    if (programmeParam) {
      const programTitle = getProgramTitleFromSlug(programmeParam);
      if (programTitle) {
        setFormData((prev) => ({ ...prev, program: programTitle }));
      }
    }
  }, [programmeParam]);

  // AUTO-SUBMIT APPLICATION FOR LOGGED-IN USERS
  useEffect(() => {
    const autoSubmitApplication = async () => {
      if (
        user &&
        typeParam === 'application' &&
        programmeParam &&
        !isAutoSubmitting &&
        !alreadyApplied
      ) {
        setIsAutoSubmitting(true);

        try {
          const programTitle = getProgramTitleFromSlug(programmeParam);
          const trackingData = getTrackingSnapshot();

          if (!programTitle) {
            console.error('Invalid programme');
            navigateToRemoteDashboard('/dashboard-overview');
            return;
          }

          const response = await submitApplication(
            {
              name: user.name,
              email: user.email,
              location: '',
              program: programTitle,
              countryCode: '+91',
              mobileNo: '',
              agreeToTerms: true,
              trackingData,
            },
            token
          );

          if (response.success) {
            setTimeout(() => {
              navigateToRemoteDashboard('/dashboard-overview');
            }, 1500);
          } else {
            throw new Error(response.message || 'Application failed');
          }
        } catch (error: any) {
          console.error('Auto-submit error:', error);

          // ✅ Safe error message extraction
          let errorMessage = '';
          if (error.message) {
            errorMessage = error.message.toLowerCase();
          } else if (typeof error === 'string') {
            errorMessage = error.toLowerCase();
          }

          // ✅ Comprehensive duplicate detection
          const isDuplicateError =
            errorMessage.includes('already applied') ||
            errorMessage.includes('duplicate') ||
            errorMessage.includes('e11000') ||
            (error.message && error.message.includes('You have already applied'));

          if (isDuplicateError) {
            setAlreadyApplied(true);
            setIsAutoSubmitting(false);
            return;
          }

          setIsAutoSubmitting(false);
          alert(error.message || 'Failed to submit application.');
          setTimeout(() => navigateToRemoteDashboard('/dashboard-overview'), 1000);
        }
      }
    };

    autoSubmitApplication();
  }, [user, typeParam, programmeParam, token, router, isAutoSubmitting, alreadyApplied]);

  // Update form data when user logs in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!user) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the privacy policy';
      }
    }

    if (!formData.program) {
      newErrors.program = 'Please select a program';
    }

    if (formType === 'application') {
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }

    if (formType === 'counseling') {
      if (!formData.counselingDate) {
        newErrors.counselingDate = 'Please select a date';
      }

      if (!formData.counselingTime) {
        newErrors.counselingTime = 'Please select a time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      const trackingData = getTrackingSnapshot();

      if (formType === 'counseling') {
        response = await submitCounseling(
          {
            name: user?.name || formData.name,
            email: user?.email || formData.email,
            program: formData.program,
            counselingDate: formData.counselingDate,
            counselingTime: formData.counselingTime,
            agreeToTerms: formData.agreeToTerms,
            trackingData,
          },
          token
        );
      } else {
        response = await submitApplication(
          {
            ...formData,
            trackingData,
          },
          token
        );
      }

      if (response.success && response.data) {
        if (response.data.isNewUser && response.data.generatedPassword) {
          await login(response.data.email, response.data.generatedPassword);
        } else {
          navigateToRemoteDashboard('/dashboard-overview');
        }
      }
    } catch (error: any) {
      console.error('Submission error:', error);

      // ✅ Safe error message extraction
      let errorMessage = '';
      if (error.message) {
        errorMessage = error.message.toLowerCase();
      } else if (typeof error === 'string') {
        errorMessage = error.toLowerCase();
      }

      // ✅ Comprehensive duplicate detection
      const isDuplicateError =
        errorMessage.includes('already applied') ||
        errorMessage.includes('duplicate') ||
        errorMessage.includes('e11000');

      if (isDuplicateError) {
        setAlreadyApplied(true);
        setIsSubmitting(false);
        return;
      }

      alert(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show already applied message
  if (alreadyApplied) {
    return (
      <div className="bg-white p-8 text-center rounded-lg shadow-md border-2 border-yellow-500">
        <div className="mb-4 flex justify-center">
          <svg className="w-16 h-16 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Already Applied</h3>
        <p className="text-gray-600 mb-4">
          You have already applied for{' '}
          <strong className="text-[#B30437]">
            {getProgramTitleFromSlug(programmeParam || '')}
          </strong>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Check your application status on the dashboard
        </p>
        <button
          onClick={() => navigateToRemoteDashboard('/dashboard-overview')}
          className="bg-[#B30437] hover:bg-[#8B0329] text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Show auto-submitting message
  if (isAutoSubmitting && typeParam === 'application' && user) {
    return (
      <div className="bg-white p-8 text-center rounded-lg shadow-md">
        <div className="mb-4 flex justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#B30437] border-t-transparent rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Submitting Your Application
        </h3>
        <p className="text-gray-600 mb-1">
          Programme:{' '}
          <strong className="text-[#B30437]">
            {getProgramTitleFromSlug(programmeParam || '')}
          </strong>
        </p>
        <p className="text-sm text-gray-500">Please wait, redirecting to dashboard overview...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-10 md:mt-0" aria-label={`${formType} form`}>
      {/* Form Type Switcher */}
      <div className="flex flex-row gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() =>
            router.push(
              `/apply?type=application${programmeParam ? `&programme=${programmeParam}` : ''}`
            )
          }
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${formType === 'application'
            ? 'bg-[#B30437] text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          Apply for Program
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(
              `/apply?type=counseling${programmeParam ? `&programme=${programmeParam}` : ''}`
            )
          }
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${formType === 'counseling'
            ? 'bg-[#B30437] text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
          Book Counseling
        </button>
      </div>

      {/* Form Header */}
      <div className="mb-6">
        <div className="text-2xl sm:text-3xl font-bold text-black mb-2">
          {formType === 'counseling' ? (
            <>
              Book Your Free Counseling
              <br />
              <span className="text-[#B30437]">Session</span>
            </>
          ) : (
            <>
              {user ? 'Apply for Another Program' : 'Begin Your Application'}
              <br />
              <span className="text-[#B30437]">Charters Union Application</span>
            </>
          )}
        </div>
        {user && (
          <p className="text-gray-600 text-sm">
            Welcome back, <strong>{user.name}</strong>!
          </p>
        )}
        {formType === 'counseling' && !user && (
          <p className="text-gray-600 text-sm">
            Get expert guidance on program selection and admission requirements
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Phone Auth for non-logged users */}
        {!user && (
          <div className="mb-6 border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Please verify your phone number to continue</h3>
            <PhoneOtpLogin onSuccess={() => { }} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              After verification, you can proceed with your application.
            </p>
          </div>
        )}

        {/* Application Form - Only show if user is logged in */}
        {user && (
          <>
            {/* Read-only User Details */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide font-semibold">Name</label>
                  <div className="font-medium text-gray-900">{user.name}</div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide font-semibold">Email</label>
                  <div className="font-medium text-gray-900">{user.email}</div>
                </div>
              </div>
            </div>

            {/* Location for application */}
            {formType === 'application' && (
              <div className="flex flex-col">
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location*"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all`}
                  aria-required="true"
                  aria-invalid={!!errors.location}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.location}
                  </p>
                )}
              </div>
            )}

            {/* Program Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="program" className="sr-only">
                What program are you interested in?
              </label>
              <select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.program ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all bg-white`}
                aria-required="true"
                aria-invalid={!!errors.program}
              >
                <option value="">What program are you interested in ?</option>
                {programNames.map((program, index) => (
                  <option key={`${program}-${index}`} value={program}>
                    {program}
                  </option>
                ))}
              </select>
              {errors.program && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.program}
                </p>
              )}
              {programmeParam && formData.program && (
                <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formData.program} pre-selected (you can change if needed)
                </p>
              )}
            </div>

            {/* Counseling Date & Time */}
            {formType === 'counseling' && (
              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold text-gray-900">Schedule Your Session</div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="counselingDate" className="text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="counselingDate"
                      name="counselingDate"
                      value={formData.counselingDate}
                      onChange={handleChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.counselingDate ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all bg-white`}
                      aria-required="true"
                      aria-invalid={!!errors.counselingDate}
                    />
                    {errors.counselingDate && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.counselingDate}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label htmlFor="counselingTime" className="text-sm font-medium text-gray-700 mb-1">
                      Preferred Time *
                    </label>
                    <select
                      id="counselingTime"
                      name="counselingTime"
                      value={formData.counselingTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.counselingTime ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all bg-white`}
                      aria-required="true"
                      aria-invalid={!!errors.counselingTime}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                    {errors.counselingTime && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.counselingTime}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  Schedule within the next 3 months. Our counselor will connect with you at the
                  selected time.
                </p>
              </div>
            )}





            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex flex-row items-center justify-center gap-2"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
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
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>
                    {formType === 'counseling' ? 'SCHEDULE COUNSELING' : 'SUBMIT APPLICATION'}
                  </span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </>
        )}

        {!user && (
          <p className="text-center text-black text-sm mt-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#B30437] hover:text-[#8B0329] font-semibold underline transition-colors"
            >
              Log In
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
