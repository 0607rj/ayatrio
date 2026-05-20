import { generateBreadcrumbSchema } from "@/lib/schema";
import SectionWrapper from "@/components/shared/SectionWrapper";
import LifeAtCharters from "@/components/student-life/LifeAtCharters";
import Diversity from "@/components/student-life/Diversity";
import TrustedCompanies from "@/components/student-life/TrustedCompanies";
import HeroSection from "@/components/student-life/Herosection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Life | Charters Business",
  description:
    "Discover student life at Charters Business. Join a vibrant community, participate in events, and build your professional network.",
  alternates: {
    canonical: "/student-life",
  },
  openGraph: {
    title: "Student Life | Charters Business",
    description:
      "Discover student life at Charters Business. Join a vibrant community, participate in events, and build your professional network.",
    url: "https://chartersbusiness.com/student-life",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
        width: 1200,
        height: 630,
        alt: "Student Life at Charters Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Life | Charters Business",
    description:
      "Discover student life at Charters Business. Join a vibrant community, participate in events, and build your professional network.",
    images: [
      "https://res.cloudinary.com/ducgcl4dg/image/upload/f_jpg,w_1200,h_630,c_fill/v1768578300/background_bvoits.webp",
    ],
  },
};

type Stat = { value: string; label: string; detail: string; gradient?: string };
const HERO_HEADING = "Accelerate Your Career Growth";
const HERO_TAGLINE =
    "Benefit from an exceptional track record of our graduates' success";

const HERO_STATS: Stat[] = [
    {
        value: "79",
        label: "Startups",
        detail: "formed as part of Masters' Union Venture Initiation Program",
        gradient: "bg-[#B30437]",
    },
    {
        value: "₹ 3.3 Cr",
        label: "Combined revenue",
        detail: "of all Dropshipping teams in Term 1 (Cohort 2024)",
        gradient: "bg-[#B30437]",
    },
];

const HERO_CTA = {
    label: "Download Placement Report",
    href: "#download-report",
};
const HERO_IMAGE = {
    src: "https://images.mastersunion.link/uploads/26122024/mahakgroup.webp",
    alt: "Fireside chat about career growth",
};

export default function ApplyPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "https://chartersbusiness.com" },
        { name: "Apply", url: "https://chartersbusiness.com/apply" },
    ]);

    return (
        <>
            <HeroSection />
            <div className="md:border-x border-gray-200 max-w-[85rem] w-full md:w-[90%] mx-auto overflow-x-clip md:overflow-x-visible">
                <SectionWrapper hideCorners={"all"}>
                    <Diversity />
                </SectionWrapper>
                <SectionWrapper hideCorners={"all"}>
                    <LifeAtCharters />
                </SectionWrapper>
                <SectionWrapper hideCorners={"all"}>
                    <TrustedCompanies />
                </SectionWrapper>
            </div>
        </>
    );
}
