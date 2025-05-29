"use client"
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import { useTransition } from 'react'
import { OauthSignIn } from '@/lib/supabase/actions'

interface GithubButtonProps {
  setStep?: (step: number) => void
}

export function GithubButton({ setStep }: GithubButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      try {
        await OauthSignIn('github')
        setStep?.(1)
      } catch (error) {
        console.error('GitHub sign in error:', error)
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
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaGithub className="mr-2 h-4 w-4" />}
      Sign in with Github
    </Button>
  )
} 