'use server'

import { createClient } from '@/lib/supabase/server'
import { Provider } from '@supabase/supabase-js'

export async function OauthSignIn(provider: Provider) {
  const supabase = await createClient()

  const auth_callback_url = `${process.env.SITE_URL}/api/auth/callback`

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })
  console.log('OauthSignIn')

  if (error) {
    throw new Error(error.message)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}