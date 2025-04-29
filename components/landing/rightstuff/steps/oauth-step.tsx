'use client'
import { Button } from '@/components/ui/button'
import { signinWithGithub, signinWithGoogle } from '@/lib/supabase/actions'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { StepProps } from '../login-form'
import { createClient } from '@/lib/supabase/client'
import { useEffect } from 'react'

const OAuthStep = ({ onNext, setStep }: StepProps) => {
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      console.log('OAuthStep: Checking user status')
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        console.log('OAuthStep: User is authenticated, checking profile existence')
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)

        if (error) {
          console.error('OAuthStep: Error fetching profile:', error)
          return
        }

        if (!data || data.length === 0) {
          console.log('OAuthStep: Setting step to 1 (profile not found)')
          setStep?.(1)
        } else {
          console.log('OAuthStep: Profile exists, staying on current step')
        }
      } else {
        console.log('OAuthStep: User is not authenticated')
      }
    }

    checkSession()
  }, [setStep, supabase])

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Welcome to Engin</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred sign in method</p>
      </div>

      <div className="space-y-4">
        <form className="space-y-4">
          <Button 
            className="w-full h-10" 
            formAction={signinWithGoogle}
            variant="outline"
            onClick={() => console.log('OAuthStep: Google sign in clicked')}
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Button 
            className="w-full h-10" 
            formAction={signinWithGithub}
            variant="outline"
            onClick={() => console.log('OAuthStep: GitHub sign in clicked')}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Sign in with Github
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OAuthStep