// types.ts

export type User = {
    Id:number
    email: string;
    avatar: string ;
    peru: string ;
    username: string;
    bio: string ;
    type: string;
    skills: string[];
    areasofinterest: string[];
    availableFor: string;
    location: string;
    linkedin: string | null;
    github: string | null;
    startups?: Startup[];
    investments?: Investment[];
    jobApplications?: JobApplication[];
    connections?: Connection[];
    collaborations?: Collaboration[];
    experiences?: UserExperience[];
  };
  
  export type Startup = {
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
    founderId: number;
    founder: User;
    jobs?: Job[];
    investments?: Investment[];
    collaborations?: Collaboration[];
  };
  
  export type Investment = {
    id: number;
    userId: number;
    startupId: number;
    amount: number;
    user: User;
    startup: Startup;
  };
  
  export type Job = {
    id: number;
    title: string;
    description: string | null;
    requirements: string;
    skills: string[];
    experience: string;
    equity: number;
    type: string;
    startupId: number;
    startup: Startup;
    applications?: JobApplication[];
  };
  
  export type JobApplication = {
    id: number;
    userId: number;
    jobId: number;
    status: string;
    user: User;
    job: Job;
  };
  
  export type Connection = {
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    sender: User;
  };
  
  export type JobRole = {
    id: number;
    name: string;
    collaborations?: Collaboration[];
  };
  
  export type Collaboration = {
    id: number;
    userId: number;
    startupId: number;
    roleId: number;
    user: User;
    startup: Startup;
    role: JobRole;
  };
  
  export type UserExperience = {
    id: number;
    userId: number;
    company: string;
    role: string;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    user: User;
  };