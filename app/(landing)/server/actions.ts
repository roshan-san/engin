"use server"
import { Profile, profiles } from "@/lib/db/schema"
import { createClient } from "@/lib/supabase/server"

import { db } from "@/lib/db/drizzle"
import { eq } from "drizzle-orm"
import { handleError } from "@/lib/utils"
import { redirect } from "next/navigation"

export async function handleOAuthLogin(provider: 'github' | 'google') {
  const supabase= await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })
  
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  } catch (error) {
    throw new Error(handleError(error))
  }

}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export async function createProfile(data: Profile) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not found")
  } 
  const profile = await db.insert(profiles).values({
    ...data,
    id: user.id,
    avatar_url: user.user_metadata.avatar_url || '',
    full_name:user.user_metadata.full_name || '',
    email: user.email || '',
  }).returning()
  return profile
}
export async function checkProfile(email: string){
  const result = await db.select()
    .from(profiles)
    .where(eq(profiles.email, email))
    .limit(1)
  
  return result.length > 0
}
