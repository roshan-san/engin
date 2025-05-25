"use server"
import { db } from "@/lib/db"
import { profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function createProfile(data: typeof profiles.$inferSelect) {
  try {
    const profile = await db.insert(profiles).values(data).returning()
    return profile[0]
  } catch (error) {
    console.error("Error creating profile:", error)
    throw new Error("Failed to create profile")
  }
}

export async function getProfile(id: string) {
    const profile = await db.query.profiles.findFirst({
        where: eq(profiles.id, id)
    })
    return profile
}

export async function updateProfile(id: string, data: typeof profiles.$inferSelect) {
    const profile = await db.update(profiles).set(data).where(eq(profiles.id, id)).returning()
    return profile
}

export async function deleteProfile(id: string) {
    const profile = await db.delete(profiles).where(eq(profiles.id, id)).returning()
    return profile
}

