'use server';

import { db } from "@/lib/db";
import { startups } from "@/lib/db/schema";
import { desc, lt, ilike, or, and } from "drizzle-orm";

export type StartupWithPagination = {
  startups: typeof startups.$inferSelect[];
  nextCursor: string | null;
};

export async function getStartups(
  cursor?: string, 
  limit: number = 10,
  search?: string
): Promise<StartupWithPagination> {
  const cursorDate = cursor ? new Date(cursor) : undefined;

  const results = await db.query.startups.findMany({
    orderBy: [desc(startups.created_at)],
    limit: limit + 1,
    where: (startups) => {
      const conditions = [];
      
      if (cursorDate) {
        conditions.push(lt(startups.created_at, cursorDate));
      }
      
      if (search) {
        conditions.push(
          or(
            ilike(startups.name, `%${search}%`),
            ilike(startups.description, `%${search}%`),
            ilike(startups.location, `%${search}%`)
          )
        );
      }
      
      return conditions.length > 0 ? and(...conditions) : undefined;
    },
  });

  const hasNextPage = results.length > limit;
  const items = hasNextPage ? results.slice(0, -1) : results;
  const nextCursor = hasNextPage ? items[items.length - 1].created_at.toISOString() : null;

  return {
    startups: items,
    nextCursor,
  };
}
