"use server"

import { createClient } from "@/supabase/client"
import { Profile } from "@/types"

const createProfile = async (profileData: Profile) => {
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
  
