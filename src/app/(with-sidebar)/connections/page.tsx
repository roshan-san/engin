"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import axios from 'axios';
import { User } from '@/types/types'; 
import { Button } from '@/components/ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

interface UserResponse {
    users: User[];
    pagination: {
        total: number;
        page: number;
        totalPages: number;
        hasMore: boolean;
    };
}

const CollaboratorSearch = () => {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { ref, inView } = useInView();
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsSearching(true);
            setSearchQuery(searchInput);
            setTimeout(() => setIsSearching(false), 1000);
        }
    };

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<UserResponse>({
        queryKey: ['users', searchQuery],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axios.get<UserResponse>(`/api/user?page=${pageParam}&search=${searchQuery}`);
            return response.data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.pagination.hasMore) {
                return lastPage.pagination.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const filteredUsers = data?.pages.flatMap(page => page.users) || [];

    // Initial loading state
    if (isLoading && !data) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <Users className="h-12 w-12 animate-pulse text-muted-foreground" />
                    <p className="text-muted-foreground">Loading users...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                    <div className="text-destructive text-center">
                        <p className="text-lg font-semibold">Error loading users</p>
                        <p className="text-sm text-muted-foreground">Please try again later</p>
                    </div>
                    <Button 
                        onClick={() => window.location.reload()}
                        variant="outline"
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Build Connections</h1>
                <p className="text-muted-foreground">
                    Your Network is Your Net Worth
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2 relative">
                    <Search className={`absolute left-3 top-2.5 h-4 w-4 ${isSearching ? 'animate-pulse text-primary' : 'text-muted-foreground'}`} />
                    <Input
                        placeholder="Search by name, username, or type..."
                        className="pl-10"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                        Press Enter to search. Try searching for "Investor", "Mentor", or someone's name
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div 
                            key={user.username} 
                            className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg" 
                            onClick={() => router.push(`/profile/${user.username}`)}
                        >
                            <div className="bg-card p-6 rounded-lg shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <img 
                                        src={user.avatar} 
                                        alt={user.username} 
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{user.peru}</h3>
                                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                            {user.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm">{user.bio}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {user.skills.map((skill, i) => (
                                            <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 space-y-4">
                        <p className="text-lg text-muted-foreground">No connections found</p>
                        <p className="text-sm text-muted-foreground text-center max-w-md">
                            {searchQuery 
                                ? `No results found for "${searchQuery}". Try searching for a name or type.`
                                : "Start searching to find connections."}
                        </p>
                    </div>
                )}
            </div>

            <div ref={ref} className="h-10 flex items-center justify-center mt-6">
                {isFetchingNextPage && (
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="text-sm text-muted-foreground">Loading more...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollaboratorSearch;