"use client"
import { Button } from '@/components/ui/button'
import { FaGoogle } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { OauthSignIn } from '@/lib/supabase/actions'

interface GoogleButtonProps {
  setStep?: (step: number) => void
}

export function GoogleButton({ setStep }: GoogleButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      try {
        await OauthSignIn('google')
        setStep?.(1)
      } catch (error) {
        console.error('Google sign in error:', error)
      }
    })
  }

  return (
    <Button 
      className="w-full h-10" 
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaGoogle className="mr-2 h-4 w-4" />}
      Sign in with Google
    </Button>
  )
} 