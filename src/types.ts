export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'Web Dev' | 'Systems' | 'AI & ML' | 'DSA';
  simulationType: 'sorting' | 'database' | 'networking' | 'none';
  githubUrl?: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
  keyFeatures?: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Languages' | 'Frontend' | 'Backend & DB' | 'Core CS Fundamentals' | 'Developer Tools';
  iconName: string; // matches lucide-react icon names
  colorClass: string; // color styles for gradients
  bgGlowClass: string; // tailwind overlay
}

export interface Milestone {
  id: string;
  semester: string;
  period: string;
  title: string;
  subtitle: string;
  achievements: string[];
  type: 'academic' | 'hackathon' | 'internship';
  badgeColor: string;
}

export interface CodingStat {
  label: string;
  value: string;
  subText: string;
  iconName: string;
  colorClass: string;
}
