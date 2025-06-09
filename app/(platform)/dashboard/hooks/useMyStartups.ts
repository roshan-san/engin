"use client"
import { getMyStartups } from "../server/actions"
import { useQuery, } from "@tanstack/react-query"

export function useMyStartups(userId: string) {
  const {data:myStartups, isLoading, isError} = useQuery({
    queryKey: ["my-startups",],
    queryFn: () => getMyStartups(userId),
    staleTime: 1000 * 60 * 5,
  })


  return{
    myStartups,
    isLoading,
    isError
  }
}
