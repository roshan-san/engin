import * as z from "zod";

export const usernameSchema = z.object({
  username: z.string()
    .min(2, { message: "Username must be at least 2 characters" })
    .max(30, { message: "Username must be less than 30 characters" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Username can only contain letters, numbers, underscores, and hyphens"
    })
});

export const locationSchema = z.object({
  location: z.string()
    .min(2, { message: "Location must be at least 2 characters" })
    .max(100, { message: "Location must be less than 100 characters" })
});

export const userTypeSchema = z.object({
  user_type: z.enum(['Creator/Collaborator', 'Mentor', 'Investor'])
});

export const workTypeSchema = z.object({
  work_type: z.enum(['Full-Time', 'Part-Time', 'Contract'])
});

export const skillsSchema = z.object({
  skills: z.array(z.string()),
  interests: z.array(z.string())
});

export const contactSchema = z.object({
  github_url: z.string().url().optional(),
  linkedin_url: z.string().url().optional()
});

// Combined schema for the entire onboarding process
export const onboardingSchema = z.object({
  ...usernameSchema.shape,
  ...locationSchema.shape,
  ...userTypeSchema.shape,
  ...workTypeSchema.shape,
  ...skillsSchema.shape,
  ...contactSchema.shape
});

// Type exports
export type UsernameFormValues = z.infer<typeof usernameSchema>;
export type LocationFormValues = z.infer<typeof locationSchema>;
export type UserTypeFormValues = z.infer<typeof userTypeSchema>;
export type WorkTypeFormValues = z.infer<typeof workTypeSchema>;
export type SkillsFormValues = z.infer<typeof skillsSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
export type OnboardingFormValues = z.infer<typeof onboardingSchema>; 