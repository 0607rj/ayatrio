import { Programme } from "@/lib/server/programmes";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://chartersbusiness.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Charters Business";
export const SITE_BRAND_NAME = "Charters Union";
export const DEFAULT_LANGUAGE = "en-IN";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const HOME_PAGE_ID = `${SITE_URL}/#homepage`;

const DEFAULT_LOGO_URL = `${SITE_URL}/Chaters_Union.avif`;
const DEFAULT_EMAIL = "admissions@chartersbusiness.com";
const DEFAULT_PHONE = "08045579576";

export const buildSiteUrl = (path = "") => {
  if (!path || path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}/${path.replace(/^\/+/, "")}`;
};

const normalizeText = (value?: string) =>
  value?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const toIsoDuration = (value?: string) => {
  if (!value) return undefined;

  const normalized = value.trim();

  if (/^P(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?$/i.test(normalized)) {
    return normalized.toUpperCase();
  }

  const match = normalized.match(/^(\d+)\s+(year|years|month|months|week|weeks)$/i);
  if (!match) {
    return undefined;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  if (unit.startsWith("year")) {
    return `P${amount}Y`;
  }

  if (unit.startsWith("month")) {
    return `P${amount}M`;
  }

  if (unit.startsWith("week")) {
    return `P${amount}W`;
  }

  return undefined;
};

const getValidAggregateRating = (rating?: { score?: number; reviews?: number }) => {
  const ratingValue = Number(rating?.score);
  const reviewCount = Number(rating?.reviews);

  if (
    !Number.isFinite(ratingValue) ||
    ratingValue <= 0 ||
    ratingValue > 5 ||
    !Number.isInteger(reviewCount) ||
    reviewCount < 1
  ) {
    return undefined;
  }

  return {
    "@type": "AggregateRating",
    ratingValue: ratingValue.toFixed(1),
    reviewCount: reviewCount.toString(),
    bestRating: "5",
    worstRating: "1",
  };
};

// Base Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  alternateName: [SITE_BRAND_NAME],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_LOGO_URL,
  },
  image: DEFAULT_LOGO_URL,
  description:
    "Charters Business offers professional accounting and career-focused business education with paid internships, global case-based learning, and industry-led training.",
  foundingDate: "2020",
  email: DEFAULT_EMAIL,
  telephone: DEFAULT_PHONE,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Professional accounting training",
    "Paid internships",
    "Career-focused business education",
    "Industry-led curriculum",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Admissions",
      telephone: DEFAULT_PHONE,
      email: DEFAULT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["en", "hi", "bn"],
    },
  ],
};

// Website Schema with Search Action
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  alternateName: SITE_BRAND_NAME,
  url: SITE_URL,
  inLanguage: DEFAULT_LANGUAGE,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
};

// Home Page Schema
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": HOME_PAGE_ID,
  name: "Professional Accountant Training in Kolkata with 100% Paid Internship | Charters Business",
  url: buildSiteUrl("/"),
  description:
    "Learn professional accounting in Kolkata with a 3-month foundation and 4-month paid internship. Train for global roles with top companies.",
  inLanguage: DEFAULT_LANGUAGE,
  isPartOf: {
    "@id": WEBSITE_ID,
  },
  about: {
    "@id": ORGANIZATION_ID,
  },
  primaryImageOfPage: DEFAULT_LOGO_URL,
};

// Home Programmes ItemList Schema
export const generateHomeProgrammesItemListSchema = (
  programmes: Programme[],
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional Accounting Programmes",
    itemListOrder: "https://schema.org/ItemListUnordered",
    numberOfItems: programmes.length,
    itemListElement: programmes.map((programme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: programme.card.title,
        description: normalizeText(programme.card.description),
        url: buildSiteUrl(`/${programme.slug}`),
        provider: {
          "@id": ORGANIZATION_ID,
        },
        educationalLevel: programme.card.level,
        courseMode: programme.card.format.type,
        ...(toIsoDuration(programme.card.duration.type)
          ? { timeRequired: toIsoDuration(programme.card.duration.type) }
          : {}),
      },
    })),
  };
};

// Site Navigation Schema
export const generateSiteNavigationSchema = (
  navigationItems: { name: string; url: string; description?: string }[],
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Site Navigation",
    numberOfItems: navigationItems.length,
    itemListElement: navigationItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SiteNavigationElement",
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
      },
    })),
  };
};

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (
  items: { name: string; url: string }[],
) => {
  const validItems = items.filter(
    (item) => item?.name?.trim().length > 0 && item?.url?.trim().length > 0,
  );

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name.trim(),
        item: item.url.trim(),
      }))
  };
};

// Course/Programme Schema Generator
export const generateCourseSchema = (programme: Programme) => {
  const courseUrl = buildSiteUrl(`/${programme.slug}`);
  const courseId = `${courseUrl}#course`;
  const duration = toIsoDuration(programme.card.duration.type);
  const aggregateRating = getValidAggregateRating(programme.card.rating);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": courseId,
    name: programme.card.title,
    description: normalizeText(programme.card.description),
    url: courseUrl,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    educationalLevel: programme.card.level,
    educationalCredentialAwarded: programme.card.certificateType,
    ...(duration ? { timeRequired: duration } : {}),
    courseMode: programme.card.format.type,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: programme.card.format.type,
      ...(duration ? { duration } : {}),
      instructor: {
        "@type": "Person",
        name: "Industry Experts",
        description: "Top 1% industry faculty",
      },
    },
    ...(aggregateRating ? { aggregateRating } : {}),
    occupationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: programme.card.certificateType,
    },
  };
};

