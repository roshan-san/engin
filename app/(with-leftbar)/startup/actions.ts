import { startups } from "@/db/schema"
import { db } from "@/db"
import { eq } from "drizzle-orm"

export async function updateStartup(id: string, data: typeof startups.$inferSelect ) {
  const startup = await db.update(startups).set(data).where(eq(startups.id, id))
  return startup
}

export async function deleteStartup(id: string) {
    const startup = await db.delete(startups).where(eq(startups.id, id))
    return startup
}

export async function createStartup(data: typeof startups.$inferInsert) {
    const startup = await db.insert(startups).values(data)
    return startup
}

export async function getStartupById(id: string) {
    const startup = await db.query.startups.findFirst({ where: eq(startups.id, id) })
    return startup
}
