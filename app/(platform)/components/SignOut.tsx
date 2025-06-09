import { Button } from '@/components/ui/button'
import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'

export default function SignOutButton() {
  const {logout}= useAuthContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => logout()}
    >
        <LogOut className="h-5 w-5" />
    </Button>
  )
}
