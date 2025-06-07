"use server"
import { db } from '@/lib/db/drizzle'
import { profiles, startups } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { createClient } from '@/lib/supabase/server'
import { Startup } from '@/lib/db/schema'

export async function getMyStartups() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("Unauthorized")
  }

  const userStartups = await db
    .select()
    .from(startups)
    .where(eq(startups.founderId, user.id))

  return userStartups
}

export async function createStartup(data: Partial<Startup>) {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Log the data
  console.log('Creating startup with data:', data)
  
  // Simulate random success/failure (80% success rate)
  const isSuccess = Math.random() < 0.8
  
  if (!isSuccess) {
    throw new Error('Failed to create startup')
  }
  
  // Return a dummy response
  return {
    ...data,
    id: Math.random().toString(36).substring(7),
    created_at: new Date(),
    founderId: 'dummy-founder-id'
  } as Startup
}


    
