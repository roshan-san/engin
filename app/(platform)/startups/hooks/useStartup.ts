'use client'

import { useEffect, useState } from 'react'
import { getStartupWithFounder } from '../server/actions'

interface Startup {
  id: string
  name: string
  description: string
  location: string
  teamSize: number
  founderId: string | null
  problem: string
  solution: string
  patent: string
  funding: number
  created_at: Date
}

interface Founder {
  id: string
  username: string
  avatar_url: string
  email: string
  github_url: string | null
  linkedin_url: string | null
  bio: string | null
  location: string | null
  skills: string[] | null
  created_at: Date
}

interface UseStartupResult {
  startup: Startup | null
  founder: Founder | null
  isLoading: boolean
  error: Error | null
}

export function useStartup(startupId: string): UseStartupResult {
  const [startup, setStartup] = useState<Startup | null>(null)
  const [founder, setFounder] = useState<Founder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchStartupAndFounder() {
      try {
        const { startup: startupData, founder: founderData } = await getStartupWithFounder(startupId)
        setStartup(startupData)
        setFounder(founderData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch startup data'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchStartupAndFounder()
  }, [startupId])

  return { startup, founder, isLoading, error }
}
