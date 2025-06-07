"use client"

import { Input } from "@/components/ui/input"
import Header from "../components/Header"
import { useStartups } from "./hooks/useStartups"
import { useInView } from "react-intersection-observer"
import { useEffect, useMemo, useCallback } from "react"
import StartupCard from "./components/StartupCard"
import { Loader2 } from "lucide-react"
import { useDebounce } from "@/lib/hooks/useDebounce"

export default function StartupsPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '400px',
    delay: 200,
  })
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    status,
    isFetching 
  } = useStartups()

  const debouncedInView = useDebounce(inView, 300)

  const handleLoadMore = useCallback(() => {
    if (debouncedInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [debouncedInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    handleLoadMore()
  }, [handleLoadMore])

  const startups = useMemo(() => {
    return data?.pages.flatMap(page => page.startups) ?? []
  }, [data?.pages])

  const renderContent = useMemo(() => {
    if (status === 'pending' && !data) {
      return (
        <div className="col-span-full flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="col-span-full text-center text-red-500">
          Error loading startups
        </div>
      )
    }

    return (
      <>
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
        <div ref={ref} className="col-span-full flex justify-center p-4">
          {isFetchingNextPage && (
            <Loader2 className="h-8 w-8 animate-spin" />
          )}
        </div>
      </>
    )
  }, [status, data, startups, ref, isFetchingNextPage])

  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Explore</Header>
      <div className="flex flex-col gap-4">
        <Input placeholder="Search startups..." className="max-w-sm" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderContent}
        </div>
      </div>
    </div>
  )
}
