"use client"
import React from 'react'
import StartupCard from './StartupCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useStartups } from '../hooks/useStartups'
import CreateBtn from './buttons/CreateBtn'
export default function DashHero() {
    const { data: startups, isLoading,isError } = useStartups()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-[200px] w-full" />
                    ))
                ) : startups?.length === 0 ? (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-muted-foreground">No startups found. Create your first startup!</p>
                    </div>
                ) : isError ? (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-destructive">Failed to load startups. Please try again later.</p>
                    </div>
                ) : (
                    startups?.map((startup) => (
                        <StartupCard key={startup.id} startup={startup} />
                    ))
                )}
            </div>
            <CreateBtn />
        </div>
    )
}
