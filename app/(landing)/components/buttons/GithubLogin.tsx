"use client"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { createClient } from "@/lib/supabase/client"
import { useMutation } from "@tanstack/react-query"

export function GithubLoginButton() {
    const supabase = createClient()
  
    const { mutate: login, isPending } = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`
                }
            })
            if (error) throw error
        },
        onError: (error) => {
            console.error('Error signing in with GitHub:', error)
        }
    })

    return (
            <Button 
                onClick={() => login()}
                disabled={isPending}
                className="bg-[#24292F] hover:bg-[#2C3238] text-white"
            >
                <FaGithub className="h-5 w-5" />
                <span className="text-base">
                    {isPending ? "Signing in..." : "Sign in with GitHub"}
                </span>
            </Button>
    )
}