"use server"
import { Profile, profiles } from "@/lib/db/schema"
import { db } from "@/lib/db/"
import { eq } from "drizzle-orm"
import { safeWrap } from "@/lib/utils/error-handler"

export async function createProfile(data: Profile) {
  safeWrap(
    async function () {
      await db.insert(profiles).values(data)
    },"Failed to create startup SA"
  )
}

export async function checkProfile(email: string): Promise<boolean> {
  return safeWrap(
    async () => {
      const result = await db.select()
        .from(profiles)
        .where(eq(profiles.email, email))
        .limit(1)
      
      return result.length > 0
    },
    "Failed to check profile"
  )
}
