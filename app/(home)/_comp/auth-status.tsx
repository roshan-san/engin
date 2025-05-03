"use client"
import { useUserStore } from '@/lib/store/userStore'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AuthStatus() {
  const { user } = useUserStore()
  const router = useRouter()

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">Not signed in</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => router.push('/')}
        >
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Signed in as {user.email}
      </p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => router.push('/dashboard')}
      >
        Go to Dashboard
      </Button>
    </div>
  )
} 