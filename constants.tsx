
import { Project, Experience, Skill, Education, Certificate, Achievement, ConsultancyProject } from './types';

export const RESUME_URL = 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771496850/sxpg3xypcvfqqoxiabgq.jpg';

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Uzhavan Forum',
    description: 'An AI-based agriculture platform for managing and optimizing farming operations, with specialized integration for crop monitoring and yield prediction.',
    tags: ['Node.js', 'React', 'Prompt Engineering', 'MongoDB'],
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771484358/oegzvm1zk24m99ftpgst.png',
    liveUrl: 'https://uzhavan-forum-15.vercel.app/',
    githubUrl: '',
    category: 'AI'
  },
  {
    id: '1',
    title: 'Stay Alert Drive Safe',
    description: 'A traffic safety application that provides real-time alerts and educational resources to promote safe driving habits, using AI for accident prediction and driver behaviour analysis.',
    tags: ['Node.js', 'React', 'MongoDB', 'AI'],
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771484518/v5w2q5le81j8embe6er0.png',
    liveUrl: 'https://aic-anti-sleep-website-1-5z35.vercel.app/',
    githubUrl: 'https://github.com/sachin183291-hub/aic-anti-sleep-website--1-',
    category: 'AI'
  },
  {
    id: '2',
    title: 'Personal Portfolio Website',
    description: 'A recruiter-ready portfolio website with glassmorphism UI, 3D animations, and an AI assistant.',
    tags: ['React', 'Vite', 'Framer Motion', 'Prompt Engineering'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/sachin183291-hub',
    category: 'Web'
  },
  {
    id: '3',
    title: 'IoT Smart Greenhouse',
    description: 'Automated plant monitoring system using ESP32 and C. Includes a real-time HTML/CSS dashboard with automated irrigation triggers based on soil moisture, temperature and humidity sensors.',
    tags: ['C', 'ESP32', 'IoT', 'Hardware'],
    image: 'https://res.cloudinary.com/dec4vnmzg/image/upload/v1775581639/ttcegwnuqsnz2ascu5qv.png',
    images: [
      'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800',
    ],
    liveUrl: '#',
    githubUrl: '#',
    category: 'Hardware'
  }
];

