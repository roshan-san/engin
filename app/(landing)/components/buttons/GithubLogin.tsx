"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FaGithub } from "react-icons/fa"
import { handleOAuthLogin } from "../../server/actions"


export function GithubLoginButton() {
    const [isPending, startTransition] = useTransition()
  
    const handleLogin = async () => {
        startTransition(async () => 
            await handleOAuthLogin("github")
        )
    }
    return (
            <Button 
                onClick={handleLogin}
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