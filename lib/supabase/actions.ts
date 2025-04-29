'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Provider } from '@supabase/supabase-js'

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient()

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  })

  console.log(data)

  if (error) {
    console.log(error)
  }

  if (data.url) {
    redirect(data.url)
  }
}

const signinWithGoogle = signInWith('google')
const signinWithGithub = signInWith('github')

const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export { signinWithGoogle, signOut, signinWithGithub }