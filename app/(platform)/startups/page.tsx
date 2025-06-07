"use client"

import { Input } from "@/components/ui/input"
import Header from "../components/Header"
import { useStartups } from "./hooks/useStartups"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import StartupCard from "./components/StartupCard"
import { Loader2 } from "lucide-react"

export default function StartupsPage() {
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useStartups()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className="h-full flex flex-col p-4 gap-12">
      <Header>Explore</Header>
      <div className="flex flex-col gap-4">
        <Input placeholder="Search startups..." className="max-w-sm" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {status === 'pending' ? (
            <div className="col-span-full flex justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : status === 'error' ? (
            <div className="col-span-full text-center text-red-500">
              Error loading startups
            </div>
          ) : (
            <>
              {data.pages.map((page) =>
                page.startups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))
              )}
              <div ref={ref} className="col-span-full flex justify-center p-4">
                {isFetchingNextPage && (
                  <Loader2 className="h-8 w-8 animate-spin" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
