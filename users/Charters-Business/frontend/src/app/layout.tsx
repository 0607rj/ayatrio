import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import CookieConsent from "@/components/shared/CookieConsent";
import GoogleTagManager from "@/components/shared/GoogleTagManager";
import Providers from "./providers";
import ClientOnlyComponents from "@/components/client/ClientOnlyComponents";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Job-ready Accounting Course | 90% Placement Rate | 7 Months | Charter's Union",
    template: "%s | Charter's Union",
  },
  description:
    "Get placed in 7 months with practical accounting skills, internship experience, and placement support. 90% placement rate. ₹3.5 LPA average salary. Free counseling call.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://chartersbusiness.com"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <meta name="theme-color" content="#B30437" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${inter.className} font-sans antialiased`}>
        <Providers>
          <GoogleTagManager />
          <ClientOnlyComponents />

          <div className="flex flex-col min-h-screen">
            {children}
          </div>

          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}