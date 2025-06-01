"use server"

import { profiles } from "@/lib/db/schema"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db/drizzle"

export async function handleOAuthLogin(provider: 'github' | 'google') {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
export async function createProfile(data: {
  avatar_url: string;
  email: string;
  username: string;
  location: string;
  user_type: 'Creator/Collaborator' | 'Investor' | 'Mentor';
  employment_type: 'Full-Time' | 'Part-Time' | 'Contract';
  full_name: string;
  github_url?: string | null;
  linkedin_url?: string | null;
  bio?: string | null;
  skills?: string[] | null;
  interests?: string[] | null;
}) {
  const profile = await db.insert(profiles).values(data).returning()
  return profile
}
