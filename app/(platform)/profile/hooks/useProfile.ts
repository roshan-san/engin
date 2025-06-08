import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "@/app/(platform)/profile/server/actions";
import { useAuth } from "@/app/(landing)/register/hooks/useAuth";

export function useProfile() {
  const { userData } = useAuth();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', userData?.user.id],
    queryFn: () => getProfileById(userData!.user.id),
    enabled: !!userData?.user.id
  });

  return { profile, isLoading };
}
