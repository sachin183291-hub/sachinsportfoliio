
import { Project, Experience, Skill, Education, Certificate } from './types';

export const RESUME_URL = 'https://res.cloudinary.com/dhpfn4umb/image/upload/v1769144079/s9nskcv3ke3klvsoa0ud.jpg';

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Uzhavan fourm',
    description: 'An advanced AI agriculture platform for managing and optimizing farming operations. Features specialized integration for crop monitoring and yield prediction.',
    tags: ['Node.js', 'React', 'Prompt Engineering', 'MongoDB'],
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771484358/oegzvm1zk24m99ftpgst.png',
    liveUrl: 'https://uzhavanforum.vercel.app/',
    githubUrl: '#',
    category: 'Web'
  },
  {
    id: '1',
    title: 'Stay alert Drive safe',
    description: 'A comprehensive traffic safety application that provides real-time alerts and educational resources to promote safe driving habits. Utilizes AI for accident prediction and driver behavior analysis.',
    tags: ['Node.js', 'React', 'MongoDB', 'Express'],
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771484518/v5w2q5le81j8embe6er0.png',
    liveUrl: 'https://aic-anti-sleep-website-1-5z35.vercel.app/',
    githubUrl: '#',
    category: 'Web'
  },
  {
    id: '2',
    title: 'Personal Portfolio Website',
    description: 'A high-end, recruiter-ready portfolio built with Vite, React, and Tailwind CSS. Features glassmorphism UI, 3D animations, and an AI assistant.',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vite'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Web'
  },
  {
    id: '3',
    title: 'IoT Smart Greenhouse',
    description: 'Automated plant monitoring system using ESP32 and C. Includes a real-time HTML/CSS dashboard with automated irrigation triggers.',
    tags: ['C', 'ESP32', 'IoT', 'Hardware'],
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Other'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'c0',
    title: 'Internship Certificate ',
    issuer: 'MPeoples Business Solutions',
    date: '2025',
    image: 'https://res.cloudinary.com/dtj7ghsyt/image/upload/v1768228128/f3p5jp1yxoal9yzip4yx.jpg',
    category: 'Internship'
  },
  {
    id: 'c1',
    title: 'External hackthon',
    issuer: 'KPRinstitute of engineering and technology',
    date: '2024',
    image: 'https://res.cloudinary.com/dhpfn4umb/image/upload/v1769146718/mgrbetwf3flzpgcmvbmd.jpg',
    category: 'Technical'
  },
  {
    id: 'c5',
    title: 'Internal hackthon',
    issuer: 'M. Kumarasamy College of Engineering',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771484764/aqn1jjxpyl2zgobpqvkd.jpg',
    category: 'Technical'
  },
  {
    id: 'c2',
    title: 'Event Management Professional',
    issuer: 'College Event Board',
    date: '2025',
    image: 'https://res.cloudinary.com/dhpfn4umb/image/upload/v1769146615/hixuxhe3evl7rtsvl6vs.jpg',
    category: 'Soft Skill'
  }, // Fixed syntax error: Added missing comma between array elements
  {
    id: 'c3',
    title: 'Google Student',
    issuer: 'College Event',
    date: '2025',
    image: 'https://res.cloudinary.com/dhpfn4umb/image/upload/v1769146896/xxdw2zkcihivczkcigzq.jpg',
    category: 'Technical'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Fullstack Developer Internship',
    role: 'Fullstack Intern',
    period: 'June - July(2025)',
    description: [
      'Completed a 15-day intensive program at MPeoples Business Solutions.',
      'Gained hands-on experience in building dynamic and responsive web applications using React and Node.js.',
      'Developed and integrated RESTful APIs and managed databases using MySQL/MongoDB.',
      'Collaborated in a team environment to deliver functional projects within strict deadlines.'
    ]
  },
];

export const EDUCATION: Education[] = [
  {
    institution: 'M. Kumarasamy College of Engineering',
    degree: 'B.E. - Electronics and Communication Engineering',
    period: '2024 – 2028',
    location: 'Karur, TN',
    description: 'Specializing in circuit design, embedded systems, and communication technologies.'
  },
  {
    institution: 'Government Higher Secondary School (GHHS)',
    degree: 'Higher Secondary Education (HSC)',
    period: '2023 – 2024',
    location: 'Tamil Nadu',
    description: 'Secured a percentage of 75% in the State Board examinations.'
  },
  {
    institution: 'Model School, Veerapandi',
    degree: 'SSLC',
    period: '2021 – 2022',
    location: 'Veerapandi, Salem',
    description: 'Completed with strong academic performance in mathematics and science. Percentage: 68.5%'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Fullstack Dev', level: 55, icon: '🚀', category: 'Frontend' },
  { name: 'React / JS', level: 75, icon: '⚛️', category: 'Frontend' },
  { name: 'HTML / CSS', level: 90, icon: '🌐', category: 'Frontend' },
  { name: 'Node.js / Express', level: 70, icon: '🟢', category: 'Backend' },
  { name: 'Python / C', level: 88, icon: '💻', category: 'Backend' },
  { name: 'Prompt Engineering', level: 75, icon: '🧠', category: 'Tools' },
  { name: 'Arduino / IoT', level: 60, icon: '🔌', category: 'Tools' },
  { name: 'Web Accessibility', level: 85, icon: '♿', category: 'Tools' },
  { name: 'Web Design Tools', level: 75, icon: '🎨', category: 'Tools' }
];
