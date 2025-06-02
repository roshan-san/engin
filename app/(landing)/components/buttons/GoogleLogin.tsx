"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FcGoogle } from "react-icons/fc"
import { handleOAuthLogin } from "../../server/actions"

export function GoogleLoginButton() {
    const [isPending, startTransition] = useTransition()
  
    const handleLogin = async () => {
        startTransition(async () => 
            await handleOAuthLogin("google")
        )
    }
  
    return (
            <Button 
                onClick={handleLogin}
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