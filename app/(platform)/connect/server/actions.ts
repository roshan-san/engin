"use server"
import { db } from '@/lib/db/drizzle'
import { profiles } from '@/lib/db/schema'
import { desc, ilike, or } from 'drizzle-orm'
import { eq } from 'drizzle-orm'
import { connections } from '@/lib/db/schema'

export async function searchProfiles(searchText: string) {
  const searchPattern = `%${searchText}%`
  
  const results = await db
    .select()
    .from(profiles)
    .where(
      or(
        ilike(profiles.bio, searchPattern),
        ilike(profiles.location, searchPattern),
        ilike(profiles.full_name, searchPattern)
      )
    )
    .orderBy(desc(profiles.created_at))
    .limit(6)

  return results
}

export async function getConnectionRequests() {
  const session = await auth()
  if (!session?.user?.id) return []

  const requests = await db.query.connections.findMany({
    where: eq(connections.receiverId, session.user.id),
    with: {
      sender: true
    }
  })

  return requests
} 