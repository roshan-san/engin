"use server"

import { db } from "@/db"
import { startups } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function updateStartup(data: typeof startups.$inferSelect) {
  try {
    await db
      .update(startups)
      .set({
        name: data.name,
        description: data.description,
        problem: data.problem,
        solution: data.solution,
        teamSize: data.teamSize,
        patent: data.patent,
        funding: data.funding,
      })
      .where(eq(startups.id, data.id))

    // Revalidate the page to show updated data
    revalidatePath(`/startup/${data.id}`)
  } catch (error) {
    console.error("Failed to update startup:", error)
    throw new Error("Failed to update startup")
  }
} 