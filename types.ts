import { z } from 'zod';

export const UserTypeEnum = z.enum(['Creator/Collaborator', 'Mentor', 'Investor']);
export const EmploymentTypeEnum = z.enum(['Full Time', 'Part Time', 'Contract']);


export type UserType = 'Creator/Collaborator' | 'Mentor' | 'Investor';
export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract';

export interface Profile {
    id: string;
    full_name: string;
    avatar_url: string;
    username: string;
    bio: string;
    skills: string[];
    interests: string[];
    user_type: UserType;
    location: string;
    employement_type: EmploymentType;
    linkedin_url?: string;
    github_url?: string;
}

