export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  salary: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  category: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Charters Business',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹15-25 LPA',
    experience: '3-5 years',
    description: 'We are looking for an experienced Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.',
    responsibilities: [
      'Design and develop scalable web applications',
      'Lead technical discussions and code reviews',
      'Mentor junior developers',
      'Collaborate with cross-functional teams',
      'Optimize application performance'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in software development',
      'Strong knowledge of JavaScript/TypeScript',
      'Experience with React, Node.js, and MongoDB',
      'Excellent problem-solving skills'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Health insurance for you and your family',
      'Flexible working hours and remote work options',
      'Learning and development opportunities',
      'Annual team outings and events'
    ],
    postedDate: '2025-10-10',
    category: 'Engineering'
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Charters Business',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹18-30 LPA',
    experience: '4-6 years',
    description: 'Join our product team to drive innovation and create world-class educational products. You will own the product roadmap and work closely with engineering and design teams.',
    responsibilities: [
      'Define product vision and strategy',
      'Gather and prioritize product requirements',
      'Work with engineering teams on implementation',
      'Conduct market research and competitor analysis',
      'Monitor product metrics and user feedback'
    ],
    requirements: [
      'MBA or equivalent degree preferred',
      '4+ years of product management experience',
      'Strong analytical and data-driven mindset',
      'Excellent communication and leadership skills',
      'Experience in EdTech industry is a plus'
    ],
    benefits: [
      'Stock options and equity participation',
      'Premium health and wellness benefits',
      'Professional development budget',
      'Flexible work arrangements',
      'Modern office with great amenities'
    ],
    postedDate: '2025-10-12',
    category: 'Product'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Charters Business',
    location: 'Delhi',
    type: 'Full-time',
    salary: '₹12-18 LPA',
    experience: '2-4 years',
    description: 'We are seeking a creative UI/UX Designer to create intuitive and beautiful user experiences for our educational platform.',
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Maintain design systems and style guides'
    ],
    requirements: [
      'Bachelor\'s degree in Design or related field',
      '2+ years of UI/UX design experience',
      'Proficiency in Figma, Adobe XD, or Sketch',
      'Strong portfolio showcasing design work',
      'Understanding of design principles and best practices'
    ],
    benefits: [
      'Creative and collaborative work environment',
      'Latest design tools and software',
      'Health and wellness benefits',
      'Flexible working hours',
      'Opportunities to work on impactful projects'
    ],
    postedDate: '2025-10-08',
    category: 'Design'
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Charters Business',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹10-16 LPA',
    experience: '3-5 years',
    description: 'Lead our marketing initiatives and help us reach millions of students across India. Drive brand awareness and customer acquisition.',
    responsibilities: [
      'Develop and execute marketing strategies',
      'Manage digital marketing campaigns',
      'Analyze marketing metrics and ROI',
      'Collaborate with sales and product teams',
      'Build and manage marketing team'
    ],
    requirements: [
      'Bachelor\'s degree in Marketing or related field',
      '3+ years of marketing experience',
      'Experience with digital marketing channels',
      'Strong analytical and creative skills',
      'Excellent communication skills'
    ],
    benefits: [
      'Performance-based bonuses',
      'Health insurance coverage',
      'Professional development opportunities',
      'Work-life balance',
      'Dynamic team environment'
    ],
    postedDate: '2025-10-14',
    category: 'Marketing'
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Charters Business',
    location: 'Pune',
    type: 'Full-time',
    salary: '₹16-24 LPA',
    experience: '2-4 years',
    description: 'Join our data science team to build intelligent systems that personalize learning experiences for students.',
    responsibilities: [
      'Build and deploy machine learning models',
      'Analyze large datasets to extract insights',
      'Develop recommendation systems',
      'Collaborate with engineering teams',
      'Present findings to stakeholders'
    ],
    requirements: [
      'Master\'s degree in Computer Science, Statistics, or related field',
      '2+ years of data science experience',
      'Strong Python and SQL skills',
      'Experience with ML frameworks (TensorFlow, PyTorch)',
      'Excellent problem-solving abilities'
    ],
    benefits: [
      'Competitive compensation',
      'Work on cutting-edge AI/ML projects',
      'Health and wellness benefits',
      'Flexible work arrangements',
      'Learning and conference budget'
    ],
    postedDate: '2025-10-13',
    category: 'Data Science'
  },
  {
    id: '6',
    title: 'Content Writer',
    company: 'Charters Business',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹6-10 LPA',
    experience: '1-3 years',
    description: 'Create engaging educational content that helps students learn better. Write blog posts, course materials, and marketing copy.',
    responsibilities: [
      'Write high-quality educational content',
      'Research and develop course materials',
      'Create blog posts and articles',
      'Edit and proofread content',
      'Collaborate with subject matter experts'
    ],
    requirements: [
      'Bachelor\'s degree in English, Journalism, or related field',
      '1+ years of content writing experience',
      'Excellent writing and editing skills',
      'Understanding of SEO best practices',
      'Ability to simplify complex topics'
    ],
    benefits: [
      'Work from anywhere in India',
      'Flexible working hours',
      'Health insurance',
      'Professional growth opportunities',
      'Collaborative team culture'
    ],
    postedDate: '2025-10-11',
    category: 'Content'
  }
];
