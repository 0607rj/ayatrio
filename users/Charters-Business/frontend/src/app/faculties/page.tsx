import ComprehensivePage from "@/components/faculties/ComprehensivePage";
import Script from "next/script";

import { generateBreadcrumbSchema } from "@/lib/schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Faculty | Charters Business",
  description:
    "Meet our world-class faculty of industry leaders, CEOs, and experts who bring real-world experience to the classroom at Charters Business.",
  keywords: [
    "faculty",
    "professors",
    "industry experts",
    "CEO faculty",
    "business mentors",
    "charters business faculty",
    "business education leaders",
  ],
  openGraph: {
    title: "Our Faculty | Charters Business",
    description:
      "Meet our world-class faculty of industry leaders and experts who bring real-world experience to business education.",
    type: "website",
    url: "https://chartersbusiness.com/faculties",
    siteName: "Charter's Union",
    images: [
      {
        url: "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
        width: 1200,
        height: 630,
        alt: "Our World-Class Faculty - Industry Leaders and Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Faculty | Charters Business",
    description:
      "Meet our world-class faculty of industry leaders and experts.",
    images: [
      "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
    ],
  },
  alternates: {
    canonical: "https://chartersbusiness.com/faculties",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FacultiesPage() {
  const facultyPeople = [
    { name: "Dr. Zal Phiroz", jobTitle: "Adjunct Professor", worksFor: "HARVARD UNIVERSITY" },
    { name: "Mr. Rajat Mathur", jobTitle: "Managing Director", worksFor: "MorganStanley" },
    { name: "Dr. Shad Morris", jobTitle: "Adjunct Professor", worksFor: "MITSLOAN" },
    { name: "Dr. Lan Mo", jobTitle: "Adjunct Professor", worksFor: "NYU SHANGHAI" },
    { name: "Mr. Naveen Munjal", jobTitle: "Managing Director", worksFor: "HEROELECTRIC" },
    { name: "Dr. Sarah Johnson", jobTitle: "Professor of Strategy", worksFor: "STANFORD BUSINESS" },
    { name: "Mr. Michael Chen", jobTitle: "CEO", worksFor: "TECHCORP" },
    { name: "Dr. Emily Rodriguez", jobTitle: "Associate Professor", worksFor: "WHARTON SCHOOL" },
    { name: "Mr. David Kumar", jobTitle: "VP of Operations", worksFor: "GLOBAL SOLUTIONS" },
    { name: "Dr. Lisa Wang", jobTitle: "Professor of Finance", worksFor: "KELLOGG SCHOOL" },
    { name: "Mr. James Wilson", jobTitle: "Chief Strategy Officer", worksFor: "INNOVATION LABS" },
    { name: "Dr. Maria Garcia", jobTitle: "Professor of Marketing", worksFor: "INSEAD" },
    { name: "Mr. Robert Thompson", jobTitle: "Managing Partner", worksFor: "VENTURE CAPITAL" },
    { name: "Dr. Jennifer Lee", jobTitle: "Associate Dean", worksFor: "COLUMBIA BUSINESS" },
    { name: "Mr. Alex Patel", jobTitle: "Director of Innovation", worksFor: "FUTURE TECH" },
    { name: "Dr. Rachel Brown", jobTitle: "Professor of Leadership", worksFor: "LONDON BUSINESS" },
    { name: "Mr. Kevin Zhang", jobTitle: "Chief Technology Officer", worksFor: "DIGITAL DYNAMICS" },
    { name: "Dr. Amanda Taylor", jobTitle: "Professor of Economics", worksFor: "CHICAGO BOOTH" },
    { name: "Mr. Daniel Kim", jobTitle: "VP of Business Development", worksFor: "GROWTH PARTNERS" },
    { name: "Dr. Sophie Miller", jobTitle: "Associate Professor", worksFor: "OXFORD SAID" },
  ];
  const normalizedFacultyPeople = facultyPeople
    .map((person) => ({
      name: person.name?.trim() || "Faculty Member",
      jobTitle: person.jobTitle?.trim() || "Faculty",
      worksFor: person.worksFor?.trim() || "Charters Business",
    }))
    .filter((person) => person.name.length > 0);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://chartersbusiness.com" },
    { name: "Faculties", url: "https://chartersbusiness.com/faculties" },
  ]);
  const facultiesSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://chartersbusiness.com/faculties#webpage",
        url: "https://chartersbusiness.com/faculties",
        name: "Our Faculty | Charters Business",
        description:
          "Meet our world-class faculty of industry leaders, CEOs, and experts who bring real-world experience to business education.",
        isPartOf: {
          "@id": "https://chartersbusiness.com/#website",
        },
        about: {
          "@id": "https://chartersbusiness.com/#organization",
        },
        breadcrumb: {
          "@id": "https://chartersbusiness.com/faculties#breadcrumb",
        },
        mainEntity: {
          "@id": "https://chartersbusiness.com/faculties#faculty-list",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://chartersbusiness.com/faculties#breadcrumb",
        itemListElement: breadcrumbSchema.itemListElement,
      },
      {
        "@type": "ItemList",
        "@id": "https://chartersbusiness.com/faculties#faculty-list",
        name: "Faculty Members",
        itemListOrder: "https://schema.org/ItemListUnordered",
        numberOfItems: normalizedFacultyPeople.length,
        itemListElement: normalizedFacultyPeople.map((person, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: person.name,
            jobTitle: person.jobTitle,
            worksFor: {
              "@type": "Organization",
              name: person.worksFor,
            },
            alumniOf: {
              "@id": "https://chartersbusiness.com/#organization",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <Script
        id="faculties-schema-graph"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(facultiesSchemaGraph) }}
      />

      <ComprehensivePage />
    </>
  );
}
