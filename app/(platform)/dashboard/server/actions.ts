"use server"
import { db } from '@/lib/db/'
import { startups } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Startup } from '@/lib/db/schema'
import { safeWrap } from '@/lib/utils/error-handler'

export async function getMyStartups(id:string) {

  return safeWrap(async function () {
    const userStartups = await db
      .select()
      .from(startups)
      .where(eq(startups.founderId,id))
      return userStartups 
    },"error on get my startups SA")
}

export async function createStartup(data: Startup) {
  return safeWrap(
    async function () {
      await db.insert(startups).values(data)
    },
    "error on create my startups SA"
  )
}


    
