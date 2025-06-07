import { useInfiniteQuery } from "@tanstack/react-query"
import { getStartups } from "../server/actions"

export function useStartups() {
  return useInfiniteQuery({
    queryKey: ['startups'],
    queryFn: ({ pageParam = 1 }) => getStartups(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })
} 