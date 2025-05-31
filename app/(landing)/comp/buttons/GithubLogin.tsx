"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FaGithub } from "react-icons/fa"
import { handleOAuthLogin } from "../../actions"

export function GithubLoginButton() {
    const [isPending, startTransition] = useTransition()
  
    const handleLogin = async () => {
        startTransition(async () => 
            await handleOAuthLogin("github")
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
                {isPending ? "Signing in..." : "Sign in with GitHub"}
            </Button>
        </div>
    )
}