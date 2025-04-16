import { useQuery } from "@tanstack/react-query";
import { Startup } from "@/types/startup";

interface UseUserStartupsOptions {
  userEmail: string;
  enabled?: boolean;
}

export function useUserStartups({ userEmail, enabled = true }: UseUserStartupsOptions) {
  return useQuery({
    queryKey: ["userStartups", userEmail],
    queryFn: async (): Promise<Startup[]> => {
      const response = await fetch(`/api/startups?userEmail=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch user startups");
      }
      
      return response.json();
    },
    enabled: enabled && !!userEmail,
  });
} 