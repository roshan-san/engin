import React from 'react'
import { signOut } from '@/supabase/actions'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/ui/button'

export default function SignOutButton() {
  const router = useRouter()

  return (
  <Button onClick={signOut}>Sign Out</Button>
  )
}
