"use client"
import { getMyStartups } from "../server/actions"
import { useQuery } from "@tanstack/react-query"

export function useStartups() {
  return useQuery({
    queryKey: ["my-startups"],
    queryFn: getMyStartups
  })
}
