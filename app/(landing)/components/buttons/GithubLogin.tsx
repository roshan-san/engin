"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { createClient } from "@/lib/supabase/client"

export function GithubLoginButton() {
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()
  
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`
                }
            })
            if (error) throw error
        } catch (error) {
            console.error('Error signing in with GitHub:', error)
            setIsLoading(false)
        }
    }

    return (
            <Button 
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-[#24292F] hover:bg-[#2C3238] text-white"
            >
                <FaGithub className="h-5 w-5" />
                <span className="text-base">
                    {isLoading ? "Signing in..." : "Sign in with GitHub"}
                </span>
            </Button>
    )
}