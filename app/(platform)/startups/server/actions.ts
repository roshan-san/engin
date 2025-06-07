"use server"
import { db } from '@/lib/db/drizzle'
import { Profile, profiles, startups,Startup } from '@/lib/db/schema'
import { handleError } from '@/lib/utils'
import { desc, eq, ilike, or } from 'drizzle-orm'

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
export async function getProfileById(user_id: string):Promise<Profile> {
  try {
    const userProfile = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user_id))
    .limit(1)
    return userProfile[0]
  } catch (error) {
    throw new Error(handleError(error))
  }
}


export async function getStartupWithFounder(startupId: string) {
  try {
    const startupData = await db
      .select()
      .from(startups)
      .where(eq(startups.id, startupId))
      .limit(1)

    if (!startupData.length) {
      throw new Error('Startup not found')
    }

    const startup = startupData[0]
    let founder = null

    if (startup.founderId) {
      const founderData = await db
        .select()
        .from(profiles)
        .where(eq(profiles.id, startup.founderId))
        .limit(1)

      if (founderData.length) {
        founder = founderData[0]
      }
    }

    return { startup, founder }
  } catch (error) {
    throw new Error(handleError(error))
  }
}

export async function getStartups(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit
  
  const [results, totalCount] = await Promise.all([
    db.select({
      id: startups.id,
      name: startups.name,
      location: startups.location,
      description: startups.description,
      problem: startups.problem,
      solution: startups.solution,
      teamSize: startups.teamSize,
      patent: startups.patent,
      funding: startups.funding,
      founderId: startups.founderId,
      created_at: startups.created_at,
    })
      .from(startups)
      .orderBy(desc(startups.created_at))
      .limit(limit)
      .offset(offset),
    db.select({ count: startups.id })
      .from(startups)
      .then(res => res.length)
  ])

  return {
    startups: results,
    nextPage: offset + limit < totalCount ? page + 1 : undefined,
    totalCount
  }
} 
