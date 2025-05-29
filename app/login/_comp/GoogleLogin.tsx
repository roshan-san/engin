"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FaGithub } from "react-icons/fa"
import { signinWithGoogle } from "../actions"

export function GoogleLoginButton() {
    const [isPending, startTransition] = useTransition()
  
    const handleLogin = async () => {
        startTransition(async () => 
             signinWithGoogle
        )
    }
  
    return (
        <div className="w-full">
            <Button 
                onClick={handleLogin}
                disabled={isPending}
                className="w-full"
            >
                <FaGithub className="mr-2 h-4 w-4" />
                {isPending ? "Signing in..." : "Sign in with Google"}
            </Button>
        </div>
    )
}