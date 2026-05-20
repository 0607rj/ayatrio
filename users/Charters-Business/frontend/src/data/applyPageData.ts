import { getCloudinaryUrl } from "@/lib/cloudinary";

// TYPES & INTERFACES

export interface Program {
  id: string;
  name: string;
  level: "undergraduate" | "postgraduate" | "diploma";
  duration: string;
  description?: string;
}

export interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  source: string;
  sourceIcon: string;
  url: string;
  publishedAt: string;
  category?: string;
}

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  amount: string;
  level: "undergraduate" | "postgraduate" | "both";
  applicationDeadline?: string;
}

export interface Counsellor {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  availability: string;
  specialization?: string[];
  languages?: string[];
}

export interface ApplicationStep {
  number: number;
  title: string;
  description: string;
  color: string;
  duration?: string;
}

export interface HeroGalleryItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

export interface ScholarshipBanner {
  text: string;
  highlight: string;
}

// PROGRAMS DATA

export const programs: Program[] = [
  {
    id: "1",
    name: "Bachelor of Business Administration (BBA)",
    level: "undergraduate",
    duration: "3 years",
    description: "Comprehensive business education program",
  },
  {
    id: "2",
    name: "Master of Business Administration (MBA)",
    level: "postgraduate",
    duration: "2 years",
    description: "Advanced business management degree",
  },
  {
    id: "3",
    name: "Bachelor of Commerce (BCom)",
    level: "undergraduate",
    duration: "3 years",
    description: "Commerce and finance focused program",
  },
  {
    id: "4",
    name: "Master in Finance",
    level: "postgraduate",
    duration: "2 years",
    description: "Specialized finance degree",
  },
  {
    id: "5",
    name: "Master in Marketing",
    level: "postgraduate",
    duration: "2 years",
    description: "Marketing and brand management",
  },
  {
    id: "6",
    name: "Master in Data Analytics",
    level: "postgraduate",
    duration: "2 years",
    description: "Business analytics and data science",
  },
  {
    id: "7",
    name: "Diploma in Business Management",
    level: "diploma",
    duration: "1 year",
    description: "Fast-track business essentials",
  },
  {
    id: "8",
    name: "Diploma in Digital Marketing",
    level: "diploma",
    duration: "1 year",
    description: "Digital marketing certification",
  },
];

// COUNTRY CODES DATA

export const countryCodes: CountryCode[] = [
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
];

