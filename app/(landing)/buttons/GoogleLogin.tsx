"use client"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "../hooks/useAuth"

export function GoogleLoginButton() {
    const { loginWithGoogle } = useAuth()
  
    return (
        <Button 
            onClick={loginWithGoogle}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
        >
            <FcGoogle className="h-5 w-5" />
            <span className="text-base">
                Sign in with Google
            </span>
        </Button>
    )
}