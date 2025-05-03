import { startups } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { useUserStore } from "@/lib/store/userStore"

export async function updateStartup(id: string, data: typeof startups.$inferSelect ) {
  const res = await db.update(startups).set(data).where(eq(startups.id, id))
  return res
}

export async function deleteStartup(id: string) {
    const res = await db.delete(startups).where(eq(startups.id, id))
    return res
}

export async function createStartup(data: typeof startups.$inferInsert) {
    const res = await db.insert(startups).values(data)
    return res
}

export async function getStartupById(id: string) {
    const res = await db.query.startups.findFirst({ where: eq(startups.id, id) })
    return res
}

export async function getStartupsForUser() {
    const userId = useUserStore.getState().userId
    if (!userId) throw new Error("User not authenticated")
    
    const res = await db.query.startups.findMany({ where: eq(startups.founderId, userId) })
    return res
}

