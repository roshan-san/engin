import { createClient } from "@/lib/supabase/client";
import { checkProfile } from "../server/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAuth() {
  const supabase = createClient();
  const router = useRouter();

  // Get current user
  const { data: userData, isLoading: isLoadingUserData, isError: isUserDataError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
  });

  // Login mutation
  const { mutate: login, isPending : isLoggingIn, isError: isLoginError } = useMutation({
    mutationFn: async (provider: "github" | "google") => {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
    },
    onSuccess: () => {
      console.log("User logged in successfully");
      router.push("/register");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  // Logout mutation
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
    onSuccess: () => {
      console.log("User logged out successfully");
      router.push("/");
    },
  });

  return {
    userData,
    isLoadingUserData,
    login,
    logout,
    isLoggingIn,
    isLoggingOut,
    isLoginError,
    isUserDataError,
  };
}


