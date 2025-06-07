"use client"
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSignOut() {
    try {
      startTransition(async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
      })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={handleSignOut}
      disabled={isPending}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}
