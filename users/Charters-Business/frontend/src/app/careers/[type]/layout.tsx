import { Metadata } from 'next';
import Script from "next/script";
import { notFound } from 'next/navigation';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { type } = await params;

  if (type !== 'jobs' && type !== 'internships') {
    return {};
  }

  const isJobs = type === 'jobs';

  const metadata = {
    jobs: {
      title: 'Jobs at Charters Business | Full-Time Career Opportunities',
      description: 'Explore exciting full-time job openings at Charters Business. Join our team of innovators and build a rewarding career in education technology.',
      keywords: 'charters business jobs, career opportunities, full time jobs, tech jobs India, education jobs, software engineer jobs',
      ogTitle: 'Careers at Charters Business - Join Our Team',
      ogDescription: 'Discover amazing career opportunities and grow with us. Competitive salaries, great benefits, and work-life balance.',
      canonical: 'https://chartersbusiness.com/careers/jobs',
    },
    internships: {
      title: 'Internships at Charters Business | Start Your Career Journey',
      description: 'Launch your career with paid internships at Charters Business. Gain hands-on experience, learn from experts, and build your professional network.',
      keywords: 'charters business internships, paid internships India, tech internships, summer internships 2025, internship opportunities',
      ogTitle: 'Internships at Charters Business - Learn & Grow',
      ogDescription: 'Get real-world experience with our internship programs. Paid positions with learning opportunities and mentorship.',
      canonical: 'https://chartersbusiness.com/careers/internships',
    },
  };

  const content = isJobs ? metadata.jobs : metadata.internships;

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: content.canonical,
    },
    openGraph: {
      title: content.ogTitle,
      description: content.ogDescription,
      url: content.canonical,
      siteName: 'Charters Business',
      images: [
        {
          url: `/og-${type}.jpg`,
          width: 1200,
          height: 630,
          alt: `${isJobs ? 'Jobs' : 'Internships'} at Charters Business`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.ogTitle,
      description: content.ogDescription,
      images: [`/og-${type}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CareersTypeLayout({ children, params }: LayoutProps) {
  const { type } = await params;

  if (type !== 'jobs' && type !== 'internships') {
    notFound();
  }

  const isJobs = type === 'jobs';

  // JSON-LD Schema for Job Listing Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isJobs ? 'Job Openings at Charters Business' : 'Internship Opportunities at Charters Business',
    description: isJobs
      ? 'Browse all available job positions at Charters Business'
      : 'Explore internship opportunities at Charters Business',
    url: `https://chartersbusiness.com/careers/${type}`,
    provider: {
      '@type': 'Organization',
      name: 'Charters Business',
      sameAs: [
        'https://www.linkedin.com/company/charters-business',
        'https://twitter.com/chartersbusiness',
      ],
    },
  };

  return (
    <>
      <Script
        id={`career-type-schema-${type}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
        {children}
    </>
  );
}
