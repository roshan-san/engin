"use server"
import { Profile, profiles } from "@/lib/db/schema"
import { createClient } from "@/lib/supabase/server"
import { db } from "@/lib/db/drizzle"
import { eq } from "drizzle-orm"
import { safeWrap } from "@/lib/utils/error-handler"

export async function createProfile(data: Profile) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not found")
  } 
  const profile = await db.insert(profiles).values({
    ...data,
    id: user.id,
    avatar_url: user.user_metadata.avatar_url || '',
    full_name:user.user_metadata.full_name || '',
    email: user.email || '',
  }).returning()
  return profile
}


//returns the existence of email in profile table
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
