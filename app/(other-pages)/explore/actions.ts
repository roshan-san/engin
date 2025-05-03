"use server"

import { db } from "@/lib/db"
import { profiles } from "@/lib/db/schema"
import { and, ilike, or, sql } from "drizzle-orm"

const ITEMS_PER_PAGE = 10

export async function searchProfiles({
  query,
  page = 1,
}: {
  query?: string
  page?: number
}) {
  const offset = (page - 1) * ITEMS_PER_PAGE

  const whereClause = query
    ? or(
        ilike(profiles.full_name, `%${query}%`),
        ilike(profiles.username, `%${query}%`)
      )
    : undefined

  const [profilesList, totalCount] = await Promise.all([
    db
      .select()
      .from(profiles)
      .where(whereClause)
      .limit(ITEMS_PER_PAGE)
      .offset(offset)
      .orderBy(profiles.created_at),
    db
      .select({ count: sql<number>`count(*)` })
      .from(profiles)
      .where(whereClause)
      .then((res) => res[0]?.count ?? 0),
  ])

  return {
    profiles: profilesList,
    totalCount,
    hasMore: offset + profilesList.length < totalCount,
  }
} 