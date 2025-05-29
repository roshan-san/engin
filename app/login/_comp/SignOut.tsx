"use client"
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { signOut } from '../actions'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSignOut() {
    startTransition(async () => {
      const { redirect } = await signOut()
      router.push(redirect)
    })
  }

  return (
    <Button 
      onClick={handleSignOut}
      disabled={isPending}
      className="w-full"
    >
      <FaSignOutAlt className="mr-2 h-4 w-4" />
      {isPending ? "Signing Out..." : "Sign Out"}
    </Button>
  )
}
