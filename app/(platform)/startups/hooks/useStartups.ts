import { useInfiniteQuery } from "@tanstack/react-query"
import { getStartups } from "../server/actions"

export function useStartups() {
  return useInfiniteQuery({
    queryKey: ['startups'],
    queryFn: ({ pageParam = 1 }) => getStartups(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    maxPages: 10, // Limit the number of pages to prevent memory issues
  })
} 