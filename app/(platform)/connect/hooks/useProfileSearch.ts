import { useQuery } from "@tanstack/react-query"
import { searchProfiles } from "../server/actions"

export function useProfileSearch(search?: string) {
  return useQuery({
    queryKey: ['profiles', search],
    queryFn: () => searchProfiles(search || ''),
  })
} 