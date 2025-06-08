"use server"
import { db } from '@/lib/db/'
import { connections, connectionStatusEnum, profiles } from '@/lib/db/schema'
import { eq, and, ilike, or } from 'drizzle-orm'
import { createClient } from '@/lib/supabase/client'

export async function searchProfiles(searchText: string) {
  const searchPattern = `%${searchText}%` 
  
  const results = await db
    .select()
    .from(profiles)
    .where(
      or(
        ilike(profiles.full_name, searchPattern),
        ilike(profiles.username, searchPattern),
        ilike(profiles.bio, searchPattern),
        ilike(profiles.location, searchPattern)
      )
    )
    .limit(10)

  return results
}

export async function getConnectionRequests() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  const requests = await db
    .select()
    .from(connections)
    .where(and(
      eq(connections.receiverId, user.id),
      eq(connections.status, 'pending')
    ))

  return requests
} 