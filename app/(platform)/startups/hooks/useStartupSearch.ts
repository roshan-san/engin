import { useQuery } from "@tanstack/react-query"
import { searchStartups } from "../server/actions"

export function useStartupSearch(search?: string) {
  return useQuery({
    queryKey: ['startups', search],
    queryFn: () => searchStartups(search || ''),
  })
} 