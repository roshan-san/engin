import { useQuery } from "@tanstack/react-query"
import { searchStartups } from "../server/actions"

export function useStartups(search?: string) {
  return useQuery({
    queryKey: ['startups', search],
    queryFn: () => searchStartups(search || ''),
  })
} 