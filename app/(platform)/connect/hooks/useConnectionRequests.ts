import { useQuery } from "@tanstack/react-query"
import { getConnectionRequests } from "../server/actions"

export function useConnectionRequests() {
  return useQuery({
    queryKey: ['connection-requests'],
    queryFn: () => getConnectionRequests(),
  })
} 