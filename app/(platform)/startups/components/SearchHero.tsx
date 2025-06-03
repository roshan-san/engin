"use client"
import { useState } from 'react'
import { useStartupSearch } from '../hooks/useStartupSearch'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import StartupCard from '@/app/(platform)/dashboard/components/StartupCard'
import { Startup } from '@/lib/db/schema'

export default function SearchHero() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useStartupSearch(search)

  return (
    <div className="h-full flex flex-col gap-10">
      {/* Searchbar */}
      <div className="w-full p-2">
        <Input
          type="search"
          placeholder="Search startups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          autoFocus
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))
        ) : (
          // Startup cards
          data?.map((startup: Startup) => (
              <StartupCard key={startup.id} startup={startup} />
          ))
        )}
      </div>
    </div>
  )
}
