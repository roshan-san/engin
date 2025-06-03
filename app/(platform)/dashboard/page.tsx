"use client"
import DashHeader from './components/DashHeader'
import StartupCard from './components/StartupCard'
import { useStartups } from './hooks/useStartups'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const { data: startups, isLoading } = useStartups()

  if (isLoading) {
    return (
      <div className="h-full flex flex-col p-4 gap-10">
        <DashHeader />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 gap-10">
      <DashHeader/>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {startups?.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
    </div>
  )
}