export const CONSULTANCY_PROJECTS: ConsultancyProject[] = [
  {
    id: 'cp1',
    title: 'Poultry Management',
    client: 'KR GROUPS',
    description: 'Implemented real-time poultry detection and automated health monitoring using computer vision models.',
    technologies: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cp2',
    title: 'Website Development',
    client: 'RootView Technologies',
    description: 'Developed a high-performance, responsive corporate website as part of a professional software development team.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'c0',
    title: 'Internship Certificate',
    issuer: 'MPeoples Business Solutions',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771497742/qpsjfcz2abgmabazlcja.jpg',
    category: 'Internship'
  },
  {
    id: 'c1',
    title: 'External hackthon',
    issuer: 'KPRinstitute of engineering and technology',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771497827/ggospcaanduch7svpu2u.jpg',
    category: 'Technical',
  },
  {
    id: 'c6',
    title: 'External 24hrs hackthon',
    issuer: 'NGP Institute of Technology',
    date: '2026',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771524100/bctx4gp9a3z9g6xlikc7.jpg',
    category: 'Technical'
  },
  {
    id: 'c5',
    title: 'Internal hackthon',
    issuer: 'M. Kumarasamy College of Engineering',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771524035/jr9kfykqpmow5rnsfzam.jpg',
    category: 'Technical'
  },
  {
    id: 'c7',
    title: 'Project Expo',
    issuer: 'College Event Board',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771523753/czmvaetll7fzwirsgf3x.jpg',
    category: 'Soft Skill'
  },
  {
    id: 'c2',
    title: 'Event Management Professional',
    issuer: 'College Event Board',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771522989/bvwwnljkzgbxnwpwm7uw.jpg',
    category: 'Soft Skill'
  },
  {
    id: 'c3',
    title: 'Google Student',
    issuer: 'College Event',
    date: '2025',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771497865/femst5qoegkl1ogvxfvm.jpg',
    category: 'Technical'
  },
  {
    id: 'c-nptel-cloud',
    title: 'Cloud Computing (NPTEL)',
    issuer: 'NPTEL',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    category: 'Technical'
  },
  {
    id: 'c-syn-py',
    title: 'Python Full Stack Development',
    issuer: 'Synovers Technologies',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    category: 'Technical'
  },
  {
    id: 'c-nptel-smart',
    title: 'Smart Cities (NPTEL)',
    issuer: 'NPTEL',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=800',
    category: 'Technical'
  },
  {
    id: 'c-syn-ml',
    title: 'Machine Learning & Deep Learning',
    issuer: 'Synovers Technologies',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    category: 'Technical'
  },
  {
    id: 'c-nptel-sec',
    title: 'Cyber Security and Privacy (NPTEL)',
    issuer: 'NPTEL',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    category: 'Technical'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Zeboto',
    role: 'Machine Learning with Full Stack Intern',
    period: 'September – October 2026 (40 Days)',
    description: [
      'Developed an AI-powered Farmer Support and Crop Recommendation System.',
      'Implemented crop prediction and plant disease detection using Machine Learning.',
      'Worked with: Python, Machine Learning, React.js, Node.js, and MongoDB.'
    ]
  },
  {
    company: 'Synovers Technologies',
    role: 'Machine Learning with Full Stack Intern',
    period: 'June – August 2026 (3 Months)',
    description: [
      'Developed a company website and comprehensive company management application.',
      'Built an ML-based Windmill Management Website for real-time monitoring and analytics.',
      'Worked with Python, Machine Learning, REST APIs, Frontend, Backend, and Database Integration.'
    ]
  },
  {
    company: 'MPeoples Business Solutions',
    role: 'Fullstack Developer Intern',
    period: 'June – July 2025 (15 Days)',
    description: [
      'Completed a 15-day intensive internship building dynamic, responsive web applications using React and Node.js.',
      'Developed and integrated RESTful APIs and managed databases using MySQL / MongoDB.',
      'Collaborated in a team to deliver functional projects within strict deadlines.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    institution: 'M. Kumarasamy College of Engineering, Karur, Tamil Nadu',
    degree: 'B.E. Electronics and Communication Engineering',
    period: '2024 – 2028',
    location: 'Karur, Tamil Nadu',
    description: 'CGPA: 7.76 (5th Sem ongoing). Specializing in Artificial Intelligence and Software Development.'
  },
  {
    institution: 'Government Higher Secondary School, Salem, Tamil Nadu',
    degree: 'Higher Secondary (HSC)',
    period: '2024',
    location: 'Salem, Tamil Nadu',
    description: 'Secured 75% in the State Board examinations.'
  },
  {
    institution: 'Model School, Veerapandi, Salem, Tamil Nadu',
    degree: 'SSLC',
    period: '2022',
    location: 'Salem, Tamil Nadu',
    description: 'Completed Secondary School Leaving Certificate with 69%.'
  }
];

export const SKILLS: Skill[] = [
  // Programming & Backend
  { name: 'Python', level: 90, icon: '🐍', category: 'Backend' },
  { name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
  { name: 'C', level: 75, icon: '💻', category: 'Backend' },
  { name: 'Java', level: 70, icon: '☕', category: 'Backend' },
  { name: 'JavaScript', level: 88, icon: '⚡', category: 'Frontend' },

  // Web / Frontend
  { name: 'React', level: 88, icon: '⚛️', category: 'Frontend' },
  { name: 'HTML / CSS', level: 92, icon: '🌐', category: 'Frontend' },
  { name: 'Framer Motion', level: 82, icon: '✨', category: 'Frontend' },

  // Databases & ML / DL / Tools
  { name: 'Machine Learning / DL', level: 85, icon: '🤖', category: 'Tools' },
  { name: 'TensorFlow / scikit-learn', level: 80, icon: '📊', category: 'Tools' },
  { name: 'OpenCV / Vision', level: 78, icon: '👁️', category: 'Tools' },
  { name: 'MySQL / MongoDB / SQLite', level: 84, icon: '🗄️', category: 'Backend' },
  { name: 'Prompt Engineering', level: 86, icon: '🧠', category: 'Tools' },
  { name: 'Arduino / ESP32', level: 75, icon: '🔌', category: 'Tools' },
  { name: 'GitHub / Figma / Canva', level: 85, icon: '🛠️', category: 'Tools' },

  // Personal Strengths / Soft Skills
  { name: 'Quick Learning & Adaptability', level: 95, icon: '💡', category: 'Soft Skills' },
  { name: 'Problem-Solving Skills', level: 90, icon: '🧩', category: 'Soft Skills' },
  { name: 'Teamwork & Collaboration', level: 92, icon: '🤝', category: 'Soft Skills' },
  { name: 'Time Management', level: 88, icon: '⏱️', category: 'Soft Skills' }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Winner - External 24-hour Hackathon',
    organization: 'Erode Sengunthar Engineering College',
    year: '2026',
    category: 'Hackathon',
    image: 'https://user31119.na.imgto.link/public/20261112/b1d4fe436fb5001664a6a786-whatsapp-image-2026-11-11-at-10-36-34-pm.avif'
  },
  {
    title: 'Runner-up - Internal Ideathon',
    organization: 'M. Kumarasamy College of Engineering',
    year: '2026',
    category: 'Hackathon',
    image: 'https://res.cloudinary.com/dwi2j4pju/image/upload/v1771524035/jr9kfykqpmow5rnsfzam.jpg'
  },
  {
    title: 'Winner – Internal Hackathon',
    organization: 'M. Kumarasamy College of Engineering',
    year: '2025',
    category: 'Hackathon',
    image: 'https://user31119.na.imgto.link/public/20261112/31a62a9c0d5a1961753e9cd0-whatsapp-image-2026-11-11-at-10-44-44-pm.avif'
  },
  {
    title: 'Special Prize - Project Expo',
    organization: 'College Event Board, M. Kumarasamy College of Engineering',
    year: '2025',
    category: 'Award',
    image: 'https://user31119.na.imgto.link/public/20261112/d06f3bc19de54998053d75b2-whatsapp-image-2026-11-11-at-10-38-43-pm.avif'
  }
];