// NEWS ARTICLES DATA

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title:
      "I don't think entrepreneurship is only for school founder Nathan Barrans",
    excerpt:
      "Global Survey by Tetr College of Business seeks to build the next generation in business education and entrepreneurship",
    image: getCloudinaryUrl("news/forbes", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "Forbes",
    sourceIcon: getCloudinaryUrl("icons/forbes", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://forbes.com/article/tetr-entrepreneurship",
    publishedAt: "2024-01-15",
    category: "Entrepreneurship",
  },
  {
    id: "2",
    title:
      "Tetr is training entrepreneurs across the Globe: The next revolution in Entrepreneurship",
    excerpt:
      "Tetr College of Business is revolutionizing business education with global partnerships and innovative learning methods",
    image: getCloudinaryUrl("news/entrepreneur", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "Entrepreneur",
    sourceIcon: getCloudinaryUrl("icons/entrepreneur", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://entrepreneur.com/article/tetr-global-training",
    publishedAt: "2024-02-20",
    category: "Innovation",
  },
  {
    id: "3",
    title:
      "Global Survey by Tetr College of Business seeks to build cross-border impact",
    excerpt:
      "A comprehensive global survey exploring the future of business education and industry collaboration across continents",
    image: getCloudinaryUrl("news/education", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "Education Times",
    sourceIcon: getCloudinaryUrl("icons/education", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://educationtimes.com/tetr-global-impact",
    publishedAt: "2024-03-10",
    category: "Education",
  },
  {
    id: "4",
    title: "Tetr College launches new scholarship program worth $10M",
    excerpt:
      "New scholarship initiative aims to support talented students from diverse backgrounds worldwide",
    image: getCloudinaryUrl("news/scholarship", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "Gulf News",
    sourceIcon: getCloudinaryUrl("icons/gulf-news", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://gulfnews.com/tetr-scholarship",
    publishedAt: "2024-04-05",
    category: "Scholarships",
  },
  {
    id: "5",
    title: "Industry leaders partner with Tetr for mentorship program",
    excerpt:
      "Top CEOs and founders commit to mentoring next generation of business leaders through exclusive program",
    image: getCloudinaryUrl("news/mentorship", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "Business Insider",
    sourceIcon: getCloudinaryUrl("icons/business-insider", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://businessinsider.com/tetr-mentorship",
    publishedAt: "2024-05-15",
    category: "Partnerships",
  },
  {
    id: "6",
    title: "Tetr graduates secure positions at Fortune 500 companies",
    excerpt:
      "95% placement rate showcases quality of business education and industry readiness of graduates",
    image: getCloudinaryUrl("news/placement", {
      width: 800,
      quality: "auto",
      format: "auto",
    }),
    source: "The Economic Times",
    sourceIcon: getCloudinaryUrl("icons/economic-times", {
      width: 100,
      quality: "auto",
      format: "auto",
    }),
    url: "https://economictimes.com/tetr-placements",
    publishedAt: "2024-06-20",
    category: "Placements",
  },
];

// SCHOLARSHIPS DATA

export const scholarships: Scholarship[] = [
  {
    id: "1",
    title: "The Outliers Scholarship",
    description:
      "Celebrating exceptional talents beyond academics. If you're leading in fields like device, science, robotics, analytics, this scholarship is designed to propel your unique journey forward at Tetr.",
    eligibility: [
      "Recognized in the top 1% in any field",
      "Demonstrated leadership in extracurricular activities",
      "Strong academic performance",
      "Compelling personal statement",
    ],
    amount: "Up to 100% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "2",
    title: "The Community Leaders Scholarship",
    description:
      "For students who have made significant contributions to their communities through volunteer work, social initiatives, and leadership roles.",
    eligibility: [
      "Minimum 100 hours of documented community service",
      "Leadership role in community projects or NGOs",
      "Strong recommendation letters from community leaders",
      "Essay on community impact",
    ],
    amount: "Up to 75% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "3",
    title: "The Entrepreneur & Innovation Scholarship",
    description:
      "Supporting young entrepreneurs and innovators who have demonstrated business acumen, creative problem-solving skills, and startup experience.",
    eligibility: [
      "Started or co-founded a business venture",
      "Demonstrated innovation in product/service development",
      "Strong entrepreneurial mindset and growth potential",
      "Business plan or pitch deck submission",
    ],
    amount: "Up to 80% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "4",
    title: "The SAT Merit Scholarship",
    description:
      "Recognizing academic excellence through standardized test performance and overall academic achievement.",
    eligibility: [
      "SAT score above 1400 or equivalent",
      "Minimum 85% in 12th standard/equivalent",
      "Strong overall academic record",
      "Demonstrated commitment to continuous learning",
    ],
    amount: "Up to 60% tuition coverage",
    level: "undergraduate",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "5",
    title: "The Pathfinders Scholarship",
    description:
      "For students who have overcome significant challenges, demonstrated resilience, and shown exceptional determination in their educational journey.",
    eligibility: [
      "Documented challenges or adversity overcome",
      "Strong personal statement explaining journey",
      "Recommendation from counselor, mentor, or teacher",
      "Academic improvement trajectory",
    ],
    amount: "Up to 70% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "6",
    title: "The Transfer Students Scholarship",
    description:
      "Supporting students transferring from other institutions to continue their education journey at Tetr with seamless transition.",
    eligibility: [
      "Minimum 3.0 GPA from previous institution",
      "Good academic standing with no disciplinary issues",
      "Clear transfer plan and credit evaluation",
      "Statement of purpose for transfer",
    ],
    amount: "Up to 50% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "7",
    title: "The Aspire Grant",
    description:
      "A need-based grant for students with financial constraints who show strong academic potential and commitment to education excellence.",
    eligibility: [
      "Demonstrated financial need with supporting documents",
      "Strong academic potential (min 75% in previous education)",
      "Complete financial aid application",
      "Family income verification",
    ],
    amount: "Variable based on need (Up to 90% coverage)",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
  {
    id: "8",
    title: "The Women in Business Scholarship",
    description:
      "Empowering female students to excel in business leadership and entrepreneurship through dedicated support and mentorship.",
    eligibility: [
      "Female candidates only",
      "Strong leadership potential",
      "Academic excellence (min 80%)",
      "Essay on women in business leadership",
    ],
    amount: "Up to 65% tuition coverage",
    level: "both",
    applicationDeadline: "2026-08-31",
  },
];

// COUNSELLORS DATA

export const counsellors: Counsellor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Admissions Counsellor",
    image: getCloudinaryUrl("counsellors/sarah", {
      width: 400,
      quality: "auto",
      format: "auto",
    }),
    email: "sarah.johnson@chartersbusiness.com",
    phone: "+1 (555) 123-4567",
    availability: "Mon-Fri, 9:00 AM - 6:00 PM EST",
    specialization: ["Undergraduate Programs", "Scholarships"],
    languages: ["English", "Spanish"],
  },
  {
    id: "2",
    name: "Raj Patel",
    role: "Admissions Counsellor",
    image: getCloudinaryUrl("counsellors/raj", {
      width: 400,
      quality: "auto",
      format: "auto",
    }),
    email: "raj.patel@chartersbusiness.com",
    phone: "+91 98765 43210",
    availability: "Mon-Sat, 10:00 AM - 7:00 PM IST",
    specialization: ["MBA Programs", "International Students"],
    languages: ["English", "Hindi", "Gujarati"],
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "International Admissions Counsellor",
    image: getCloudinaryUrl("counsellors/emily", {
      width: 400,
      quality: "auto",
      format: "auto",
    }),
    email: "emily.chen@chartersbusiness.com",
    phone: "+86 138 0000 0000",
    availability: "Mon-Fri, 8:00 AM - 5:00 PM CST",
    specialization: ["Postgraduate Programs", "Asia-Pacific Region"],
    languages: ["English", "Mandarin", "Cantonese"],
  },
];

// APPLICATION STEPS DATA

export const applicationSteps: ApplicationStep[] = [
  {
    number: 1,
    title: "Fill out the Application form",
    description:
      "Complete the online application with your personal details, academic background, and program preferences.",
    color: "bg-pink-500",
    duration: "10-15 minutes",
  },
  {
    number: 2,
    title: "Attempt the Charter Union Trial, an AI-Powered aptitude test",
    description:
      "Take our innovative AI-based assessment that evaluates your analytical thinking, problem-solving, and business acumen.",
    color: "bg-blue-500",
    duration: "45-60 minutes",
  },
  {
    number: 3,
    title: "Interview with an Industry Leader to assess fit",
    description:
      "Engage in a one-on-one conversation with an experienced business leader to discuss your goals and aspirations.",
    color: "bg-purple-500",
    duration: "30-45 minutes",
  },
];

// HERO GALLERY DATA

export const heroGalleryItems: HeroGalleryItem[] = [
  {
    id: "1",
    image: "/images/apply/business-learning.webp",
    alt: "Students learning business concepts in interactive classroom",
    caption: "Learn Business by Doing Business",
  },
  {
    id: "2",
    image: "/images/apply/leadership.webp",
    alt: "Industry leaders sharing insights with students",
    caption: "Learn from CEOs & Founders",
  },
  {
    id: "3",
    image: "/images/apply/institutions.webp",
    alt: "Students studying at top global institutions",
    caption: "Study at Top Institutions",
  },
  {
    id: "4",
    image: "/images/apply/startup.webp",
    alt: "Winners celebrating business competition success",
    caption: "Winners In Action - From Idea to Launch",
  },
  {
    id: "5",
    image: "/images/apply/reality.webp",
    alt: "Students experiencing real business scenarios",
    caption: "Turn Ideas Into Reality With Real Simulated",
  },
  {
    id: "6",
    image: "/images/apply/world-school.webp",
    alt: "Diverse students collaborating across cultures",
    caption: "Immerse Yourself in Cultures Worldwide and Live Your Life",
  },
];

// SCHOLARSHIP BANNER DATA

export const scholarshipBanner: ScholarshipBanner = {
  text: "Charter Union scholarships cover up to",
  highlight: "100% of the tuition fees",
};

// PAGE CONTENT DATA

export const pageContent = {
  hero: {
    title: "Join Charter Union Where The",
    titleItalic: "World Is Your Classroom",
  },
  applicationSection: {
    title: "Apply for our",
    subtitle: "September 2026 batch.",
    subtitleItalic: "Get Started",
    processHeading: "A simple 3-step admission process",
  },
  newsSection: {
    title: "Tetr in the",
    titleItalic: "News",
    viewMoreText: "VIEW MORE",
  },
  scholarshipsSection: {
    title: "Scholarships",
    description:
      "At Tetr, we believe financial barriers should never stand in the way of exceptional education. We offer a merit-based scholarships that recognizes your achievements, ensuring your ambitions are fully realized without the burden of financial constraints.",
    badgeText: "UNDERGRADUATE",
  },
  successPage: {
    title: "Congratulations!",
    subtitle: "Your Application Has Been Successfully Submitted",
    description:
      "Thank you for applying to Charters Business Tetr Program. We're excited to review your application!",
    nextStepsTitle: "What Happens Next?",
    nextSteps: [
      "You'll receive a confirmation email within 24 hours with your application details.",
      "Our admissions team will review your application within 3-5 business days.",
      "You'll be invited to attempt the Tetr Trial (AI-Powered aptitude test).",
      "Successful candidates will be contacted for an interview with an Industry Leader.",
    ],
  },
};

// HELPER FUNCTIONS

// Get program names for dropdown
export const getProgramNames = (): string[] => {
  return programs.map((p) => p.name);
};

// Get programs by level
export const getProgramsByLevel = (level: Program["level"]): Program[] => {
  return programs.filter((p) => p.level === level);
};

// Get primary counsellor (always consistent)
export const getPrimaryCounsellor = (): Counsellor => {
  return counsellors[0];
};

// Get all counsellors
export const getAllCounsellors = (): Counsellor[] => {
  return counsellors;
};

// Get counsellor by ID
export const getCounsellorById = (id: string): Counsellor | undefined => {
  return counsellors.find((c) => c.id === id);
};

// Get counsellor by specialization
export const getCounsellorBySpecialization = (
  specialization: string,
): Counsellor => {
  return (
    counsellors.find((c) => c.specialization?.includes(specialization)) ||
    counsellors[0]
  );
};

// Get scholarships by level
export const getScholarshipsByLevel = (
  level: "undergraduate" | "postgraduate" | "both",
): Scholarship[] => {
  return scholarships.filter((s) => s.level === level || s.level === "both");
};

// Get recent news
export const getRecentNews = (count: number = 3): NewsArticle[] => {
  return newsArticles.slice(0, count);
};

// Get default country code
export const getDefaultCountryCode = (): CountryCode => {
  return countryCodes.find((c) => c.code === "+91") || countryCodes[0];
};
