import { useInfiniteQuery } from '@tanstack/react-query';

interface StartupResponse {
  startups: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export const useStartups = (searchQuery?: string) => {
  return useInfiniteQuery({
    queryKey: ['startups', searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append('q', searchQuery);
      queryParams.append('page', pageParam.toString());
      queryParams.append('limit', '9');

      const response = await fetch(`/api/startup?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch startups');
      }
      return response.json() as Promise<StartupResponse>;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
}; 