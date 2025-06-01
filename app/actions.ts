"use server"

import { db } from "@/lib/db/drizzle"
import { profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { userTypeEnum, employmentTypeEnum } from "@/lib/db/schema"

export async function checkProfileExists(email: string): Promise<boolean> {
  try {
    const result = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.email, email))
      .limit(1)

    return result.length > 0
  } catch (error) {
    console.error("Error checking profile existence:", error)
    return false
  }
}

type CreateProfileInput = {
  email: string
  username: string
  full_name: string
  avatar_url: string
  bio: string
  location: string
  user_type: typeof userTypeEnum.enumValues[number]
  employment_type: typeof employmentTypeEnum.enumValues[number]
  github_url?: string
  linkedin_url?: string
  skills?: string[]
  interests?: string[]
}

export async function createProfile(data: CreateProfileInput) {
  try {
    // First check if profile already exists
    const exists = await checkProfileExists(data.email)
    if (exists) {
      throw new Error("Profile with this email already exists")
    }

    // Create the profile
    const [profile] = await db
      .insert(profiles)
      .values({
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        bio: data.bio,
        location: data.location,
        user_type: data.user_type,
        employment_type: data.employment_type,
        github_url: data.github_url,
        linkedin_url: data.linkedin_url,
        skills: data.skills,
        interests: data.interests,
      })
      .returning()

    return { success: true, profile }
  } catch (error) {
    console.error("Error creating profile:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create profile" 
    }
  }
}
