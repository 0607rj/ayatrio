// Career page data structure
export interface CareerStat {
  value: string;
  label: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CareerPageData {
  hero: {
    title: string;
    subtitle: string;
    ctas: {
      jobs: {
        label: string;
        href: string;
        ariaLabel: string;
      };
      internships: {
        label: string;
        href: string;
        ariaLabel: string;
      };
    };
  };
  stats: CareerStat[];
  benefits: {
    title: string;
    subtitle: string;
    items: Benefit[];
  };
  faqs: {
    title: string;
    items: FAQ[];
  };
}

export const careerPageData: CareerPageData = {
  hero: {
    title: 'Build Your Career with Us',
    subtitle: 'Join our team of passionate individuals and make an impact in education',
    ctas: {
      jobs: {
        label: 'Find Jobs',
        href: '/careers/jobs',
        ariaLabel: 'Browse full-time job opportunities'
      },
      internships: {
        label: 'Find Internships',
        href: '/careers/internships',
        ariaLabel: 'Browse internship opportunities'
      }
    }
  },
  stats: [
    { value: '500+', label: 'Team Members' },
    { value: '50+', label: 'Open Positions' },
    { value: '10+', label: 'Countries' },
    { value: '95%', label: 'Employee Satisfaction' }
  ],
  benefits: {
    title: 'Why Join Charters Business?',
    subtitle: 'We offer more than just a job – we offer a career journey',
    items: [
      {
        id: 'growth',
        icon: 'lightning',
        title: 'Fast Growth',
        description: 'Accelerate your career with rapid learning opportunities and advancement paths',
        color: 'red'
      },
      {
        id: 'compensation',
        icon: 'currency',
        title: 'Competitive Pay',
        description: 'Industry-leading compensation packages with performance bonuses',
        color: 'green'
      },
      {
        id: 'global',
        icon: 'globe',
        title: 'Global Exposure',
        description: 'Work with international teams and expand your professional network',
        color: 'purple'
      },
      {
        id: 'balance',
        icon: 'balance',
        title: 'Work-Life Balance',
        description: 'Flexible working hours and remote work options for better balance',
        color: 'orange'
      },
      {
        id: 'health',
        icon: 'heart',
        title: 'Health Benefits',
        description: 'Comprehensive health insurance and wellness programs for you and family',
        color: 'red'
      },
      {
        id: 'learning',
        icon: 'bulb',
        title: 'Learning Culture',
        description: 'Continuous learning opportunities with training programs and certifications',
        color: 'indigo'
      }
    ]
  },
  faqs: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How do I apply for a job at Charters Business?',
        answer: 'Click on "Find Jobs" button above, browse open positions, and submit your application through our career portal.'
      },
      {
        question: 'Are internships paid?',
        answer: 'Yes, all our internships are paid positions with competitive stipends and potential for full-time conversion.'
      },
      {
        question: 'Do you offer remote work opportunities?',
        answer: 'Yes, we offer hybrid and remote work options depending on the role and team requirements.'
      }
    ]
  }
};
