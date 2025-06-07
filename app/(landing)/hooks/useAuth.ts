import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { checkProfile } from "../server/actions";

export function useAuth() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: user, isLoading, error, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    },
    staleTime: Infinity,
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: () => checkProfile(user?.email ?? ''),
    enabled: !!user?.email,
  });

  const logout = async () => {
    await supabase.auth.signOut();
    queryClient.clear(); // Clear all queries on logout
    router.push('/');
  };

  return {
    user,
    profile,
    isLoading,
    error,
    isError,
    logout
  };
}
