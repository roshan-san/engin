import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getProfileById } from "@/app/(platform)/profile/server/actions";

export function useProfile() {
  const { userData } = useAuth();
  const userId = userData?.user?.id;

  const {
    data: profile,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("No user ID available");
      }
      return getProfileById(userId);
    },
    enabled: !!userId
  });

  return {
    profile,
    isLoading,
    isError,
    error
  };
}
