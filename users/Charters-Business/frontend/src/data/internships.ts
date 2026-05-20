export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: 'Remote' | 'In-office' | 'Hybrid';
  description: string;
  responsibilities: string[];
  requirements: string[];
  learningOutcomes: string[];
  postedDate: string;
  category: string;
}

export const internships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Charters Business',
    location: 'Bangalore',
    duration: '3-6 months',
    stipend: '₹15,000-25,000/month',
    type: 'Hybrid',
    description: 'Join our engineering team as a Software Development Intern and gain hands-on experience building real-world applications.',
    responsibilities: [
      'Assist in developing web applications',
      'Write clean and maintainable code',
      'Participate in code reviews',
      'Work on bug fixes and new features',
      'Collaborate with senior developers'
    ],
    requirements: [
      'Currently pursuing or completed B.Tech/MCA in Computer Science',
      'Knowledge of JavaScript, HTML, CSS',
      'Familiarity with React or Node.js is a plus',
      'Good problem-solving skills',
      'Eagerness to learn new technologies'
    ],
    learningOutcomes: [
      'Full-stack web development experience',
      'Agile development practices',
      'Version control with Git',
      'Code review and collaboration skills',
      'Real-world project experience'
    ],
    postedDate: '2025-10-12',
    category: 'Engineering'
  },
  {
    id: '2',
    title: 'Product Management Intern',
    company: 'Charters Business',
    location: 'Mumbai',
    duration: '3 months',
    stipend: '₹20,000-30,000/month',
    type: 'In-office',
    description: 'Work closely with our product team to learn product strategy, user research, and feature development.',
    responsibilities: [
      'Assist in product research and analysis',
      'Help create product requirements documents',
      'Conduct user interviews and surveys',
      'Support product launches',
      'Analyze product metrics'
    ],
    requirements: [
      'Currently pursuing MBA or final year B.Tech',
      'Strong analytical and communication skills',
      'Interest in product management',
      'Basic understanding of technology',
      'Self-motivated and proactive'
    ],
    learningOutcomes: [
      'Product strategy and roadmap planning',
      'User research methodologies',
      'Data-driven decision making',
      'Cross-functional collaboration',
      'Product lifecycle management'
    ],
    postedDate: '2025-10-14',
    category: 'Product'
  },
  {
    id: '3',
    title: 'UI/UX Design Intern',
    company: 'Charters Business',
    location: 'Delhi',
    duration: '4 months',
    stipend: '₹12,000-18,000/month',
    type: 'Hybrid',
    description: 'Create beautiful and intuitive user interfaces under the guidance of our experienced design team.',
    responsibilities: [
      'Create wireframes and mockups',
      'Design user interfaces for web and mobile',
      'Conduct usability testing',
      'Assist in user research',
      'Maintain design consistency'
    ],
    requirements: [
      'Pursuing or completed degree in Design',
      'Portfolio showcasing design work',
      'Proficiency in Figma or Adobe XD',
      'Understanding of design principles',
      'Creative mindset and attention to detail'
    ],
    learningOutcomes: [
      'Professional UI/UX design skills',
      'User-centered design approach',
      'Design thinking methodology',
      'Prototyping and testing',
      'Design system creation'
    ],
    postedDate: '2025-10-10',
    category: 'Design'
  },
  {
    id: '4',
    title: 'Digital Marketing Intern',
    company: 'Charters Business',
    location: 'Remote',
    duration: '3-6 months',
    stipend: '₹10,000-15,000/month',
    type: 'Remote',
    description: 'Learn digital marketing strategies and help us reach more students through various online channels.',
    responsibilities: [
      'Assist in social media management',
      'Create content for marketing campaigns',
      'Analyze marketing metrics',
      'Support email marketing campaigns',
      'Research market trends'
    ],
    requirements: [
      'Pursuing degree in Marketing, Mass Communication, or related field',
      'Basic understanding of digital marketing',
      'Good writing and communication skills',
      'Familiarity with social media platforms',
      'Creative and analytical mindset'
    ],
    learningOutcomes: [
      'Digital marketing strategy',
      'Social media marketing',
      'Content marketing',
      'Marketing analytics',
      'Campaign management'
    ],
    postedDate: '2025-10-13',
    category: 'Marketing'
  },
  {
    id: '5',
    title: 'Content Writing Intern',
    company: 'Charters Business',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹8,000-12,000/month',
    type: 'Remote',
    description: 'Write engaging educational content and learn the art of creating content that educates and inspires.',
    responsibilities: [
      'Write blog posts and articles',
      'Create educational content',
      'Research topics and gather information',
      'Edit and proofread content',
      'Collaborate with subject matter experts'
    ],
    requirements: [
      'Strong writing skills in English',
      'Currently pursuing any degree',
      'Basic understanding of SEO',
      'Attention to detail',
      'Ability to meet deadlines'
    ],
    learningOutcomes: [
      'Professional content writing',
      'SEO writing techniques',
      'Editorial process',
      'Content strategy',
      'Portfolio building'
    ],
    postedDate: '2025-10-11',
    category: 'Content'
  },
  {
    id: '6',
    title: 'Data Analytics Intern',
    company: 'Charters Business',
    location: 'Pune',
    duration: '6 months',
    stipend: '₹18,000-25,000/month',
    type: 'Hybrid',
    description: 'Work with large datasets and help us make data-driven decisions to improve our products.',
    responsibilities: [
      'Analyze data to extract insights',
      'Create data visualizations',
      'Assist in building dashboards',
      'Clean and process data',
      'Support data science team'
    ],
    requirements: [
      'Pursuing B.Tech, MCA, or related degree',
      'Knowledge of Python and SQL',
      'Understanding of statistics',
      'Familiarity with Excel or Google Sheets',
      'Analytical mindset'
    ],
    learningOutcomes: [
      'Data analysis techniques',
      'Data visualization tools',
      'SQL and Python for data',
      'Statistical analysis',
      'Business intelligence'
    ],
    postedDate: '2025-10-09',
    category: 'Data Science'
  }
];
