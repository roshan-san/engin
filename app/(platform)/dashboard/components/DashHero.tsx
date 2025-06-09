"use client"
import React from 'react'
import StartupCard from './StartupCard'
import CreateBtn from './buttons/CreateBtn'
import { useMyStartups } from '../hooks/useMyStartups'
import { useAuthContext } from '@/app/context/AuthContext'

export default function DashHero() {
    const { userObj }= useAuthContext()
    
    if (!userObj) {
        return (
            <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">Please log in to view your startups.</p>
        </div>
        )
    }

    const { myStartups, isLoading, isError } = useMyStartups(userObj.id)
    
    if (isLoading) {
        return (
            <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground">Loading your startups...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {myStartups?.length === 0 ? (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-muted-foreground">No startups found. Create your first startup!</p>
                    </div>
                ) : isError ? (
                    <div className="col-span-3 text-center py-10">
                        <p className="text-destructive">Failed to load startups. Please try again later.</p>
                    </div>
                ) : (
                    myStartups?.map((startup) => (
                        <StartupCard key={startup.id} startup={startup} />
                    ))
                )}
            </div>
            <CreateBtn />
        </div>
    )
}
