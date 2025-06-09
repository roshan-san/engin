"use client"
import Spinner from "@/components/spinner";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useEffect } from "react";
import React from "react";

interface AuthContextType {
  user: User | null;
  login: (provider: "github" | "google") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const supabase = createClient();
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const { 
      data: user = null,
      isLoading,
    } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return null;
        return session.user;
      }
    });

    useEffect(() => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          queryClient.setQueryData(["user"], session?.user ?? null);
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          queryClient.setQueryData(["user"], null);
          queryClient.clear();
          router.push('/');
        }
      });

      return () => subscription.unsubscribe();
    }, [supabase, router, queryClient]);

    const { mutate: login } = useMutation({
      mutationFn: async (provider: "github" | "google") => {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`,
          },
        });
      }
    });

    const { mutate: logout } = useMutation({
      mutationFn: async () => {
        await supabase.auth.signOut();
        queryClient.clear();
        router.push('/');
      }
    });

    if (isLoading) {
      return <Spinner/>;
    }

    return (
      <AuthContext.Provider value={{ user, login, logout, isLoading }}>
        {children}
      </AuthContext.Provider>
    );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 