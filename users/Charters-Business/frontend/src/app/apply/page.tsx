import { Metadata } from "next";

import ApplicationHero from "@/components/apply/ApplicationHero";
import ApplicationProcess from "@/components/apply/ApplicationProcess";
import ScholarshipsSection from "@/components/apply/ScholarshipsSection";
import { scholarshipBanner } from "@/data/applyPageData";
import { Suspense } from "react";
import { generateBreadcrumbSchema } from "@/lib/schema";
import SectionWrapper from "@/components/shared/SectionWrapper";

export const metadata: Metadata = {
  title: "Apply Now - Charter Application | Charter's Union",
  description:
    "Begin your Charter's Union application. Join thousands of B.Com graduates and get placed in top accounting firms within 7 months. Apply for our job-ready accounting programme.",
  keywords: [
    "charter application",
    "apply now",
    "accounting course admission",
    "B.Com accounting programme",
    "job-ready accounting course",
    "charters union",
    "accounting internship",
    "placement programme",
    "professional accounting training",
    "accounting jobs kolkata",
  ],
  openGraph: {
    title: "Apply Now - Charter's Union Application",
    description:
      "Begin your journey with Charter's Union. Apply now for our 7-month job-ready accounting programme with 90% placement rate and ₹3.5 LPA average salary.",
    type: "website",
    url: "https://chartersbusiness.com/apply",
    images: [
      {
        url: "/images/og-apply.jpg",
        width: 1200,
        height: 630,
        alt: "Charter's Union Application - Start Your Accounting Career",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Now - Charter's Union Application",
    description:
      "Begin your Charter's Union application and get placed in top accounting firms within 7 months. 90% placement rate. ₹3.5 LPA avg salary.",
    images: ["/images/og-apply.jpg"],
  },
  alternates: {
    canonical: "https://chartersbusiness.com/apply",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ApplyPage() {
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://chartersbusiness.com" },
    { name: "Apply", url: "https://chartersbusiness.com/apply" },
  ]);

  return (
    <>
      {/* Breadcrumb Schema */}
      {/* Breadcrumb Schema */}
      <script
        id="apply-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <ApplicationHero />
        </Suspense>

        <div className="bordered-container border-x md:mx-[3%] border-gray-200 max-w-[95rem] mx-auto">
          <SectionWrapper borderBottom={false}>
            <div className="py-4 mt-4 sm:py-6 sm:mt-6" aria-label="Scholarship information">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-3 text-black text-center">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                    {scholarshipBanner.text}{" "}
                    <strong className="font-bold">
                      {scholarshipBanner.highlight}
                    </strong>{" "}
                    for undergraduate and postgraduate candidates.
                  </p>
                </div>
              </div>
            </div>
          </SectionWrapper>
          <SectionWrapper>
            <ApplicationProcess />
          </SectionWrapper>
          <SectionWrapper>
            <ScholarshipsSection />
          </SectionWrapper>
        </div>
      </main>
    </>
  );
}
