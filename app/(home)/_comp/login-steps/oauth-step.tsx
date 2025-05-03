"use client"
import { Button } from '@/components/ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { StepProps } from '../forms/login-form'
import { OauthSignIn } from '@/lib/supabase/actions'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

const OAuthStep = ({ handleNext, handlePrevious, setStep }: StepProps) => {
  const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null)

  const handleSubmit = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(provider)
      await OauthSignIn(provider)
      setStep?.(1)
    } catch (error) {
      console.error('OAuth sign in error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Welcome to Engin</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred sign in method</p>
      </div>

      <div className="space-y-4">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit('google')
        }}>
          <Button 
            className="w-full h-10" 
            variant="outline"
            type="submit"
            disabled={isLoading === 'google'}
          >
            {isLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaGoogle className="mr-2 h-4 w-4" />}
            Sign in with Google
          </Button>
        </form>
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit('github')
        }}>
          <Button 
            className="w-full h-10" 
            variant="outline"
            type="submit"
            disabled={isLoading === 'github'}
          >
            {isLoading === 'github' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaGithub className="mr-2 h-4 w-4" />}
            Sign in with Github
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OAuthStep