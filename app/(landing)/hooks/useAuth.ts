import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { checkProfile } from "../server/actions";

export function useAuth() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data;
    },
    staleTime: Infinity,
  });

  const email = data?.user?.email;

  const { data: profile } = useQuery({
    queryKey: ['profile', email],
    queryFn: () => checkProfile(email || ''),
    enabled: !!email,
  });

  const logout = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ['user','profile'] });
    router.push('/');
  };

  return {
    data,
    profile,
    isLoading,
    error,
    isError,
    logout
  };
}
