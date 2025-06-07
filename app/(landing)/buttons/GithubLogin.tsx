"use client"
import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { useAuth } from "../hooks/useAuth"

export function GithubLoginButton() {
    const { loginWithGithub } = useAuth()
  
    return (
        <Button 
            onClick={loginWithGithub}
            className="bg-[#24292F] hover:bg-[#2C3238] text-white"
        >
            <FaGithub className="h-5 w-5" />
            <span className="text-base">
                Sign in with GitHub
            </span>
        </Button>
    )
}