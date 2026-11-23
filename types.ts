
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  images?: string[]; // optional: multiple images for slideshow
  liveUrl: string;
  githubUrl: string;
  category: 'Web' | 'Mobile' | 'AI' | 'Hardware' | 'Consultancy' | 'Other';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  // Fixed type error: Added 'Internship' to the allowed category values
  category: 'Hackathon' | 'Technical' | 'Soft Skill' | 'Internship';
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  category: 'Hackathon' | 'Award';
  image?: string;
}

export interface ConsultancyProject {
  id: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  image: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
