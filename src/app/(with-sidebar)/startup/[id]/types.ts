export interface Startup {
  id: number;
  name: string;
  description: string;
  problem: string;
  solution: string;
  industry: string;
  location: string;
  teamSize: number;
  patent: string | null;
  funding: number | null;
  founder: {
    id: number;
    email: string;
    username: string;
    avatar: string;
    bio: string;
    type: string;
    skills: string[];
    linkedin: string | null;
    github: string | null;
  };
  jobs: Array<{
    id: number;
    title: string;
    description: string;
    requirements: string;
    skills: string[];
    experience: string;
    equity: number;
    type: string;
  }>;
} 