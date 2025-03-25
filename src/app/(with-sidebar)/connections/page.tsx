"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { toast } from 'sonner';
import UserProfileCard from '@/components/profile-card';

interface User {
    id: number;
    name: string;
    username: string;
    role: string;
    bio: string;
    interests: string[];
    avatar: string | null;
}

const fetchUsers = async (): Promise<User[]> => {
    // innum actual backend eluthala
    // const response = await fetch('/api/users');
    // const data = await response.json();
    return sampleUsers; 
};

const allInterests: string[] = [
    "AI & Machine Learning",
    "Web Development",
    "Mobile Apps",
    "Blockchain",
    "SaaS",
    "E-commerce",
    "Fintech",
    "Health Tech",
    "EdTech",
    "Gaming",
    "AR/VR",
    "Hardware",
    "Social Impact"
];

const sampleUsers: User[] = [
    {
        id: 1,
        name: "Alex Johnson",
        username: "alexj",
        role: "Founder",
        bio: "Building AI tools for content creators. Looking for technical co-founders.",
        interests: ["AI & Machine Learning", "SaaS"],
        avatar: null
    },
    {
        id: 2,
        name: "Samantha Lee",
        username: "samlee",
        role: "Developer",
        bio: "Full-stack engineer with 5+ years experience. Open to joining early-stage startups.",
        interests: ["Web Development", "Mobile Apps", "AI & Machine Learning"],
        avatar: null
    },
    {
        id: 3,
        name: "Michael Carter",
        username: "mcarter",
        role: "Investor",
        bio: "Angel investor focused on B2B SaaS and fintech. Pre-seed to seed.",
        interests: ["SaaS", "Fintech"],
        avatar: null
    },
    {
        id: 4,
        name: "Priya Patel",
        username: "priyap",
        role: "Creator",
        bio: "Content creator with 500K+ followers. Looking to partner with innovative brands.",
        interests: ["Social Impact", "EdTech"],
        avatar: null
    },
    {
        id: 5,
        name: "David Kim",
        username: "dkim",
        role: "Mentor",
        bio: "3x founder, 2 exits. Now mentoring early-stage founders in the tech space.",
        interests: ["SaaS", "E-commerce", "Health Tech"],
        avatar: null
    }
];

const CollaboratorSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedInterest, setSelectedInterest] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);
        };
        loadUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = searchQuery === "" ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.interests && user.interests.some(interest =>
                    interest.toLowerCase().includes(searchQuery.toLowerCase())
                ));

            const matchesTab = activeTab === "all" ||
                (activeTab === "Creators/Collaborators" && (user.role === "Creator" || user.role === "Developer")) ||
                (activeTab === "Investors" && user.role === "Investor") ||
                (activeTab === "Mentors" && user.role === "Mentor");

            const matchesInterest = selectedInterest === "all" ||
                (user.interests && user.interests.includes(selectedInterest));

            return matchesSearch && matchesTab && matchesInterest;
        });
    }, [searchQuery, activeTab, selectedInterest, users]);

    const handleConnect = (userId: number) => {
        toast(`Connection request sent to user ID: ${userId}`);
    };

    const handleMessage = (userId: number) => {
        toast(`this will redirect to message/${userId}`);
    };

    const handleProfileClick = (userId: number) => {
        toast(`this will redirect to profile/${userId}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
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

            {/* Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserProfileCard
                            key={user.id}
                            user={user}
                            onConnect={handleConnect}
                            onMessage={handleMessage}
                            onProfileClick={handleProfileClick}
                        />
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