'use server'
import { createClient } from '@/lib/supabase/server'
import { Provider } from '@supabase/supabase-js'
import { Profile } from '@/types'

const OauthSignIn = (provider: Provider) => async () => {
  const supabase = await createClient()

  const auth_callback_url = `${process.env.SITE_URL}/api/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })
}

const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

const createProfile = async (profileData: Partial<Profile>) => {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
}

export { OauthSignIn, signOut, createProfile }