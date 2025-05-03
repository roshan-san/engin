"use client"
import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"
import { ProfileCard } from "@/app/(other-pages)/_comp/ProfileCard"
import { searchProfiles } from "@/app/(other-pages)/explore/actions"
import { Loader2, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["profiles", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await searchProfiles({
        query: searchQuery,
        page: pageParam,
      })
      return result
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) {
        return pages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })

  const profiles = data?.pages.flatMap((page) => page.profiles) ?? []

  return (
    <div className="container max-w-2xl py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Explore Profiles</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 md:h-12 text-base"
          />
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            id={profile.id}
            name={profile.full_name}
            username={profile.username}
            avatarUrl={profile.avatar_url}
            bio={profile.bio}
          />
        ))}
      </div>

      <div
        className={cn(
          "flex justify-center py-4",
          (isLoading || isFetchingNextPage) ? "opacity-100" : "opacity-0"
        )}
      >
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>

      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-8" />
      )}

      {!isLoading && profiles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">
            {searchQuery
              ? "No profiles found matching your search"
              : "No profiles to show"}
          </p>
        </div>
      )}
    </div>
  )
}
