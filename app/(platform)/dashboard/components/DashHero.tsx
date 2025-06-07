"use client"
import React from 'react'
import StartupCard from './StartupCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useStartups } from '../hooks/useStartups'
import CreateBtn from './buttons/CreateBtn'

export default function DashHero() {
    const { data: startups, isLoading } = useStartups()
    
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-[200px] w-full" />
                    ))
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
