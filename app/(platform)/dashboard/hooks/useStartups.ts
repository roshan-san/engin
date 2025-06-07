"use client"
import { getMyStartups } from "../server/actions"
import { useQuery } from "@tanstack/react-query"
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
