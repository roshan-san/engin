"use client"
import { useState } from 'react'
import { useProfileSearch } from '../hooks/useProfileSearch'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Profile } from '@/lib/db/schema'
import ProfileCard from './ProfileCard'
import ConnectionRequestsDrawer from './ConnectionRequestsDrawer'

export default function ConnectHero() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useProfileSearch(search)

  return (
    <div className="h-full flex flex-col gap-10">
      {/* Searchbar */}
      <div className="w-full p-2 flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search profiles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
          autoFocus
        />
        <ConnectionRequestsDrawer />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))
        ) : (
          data?.map((profile: Profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))
        )}
      </div>
    </div>
  )
}
