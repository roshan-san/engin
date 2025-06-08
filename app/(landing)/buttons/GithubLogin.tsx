"use client"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { useAuth } from "../../register/hooks/useAuth"

export function GithubLoginButton() {
    const { login, isLoggingIn, isLoginError } = useAuth()
  
    return (
        <Button 
            onClick={()=>login("github")}
            disabled={isLoggingIn}
            className={`bg-[#24292F] hover:bg-[#24292F]/90 text-white ${isLoginError ? 'border border-red-500' : ''}`}
        >
            <FaGithub className="h-5 w-5" />
            <span className="text-base">
                {isLoggingIn ? "Signing in..." : isLoginError ? "Try again" : "Sign in with GitHub"}
            </span>
        </Button>
    )
}