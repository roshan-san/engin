"use client"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "../../register/hooks/useAuth"

export function GoogleLoginButton() {
    const { login, isLoggingIn,isLoginError } = useAuth()
  
    return (
        <Button 
            onClick={()=>login("google")}
            disabled={isLoggingIn}
            className={`bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 ${isLoginError ? 'border-red-500' : ''}`}
        >
            <FcGoogle className="h-5 w-5" />
            <span className="text-base">
                {isLoggingIn ? "Signing in..." :  isLoginError? "Try again" : "Sign in with Google"}
            </span>
        </Button>
    )
}