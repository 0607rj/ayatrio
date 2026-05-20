import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign Up | Charters Business",
  description:
    "Create your Charters Business account to apply, track your progress, and choose the course you're interested in.",
  alternates: {
    canonical: "/signup",
  },
  keywords: [
    "signup",
    "register",
    "create account",
    "charters business signup",
    "student registration",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12">
        <section className="flex-1 text-center lg:text-left flex flex-col justify-center">
          <Link href="/" className="inline-block mb-6">
            <div className="w-20 h-20 bg-[#B30437] rounded-full flex items-center justify-center mx-auto lg:mx-0">
              <span className="text-3xl font-bold text-white">CB</span>
            </div>
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Create Your Account
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Sign up to choose your course, track your application, and manage
            your learning journey.
          </p>

          <div className="flex flex-col gap-2 text-gray-500 text-sm">
            <p className="flex flex-row items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Choose the course you&apos;re interested in
            </p>
            <p className="flex flex-row items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Track applications and counseling updates
            </p>
            <p className="flex flex-row items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Manage your profile in one place
            </p>
          </div>
        </section>

        <section className="flex-1 max-w-md w-full">
          <LoginForm mode="signup" />

          <div className="text-center mt-6 flex flex-col gap-3">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#B30437] text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
