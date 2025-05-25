"use client"
import React, { useTransition } from 'react'
import { signOut } from '@/lib/supabase/actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function SignOutButton({ onPrevious }: { onPrevious: () => void }) {
  const [isPending, startTransition] = useTransition()

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut()
      onPrevious()
    })
  }

  return (
    <Button 
      className="w-full sm:w-auto" 
      variant="ghost"
      onClick={handleSignOut}
      disabled={isPending}
      size="default"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing out...
        </>
      ) : (
        'Sign Out'
      )}
    </Button>
    
  )
}