'use server'
import { createClient } from '@/supabase/server'
import { Provider } from '@supabase/supabase-js'
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

export { OauthSignIn, signOut, }