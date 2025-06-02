import { useQuery } from '@tanstack/react-query';
import { db } from '../../../lib/db/drizzle';
import { profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export function useProfile(userId: string) {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const [userProfile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.id, userId));
      return userProfile;
    },
  });

  return {
    profile,
    isLoading,
    error,
  };
}
