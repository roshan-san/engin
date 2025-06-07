"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createStartup } from "../server/actions"

export function useStartupMutations() {
  const queryClient = useQueryClient()
  const createStartupMutation = useMutation({
    mutationFn: createStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-startups'] })
    }
  })

  return {
    createStartup: createStartupMutation.mutate,
    isCreating: createStartupMutation.isPending,
    createError: createStartupMutation.error,
  }
} 