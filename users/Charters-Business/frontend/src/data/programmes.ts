import { getCloudinaryUrl } from "@/lib/cloudinary";

export type ProgramKey =
  | "digital-growth-engineer"
  | "post-graduate-diploma-in-management"
  | "product-growth-engineering"
  | "diploma-in-business-administration";
// BASE INTERFACES

export interface ProgrammeStat {
  value: string;
  label: string;
}

// DROPDOWN DATA

export interface DropdownData {
  title: string;
  description: string;
  duration: string;
  stats: ProgrammeStat[];
  link: string;
  imageUrl: string;
}

// CARD DATA (Our Programmes Section)

export interface ProgrammeCardData {
  image: string;
  hasVideo: boolean;
  rating: {
    score: number;
    reviews: number;
  };
  title: string;

  level: string;
  certificateType: string;
  description: string;
  format: {
    type: string;
  };
  eligibility: {
    type: string;
  };
  duration: {
    type: string;
  };
  deadline: {
    type: string;
  };
  careerOutcomes: string[];
  jobOpenings: string;
}

// HERO DATA

export interface HeroData {
  badge: string;
  categoryLabel: string;
  title: {
    main: string;
    highlight: string;
    suffix: string;
  };
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  alumniCompanies: {
    name: string;
    logo: string;
  }[];
  instructors: {
    badge: string;
    title: string;
  };
  heroImage: string;
  floatingCards: {
    topRight: {
      badge: string;
      students: string;
      rating: number;
    };
    bottomLeft: {
      label: string;
      percentage: string;
      subLabel: string;
      ctcIncrease: string;
    };
  };
}

// PROGRAM INFO DATA

export interface ProgramInfoData {
  duration: string;
  details: {
    label: string;
    value: string;
    dotColor: string;
  }[];
}

// TRACK RECORD DATA

export interface TrackRecordData {
  stats: {
    value: string;
    unit: string;
    label: string;
  }[];
  experienceData: {
    label: string;
    value: number;
    percentage: string;
  }[];
  backgroundData: {
    label: string;
    value: number;
    percentage: string;
  }[];
  impactCards: {
    title: string;
    description: string;
  }[];
  companyLogos: {
    name: string;
    logo: string;
  }[];
}

// AI DEGREE PROGRAM DATA

export interface DegreeProgramData {
  badge: string;
  title: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  accordions: {
    id: string;
    title: string;
    items: string[];
  }[];
  academicPartners: {
    name: string;
    logo?: string;
    description?: string;
  }[];
  immersions: {
    name: string;
  }[];
  campusImage: {
    src: string;
    alt: string;
  };
}

// CURRICULUM DATA

export interface CurriculumCategory {
  id: string;
  label: string;
  title: string;
}

export interface CourseSet {
  term: string;
  location: string;
  courses: {
    code: string;
    title: string;
  }[];
}

export interface CurriculumData {
  categories: CurriculumCategory[];
  courseData: Record<string, CourseSet[]>;
}

// LEARN APPLY REFLECT DATA

export interface LearnApplyData {
  categories: CurriculumCategory[];
  courseData: Record<string, CourseSet[]>;
}

// SCHOLARSHIPS DATA

export interface ScholarshipData {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  image: string;
  alt: string;
}

// FAQ DATA

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQItem[];
}

export interface FAQData {
  categories: FAQCategory[];
}

// MAIN PROGRAMME INTERFACE

export interface Programme {
  id: string;
  slug: ProgramKey;
  dropdown: DropdownData;
  card: ProgrammeCardData;
  hero: HeroData;
  programInfo: ProgramInfoData;
  trackRecord: TrackRecordData;
  degreeProgram: DegreeProgramData;
  curriculum: CurriculumData;
  learnApply: LearnApplyData;
  scholarships: ScholarshipData[];
  faq: FAQData;
  students?: any;
  learningOutcomes?: any;
  weekAtUnion?: any;
  pricing?: any;
  faculty?: any;
  curriculumSection?: any;
  
}

// PROGRAMMES DATA - MBA

