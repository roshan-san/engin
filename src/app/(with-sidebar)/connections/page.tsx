"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import ProfileCard from '@/components/profile-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { User } from '@/types/types';

const CollaboratorSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedInterest, setSelectedInterest] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [users, setUsers] = useState<User[]>([]);
    const [allInterests, setAllInterests] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4444/users?_page=${page}&_limit=20`);
                const fetchedUsers = response.data;
                if (page === 1) {
                    setUsers(fetchedUsers);
                } else {
                    setUsers(prevUsers => [...prevUsers, ...fetchedUsers]);
                }
                if (fetchedUsers.length < 20) {
                    setHasMore(false);
                }
                const interests = Array.from(new Set(fetchedUsers.flatMap((user: User) => user.areasofinterest))) as string[];
                if(page === 1) {
                    setAllInterests(interests);
                }
                else{
                    setAllInterests(prev => Array.from(new Set([...prev, ...interests])) as string[]);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [page]);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = searchQuery === "" ||
                user.peru?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.areasofinterest.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTab = activeTab === "all" ||
                (activeTab === "Creators/Collaborators" && user.type==="Creator/Collaborators") ||
                (activeTab === "Investors" && user.type === "Investor") ||
                (activeTab === "Mentors" && user.type === "Mentor");

            const matchesInterest = selectedInterest === "all" || user.areasofinterest.includes(selectedInterest);

            return matchesSearch && matchesTab && matchesInterest;
        });
    }, [searchQuery, activeTab, selectedInterest, users]);

    const loadMoreUsers = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };
    return (
        <div className="w-full max-w-6xl mx-auto p-6 sticky top-0 ">
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Build Connections</h1>
            <p className="text-gray-500 dark:text-gray-400">
                Your Network is Your Net Worth
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search by name, skills, or interests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            <Select
                value={selectedInterest}
                onValueChange={setSelectedInterest}
                defaultValue="all"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Filter by interest" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Interests</SelectItem>
                    {allInterests.map(interest => (
                        <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                    ))}
                </SelectContent>
            </Select>   
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="w-full max-w-md">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="Creators/Collaborators" className="flex-1">Creators/Collaborators
                </TabsTrigger>
                <TabsTrigger value="Investors" className="flex-1">Investors</TabsTrigger>
                <TabsTrigger value="Mentors" className="flex-1">Mentors</TabsTrigger>
            </TabsList>

            <TabsContent value="all"></TabsContent>
            <TabsContent value="Creators/Collaborators"></TabsContent>
            <TabsContent value="Investors"></TabsContent>
            <TabsContent value="Mentors"></TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <div
                        key={user.id}
                        className="animate-wiggle"
                        style={{
                            animationDelay: `${(index % 3) * 100}ms`
                        }}
                    >
                        <ProfileCard user={user} />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No collaborators found matching your criteria.</p>
                </div>
            )}
        </div>
        {hasMore && (
            <div className="flex justify-center mt-8">
                <button
                    onClick={loadMoreUsers}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            </div>
        )}
    </div>
    );
};

export default CollaboratorSearch;
