"use server"
import { db } from '@/lib/db/drizzle'
import { startups, type Startup } from '@/lib/db/schema'
import { desc, ilike, or } from 'drizzle-orm'

export async function searchStartups(searchText: string): Promise<Startup[]> {
 
  const searchPattern = `%${searchText}%`
  
  const results = await db
    .select()
    .from(startups)
    .where(
      or(
        ilike(startups.name, searchPattern),
        ilike(startups.description, searchPattern),
        ilike(startups.problem, searchPattern),
        ilike(startups.solution, searchPattern),
        ilike(startups.location, searchPattern)
      )
    ).orderBy(desc(startups.created_at))
    .limit(6)

  return results
}
