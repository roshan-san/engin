'use server'

import { createClient } from '@/supabase/server'
import { Profile } from '@/types'

export async function createProfile(profileData: Partial<Profile>) {
  try {
    const supabase = await createClient()
    
    // const { data: { user } } = await supabase.auth.getUser()
    // if (!user) {
    //   throw new Error('Unauthorized')
    // }

    const { error } = await supabase
      .from('profiles')
      .insert({
        id:"",
        ...profileData,
      })

    if (error) {
      console.log(error.message)
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Error creating profile:', error)
    throw error
  }
} 