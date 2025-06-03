"use client"
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { signOut } from '../../(landing)/server/actions'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  async function handleSignOut() {
    startTransition(async () => {
      await signOut()
    })
  }

  return (
    <Button
    variant="ghost"
    size="icon"
    className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
    onClick={() => handleSignOut()}
  >
    <LogOut className="h-5 w-5" />
  </Button>
  )
}
