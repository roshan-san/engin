"use server"
import { db } from '@/lib/db/drizzle'
import { profiles, startups } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { createClient } from '@/lib/supabase/server'

export async function getMyStartups() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const userStartups = await db
    .select()
    .from(startups)
    .where(eq(startups.founderId, user.id))

  return userStartups
}

export async function getUserById(user_id: string) {
  const userProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user_id))

  if (!userProfile.length) {
    throw new Error("User not found")
  }

  return userProfile
}

    
