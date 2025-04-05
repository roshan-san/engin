"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { User } from '@/types/types'; 
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CollaboratorSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedInterest, setSelectedInterest] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [allInterests, setAllInterests] = useState<string[]>(["all"]); // Initialize with "all"
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);


    const handleLoadMore = () => {
        toast("hello")
        console.log("hello")
        setPage((prevPage) => prevPage + 1);
        fetchUsers()
    };
    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>(`http://localhost:4444/users?_page=${page}}&q=${searchQuery}`) // Type the response
            setUsers(response.data);

            const interests = new Set<string>();
            response.data.forEach((user: User) => {
                user.areasofinterest.forEach((interest: string) => interests.add(interest));
            });
            setAllInterests(["all", ...Array.from(interests)]);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        let filtered = users;

        if (selectedInterest !== "all") {
            filtered = filtered.filter(user =>
                user.areasofinterest.includes(selectedInterest)
            );
        }

        if (activeTab !== "all") {
            filtered = filtered.filter(user => user.type === activeTab);
        }

        setFilteredUsers(filtered);
    }, [selectedInterest, activeTab, users]);

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
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button onClick={() => { fetchUsers()}}>Search</Button>

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
                        <div>

                        <div
                            key={user.username}
                            className="animate-wiggle"
                            style={{
                                animationDelay: `${(index % 3) * 100}ms`
                            }}
                            >
                            <pre>
                                {JSON.stringify(user, null, 2)}
                            </pre>
                            
                            </div>
                            <div className="flex justify-center mt-4">
                                <Button
                                    onClick={handleLoadMore}
                                    className=" py-2 px-4 rounded"
                                >
                                    {'Load More'}
                                </Button>
                            </div>
                        </div>
                        

                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">No collaborators found matching your criteria.</p>
                    </div>


                )}
            </div>


        </div>
    );
};

export default CollaboratorSearch;