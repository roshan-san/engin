"use client"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { FaGithub } from "react-icons/fa"
export function GithubLoginButton() {
    const {login}=useAuthContext()
    return (
        <Button 
            onClick={()=>login("github")}
            className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
        >
            <FaGithub className="h-5 w-5" />
            <span className="text-base">
                Sign in with GitHub
            </span>
        </Button>
    )
}