// Programme WebPage Schema Generator
export const generateProgrammeWebPageSchema = (programme: Programme) => {
  const pageUrl = buildSiteUrl(`/${programme.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${programme.card.title} | ${SITE_NAME}`,
    description: normalizeText(programme.card.description),
    inLanguage: DEFAULT_LANGUAGE,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@id": `${pageUrl}#course`,
    },
  };
};

// FAQ Schema Generator
export const generateFAQSchema = (
  faqs: { question: string; answer: string }[],
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.question?.trim() && faq.answer?.trim())
      .map((faq) => ({
      "@type": "Question",
      name: normalizeText(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: normalizeText(faq.answer),
      },
      })),
  };
};

// Job Posting Schema Generator
export const generateJobPostingSchema = (job: {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  datePosted: string;
  validThrough?: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: normalizeText(job.description),
    datePosted: job.datePosted,
    hiringOrganization: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: DEFAULT_LOGO_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    employmentType: job.employmentType,
  };

  if (job.validThrough) {
    schema.validThrough = job.validThrough;
  }

  if (job.salary) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: "YEAR",
      },
    };
  }

  return schema;
};

// Article/Blog Post Schema Generator
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${article.url}#article`,
    headline: article.title,
    description: normalizeText(article.description),
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: article.author
      ? {
          "@type": "Person",
          name: article.author,
        }
      : {
          "@id": ORGANIZATION_ID,
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
    publisher: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
};

// Event Schema Generator
export const generateEventSchema = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  url: string;
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${event.url}#event`,
    name: event.name,
    description: normalizeText(event.description),
    startDate: event.startDate,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
      },
    },
    organizer: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: event.url,
  };

  if (event.endDate) {
    schema.endDate = event.endDate;
  }

  if (event.image) {
    schema.image = event.image;
  }

  return schema;
};

// Person/Faculty Schema Generator
export const generatePersonSchema = (person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Person",
    ...(person.url ? { "@id": `${person.url}#person` } : {}),
    name: person.name,
    jobTitle: person.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  if (person.description) {
    schema.description = normalizeText(person.description);
  }

  if (person.image) {
    schema.image = person.image;
  }

  if (person.url) {
    schema.url = person.url;
  }

  if (person.sameAs && person.sameAs.length > 0) {
    schema.sameAs = person.sameAs;
  }

  return schema;
};

// Video Schema Generator
export const generateVideoSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: normalizeText(video.description),
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
  };

  if (video.duration) {
    schema.duration = video.duration;
  }

  if (video.contentUrl) {
    schema.contentUrl = video.contentUrl;
  }

  if (video.embedUrl) {
    schema.embedUrl = video.embedUrl;
  }

  return schema;
};

// Local Business Schema (if you have physical locations)
export const generateLocalBusinessSchema = (location: {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: location.name,
    url: SITE_URL,
    image: DEFAULT_LOGO_URL,
    parentOrganization: {
      "@id": ORGANIZATION_ID,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.postalCode,
      addressCountry: location.address.country,
    },
  };

  if (location.phone) {
    schema.telephone = location.phone;
  }

  if (location.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    };
  }

  if (location.openingHours) {
    schema.openingHours = location.openingHours;
  }

  return schema;
};

// Helper function to combine multiple schemas
export const combineSchemas = (...schemas: any[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.flat().filter(Boolean),
  };
};
