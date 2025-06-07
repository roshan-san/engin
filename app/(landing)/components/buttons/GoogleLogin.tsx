"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { createClient } from "@/lib/supabase/client"

export function GoogleLoginButton() {
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()
  
    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`
                }
            })
            if (error) throw error
        } catch (error) {
            console.error('Error signing in with Google:', error)
            setIsLoading(false)
        }
    }
  
    return (
            <Button 
                onClick={handleLogin}
                disabled={isLoading}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            >
                <FcGoogle className="h-5 w-5" />
                <span className="text-base">
                    {isLoading ? "Signing in..." : "Sign in with Google"}
                </span>
            </Button>
    )
}