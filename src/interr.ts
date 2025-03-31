interface User {
    id: number;
    email: string;
    avatar: string;
    peru: string;
    username: string;
    bio: string;
    type: string;
    skills: string[];
    areasofinterest: string[];
    availableFor: string;
    location: string;
    linkedin: string | null;
    github: string | null;
    startups: Startup[];
    investments: Investment[];
    jobApplications: JobApplication[];
    sentConnections: Connection[];
    receivedConnections: Connection[];
    collaborations: Collaboration[];
    experiences: UserExperience[];
  }
  
  interface Startup {
    id: number;
    name: string;
    description: string;
    problem: string;
    solution: string;
    industry: string;
    location: string;
    teamSize: number;
    patent: string;
    funding: number;
    founderId: number;
    founder: User;
    jobs: Job[];
    investments: Investment[];
    collaborations: Collaboration[];
  }
  
  interface Investment {
    id: number;
    userId: number;
    startupId: number;
    amount: number;
    user: User;
    startup: Startup;
  }
  
  interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    skills: string[];
    experience: string;
    equity: number;
    type: string;
    startupId: number;
    startup: Startup;
    applications: JobApplication[];
  }
  
  interface JobApplication {
    id: number;
    userId: number;
    jobId: number;
    status: string;
    user: User;
    job: Job;
  }
  
  interface Connection {
    id: number;
    senderId: number;
    receiverId: number;
    status: string;
    sender: User;
    receiver: User;
  }
  
  interface JobRole {
    id: number;
    name: string;
    collaborations: Collaboration[];
  }
  
  interface Collaboration {
    id: number;
    userId: number;
    startupId: number;
    roleId: number;
    user: User;
    startup: Startup;
    role: JobRole;
  }
  
  interface UserExperience {
    id: number;
    userId: number;
    company: string;
    role: string;
    startDate: Date;
    endDate: Date | null;
    description: string | null;
    user: User;
  }