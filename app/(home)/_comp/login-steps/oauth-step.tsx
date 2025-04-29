import { Button } from '@/components/ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { createClient } from '@/supabase/client'
import { useQuery } from '@tanstack/react-query'
import { Provider } from '@supabase/supabase-js'
import { StepProps } from '../forms/login-form'

const OAuthStep = ({ onNext, setStep }: StepProps) => {
  const supabase = createClient()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }
  })

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()
      
      if (error) throw error
      return data
    },
    enabled: !!user
  })

  const handleOAuthSignIn = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`
      }
    })
    if (error) console.error('OAuth error:', error)
  }

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
            variant="outline"
            onClick={() => handleOAuthSignIn('google')}
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
          <Button 
            className="w-full h-10" 
            variant="outline"
            onClick={() => handleOAuthSignIn('github')}
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