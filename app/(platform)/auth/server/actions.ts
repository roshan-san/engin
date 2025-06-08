"use server"

import { db } from '@/lib/db/drizzle'
import { profiles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function checkUserProfile(userId: string) {
  try {
    const userProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1)
    
    return !!userProfile.length
  } catch (error) {
    console.error('Error checking user profile:', error)
    return false
  }
} 