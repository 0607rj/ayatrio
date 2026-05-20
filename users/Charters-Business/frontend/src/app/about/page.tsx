import TetrLandingPage from "@/components/about/About";

import { organizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Charters Business",
  description:
    "Learn about Charters Business and our mission to transform business education. Discover our world-class faculty, innovative programs, and commitment to producing industry-ready leaders.",
  keywords: [
    "about charters business",
    "business school",
    "education mission",
    "tetr program",
    "innovative learning",
    "industry-ready leaders",
    "business education India",
  ],
  openGraph: {
    title: "About Us | Charters Business",
    description:
      "Learn about Charters Business and our mission to transform business education through real-world learning experiences.",
    type: "website",
    url: "https://chartersbusiness.com/about",
    siteName: "Charter's Union",
    images: [
      {
        url: "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
        width: 1200,
        height: 630,
        alt: "About Charters Business - Transforming Business Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Charters Business",
    description:
      "Learn about Charters Business and our mission to transform business education.",
    images: [
      "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
    ],
  },
  alternates: {
    canonical: "https://chartersbusiness.com/about",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://chartersbusiness.com" },
    { name: "About", url: "https://chartersbusiness.com/about" },
  ]);

  return (
    <>
      {/* Organization Schema */}
      {/* Organization Schema */}
      <script
        id="about-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <TetrLandingPage />
    </>
  );
}
