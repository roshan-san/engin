"use client"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { createClient } from "@/lib/supabase/client"
import { useMutation } from "@tanstack/react-query"

export function GoogleLoginButton() {
    const supabase = createClient()
  
    const { mutate: login, isPending } = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`
                }
            })
            if (error) throw error
        },
        onError: (error) => {
            console.error('Error signing in with Google:', error)
        }
    })
  
    return (
            <Button 
                onClick={() => login()}
                disabled={isPending}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            >
                <FcGoogle className="h-5 w-5" />
                <span className="text-base">
                    {isPending ? "Signing in..." : "Sign in with Google"}
                </span>
            </Button>
    )
}