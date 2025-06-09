"use client"
import Spinner from "@/components/spinner";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode } from "react";
import React from "react";

interface AuthContextType {
  userObj: User | undefined;
  login: (provider: "github" | "google") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const supabase = createClient();
    const router = useRouter();
    
    // Get current user
    const { data: userObj, isLoading: isLoadingUser, isError: isErrorUser} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
    });

    // Login mutation
    const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (provider: "github" | "google") => {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
    }
    });

    // Logout mutation
    const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    }
    });

    // Show loading spinner during any loading state
    if (isLoadingUser || isLoggingIn || isLoggingOut) {
      return <Spinner/>;
    }
    
    // Show Error during user error
    if (isErrorUser){
    return(
        <div>
            error pa
        </div>
    )
    }

  const value = {
    userObj,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 