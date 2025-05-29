"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FaGoogle } from "react-icons/fa"
import { googleSignin } from "../actions"

export function GoogleLoginButton() {
    const [isPending, startTransition] = useTransition()
  
    const handleLogin = () => {
      startTransition(() => {
        googleSignin()
      })
    }
  
    return (
      <Button 
        onClick={handleLogin}
        disabled={isPending}
        className="w-full"
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        {isPending ? "Signing in..." : "Sign in with Google"}
      </Button>
    )
  }