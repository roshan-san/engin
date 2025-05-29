'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signInWith(provider:"google"|"github"){
  console.log("hello yp started action yo")
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

  redirect(data.url as string)
}

const signinWithGoogle = signInWith('google')
const signinWithGithub = signInWith('github')

const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export { signinWithGoogle, signOut, signinWithGithub }