export const programmes: Programme[] = [
  {
    id: "1",
    slug: "digital-growth-engineer",
    // Dropdown Data
    dropdown: {
      title: "DIGITAL GROWTH ENGINEER",
      description:
        "Comprehensive MBA program designed for future business leaders Comprehensive MBA program designed for. Combines theoretical knowledge with practical application through real-world case studies and industry partnerships.",
      duration: "2 Years Full-time",
      stats: [
        { value: "24", label: "MONTHS" },
        { value: "150+", label: "COMPANIES" },
        { value: "95%", label: "PLACEMENT RATE" },
      ],
      link: "/digital-growth-engineer",      
      imageUrl: "/images/programmes/mba.jpg",
    },

    // Card Data
    card: {
      image: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081780/bytdizxcq2cy5hzcb1xv_qpykcw.avif",
      hasVideo: false,
      rating: { score: 4.8, reviews: 495 / 500 },
      title: "DIGITAL GROWTH ENGINEER",

      level: "Postgraduate",
      certificateType: "Corporate Certificate",
      description:
        "Gain real-world corporate accounting through Harvard/Columbia case study, IIMK, US-CMA&CPA/CFA/ACCA integrated AI-led curriculum under top 1% industry faculty.",
      format: { type: "On Campus" },
      eligibility: { type: "12 Pass-out & Early under graduates." },
      duration: { type: "3 Months theory + 4 Months in-class intranship" },
      deadline: { type: "Round 1: 30th Oct '25" },
      careerOutcomes: [
        "Foundations in Industry-led learning base on Hardvard casestudy with US-CMA/CPA, Indian CA and ACCA specialisation carruculam.",
        "In-class live projects intranship under faculty with top Startup & MNC from India, USA, CANADA, SAUDI, QATAR and Singapore.",
        "AI-powered corporate accountant, finance, FP&A, fintech & GCC-ready roles.",
        "Personal devlopment prep with communication, bodylangusge and placement cell.",
        "Applying class carruiculam with small amd medium busness at real-world ",
      ],
      jobOpenings: "2.12 Cr",
    },
    // Hero Data
    hero: {
      badge: "",
      categoryLabel: "BUSINESS ADMINISTRATION",
      title: {
        main: "MASTER OF ",
        highlight: "BUSINESS",
        suffix: "ADMINISTRATION",
      },
      description:
        "Transform your career with India's most comprehensive MBA program featuring Comprehensive MBA program designed for real-world case studies, industry mentorship, and global business perspectives.",
      stats: [
        { label: "95% Avg Placement", value: "95%" },
        { label: "Industry Projects", value: "150+" },
        { label: "Expert Mentorship", value: "1:1" },
        { label: "Hiring Partners", value: "300+" },
      ],
      alumniCompanies: [
        { name: "Google", logo: "/images/companies/google.png" },
        { name: "Amazon", logo: "/images/companies/amazon.png" },
        { name: "Deloitte", logo: "/images/companies/deloitte.png" },
      ],
      instructors: {
        badge: "India's top 1%",
        title: "MBA Faculty & Industry Leaders",
      },
      heroImage:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400",
      floatingCards: {
        topRight: {
          badge: "Live Classes",
          students: "2,500+",
          rating: 4.8,
        },
        bottomLeft: {
          label: "Placement Rate",
          percentage: "95%",
          subLabel: "Average Salary",
          ctcIncrease: "↗ 3.05x Salary Jump",
        },
      },
    },

    // Program Info
    programInfo: {
      duration: "2 Years",
      details: [
        { label: "LOCATION", value: "5 Countries", dotColor: "bg-cyan-500" },
        {
          label: "ELIGIBILITY",
          value: "Bachelor's Degree",
          dotColor: "bg-pink-500",
        },
        { label: "FORMAT", value: "Full Time", dotColor: "bg-yellow-500" },
        { label: "START DATE", value: "Sept 2026", dotColor: "bg-green-500" },
      ],
    },

    // Track Record
    trackRecord: {
      stats: [
        { value: "26.5", unit: "LPA", label: "Average CTC" },
        { value: "3.05", unit: "x", label: "Average CTC Jump" },
        { value: "16-42", unit: "LPA", label: "CTC Salary Range" },
        { value: "95", unit: "%", label: "Students Placed" },
        { value: "95", unit: "%", label: "Students Placed" },
      ],
      experienceData: [
        { label: "QATAR", value: 9, percentage: "5%" },
        { label: "INDIA", value: 47, percentage: "67%" },
        { label: "DUBAI", value: 18, percentage: "13%" },
        { label: "SAUDI", value: 10, percentage: "10%" },
        { label: "SINGAPOR", value: 7, percentage: "3%" },
        { label: "CANADA", value: 5, percentage: "2%" },
      ],
      backgroundData: [
        { label: "CONSULTANCY", value: 26, percentage: "46%" },
        { label: "ACCOUNTANTCY", value: 10, percentage: "37%" },
        { label: "MARKETING", value: 8, percentage: "25%" },
        { label: "ENTREPRENEURS", value: 5, percentage: "18%" },
        { label: "FINANCE", value: 3, percentage: "17%" },
        { label: "PRODUCT", value: 1, percentage: "13%" },
      ],
      impactCards: [
        {
          title: "Unlock high-impact roles with significant growth potential",
          description:
            "Business Manager, Strategy Consultant, Operations Director. These roles are designed for fast-tracked career growth in leading organizations.",
        },
        {
          title: "Build leadership skills through real-world experience",
          description:
            "Gain hands-on experience with live projects, case studies, and industry partnerships that prepare you for C-suite positions.",
        },
        {
          title: "Network with industry leaders and successful alumni",
          description:
            "Connect with top executives, entrepreneurs, and alumni working at Fortune 500 companies and leading startups.",
        },
      ],
      companyLogos: [
        { name: "Google", logo: "https://logo.clearbit.com/google.com" },
        { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
        { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com" },
        { name: "McKinsey", logo: "https://logo.clearbit.com/mckinsey.com" },
        {
          name: "Goldman Sachs",
          logo: "https://logo.clearbit.com/goldmansachs.com",
        },
        { name: "BCG", logo: "https://logo.clearbit.com/bcg.com" },
        { name: "Bain", logo: "https://logo.clearbit.com/bain.com" },
        { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
        { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
        { name: "JP Morgan", logo: "https://logo.clearbit.com/jpmorgan.com" },
        { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com" },
        { name: "EY", logo: "https://logo.clearbit.com/ey.com" },
        { name: "PwC", logo: "https://logo.clearbit.com/pwc.com" },
        { name: "KPMG", logo: "https://logo.clearbit.com/kpmg.com" },
        { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com" },
        { name: "Paytm", logo: "https://logo.clearbit.com/paytm.com" },
      ],
    },

    // Degree Program
    degreeProgram: {
      badge: "DEGREE & ACCREDITATION",
      title: {
        prefix: "Graduate with a prestigious",
        highlight: "Master of Business Administration",
        suffix: "from Charter's Business College",
      },
      accordions: [
        {
          id: "placement",
          title: "Outstanding Placement Record and Career Support",
          items: [
            "**95% placement** rate with top companies across consulting, finance, and technology sectors",
            "**3.05x average salary** jump post-MBA with CTC ranging from 16-42 LPA",
            "Alumni at **Google, Amazon, Deloitte, McKinsey, Goldman Sachs** in leadership positions",
            "**300+ recruiting partners** including Fortune 500 companies and unicorn startups",
            "Dedicated **career services team** with resume workshops, mock interviews, and 1:1 coaching",
          ],
        },
        {
          id: "curriculum",
          title: "World-Class Curriculum and Learning Experience",
          items: [
            "**150+ live projects** with real companies providing hands-on business experience",
            "**200+ case studies** from Harvard, INSEAD, and Stanford covering global business scenarios",
            "**Industry-designed curriculum** updated annually based on market trends and employer feedback",
            "Learn from **top 1% faculty** - professors with PhDs from IIMs/ISB and industry veterans from McKinsey, Google",
            "**Specializations available** in Finance, Marketing, Strategy, Operations, Entrepreneurship, Analytics",
          ],
        },
        {
          id: "global",
          title: "Global Exposure and International Immersions",
          items: [
            "**International immersion** in Singapore, Dubai, or Europe during final year",
            "Visit **global business schools** and Fortune 500 headquarters for cross-cultural learning",
            "**Exchange programs** with partner universities in 5+ countries",
            "Global case competitions and **international conferences** exposure",
            "Build **worldwide network** with students and alumni across continents",
          ],
        },
        {
          id: "accreditation",
          title: "Prestigious Accreditation and Recognition",
          items: [
            "**UGC approved** and **AICTE recognized** MBA degree from Charter's Business College",
            "**AACSB accreditation** - top 5% business schools globally hold this credential",
            "**NIRF ranked** among India's leading business schools",
            "Degree **globally recognized** and accepted for higher education and employment worldwide",
            "**Industry partnerships** with 50+ multinational corporations for curriculum and placements",
          ],
        },
        {
          id: "facilities",
          title: "State-of-the-Art Campus and Learning Facilities",
          items: [
            "**Smart classrooms** with latest teaching technology and hybrid learning capabilities",
            "**Bloomberg terminals** and financial databases for real-time market analysis",
            "**Business incubation center** for aspiring entrepreneurs with seed funding opportunities",
            "**World-class library** with 50,000+ business books, journals, and digital resources",
            "**Industry-grade software** access - Tableau, SPSS, SAP, Salesforce, and more",
          ],
        },
      ],
      academicPartners: [
        {
          name: "Charter's Business College",
          description: "UGC Approved & AICTE Recognized",
        },
        {
          name: "Harvard Business School",
          description: "Case Study Partnership",
        },
      ],
      immersions: [{ name: "Singapore Business Immersion" }],
      campusImage: {
        src: "/images/programmes/indus.webp",
        alt: "Charter's Business College - Modern Campus with State-of-the-Art Facilities",
      },
    },
    // Curriculum
    curriculum: {
      categories: [
        { id: "core", label: "CORE", title: "Core Business Courses" },
        { id: "elective", label: "ELECT", title: "Elective Specializations" },
      ],
      courseData: {
        core: [
          {
            term: "TERM 1",
            location: "India",
            courses: [
              { code: "MBA 101", title: "Strategic Management" },
              { code: "MBA 102", title: "Financial Accounting" },
              { code: "MBA 103", title: "Marketing Management" },
            ],
          },
        ],
        elective: [
          {
            term: "TERM 3",
            location: "Singapore",
            courses: [
              { code: "MBA 301", title: "Digital Marketing Strategy" },
              { code: "MBA 302", title: "Investment Banking" },
            ],
          },
        ],
      },
    },

    // Learn Apply Reflect - Full Content
    learnApply: {
      categories: [
        { id: "strategy", label: "STRAT", title: "Strategy & Leadership" },
        { id: "finance", label: "FIN", title: "Finance & Analytics" },
        { id: "marketing", label: "MKT", title: "Marketing & Sales" },
        { id: "operations", label: "OPS", title: "Operations & Supply Chain" },
        {
          id: "entrepreneur",
          label: "ENT",
          title: "Entrepreneurship & Innovation",
        },
        { id: "tech", label: "TECH", title: "Technology & Digital Business" },
      ],
      courseData: {
        strategy: [
          {
            term: "TERM 1",
            location: "Mumbai",
            courses: [
              {
                code: "STRAT 101",
                title: "How to build a comprehensive business strategy",
              },
              {
                code: "STRAT 102",
                title: "How to lead high-performing teams effectively",
              },
              {
                code: "STRAT 103",
                title: "How to analyze competitive landscapes",
              },
              {
                code: "STRAT 104",
                title: "How to create sustainable competitive advantages",
              },
              {
                code: "STRAT 105",
                title: "How to drive organizational change",
              },
            ],
          },
          {
            term: "TERM 2",
            location: "Delhi",
            courses: [
              {
                code: "STRAT 201",
                title: "How to make strategic decisions under uncertainty",
              },
              {
                code: "STRAT 202",
                title: "How to manage corporate portfolios",
              },
              {
                code: "STRAT 203",
                title: "How to build strategic alliances and partnerships",
              },
              {
                code: "STRAT 204",
                title: "How to lead digital transformation initiatives",
              },
              {
                code: "STRAT 205",
                title: "How to develop growth strategies for emerging markets",
              },
            ],
          },
          {
            term: "TERM 3",
            location: "Bangalore",
            courses: [
              {
                code: "STRAT 301",
                title: "How to manage mergers and acquisitions",
              },
              {
                code: "STRAT 302",
                title: "How to create blue ocean strategies",
              },
              {
                code: "STRAT 303",
                title: "How to implement strategic initiatives",
              },
              {
                code: "STRAT 304",
                title: "How to build resilient organizations",
              },
              {
                code: "STRAT 305",
                title: "How to develop crisis management frameworks",
              },
            ],
          },
        ],
        finance: [
          {
            term: "TERM 1",
            location: "Mumbai",
            courses: [
              {
                code: "FIN 101",
                title: "How to analyze financial statements comprehensively",
              },
              {
                code: "FIN 102",
                title: "How to value companies using DCF models",
              },
              {
                code: "FIN 103",
                title: "How to build financial forecasting models",
              },
              {
                code: "FIN 104",
                title: "How to manage working capital efficiently",
              },
              {
                code: "FIN 105",
                title: "How to understand corporate finance fundamentals",
              },
            ],
          },
          {
            term: "TERM 2",
            location: "Delhi",
            courses: [
              {
                code: "FIN 201",
                title: "How to structure investment portfolios",
              },
              {
                code: "FIN 202",
                title: "How to assess and manage financial risks",
              },
              {
                code: "FIN 203",
                title: "How to analyze mergers and acquisitions deals",
              },
              { code: "FIN 204", title: "How to raise capital for businesses" },
              {
                code: "FIN 205",
                title: "How to conduct due diligence for investments",
              },
            ],
          },
          {
            term: "TERM 3",
            location: "Singapore",
            courses: [
              {
                code: "FIN 301",
                title: "How to structure private equity deals",
              },
              { code: "FIN 302", title: "How to manage hedge fund strategies" },
              {
                code: "FIN 303",
                title: "How to analyze derivatives and options",
              },
              {
                code: "FIN 304",
                title: "How to implement treasury management systems",
              },
              { code: "FIN 305", title: "How to prepare companies for IPOs" },
            ],
          },
        ],
        marketing: [
          {
            term: "TERM 1",
            location: "Mumbai",
            courses: [
              {
                code: "MKT 101",
                title: "How to build compelling brand narratives",
              },
              {
                code: "MKT 102",
                title: "How to design customer acquisition funnels",
              },
              {
                code: "MKT 103",
                title: "How to conduct market research effectively",
              },
              {
                code: "MKT 104",
                title: "How to develop product positioning strategies",
              },
              {
                code: "MKT 105",
                title: "How to create integrated marketing campaigns",
              },
            ],
          },
          {
            term: "TERM 2",
            location: "Bangalore",
            courses: [
              {
                code: "MKT 201",
                title: "How to master digital marketing channels",
              },
              {
                code: "MKT 202",
                title: "How to optimize conversion rates systematically",
              },
              {
                code: "MKT 203",
                title: "How to build social media strategies that work",
              },
              {
                code: "MKT 204",
                title: "How to create viral content campaigns",
              },
              {
                code: "MKT 205",
                title: "How to implement marketing automation tools",
              },
            ],
          },
          {
            term: "TERM 3",
            location: "Dubai",
            courses: [
              {
                code: "MKT 301",
                title: "How to expand into international markets",
              },
              {
                code: "MKT 302",
                title: "How to build influencer partnerships",
              },
              {
                code: "MKT 303",
                title: "How to create omnichannel customer experiences",
              },
              {
                code: "MKT 304",
                title: "How to measure and optimize marketing ROI",
              },
              {
                code: "MKT 305",
                title: "How to manage brand portfolios effectively",
              },
            ],
          },
        ],
        operations: [
          {
            term: "TERM 1",
            location: "Mumbai",
            courses: [
              {
                code: "OPS 101",
                title: "How to build efficient supply chains",
              },
              {
                code: "OPS 102",
                title: "How to optimize production processes",
              },
              {
                code: "OPS 103",
                title: "How to implement lean manufacturing principles",
              },
              { code: "OPS 104", title: "How to manage inventory effectively" },
              { code: "OPS 105", title: "How to design service operations" },
            ],
          },
          {
            term: "TERM 2",
            location: "Delhi",
            courses: [
              {
                code: "OPS 201",
                title: "How to implement Six Sigma methodologies",
              },
              {
                code: "OPS 202",
                title: "How to manage global supply chain networks",
              },
              {
                code: "OPS 203",
                title: "How to optimize logistics and distribution",
              },
              {
                code: "OPS 204",
                title: "How to implement quality management systems",
              },
              {
                code: "OPS 205",
                title: "How to manage supplier relationships",
              },
            ],
          },
          {
            term: "TERM 3",
            location: "Singapore",
            courses: [
              {
                code: "OPS 301",
                title: "How to build resilient supply chains",
              },
              {
                code: "OPS 302",
                title: "How to implement Industry 4.0 technologies",
              },
              { code: "OPS 303", title: "How to manage project portfolios" },
              {
                code: "OPS 304",
                title: "How to optimize warehouse operations",
              },
              {
                code: "OPS 305",
                title: "How to implement sustainable operations",
              },
            ],
          },
        ],
        entrepreneur: [
          {
            term: "TERM 1",
            location: "Bangalore",
            courses: [
              {
                code: "ENT 101",
                title: "How to identify and validate business ideas",
              },
              {
                code: "ENT 102",
                title: "How to create minimum viable products",
              },
              { code: "ENT 103", title: "How to write winning business plans" },
              {
                code: "ENT 104",
                title: "How to pitch to investors effectively",
              },
              { code: "ENT 105", title: "How to build founding teams" },
            ],
          },
          {
            term: "TERM 2",
            location: "Mumbai",
            courses: [
              {
                code: "ENT 201",
                title: "How to raise seed and Series A funding",
              },
              { code: "ENT 202", title: "How to achieve product-market fit" },
              { code: "ENT 203", title: "How to scale startups rapidly" },
              {
                code: "ENT 204",
                title: "How to build startup culture and values",
              },
              { code: "ENT 205", title: "How to manage startup finances" },
            ],
          },
          {
            term: "TERM 3",
            location: "Silicon Valley",
            courses: [
              {
                code: "ENT 301",
                title: "How to navigate exits and acquisitions",
              },
              {
                code: "ENT 302",
                title: "How to build venture-backable businesses",
              },
              { code: "ENT 303", title: "How to create innovation frameworks" },
              {
                code: "ENT 304",
                title: "How to manage high-growth organizations",
              },
              {
                code: "ENT 305",
                title: "How to build sustainable competitive advantages",
              },
            ],
          },
        ],
        tech: [
          {
            term: "TERM 1",
            location: "Bangalore",
            courses: [
              {
                code: "TECH 101",
                title: "How to understand technology trends",
              },
              {
                code: "TECH 102",
                title: "How to build digital business models",
              },
              {
                code: "TECH 103",
                title: "How to implement cloud computing solutions",
              },
              {
                code: "TECH 104",
                title: "How to leverage artificial intelligence",
              },
              { code: "TECH 105", title: "How to design user experiences" },
            ],
          },
          {
            term: "TERM 2",
            location: "Mumbai",
            courses: [
              {
                code: "TECH 201",
                title: "How to build data analytics capabilities",
              },
              {
                code: "TECH 202",
                title: "How to implement blockchain solutions",
              },
              { code: "TECH 203", title: "How to manage cybersecurity risks" },
              {
                code: "TECH 204",
                title: "How to develop mobile-first strategies",
              },
              {
                code: "TECH 205",
                title: "How to implement agile methodologies",
              },
            ],
          },
          {
            term: "TERM 3",
            location: "Singapore",
            courses: [
              { code: "TECH 301", title: "How to build IoT ecosystems" },
              {
                code: "TECH 302",
                title: "How to implement machine learning models",
              },
              { code: "TECH 303", title: "How to manage API economies" },
              {
                code: "TECH 304",
                title: "How to scale technical infrastructure",
              },
              { code: "TECH 305", title: "How to build platform businesses" },
            ],
          },
        ],
      },
    },

    // Scholarships
    scholarships: [
      {
        id: "outliers",
        title: "The Outliers Scholarship",
        description:
          "Celebrating exceptional talents beyond academics. If you're leading in fields like dance, space science, or robotics, this scholarship is designed to propel your unique journey forward.",
        eligibility: "Recognized in the top 1% in any field.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        alt: "Confident young professional in modern office setting",
      },
      {
        id: "community",
        title: "The Community Leaders Scholarship",
        description:
          "For those who have made significant impact in their communities through leadership, volunteer work, or social initiatives.",
        eligibility: "Demonstrated community leadership and impact.",
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
        alt: "Community leaders working together",
      },
      {
        id: "entrepreneur",
        title: "The Entrepreneur & Innovation Scholarship",
        description:
          "Supporting young entrepreneurs and innovators who have started their own ventures or created innovative solutions.",
        eligibility: "Founded a startup or created innovative projects.",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
        alt: "Young entrepreneur working on startup",
      },
      {
        id: "merit",
        title: "The Merit Scholarship",
        description:
          "Academic excellence scholarship for students with outstanding academic achievements and test scores.",
        eligibility: "High academic scores and strong record.",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        alt: "Student studying with books",
      },
      {
        id: "pathfinders",
        title: "The Pathfinders Scholarship",
        description:
          "For students who have overcome significant challenges and demonstrated resilience in their educational journey.",
        eligibility: "Demonstrated resilience and overcoming challenges.",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        alt: "Determined student overcoming challenges",
      },
      {
        id: "transfer",
        title: "The Transfer Students Scholarship",
        description:
          "Supporting students transitioning from other institutions who show exceptional promise and dedication.",
        eligibility: "Transfer students with strong performance.",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        alt: "Transfer students collaborating",
      },
    ],

    // FAQ
    faq: {
      categories: [
        {
          id: "program",
          name: "Program",
          faqs: [
            {
              id: "what-is-mba",
              question: "What is the MBA program about?",
              answer:
                "Our MBA program is a comprehensive 2-year full-time course designed to develop business leaders through rigorous academics, practical experience, and industry exposure. The curriculum covers core business disciplines including finance, marketing, operations, strategy, and leadership. Students engage in real-world case studies, live projects, and internships with leading companies.",
            },
            {
              id: "who-is-eligible",
              question: "Who is eligible for the MBA program?",
              answer:
                "Candidates must have a Bachelor's degree with minimum 50% marks from a recognized university. Work experience is preferred but not mandatory. We welcome candidates from diverse backgrounds including engineering, commerce, arts, and sciences. Prior business knowledge is helpful but not required as we provide foundational courses.",
            },
            {
              id: "can-join-as-fresher",
              question: "Can I join as a fresher without work experience?",
              answer:
                "Yes, freshers can join the MBA program! We have specific tracks designed for recent graduates. Our curriculum includes foundational business courses, soft skills development, and extensive internship opportunities to help you build practical experience and transition smoothly into corporate roles.",
            },
            {
              id: "when-are-classes",
              question: "When are the live classes held?",
              answer:
                "Classes are conducted from Monday to Friday, typically between 9 AM to 5 PM. The schedule is designed as a full-time residential program with a mix of lectures, case discussions, group projects, and workshops. Weekend activities include guest lectures, industrial visits, and networking events with alumni and industry leaders.",
            },
            {
              id: "what-if-miss-lecture",
              question: "What if I miss a lecture?",
              answer:
                "If you miss a live lecture due to genuine reasons, recordings are available on our learning management system. However, since our program emphasizes interactive learning through case discussions and group activities, regular attendance is strongly recommended. Our faculty and teaching assistants are available for doubt clarification during office hours.",
            },
            {
              id: "program-duration",
              question: "What is the program duration?",
              answer:
                "The MBA program is a 2-year full-time course divided into 6 terms. Each term is approximately 3-4 months long with breaks between terms. The program includes classroom learning, summer internships, live projects, and an international immersion experience in the final year.",
            },
            {
              id: "does-give-certificates",
              question: "Does the program provide certification?",
              answer:
                "Yes, upon successful completion of the program, you will receive a Master of Business Administration (MBA) degree from Charter's Business College. This degree is recognized globally and demonstrates your proficiency in business management, strategic thinking, and leadership skills.",
            },
            {
              id: "is-certification-worth-it",
              question: "Is the MBA degree worth it?",
              answer:
                "Absolutely! Our MBA program has a proven track record with 95% placement rate and an average salary jump of 3.05x. Graduates work at top companies like Google, Amazon, Deloitte, and McKinsey. The degree, combined with practical skills, industry exposure, and strong alumni network, significantly enhances your career prospects and opens doors to leadership positions.",
            },
          ],
        },
        {
          id: "curriculum",
          name: "Curriculum",
          faqs: [
            {
              id: "curriculum-structure",
              question: "How is the curriculum structured?",
              answer:
                "The MBA curriculum is divided into three main components: Core Courses (60%), Elective Specializations (25%), and Practical Learning (15%). Core courses cover fundamental business subjects like finance, marketing, operations, and strategy. Electives allow you to specialize in areas like Digital Marketing, Investment Banking, or Entrepreneurship. Practical learning includes case studies, simulations, live projects, and internships.",
            },
            {
              id: "specializations",
              question: "What specializations are available?",
              answer:
                "We offer multiple specializations including Marketing, Finance, Operations, Human Resources, Strategy & Consulting, Entrepreneurship, Digital Business, and Business Analytics. Students can choose dual specializations to enhance their skill set and career options.",
            },
            {
              id: "curriculum-updates",
              question: "How often is the curriculum updated?",
              answer:
                "Our curriculum is reviewed and updated annually based on industry trends, feedback from corporate partners, and emerging business practices. We regularly invite industry experts to co-design courses and ensure our students learn the most relevant and current business concepts and tools.",
            },
            {
              id: "international-exposure",
              question: "Is there international exposure?",
              answer:
                "Yes! The program includes an international immersion experience where students visit a global business school and leading companies abroad. Past immersions have been to institutions in Singapore, Dubai, and Europe. This provides exposure to global business practices and cross-cultural management.",
            },
            {
              id: "case-studies",
              question: "How many case studies will we analyze?",
              answer:
                "Throughout the 2-year program, students analyze over 200 case studies from Harvard Business School, INSEAD, and other top institutions. These cases cover real business scenarios from companies like Amazon, Netflix, Tesla, and Indian conglomerates, helping develop analytical and decision-making skills.",
            },
          ],
        },
        {
          id: "teaching",
          name: "Teaching",
          faqs: [
            {
              id: "teaching-methodology",
              question: "What is the teaching methodology?",
              answer:
                "We use a blend of teaching methodologies including interactive lectures, case method discussions, simulations, role plays, group projects, and experiential learning. The focus is on practical application rather than rote learning. Classes are discussion-based with active student participation, encouraging critical thinking and problem-solving.",
            },
            {
              id: "instructor-quality",
              question: "What is the quality of instructors?",
              answer:
                "Our faculty comprises experienced academics with PhDs from top institutions and industry practitioners from leading companies. Many professors have worked at Google, McKinsey, Goldman Sachs, and other Fortune 500 companies. They bring both theoretical knowledge and real-world business insights to the classroom.",
            },
            {
              id: "guest-lectures",
              question: "Are there guest lectures?",
              answer:
                "Yes, we regularly host guest lectures by CEOs, entrepreneurs, industry leaders, and alumni. Past speakers include founders of unicorn startups, senior executives from Google and Amazon, and successful entrepreneurs. These sessions provide invaluable insights into industry trends and career paths.",
            },
            {
              id: "class-size",
              question: "What is the class size?",
              answer:
                "Each MBA batch has approximately 60-80 students, ensuring personalized attention and meaningful peer interaction. Classes are conducted in sections of 30-40 students for core courses and smaller groups for electives and workshops.",
            },
          ],
        },
        {
          id: "mentors",
          name: "Mentors",
          faqs: [
            {
              id: "mentor-allocation",
              question: "How are mentors allocated?",
              answer:
                "Each student is assigned a faculty mentor and an industry mentor within the first month. Faculty mentors guide academic progress and career planning, while industry mentors provide real-world insights and networking opportunities. Mentors are allocated based on student interests and career goals.",
            },
            {
              id: "mentor-sessions",
              question: "How frequent are mentor sessions?",
              answer:
                "Regular one-on-one mentor sessions are conducted bi-weekly throughout the program. Additional sessions are available as needed for career guidance, project discussions, and personal development. Mentors also help with resume building, interview preparation, and job search strategies.",
            },
            {
              id: "industry-mentors",
              question: "Who are the industry mentors?",
              answer:
                "Our industry mentors include senior executives from top companies, successful entrepreneurs, and accomplished alumni. They provide guidance on career transitions, industry insights, networking strategies, and help students navigate the corporate world.",
            },
          ],
        },
        {
          id: "internships",
          name: "Internships",
          faqs: [
            {
              id: "internship-opportunities",
              question: "Are internship opportunities provided?",
              answer:
                "Yes, summer internships are a mandatory part of the MBA program. Students complete 8-10 week internships between first and second year with leading companies. Our placement cell facilitates internships with over 150 partner companies across industries including consulting, finance, technology, FMCG, and startups.",
            },
            {
              id: "internship-stipend",
              question: "Do internships offer stipends?",
              answer:
                "Yes, most summer internships offer stipends ranging from ₹30,000 to ₹1,00,000 per month depending on the company and role. Top consulting and finance firms offer higher stipends. Many internships convert to Pre-Placement Offers (PPOs) based on performance.",
            },
            {
              id: "international-internships",
              question: "Can I do international internships?",
              answer:
                "Yes, students can apply for international internships with our global partner companies. We have partnerships with firms in Singapore, Dubai, UK, and USA. However, international internships are competitive and require strong academic performance and relevant skills.",
            },
          ],
        },
        {
          id: "placement",
          name: "Placement Support",
          faqs: [
            {
              id: "placement-assistance",
              question: "What kind of placement assistance is provided?",
              answer:
                "We provide comprehensive placement support including resume workshops, mock interviews, group discussions, case interview preparation, and soft skills training. Our placement cell maintains relationships with 300+ recruiting companies and facilitates on-campus interviews, pre-placement talks, and networking sessions throughout the year.",
            },
            {
              id: "placement-record",
              question: "What is the placement record?",
              answer:
                "95% of our MBA graduates receive job offers within 3 months of graduation. The average CTC is ₹26.5 LPA with an average salary jump of 3.05x. Highest package in recent years reached ₹61.8 LPA. Our graduates work at top companies including Google, Amazon, Deloitte, McKinsey, KPMG, and leading startups.",
            },
            {
              id: "placement-guarantee",
              question: "Do you guarantee placements?",
              answer:
                "While we cannot guarantee placements, our track record shows that 95% of students receive job offers with significant salary improvements. We provide extensive support and opportunities, but final placement depends on individual performance, skills, and market conditions. Students must actively participate in the placement process and maintain good academic standing.",
            },
            {
              id: "career-services",
              question: "Do you offer lifetime career services?",
              answer:
                "Yes! Alumni have lifetime access to our career services including job postings, networking events, skill development workshops, and career counseling. Many alumni return for mid-career transitions and entrepreneurship support.",
            },
          ],
        },
        {
          id: "fees",
          name: "Tuition Fee",
          faqs: [
            {
              id: "fee-structure",
              question: "What is the fee structure?",
              answer:
                "The total program fee for the 2-year MBA is competitive with other top business schools. The fee includes tuition, study materials, library access, computer lab facilities, and placement services. Hostel and mess charges are separate. Contact our admissions team for detailed fee structure and payment plans.",
            },
            {
              id: "payment-options",
              question: "What payment options are available?",
              answer:
                "We offer multiple payment options including one-time payment with discount, semester-wise installments, EMI options through partner banks, and education loans with major banks. Scholarships and financial aid are available for meritorious and deserving students.",
            },
            {
              id: "scholarships",
              question: "Are scholarships available?",
              answer:
                "Yes, we offer merit-based and need-based scholarships covering up to 100% of tuition fees. Scholarships are awarded based on entrance exam scores, academic performance, work experience, diversity criteria, and financial need. Women candidates and students from underrepresented backgrounds receive special consideration.",
            },
            {
              id: "education-loan",
              question: "Can I get education loans?",
              answer:
                "Yes, we have tie-ups with major banks including SBI, HDFC, ICICI, and Axis Bank for education loans. The college assists students in the loan application process. Most students secure loans covering 80-100% of the program fee with flexible repayment options starting after course completion.",
            },
          ],
        },
        {
          id: "admission",
          name: "Admission",
          faqs: [
            {
              id: "how-to-apply",
              question: "How do I apply?",
              answer:
                "Applications can be submitted online through our admission portal. The process includes submitting academic transcripts, entrance exam scores (CAT/XAT/GMAT), essays, and letters of recommendation. Shortlisted candidates are invited for group discussion and personal interview rounds.",
            },
            {
              id: "entrance-exams",
              question: "Which entrance exams are accepted?",
              answer:
                "We accept scores from CAT, XAT, GMAT, and our own entrance test. Candidates must have valid scores from the current or previous year. Minimum percentile requirements vary but typically CAT 85+ percentile, GMAT 650+, or equivalent scores are preferred.",
            },
            {
              id: "application-deadline",
              question: "What is the application deadline?",
              answer:
                "We conduct admissions in multiple rounds. Round 1 deadline is October 30th, Round 2 is November 15th, and Round 3 is December 31st. Early application is recommended as seats fill up quickly and scholarship opportunities are better in early rounds.",
            },
          ],
        },
      ],
    },
    students: {
  categories: [
    { id: "jan", name: "January" },
    { id: "apr", name: "April" },
    { id: "jul", name: "July" },
  ],

  students: [
    {
      name: "Riya Kapoor",
      batch: "APR 2026",
      city: "Kolkata",
      company: "Jio",
      role: "Growth Engineer",
      timeToPlace: "10 Months later",
      previousCollege: "Techno India",
      background: "2nd Year MCA Fresher",
      internship:
        "Jio Platforms — Growth engineering and analytics",
      researchPaper:
        "AI-based customer engagement strategies in telecom industry",
      caseStudies:
        "How Jio scaled digital adoption across India...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081839/21_bnm51l.jpg",
      linkedinUrl: "#",
      category: "apr",
    },

    {
      name: "Sneha Dutta",
      batch: "DEC 2025",
      city: "Kolkata",
      company: "WishCare",
      role: "Digital Marketing",
      timeToPlace: "Just in 9 months",
      previousCollege: "Loreto College",
      background: "2025 Pass Out Fresher",
      internship:
        "WishCare — Brand marketing and influencer campaigns",
      researchPaper:
        "Social media growth strategies for D2C brands",
      caseStudies:
        "How WishCare built a beauty-first digital audience...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081840/23_obnfxo.jpg",
      linkedinUrl: "#",
      category: "jan",
    },

    {
      name: "Arjun Malhotra",
      batch: "JUL 2025",
      city: "Bangalore",
      company: "Google",
      role: "SEO Growth Associate",
      timeToPlace: "Just in 8 months",
      previousCollege: "Christ University",
      background: "BBA Marketing Fresher",
      internship:
        "Google India — Search and content optimization",
      researchPaper:
        "Consumer retention through AI recommendation systems",
      caseStudies:
        "How Swiggy increased retention using growth loops...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886817/bytg0uyh5ebkd2zwuzm0_yalhuk.avif",
      linkedinUrl: "#",
      category: "jul",
    },
  ],
},
faculty: {
  categories: [
    { id: "technology", name: "Technology" },
    { id: "entrepreneurship", name: "Entrepreneurship" },
  ],
  faculty: [
    {
      name: "Mr. Manoj Kohli",
      title: "Former Country Head",
      company: "SoftBank",
      subtitle: "Former Country Head at SoftBank India",
      experience: "Ex MD at Bharti Airtel",
      teaching: "Tech investments and growth strategy",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "technology",
    },
    {
      name: "Mr. Naveen Munjal",
      title: "Managing Director",
      company: "HEROELECTRIC",
      subtitle: "Founder & MD at Hero Electric",
      experience: "Ex VP at Hero MotoCorp",
      teaching: "EV industry and startup scaling",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "entrepreneurship",
    },
  ],
},
  },
  {
    id: "2",
    slug: "post-graduate-diploma-in-management",
    // Dropdown Data
    dropdown: {
      title: "POST GRADUATE DIPLOMA IN MANAGEMENT",
      description:
        "Industry-focused program that bridges the gap between academic learning and corporate requirements. Emphasis on practical skills, live projects, and leadership development through hands-on experience with real business challenges.",
      duration: "2 Years Full-time",
      stats: [
        { value: "24", label: "MONTHS" },
        { value: "200+", label: "CASE STUDIES" },
        { value: "250+", label: "COMPANIES" },
        { value: "92%", label: "SUCCESS RATE" },
      ],
      link: "/post-graduate-diploma-in-management",
      imageUrl: "/images/programmes/DSC09198.webp",
    },

    // Card Data
    card: {
      image: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081780/mn8bwcdnx9ld2kmmywvz_crgadc.avif",
      hasVideo: false,
      rating: { score: 4.7, reviews: 1876 },
      title: "POST GRADUATE DIPLOMA IN MANAGEMENT",
      level: "Postgraduate",
      certificateType: "PG Diploma",
      description:
        "A 2-year industry-focused program emphasizing practical learning, live projects and management excellence.",
      format: { type: "On Campus (Opt-in Residential)" },
      eligibility: { type: "Bachelor's degree in any discipline" },
      duration: { type: "2 Years" },
      deadline: { type: "Round 2: 15th Nov '25" },
      careerOutcomes: ["Management Trainee", "Project Manager"],
      jobOpenings: "9,87,654",
    },
    // Hero Data
    hero: {
      badge: "Professional Course",
      categoryLabel: "MANAGEMENT SPECIALIZATION",
      title: {
        main: "POST GRADUATE DIPLOMA IN",
        highlight: "MANAGEMENT",
        suffix: "",
      },
      description:
        "Fast-track your management career with practical learning, live projects, and 100% placement assistance from India's leading business school.",
      stats: [
        { label: "92% Success Rate", value: "92%" },
        { label: "Live Projects", value: "200+" },
        { label: "Mentorship", value: "1:1" },
        { label: "Companies", value: "250+" },
      ],
      alumniCompanies: [
        { name: "KPMG", logo: "/images/companies/kpmg.png" },
        { name: "TCS", logo: "/images/companies/tcs.png" },
        { name: "Infosys", logo: "/images/companies/infosys.png" },
      ],
      instructors: {
        badge: "Industry Experts",
        title: "Senior Management Professionals",
      },
      heroImage: "/images/programmes/DSC09198.webp",
      floatingCards: {
        topRight: {
          badge: "Live Sessions",
          students: "1,800+",
          rating: 4.7,
        },
        bottomLeft: {
          label: "Placement Rate",
          percentage: "92%",
          subLabel: "Career Growth",
          ctcIncrease: "↗ 2.5x Salary Hike",
        },
      },
    },
    // Program Info
    programInfo: {
      duration: "2 Years",
      details: [
        { label: "LOCATION", value: "4 Countries", dotColor: "bg-cyan-500" },
        {
          label: "ELIGIBILITY",
          value: "Bachelor's Degree",
          dotColor: "bg-pink-500",
        },
        { label: "FORMAT", value: "Full Time", dotColor: "bg-yellow-500" },
        { label: "START DATE", value: "Sept 2026", dotColor: "bg-green-500" },
      ],
    },

    // Track Record
    trackRecord: {
      stats: [
        { value: "24.5", unit: "LPA", label: "Average CTC" },
        { value: "2.5", unit: "x", label: "Average CTC Jump" },
        { value: "15-40", unit: "LPA", label: "CTC Salary Range" },
        { value: "92", unit: "%", label: "Students Placed" },
      ],
      experienceData: [
        { label: "0-1 YRS", value: 12, percentage: "12%" },
        { label: "1-3 YRS", value: 45, percentage: "45%" },
        { label: "3-5 YRS", value: 28, percentage: "28%" },
        { label: "5-8 YRS", value: 10, percentage: "10%" },
        { label: "8-10YR", value: 3, percentage: "3%" },
        { label: "10+ YRS", value: 2, percentage: "2%" },
      ],
      backgroundData: [
        { label: "GENERALISTS", value: 28, percentage: "28%" },
        { label: "MARKETING", value: 18, percentage: "18%" },
        { label: "SALES_DEV", value: 16, percentage: "16%" },
        { label: "ENTREPRENEURS", value: 12, percentage: "12%" },
        { label: "ENGINEERING", value: 9, percentage: "9%" },
        { label: "FINANCE", value: 10, percentage: "10%" },
        { label: "PRODUCT", value: 7, percentage: "7%" },
      ],
      impactCards: [
        {
          title: "Fast-track career growth through practical learning",
          description:
            "Management Trainee, Project Manager, Business Development roles designed for rapid career progression in leading companies.",
        },
        {
          title: "Industry-ready skills through live projects",
          description:
            "Work on real business challenges with 200+ live projects, case studies, and hands-on assignments that prepare you for corporate roles.",
        },
        {
          title: "Strong industry network and placement support",
          description:
            "Connect with 250+ recruiting companies, industry mentors, and successful alumni network for career opportunities.",
        },
      ],
      companyLogos: [
        { name: "KPMG", logo: "https://logo.clearbit.com/kpmg.com" },
        { name: "TCS", logo: "https://logo.clearbit.com/tcs.com" },
        { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com" },
        { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com" },
        { name: "HCL", logo: "https://logo.clearbit.com/hcltech.com" },
        {
          name: "Tech Mahindra",
          logo: "https://logo.clearbit.com/techmahindra.com",
        },
        { name: "Cognizant", logo: "https://logo.clearbit.com/cognizant.com" },
        { name: "Capgemini", logo: "https://logo.clearbit.com/capgemini.com" },
        { name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
        { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
        { name: "SAP", logo: "https://logo.clearbit.com/sap.com" },
        { name: "Dell", logo: "https://logo.clearbit.com/dell.com" },
        { name: "HP", logo: "https://logo.clearbit.com/hp.com" },
        { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com" },
        { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
        {
          name: "Salesforce",
          logo: "https://logo.clearbit.com/salesforce.com",
        },
      ],
    },

    degreeProgram: {
      badge: "DIPLOMA & ACCREDITATION",
      title: {
        prefix: "Graduate with industry-recognized",
        highlight: "Post Graduate Diploma in Management",
        suffix: "from Charter's Business College",
      },
      accordions: [
        {
          id: "placement",
          title: "Outstanding Placement Record and Career Support",
          items: [
            "**92% placement** rate with top companies across diverse industries",
            "**2.5x average salary** jump post-PGDM with CTC ranging from 15-40 LPA",
            "Alumni at **KPMG, TCS, Infosys, Wipro, HCL, Accenture** in managerial roles",
            "**250+ recruiting partners** including IT giants, consulting firms, and FMCG companies",
            "**100% placement assistance** with dedicated support until job placement",
          ],
        },
        {
          id: "practical",
          title: "Industry-Focused Practical Learning Approach",
          items: [
            "**200+ live projects** with real companies providing practical management experience",
            "**Mandatory summer internship** with stipend at leading companies",
            "**Industry mentorship program** - learn from practicing managers and business leaders",
            "**Guest lectures** by 50+ CEOs, entrepreneurs, and senior executives annually",
            "**Simulation exercises** for supply chain, finance, marketing, and operations management",
          ],
        },
        {
          id: "curriculum",
          title: "Flexible and Industry-Relevant Curriculum",
          items: [
            "**Autonomous curriculum** - updated every 6 months based on industry requirements",
            "**Specialization tracks** in Marketing, Finance, HR, Operations, Business Analytics",
            "**Skill development modules** in Excel, PowerBI, SQL, Python, and business tools",
            "**Soft skills training** - communication, leadership, negotiation, presentation skills",
            "**Capstone project** in final term solving real business problems",
          ],
        },
        {
          id: "recognition",
          title: "PGDM Recognition and Career Advantages",
          items: [
            "**AICTE approved** Post Graduate Diploma in Management",
            "**Equivalent to MBA** as per AICTE and accepted by all employers",
            "**Industry preferred** due to practical focus and updated curriculum",
            "**Fast career growth** - PGDM graduates reach managerial positions 20% faster",
            "**Higher education ready** - eligible for PhD and executive programs",
          ],
        },
      ],
      academicPartners: [{ name: "Charter's Business College" }],
      immersions: [{ name: "Industry Visits" }],
      campusImage: {
        src: "/images/programmes/indus.webp",
        alt: "Charter's Business College Campus",
      },
    },
    // Curriculum
    curriculum: {
      categories: [
        { id: "core", label: "CORE", title: "Core Management Courses" },
        { id: "specialization", label: "SPEC", title: "Specialization Tracks" },
      ],
      courseData: {
        core: [
          {
            term: "TERM 1",
            location: "India",
            courses: [
              { code: "PGDM 101", title: "Principles of Management" },
              { code: "PGDM 102", title: "Business Economics" },
              { code: "PGDM 103", title: "Accounting for Managers" },
              { code: "PGDM 104", title: "Marketing Fundamentals" },
              { code: "PGDM 105", title: "Organizational Behavior" },
            ],
          },
          {
            term: "TERM 2",
            location: "India",
            courses: [
              { code: "PGDM 201", title: "Financial Management" },
              { code: "PGDM 202", title: "Operations & Supply Chain" },
              { code: "PGDM 203", title: "Business Analytics" },
              { code: "PGDM 204", title: "Human Resource Management" },
              { code: "PGDM 205", title: "Strategic Management" },
            ],
          },
        ],
        specialization: [
          {
            term: "TERM 3",
            location: "Mumbai",
            courses: [
              { code: "SPEC 301", title: "Advanced Marketing Strategy" },
              { code: "SPEC 302", title: "Financial Analysis & Planning" },
              { code: "SPEC 303", title: "Operations Excellence" },
              { code: "SPEC 304", title: "HR Analytics" },
            ],
          },
        ],
      },
    },

    // Learn Apply
    learnApply: {
      categories: [
        { id: "practical", label: "PRAC", title: "Practical Management" },
        { id: "leadership", label: "LEAD", title: "Leadership Skills" },
      ],
      courseData: {
        practical: [
          {
            term: "TERM 1",
            location: "Mumbai",
            courses: [
              { code: "PRAC 101", title: "How to manage projects effectively" },
              { code: "PRAC 102", title: "How to lead diverse teams" },
              { code: "PRAC 103", title: "How to solve business problems" },
            ],
          },
        ],
        leadership: [
          {
            term: "TERM 2",
            location: "Delhi",
            courses: [
              { code: "LEAD 101", title: "How to develop leadership presence" },
              { code: "LEAD 102", title: "How to make strategic decisions" },
            ],
          },
        ],
      },
    },

    // Scholarships
    scholarships: [
      {
        id: "merit",
        title: "The Merit Scholarship",
        description:
          "For outstanding academic achievers with exceptional entrance exam scores and strong academic records.",
        eligibility: "High entrance exam scores",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        alt: "Merit scholarship recipient",
      },
      {
        id: "diversity",
        title: "The Diversity Scholarship",
        description:
          "Supporting diverse backgrounds and perspectives in management education.",
        eligibility: "Underrepresented backgrounds",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
        alt: "Diverse students",
      },
      {
        id: "women",
        title: "Women Leadership Scholarship",
        description:
          "Empowering women to take leadership roles in business and management.",
        eligibility: "Women candidates with leadership potential",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        alt: "Women leaders",
      },
    ],
    // FAQ
    faq: {
      categories: [
        {
          id: "program",
          name: "Program",
          faqs: [
            {
              id: "what-is-pgdm",
              question: "What is PGDM?",
              answer:
                "Post Graduate Diploma in Management (PGDM) is a 2-year industry-focused management program that emphasizes practical learning, live projects, and real-world business challenges. Unlike MBA, PGDM is offered by autonomous institutes and has more flexibility in curriculum design based on industry needs.",
            },
            {
              id: "pgdm-vs-mba",
              question: "What is the difference between PGDM and MBA?",
              answer:
                "PGDM is a diploma program offered by autonomous business schools with industry-focused curriculum, while MBA is a degree offered by universities. PGDM programs are often more flexible and updated frequently based on industry trends. Both are equally valued by employers and offer similar career opportunities.",
            },
            {
              id: "eligibility",
              question: "What are the eligibility criteria?",
              answer:
                "Candidates must have a Bachelor's degree in any discipline from a recognized university. Work experience is preferred but not mandatory. We welcome candidates from diverse backgrounds including engineering, commerce, arts, and sciences.",
            },
            {
              id: "practical-learning",
              question: "How much practical learning is included?",
              answer:
                "Our PGDM program emphasizes 60% practical learning through 200+ live projects, case studies, industry visits, and internships. Students work on real business challenges with guidance from industry mentors and faculty.",
            },
          ],
        },
        {
          id: "admission",
          name: "Admission",
          faqs: [
            {
              id: "how-to-apply",
              question: "How do I apply for PGDM?",
              answer:
                "Applications can be submitted online through our admission portal. The process includes entrance exam scores, group discussion, and personal interview. We accept scores from CAT, XAT, GMAT, and CMAT.",
            },
            {
              id: "entrance-exams",
              question: "Which entrance exams are accepted?",
              answer:
                "We accept CAT, XAT, GMAT, and CMAT scores. Candidates must have valid scores from current or previous year.",
            },
          ],
        },
        {
          id: "placement",
          name: "Placement",
          faqs: [
            {
              id: "placement-record",
              question: "What is the placement record?",
              answer:
                "92% of our PGDM graduates receive job offers with an average CTC of ₹24.5 LPA and average salary jump of 2.5x. Top recruiters include KPMG, TCS, Infosys, and leading startups.",
            },
            {
              id: "internships",
              question: "Are internships provided?",
              answer:
                "Yes, summer internships are mandatory between first and second year. Our placement cell facilitates internships with 250+ partner companies offering stipends ranging from ₹30,000 to ₹80,000 per month.",
            },
          ],
        },
        {
          id: "fees",
          name: "Fees",
          faqs: [
            {
              id: "fee-structure",
              question: "What is the fee structure?",
              answer:
                "The program fee is competitive with flexible payment options including semester-wise installments and EMI plans. Scholarships are available for meritorious students covering up to 100% tuition. Contact admissions for detailed fee information.",
            },
          ],
        },
      ],
    },
    students: {
  categories: [
    { id: "jan", name: "January" },
    { id: "apr", name: "April" },
  ],

  students: [
    {
      name: "Rahul Sharma",
      batch: "JAN 2025",
      city: "Mumbai",
      company: "Deloitte",
      role: "Finance Analyst",
      timeToPlace: "Just in 7 months",
      previousCollege: "Mumbai University",
      background: "3rd Year BCOM Fresher",
      internship:
        "Deloitte India — Tax advisory and financial reporting",
      researchPaper:
        "Impact of GST on SME growth in India",
      caseStudies:
        "How Infosys restructured its finance division post-2020...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886819/fwwshpnqwsid71f8dgtt_ytkxtr.avif",
      linkedinUrl: "#",
      category: "jan",
    },

    {
      name: "Priya Mehta",
      batch: "JAN 2025",
      city: "Delhi",
      company: "PwC",
      role: "Operations Executive",
      timeToPlace: "Just in 6 months",
      previousCollege: "Delhi University",
      background: "Graduate Fresher",
      internship:
        "PwC India — Business process optimization",
      researchPaper:
        "Digital transformation in Indian banking sector",
      caseStudies:
        "Why Jet Airways failed despite strong brand equity...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886821/v56rnsmx8rkyg4qf8zlt_govysb.avif",
      linkedinUrl: "#",
      category: "jan",
    },

    {
      name: "Amit Kumar",
      batch: "APR 2025",
      city: "Bangalore",
      company: "KPMG",
      role: "Business Analyst",
      timeToPlace: "Just in 7 months",
      previousCollege: "Christ University",
      background: "BBA Graduate Fresher",
      internship:
        "KPMG — Market research and data analysis",
      researchPaper:
        "Role of fintech in financial inclusion in rural India",
      caseStudies:
        "How Byju's lost market cap despite rapid expansion...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886818/dbubonqa0x47h1dsrjv0_nqgglk.avif",
      linkedinUrl: "#",
      category: "apr",
    },
  ],
},
faculty: {
  categories: [
    { id: "leadership", name: "Leadership" },
    { id: "finance", name: "Finance" },
    { id: "consulting", name: "Consulting" },
  ],
  faculty: [
    {
      name: "Mr. Rajat Mathur",
      title: "Managing Director",
      company: "MorganStanley",
      subtitle: "MD, India at Morgan Stanley",
      experience: "Ex Managing Director at Goldman Sachs",
      teaching: "Corporate strategy and financial markets",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "leadership",
    },
    {
      name: "Mr. Finance Expert 1",
      title: "CFO",
      company: "FinanceCo",
      subtitle: "Chief Financial Officer",
      experience: "22+ years in finance",
      teaching: "Financial management",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "finance",
    },
    {
      name: "Captain Raghu Raman",
      title: "Former President",
      company: "Reliance",
      subtitle: "Former President, Strategy at Reliance",
      experience: "Led energy & infrastructure divisions",
      teaching: "Corporate leadership and operations",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "consulting",
    },
  ],
},
  },

  {
    id: "3",
    slug: "product-growth-engineering",
    // Dropdown Data
    dropdown: {
      title: "PRODUCT GROWTH ENGINEERING",
      description:
        "Designed for working professionals with significant management experience. Flexible schedule with weekend classes and online modules for career advancement while continuing your job. Focus on executive leadership, strategic thinking, and C-suite preparation.",
      duration: "18 Months Part-time",
      stats: [
        { value: "18", label: "MONTHS" },
        { value: "50+", label: "EXECUTIVES" },
        { value: "5+", label: "YRS EXP AVG" },
        { value: "98%", label: "RETENTION RATE" },
      ],
      link: "/product-growth-engineering",
      imageUrl: "/images/programmes/P10714292.webp",
    },

    // Card Data
    card: {
      image: "https://res.cloudinary.com/ducgcl4dg/image/upload/v1778081779/ajbcjzco3yfsj7ns1f2j_dvqing.avif",
      hasVideo: false,
      rating: { score: 4.9, reviews: 956 },
      title: "PRODUCT GROWTH ENGINEERING",

      level: "Executive",
      certificateType: "Executive MBA",
      description:
        "A flexible 18-month program for working professionals with weekend classes and executive networking.",
      format: { type: "Blended (Online / Weekend Classes)" },
      eligibility: { type: "Bachelor's + 3 years experience" },
      duration: { type: "18 Months" },
      deadline: { type: "Round 1: 20th Oct '25" },
      careerOutcomes: ["Senior Manager", "Director"],
      jobOpenings: "5,43,210",
    },
    // Hero Data
    hero: {
      badge: "Executive Program",
      categoryLabel: "EXECUTIVE LEADERSHIP",
      title: {
        main: "EXECUTIVE",
        highlight: "MBA",
        suffix: "",
      },
      description:
        "Designed for working professionals: Weekend classes, online modules, and executive networking to accelerate your career to senior leadership roles.",
      stats: [
        { label: "98% Retention", value: "98%" },
        { label: "Executive Projects", value: "50+" },
        { label: "Senior Mentors", value: "1:1" },
        { label: "CXO Network", value: "100+" },
      ],
      alumniCompanies: [
        { name: "McKinsey", logo: "/images/companies/mckinsey.png" },
        { name: "BCG", logo: "/images/companies/bcg.png" },
        { name: "Accenture", logo: "/images/companies/accenture.png" },
      ],
      instructors: {
        badge: "C-Suite Leaders",
        title: "CEOs & Industry Veterans",
      },
      heroImage: "/images/programmes/P10714292.webp",
      floatingCards: {
        topRight: {
          badge: "Weekend Classes",
          students: "950+",
          rating: 4.9,
        },
        bottomLeft: {
          label: "Career Growth",
          percentage: "98%",
          subLabel: "Promotion Rate",
          ctcIncrease: "↗ Director & VP Roles",
        },
      },
    },

    // Program Info
    programInfo: {
      duration: "18 Months",
      details: [
        { label: "LOCATION", value: "3 Countries", dotColor: "bg-cyan-500" },
        {
          label: "ELIGIBILITY",
          value: "3+ Years Experience",
          dotColor: "bg-pink-500",
        },
        {
          label: "FORMAT",
          value: "Weekend Classes",
          dotColor: "bg-yellow-500",
        },
        { label: "START DATE", value: "Jan 2026", dotColor: "bg-green-500" },
      ],
    },

    // Track Record
    trackRecord: {
      stats: [
        { value: "38.5", unit: "LPA", label: "Average CTC" },
        { value: "1.8", unit: "x", label: "Average CTC Jump" },
        { value: "28-65", unit: "LPA", label: "CTC Salary Range" },
        { value: "98", unit: "%", label: "Career Advancement" },
      ],
      experienceData: [
        { label: "3-5 YRS", value: 18, percentage: "18%" },
        { label: "5-8 YRS", value: 35, percentage: "35%" },
        { label: "8-10YR", value: 25, percentage: "25%" },
        { label: "10-15YR", value: 15, percentage: "15%" },
        { label: "15+ YRS", value: 7, percentage: "7%" },
      ],
      backgroundData: [
        { label: "SENIOR MGMT", value: 30, percentage: "30%" },
        { label: "CONSULTANTS", value: 22, percentage: "22%" },
        { label: "TECH LEADS", value: 18, percentage: "18%" },
        { label: "FINANCE", value: 15, percentage: "15%" },
        { label: "ENTREPRENEURS", value: 10, percentage: "10%" },
        { label: "OTHERS", value: 5, percentage: "5%" },
      ],
      impactCards: [
        {
          title: "Accelerate to C-Suite positions",
          description:
            "Senior Manager to Director, VP to C-Suite transitions. Executive roles designed for strategic leadership in Fortune 500 companies and startups.",
        },
        {
          title: "Executive network and mentorship",
          description:
            "Connect with 100+ CXOs, senior executives, and successful entrepreneurs. Build relationships that accelerate your career trajectory.",
        },
        {
          title: "Strategic thinking and innovation",
          description:
            "Learn from CEOs and industry veterans through case studies, executive projects, and real-world business challenges.",
        },
      ],
      companyLogos: [
        { name: "McKinsey", logo: "https://logo.clearbit.com/mckinsey.com" },
        { name: "BCG", logo: "https://logo.clearbit.com/bcg.com" },
        { name: "Bain", logo: "https://logo.clearbit.com/bain.com" },
        { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com" },
        { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com" },
        { name: "EY", logo: "https://logo.clearbit.com/ey.com" },
        { name: "PwC", logo: "https://logo.clearbit.com/pwc.com" },
        { name: "KPMG", logo: "https://logo.clearbit.com/kpmg.com" },
        {
          name: "Goldman Sachs",
          logo: "https://logo.clearbit.com/goldmansachs.com",
        },
        { name: "JP Morgan", logo: "https://logo.clearbit.com/jpmorgan.com" },
        {
          name: "Morgan Stanley",
          logo: "https://logo.clearbit.com/morganstanley.com",
        },
        { name: "Google", logo: "https://logo.clearbit.com/google.com" },
        { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
        { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
        { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
        { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
      ],
    },

    // Degree Program
    degreeProgram: {
      badge: "EXECUTIVE DEGREE",
      title: {
        prefix: "Graduate with prestigious",
        highlight: "Product Growth Engineering",
        suffix: "from Charter's Executive Business School",
      },
      accordions: [
        {
          id: "leadership",
          title: "Executive Leadership and C-Suite Preparation",
          items: [
            "**98% career advancement** to senior roles - Director, VP, or C-suite within 2 years",
            "**1.8x average salary** increase with total CTC ranging from 28-65 LPA",
            "Alumni in **CXO positions** at Fortune 500 companies and unicorn startups",
            "**Senior role transitions** - 85% participants promoted within program duration",
            "**Strategic leadership training** by CEOs and board members",
          ],
        },
        {
          id: "network",
          title: "Exclusive Executive Network and Peer Learning",
          items: [
            "**100+ CXO network** for mentorship, guidance, and career opportunities",
            "Executive **peer learning cohort** - average 8 years experience per participant",
            "Access to **CEO roundtables** and exclusive industry conclaves",
            "**Alumni network** of 500+ senior executives across industries",
            "**Board membership opportunities** through executive connections",
          ],
        },
        {
          id: "flexibility",
          title: "Work-Friendly Flexible Learning Format",
          items: [
            "**Weekend classes** (Saturday-Sunday) allowing you to continue your job",
            "**Online modules** for weekday learning at your own pace",
            "**18-month duration** - shorter than traditional MBA while maintaining quality",
            "**Residential modules** - 4 intensive weeks spread across program",
            "**No career break needed** - designed for working professionals",
          ],
        },
        {
          id: "curriculum",
          title: "Strategic and Executive-Level Curriculum",
          items: [
            "**C-suite focused content** - board governance, M&A, corporate strategy",
            "**Executive projects** with real strategic business challenges",
            "**CEO as faculty** - learn directly from business leaders",
            "**Global business perspective** through international immersion",
            "**Digital transformation** modules on AI, blockchain, and emerging tech",
          ],
        },
        {
          id: "recognition",
          title: "Elite Recognition and Global Acceptance",
          items: [
            "**UGC approved Executive MBA** from Charter's Executive Business School",
            "**Globally recognized** degree accepted for international careers",
            "**Association with global B-schools** for exchange and learning",
            "**Executive credential** valued higher than regular MBA by recruiters",
            "**Lifetime access** to executive education programs and workshops",
          ],
        },
      ],
      academicPartners: [{ name: "Charter's Executive Business School" }],
      immersions: [{ name: "Silicon Valley Immersion" }],
      campusImage: {
        src: "/images/programmes/indus.webp",
        alt: "Executive Campus",
      },
    },
    // Curriculum
    curriculum: {
      categories: [
        { id: "leadership", label: "LEAD", title: "Executive Leadership" },
        { id: "strategy", label: "STRAT", title: "Strategic Management" },
      ],
      courseData: {
        leadership: [
          {
            term: "MODULE 1",
            location: "Weekend - India",
            courses: [
              { code: "EXEC 101", title: "Executive Leadership Principles" },
              { code: "EXEC 102", title: "Strategic Decision Making" },
              { code: "EXEC 103", title: "Leading High-Performance Teams" },
              { code: "EXEC 104", title: "Change Management" },
            ],
          },
          {
            term: "MODULE 2",
            location: "Weekend - India",
            courses: [
              { code: "EXEC 201", title: "C-Suite Executive Skills" },
              { code: "EXEC 202", title: "Board Governance" },
              { code: "EXEC 203", title: "Crisis Leadership" },
              { code: "EXEC 204", title: "Innovation Management" },
            ],
          },
        ],
        strategy: [
          {
            term: "MODULE 3",
            location: "International Immersion",
            courses: [
              { code: "STRAT 301", title: "Global Business Strategy" },
              { code: "STRAT 302", title: "Digital Transformation" },
              { code: "STRAT 303", title: "M&A Strategy" },
              { code: "STRAT 304", title: "Corporate Finance for Executives" },
            ],
          },
        ],
      },
    },

    // Learn Apply
    learnApply: {
      categories: [
        { id: "executive", label: "EXEC", title: "Executive Skills" },
        { id: "strategic", label: "STRAT", title: "Strategic Leadership" },
      ],
      courseData: {
        executive: [
          {
            term: "MODULE 1",
            location: "Online",
            courses: [
              { code: "EXEC 101", title: "How to lead as a senior executive" },
              {
                code: "EXEC 102",
                title: "How to drive organizational transformation",
              },
              { code: "EXEC 103", title: "How to build executive presence" },
            ],
          },
        ],
        strategic: [
          {
            term: "MODULE 2",
            location: "Weekend Campus",
            courses: [
              {
                code: "STRAT 201",
                title: "How to formulate corporate strategy",
              },
              {
                code: "STRAT 202",
                title: "How to manage stakeholders effectively",
              },
            ],
          },
        ],
      },
    },

    // Scholarships
    scholarships: [
      {
        id: "senior-executive",
        title: "Senior Executive Scholarship",
        description:
          "For senior professionals with 10+ years experience demonstrating exceptional leadership and impact.",
        eligibility: "10+ years experience in leadership roles",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        alt: "Senior executive",
      },
      {
        id: "women-leader",
        title: "Women in Leadership Scholarship",
        description:
          "Supporting women executives to advance to C-suite positions.",
        eligibility: "Women in senior management roles",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        alt: "Women leaders",
      },
      {
        id: "entrepreneur",
        title: "Entrepreneur Scholarship",
        description:
          "For business owners and founders looking to scale their ventures.",
        eligibility: "Founders/business owners with 3+ years",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
        alt: "Entrepreneurs",
      },
    ],

    // FAQ
    faq: {
      categories: [
        {
          id: "program",
          name: "Program",
          faqs: [
            {
              id: "what-is-emba",
              question: "What is Executive MBA?",
              answer:
                "Executive MBA (EMBA) is designed for working professionals with significant management experience. The program focuses on executive leadership, strategic thinking, and C-suite preparation while allowing you to continue your job. Classes are held on weekends and some modules are online.",
            },
            {
              id: "work-continue",
              question: "Can I continue working while doing EMBA?",
              answer:
                "Yes! The Executive MBA is specifically designed for working professionals. Classes are scheduled on weekends (Saturday-Sunday) and some modules are online, allowing you to continue your current job while pursuing the degree.",
            },
            {
              id: "experience-required",
              question: "How much work experience is required?",
              answer:
                "We require minimum 3 years of full-time work experience after graduation. The average work experience of our EMBA cohort is 7-10 years, with many participants in senior management positions.",
            },
            {
              id: "time-commitment",
              question: "What is the time commitment?",
              answer:
                "The program requires 18 months with weekend classes (Saturday-Sunday), online modules during weekdays, and occasional residential modules. Expect to dedicate 15-20 hours per week including classes, assignments, and projects.",
            },
          ],
        },
        {
          id: "admission",
          name: "Admission",
          faqs: [
            {
              id: "how-to-apply",
              question: "How do I apply for Executive MBA?",
              answer:
                "Application process includes online application, work experience validation, GMAT/GRE waiver for experienced professionals, personal interview, and employer recommendation (optional). Focus is on leadership experience and career achievements.",
            },
            {
              id: "entrance-exam",
              question: "Is GMAT/CAT required?",
              answer:
                "GMAT/GRE can be waived for candidates with substantial work experience (7+ years) and strong professional track record. However, good scores can strengthen your application.",
            },
          ],
        },
        {
          id: "career",
          name: "Career",
          faqs: [
            {
              id: "career-impact",
              question: "What is the career impact?",
              answer:
                "98% of our EMBA graduates report significant career advancement within 2 years - promotions to Director, VP, or C-suite positions. Average salary increase is 1.8x with many transitioning to strategic leadership roles.",
            },
            {
              id: "network",
              question: "What about networking opportunities?",
              answer:
                "Executive MBA provides exclusive access to CXO network, CEO roundtables, and executive peer learning. Build relationships with 100+ senior leaders, entrepreneurs, and industry veterans.",
            },
          ],
        },
        {
          id: "fees",
          name: "Fees",
          faqs: [
            {
              id: "fee-structure",
              question: "What is the fee structure?",
              answer:
                "Executive MBA fees are higher than regular MBA reflecting the program's premium nature, experienced faculty, and executive facilities. Payment plans and corporate sponsorship options available. Many participants get employer sponsorship.",
            },
          ],
        },
      ],
    },
    students: {
  categories: [
    { id: "jan", name: "January" },
    { id: "apr", name: "April" },
    { id: "dec", name: "December" },
  ],

  students: [
    {
      name: "Sunita Das",
      batch: "AUG 2025",
      city: "Kolkata",
      company: "TATA",
      role: "Executive Finance",
      timeToPlace: "Just in 7 months",
      previousCollege: "Goenka College",
      background: "2nd Year BCOM Fresher",
      internship:
        "Kripton PVT Ltd / Horyzen PVT Ltd — Quarter Taxation, 2025 income tax, strategy on price section",
      researchPaper:
        "How AI impacts on taxation automation at global countries",
      caseStudies:
        "Why Amule SAP automation failed 100 million revenue at 2...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886820/t6szcvb54fwgjs0swgh1_xuaz6y.avif",
      linkedinUrl: "#",
      category: "jan",
    },

    {
      name: "Neha Singh",
      batch: "APR 2025",
      city: "Pune",
      company: "Wipro",
      role: "HR Executive",
      timeToPlace: "Just in 7 months",
      previousCollege: "Symbiosis College",
      background: "BBA HR Fresher",
      internship:
        "Wipro HR — Talent acquisition and onboarding",
      researchPaper:
        "Employee retention strategies in post-pandemic era",
      caseStudies:
        "How Zomato scaled its workforce from 500 to 5000...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886822/wsp4kdxh2fsyp6ehxrpp_gttfyp.avif",
      linkedinUrl: "#",
      category: "apr",
    },

    {
      name: "Karan Gupta",
      batch: "DEC 2025",
      city: "Hyderabad",
      company: "McKinsey",
      role: "Strategy Analyst",
      timeToPlace: "Just in 7 months",
      previousCollege: "BITS Pilani",
      background: "B.Tech Graduate Fresher",
      internship:
        "McKinsey & Company — Strategy consulting",
      researchPaper:
        "AI disruption in traditional consulting models",
      caseStudies:
        "How TCS transformed its delivery model for Gen AI...",
      imageSrc:
        "https://res.cloudinary.com/ducgcl4dg/image/upload/v1777886817/a07zod5okvybawy1kj0u_ef4niw.avif",
      linkedinUrl: "#",
      category: "dec",
    },
  ],
},
faculty: {
  categories: [
    { id: "technology", name: "Technology" },
    { id: "consulting", name: "Consulting" },
    { id: "entrepreneurship", name: "Entrepreneurship" },
  ],
  faculty: [
    {
      name: "Mr. Tech Expert 2",
      title: "CTO",
      company: "TechGiant",
      subtitle: "Chief Technology Officer",
      experience: "20+ years in technology",
      teaching: "Technology strategy",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "technology",
    },
    {
      name: "Mr. Arjun Vaidya",
      title: "Founder",
      company: "DR. VAIDYA's",
      subtitle: "Founder & CMD at Dr. Vaidya's",
      experience: "Built Ayurveda brand from scratch",
      teaching: "Founding a health-tech venture",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "entrepreneurship",
    },
    {
      name: "Mr. Consulting Expert 3",
      title: "Strategy Consultant",
      company: "StrategyCo",
      subtitle: "Principal Consultant",
      experience: "18+ years in strategy",
      teaching: "Strategic consulting",
      imageSrc: "/images/faculty/home.jpeg",
      linkedinUrl: "#",
      category: "consulting",
    },
  ],
},
  },
];

// HELPER FUNCTIONS

export function getAllProgrammeSlugs(): ProgramKey[] {
  return programmes.map((p) => p.slug);
}

export function getProgrammeBySlug(slug: string): Programme | undefined {
  return programmes.find((p) => p.slug === slug);
}

export function getAllProgrammes(): Programme[] {
  return programmes;
}

export function getDropdownData(slug: ProgramKey): DropdownData | undefined {
  const programme = getProgrammeBySlug(slug);
  return programme?.dropdown;
}

export function getAllDropdownData(): Record<ProgramKey, DropdownData> {
  return programmes.reduce(
    (acc, programme) => {
      acc[programme.slug] = programme.dropdown;
      return acc;
    },
    {} as Record<ProgramKey, DropdownData>,
  );
}

export function getCardData(slug: ProgramKey): ProgrammeCardData | undefined {
  const programme = getProgrammeBySlug(slug);
  return programme?.card;
}

export function getAllCardData(): ProgrammeCardData[] {
  return programmes.map((p) => p.card);
}

export function getHeroData(slug: ProgramKey): HeroData | undefined {
  const programme = getProgrammeBySlug(slug);
  return programme?.hero;
}
