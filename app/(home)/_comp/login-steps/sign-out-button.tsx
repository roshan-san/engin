"use client"
import React from 'react'
import { signOut } from '@/lib/supabase/actions'
import { Button } from '../../../../components/ui/button'
import { Loader2 } from 'lucide-react'

export default function SignOutButton( {onPrevious}: {onPrevious: () => void} ) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
      onPrevious()
    }
  }

  return (
    <Button 
      className="w-full h-10" 
      variant="outline"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Sign Out
    </Button>
  )
}