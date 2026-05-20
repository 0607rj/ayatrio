import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Charters Business",
  description:
    "Login to your Charters Business account. Access your dashboard, track application status, view counseling schedules, and manage your profile.",
  alternates: {
    canonical: "/login",
  },
  keywords: [
    "login",
    "sign in",
    "student portal",
    "dashboard access",
    "charters business login",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12">
        {/*  Welcome Text */}
        <section className="flex-1 text-center lg:text-left flex flex-col justify-center">
          <Link href="/" className="inline-block mb-6">
            <div className="w-20 h-20 bg-[#B30437] rounded-full flex items-center justify-center mx-auto lg:mx-0">
              <span className="text-3xl font-bold text-white">CB</span>
            </div>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Login to access your dashboard and track your application status.
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
              Track your application status
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
              View counseling schedules
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
              Manage your profile
            </p>
          </div>
        </section>

        {/*  Login Form */}
        <section className="flex-1 max-w-md w-full">
          <LoginForm />

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
