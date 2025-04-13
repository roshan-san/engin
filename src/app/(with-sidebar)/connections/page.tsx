"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import axios from 'axios';
import { User } from '@/types/types'; 
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedInterest, setSelectedInterest] = useState<string>("all");
    const [allInterests, setAllInterests] = useState<string[]>(["all"]);
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useQuery<UserResponse>({
        queryKey: ['users', page, searchQuery],
        queryFn: async () => {
            const response = await axios.get<UserResponse>(`/api/user?page=${page}&search=${searchQuery}`);
            return response.data;
        },
    });

    const handleLoadMore = () => {
        if (data?.pagination.hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const interests = new Set<string>();
        data?.users.forEach((user: User) => {
            user.areasofinterest.forEach((interest: string) => interests.add(interest));
        });
        setAllInterests(["all", ...Array.from(interests)]);
    }, [data?.users]);

    const filteredUsers = data?.users.filter(user => {
        if (selectedInterest !== "all" && !user.areasofinterest.includes(selectedInterest)) {
            return false;
        }
        return true;
    }) || [];

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                <div className="text-center text-destructive">
                    Error loading users. Please try again later.
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
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, skills, or interests..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button onClick={() => setPage(1)}>Search</Button>

                <Select
                    value={selectedInterest}
                    onValueChange={setSelectedInterest}
                    defaultValue="all"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by interest" />
                    </SelectTrigger>
                    <SelectContent>
                        {allInterests.map(interest => (
                            <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div 
                            key={user.username} 
                            className="animate-wiggle cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg" 
                            style={{ animationDelay: `${(index % 3) * 100}ms` }}
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
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground">No collaborators found matching your criteria.</p>
                    </div>
                )}
            </div>

            {data?.pagination.hasMore && (
                <div className="flex justify-center mt-6">
                    <Button onClick={handleLoadMore}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CollaboratorSearch;