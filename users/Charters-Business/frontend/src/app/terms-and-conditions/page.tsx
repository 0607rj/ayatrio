import TermsAndConditionsContent from "@/components/terms/TermsAndConditionsContent";

import { organizationSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Charters Business",
  description:
    "Terms and conditions for using Charters Business website. Learn about our policies, user agreements, and legal information.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | Charters Business",
    description:
      "Terms and conditions for using Charters Business website. Learn about our policies, user agreements, and legal information.",
    url: "https://chartersbusiness.com/terms-and-conditions",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
        width: 1200,
        height: 630,
        alt: "Charters Business Terms and Conditions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions | Charters Business",
    description:
      "Terms and conditions for using Charters Business website. Learn about our policies, user agreements, and legal information.",
    images: [
      "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
    ],
  },
};

export default function TermsAndConditionsPage() {
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://chartersbusiness.com" },
    {
      name: "Terms and Conditions",
      url: "https://chartersbusiness.com/terms-and-conditions",
    },
  ]);

  return (
    <>
      {/* Organization Schema */}
      {/* Organization Schema */}
      <script
        id="terms-organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        id="terms-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main role="main" className="space-y-0">
        <TermsAndConditionsContent />
      </main>
    </>
  );
}
