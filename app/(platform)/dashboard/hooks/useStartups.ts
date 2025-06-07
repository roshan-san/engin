"use client"
import { getMyStartups, createStartup } from "../server/actions"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Startup } from "@/lib/db/schema"

export function useStartups() {
  return useQuery<Startup[], Error>({
    queryKey: ["my-startups"],
    queryFn: getMyStartups,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    retry: 2,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
}

export function useCreateStartup() {
  const queryClient = useQueryClient()
  
  return useMutation<Startup, Error, Partial<Startup>>({
    mutationFn: createStartup,
    onSuccess: () => {
      // Invalidate and refetch the startups query
      queryClient.invalidateQueries({ queryKey: ["my-startups"] })
    },
  })
}
