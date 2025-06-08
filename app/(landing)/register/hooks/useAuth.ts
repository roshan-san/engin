import { createClient } from "@/lib/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAuth() {
  const supabase = createClient();

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
  const { mutate: login, isPending: isLoggingIn, isError: isLoginError } = useMutation({
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
     },
  });

  // Combined loading state that accounts for both auth operations and navigation
  const isLoading = isLoadingUserData || isLoggingIn || isLoggingOut;

  return {
    userData,
    isLoading,
    isLoadingUserData,
    login,
    logout,
    isLoggingIn,
    isLoggingOut,
    isLoginError,
    isUserDataError,
  };
}


