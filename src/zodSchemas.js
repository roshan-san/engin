import { z } from "zod";

// User Schema
export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  avatar: z.string().url(),
  peru: z.string().min(1),
  username: z.string().min(1),
  bio: z.string().min(1),
  type: z.string().min(1),
  skills: z.array(z.string()),
  areasofinterest: z.array(z.string()),
  availableFor: z.string().min(1),
  location: z.string().min(1),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
});

// Startup Schema
export const StartupSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  description: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  industry: z.string().min(1),
  location: z.string().min(1),
  teamSize: z.number().int().nonnegative(),
  patent: z.string().min(1),
  funding: z.number().int().nonnegative(),
  founderId: z.number().int().positive(),
});

// Investment Schema
export const InvestmentSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  startupId: z.number().int().positive(),
  amount: z.number().positive(),
});

// Job Schema
export const JobSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  requirements: z.string().min(1),
  skills: z.array(z.string()),
  experience: z.string().min(1),
  equity: z.number().nonnegative(),
  type: z.string().min(1),
  startupId: z.number().int().positive(),
});

// Job Application Schema
export const JobApplicationSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  jobId: z.number().int().positive(),
  status: z.enum(["pending", "accepted", "rejected"]),
});

// Connection Schema
export const ConnectionSchema = z.object({
  id: z.number().int().positive(),
  senderId: z.number().int().positive(),
  receiverId: z.number().int().positive(),
  status: z.enum(["pending", "accepted", "rejected"]),
});

// Job Role Schema
export const JobRoleSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

// Collaboration Schema
export const CollaborationSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  startupId: z.number().int().positive(),
  roleId: z.number().int().positive(),
});

// User Experience Schema
export const UserExperienceSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string().optional(),
});
