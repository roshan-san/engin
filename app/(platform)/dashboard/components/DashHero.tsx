"use client"
import React from 'react'
import StartupCard from './StartupCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useStartups } from '../hooks/useStartups'
export default function DashHero() {
    const { data: startups, isLoading } = useStartups()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full" />
              ))}
            </div>
        )
      }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {startups?.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
        ))}
    </div>  )
}
