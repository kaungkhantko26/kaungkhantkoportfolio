export type ExperienceCategory = 'Design' | 'Ambassador';

export interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  category: ExperienceCategory;
  location?: string;
  bullets: string[];
}

export interface EducationItem {
  award: string;
  institution: string;
  period?: string;
  details: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issued?: string;
  credentialId?: string;
  skills?: string[];
}

export const certifications: CertificationItem[] = [
  {
    title: 'Software Engineer',
    issuer: 'HackerRank',
    issued: 'March 2026',
    credentialId: 'ef8fdd8d672e',
  },
  {
    title: 'Introduction to Programming Using Python',
    issuer: 'HackerRank',
    issued: 'March 2026',
    credentialId: '89361550dbc8',
    skills: ['Python'],
  },
  {
    title: 'Frontend Developer (React)',
    issuer: 'HackerRank',
    issued: 'March 2026',
    credentialId: 'F5EAC2D3B4BD',
  },
  {
    title: 'WEBSECURITY AND WEB HACKING',
    issuer: 'Techno Learn',
    issued: 'March 2026',
  },
  {
    title: 'NETWORK ENGINEERING COURSE',
    issuer: 'Techno Learn',
    issued: 'September 2025',
  },
  {
    title: 'Ethical Hacking and Cyber Security',
    issuer: 'Techno Learn',
    issued: 'January 2026',
  },
  {
    title: 'Endpoint Security',
    issuer: 'Cisco',
    issued: 'March 2026',
  },
  {
    title: 'Ethical Hacker',
    issuer: 'Cisco',
    issued: 'February 2026',
  },
  {
    title: 'CodinGame Certification - Python 3',
    issuer: 'CodinGame',
    credentialId: 'kBc7B-L3ZxkoBmViorsjSQ',
    skills: ['Python'],
  },
  {
    title: 'EF SET English Certificate 56/100 (B2 Upper Intermediate)',
    issuer: 'EF SET',
    issued: 'April 2024',
  },
  {
    title: 'Security Principles',
    issuer: 'ISC2',
    issued: 'January 2026',
    credentialId: 'TQ7MSRJ0VVSC',
  },
  {
    title: 'Graphic Design Master Class',
    issuer: 'Donato',
    issued: 'October 2025',
    credentialId: 'GDMC-S-419',
    skills: ['Graphic Design'],
  },
  {
    title: 'Master Adobe Photoshop',
    issuer: 'Donato',
    issued: 'July 2025',
    credentialId: 'MAP S 4921',
    skills: ['Graphic Design'],
  },
  {
    title: 'Master Adobe Illustrator',
    issuer: 'Donato',
    issued: 'July 2025',
    credentialId: 'MAI S 4162',
    skills: ['Graphic Design'],
  },
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google',
    issued: 'December 2025',
    credentialId: 'HG57IU5HYK9E',
  },
];

export const profile = {
  name: 'Kaung Khant Ko',
  shortName: 'Kaung Khant Ko',
  role: 'Computer Science Student',
  location: 'Yangon, Myanmar',
  phone: '+959889750033',
  email: 'kaungkkhant06@gmail.com',
  website: 'https://kaungkhantko.top',
  linkedin: 'https://www.linkedin.com/in/kaungkhantko06/',
  cvUrl: '/kaung-khant-ko-linkedin-profile.pdf',
  heroLines: [
    'Computer Science Student.',
    'Junior Graphic Designer.',
    'TypeScript-focused builder.',
    'Design and technology crossover.',
  ],
  summary:
    'Creative junior graphic designer and student at Auston College with strong skills in visual design, branding, and programming. Experienced in social media, packaging, and poster design, with a strong interest in combining technology and design to create effective digital solutions.',
  skills: [
    'TypeScript',
    'Electronics',
    'Communication',
  ],
  languages: [
    'Chinese: Limited working proficiency',
    'English: Professional working proficiency',
    'Myanmar: Native or bilingual proficiency',
    'Rakhine: Native or bilingual proficiency',
  ],
  certifications,
  honors: [
    "People's Choice Award",
    'Nominated Artwork fro MAI',
    'Nominated Artwork For MAP',
  ],
  quickFacts: [
    { label: 'Current role', value: 'Student Ambassador at KBZPay' },
    { label: 'Design work', value: 'Junior Graphic Designer at Fuxing Brothers Company Ltd' },
    { label: 'Study track', value: 'Computer Science across Auston College and University College Birmingham' },
  ],
} as const satisfies {
  name: string;
  shortName: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  cvUrl: string;
  heroLines: string[];
  summary: string;
  skills: string[];
  languages: string[];
  certifications: CertificationItem[];
  honors: string[];
  quickFacts: { label: string; value: string }[];
};

export const education: EducationItem[] = [
  {
    award: 'Bachelor of Science - BS, Computer Science',
    institution: 'University College Birmingham',
    period: 'March 2026 - June 2028',
    details: [
      'Current degree path in computer science.',
      'Listed on the attached LinkedIn resume as the next stage of study.',
    ],
  },
  {
    award: 'Higher National Diploma, Computer Science',
    institution: 'Auston College',
    period: 'November 2025 - February 2028',
    details: [
      'Current diploma-level study in computer science.',
      'Supports a practical mix of programming and digital problem solving.',
    ],
  },
  {
    award: 'High School Diploma, Biology, General',
    institution: 'Family Private High School',
    period: 'June 2023 - March 2025',
    details: [
      'Completed high school study with a biology focus.',
    ],
  },
  {
    award: 'Diploma of English',
    institution: 'Wall Street English Myanmar',
    details: [
      'English Language and Literature, General.',
    ],
  },
];

export const experienceHighlights: ExperienceItem[] = [
  {
    title: 'Junior Graphic Designer',
    organization: 'Fuxing Brothers Company Ltd',
    period: 'August 2025 - Present',
    category: 'Design',
    location: 'Sittwe, Rakhine State, Myanmar',
    bullets: [
      'Collaborated with the design team to create visually appealing product designs and social media graphics.',
      'Developed engaging posters to enhance brand visibility and promotional efforts.',
      'Contributed to brainstorming sessions, ensuring creative ideas aligned with company goals.',
    ],
  },
  {
    title: 'Student Ambassador',
    organization: 'KBZPay',
    period: 'February 2026 - Present',
    category: 'Ambassador',
    bullets: [
      'Represents KBZPay in a student ambassador role.',
      'Adds campus-facing communication and outreach experience alongside design and technical work.',
    ],
  },
];
