"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { User, Briefcase, Building2, Users, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import ProfileHeader from "../_comp/ProfileHeader";
import About from "../_comp/tabs/about-tab";
import ExpTab from "../_comp/tabs/exp-tab";
import StartupTab from "../_comp/tabs/startup-tab";


interface UserProfile {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    avatar: string;
    connections: {
        id: string;
        username: string;
        name: string;
        avatar: string;
    }[];
    skills?: string[];
    areasofinterest?: string[];
    startups?: any[];
    experiences?: any[];
    receivedConnections?: any[];
    peru?: string;
    type?: string;
    location?: string;
    linkedin?: string;
    github?: string;
}

const fetchUser = async (username: string | null | undefined) => {
    if (!username) throw new Error('Username is required');
    const response = await fetch(`/api/user?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
};

export default function UserProfile() {
    const params = useParams();
    const username = params.username as string;
    const { data: session } = useSession();
    const currentUserEmail = session?.user?.email;
    
    const [activeTab, setActiveTab] = useState('about');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [showConnections, setShowConnections] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});

    const { data: user, isLoading: queryLoading, error, refetch } = useQuery({
        queryKey: ['user', username],
        queryFn: () => fetchUser(username),
        enabled: !!username,
    });

    useEffect(() => {
        if (!queryLoading) {
            setIsLoading(false);
        }
    }, [queryLoading]);

    const isOwnProfile = useMemo(() => {
        return currentUserEmail === user?.email;
    }, [currentUserEmail, user?.email]);

    const acceptedConnections = useMemo(() => {
        return user?.receivedConnections?.filter(
            (connection: any) => connection.status === "accepted"
        ) || [];
    }, [user?.receivedConnections]);

    useEffect(() => {
        if (user) {
            setEditedProfile(user);
        }
    }, [user]);

    const handleUpdateProfile = useCallback(async (formData: FormData) => {
        if (!user) return;
        
        try {
            // Validate required fields
            const requiredFields = ['peru', 'username', 'type', 'location'];
            const missingFields = requiredFields.filter(field => !formData.get(field));
            
            if (missingFields.length > 0) {
                console.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }

            // Validate URLs if provided
            const linkedin = formData.get('linkedin') as string;
            const github = formData.get('github') as string;
            
            if (linkedin && !linkedin.startsWith('https://www.linkedin.com/')) {
                console.error('Please enter a valid LinkedIn URL');
                return;
            }
            
            if (github && !github.startsWith('https://github.com/')) {
                console.error('Please enter a valid GitHub URL');
                return;
            }

            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    ...Object.fromEntries(formData)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }
            
            setIsEditing(false);
            refetch();
        } catch (error: any) {
            console.error(error.message || 'Failed to update profile');
        }
    }, [user, refetch]);

    const handleUpdateSkills = useCallback(async (skills: string[]) => {
        if (!user) return;
        
        try {
            // Validate skills
            if (skills.some(skill => skill.length < 2)) {
                console.error('Skills must be at least 2 characters long');
                return;
            }

            if (skills.some(skill => skill.length > 50)) {
                console.error('Skills must be less than 50 characters long');
                return;
            }

            // Remove duplicates
            const uniqueSkills = [...new Set(skills)];

            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    skills: uniqueSkills
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update skills');
            }
            
            setIsEditingSkills(false);
            setNewSkill('');
            refetch();
        } catch (error: any) {
            console.error(error.message || 'Failed to update skills');
        }
    }, [user, refetch]);

    // Handle interests update
    const handleUpdateInterests = useCallback(async (interests: string[]) => {
        if (!user) return;
        
        try {
            // Validate interests
            if (interests.some(interest => interest.length < 2)) {
                console.error('Interests must be at least 2 characters long');
                return;
            }

            if (interests.some(interest => interest.length > 50)) {
                console.error('Interests must be less than 50 characters long');
                return;
            }

            // Remove duplicates
            const uniqueInterests = [...new Set(interests)];

            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    areasofinterest: uniqueInterests
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update interests');
            }
            
            setIsEditingInterests(false);
            setNewInterest('');
            refetch();
        } catch (error: any) {
            console.error(error.message || 'Failed to update areas of interest');
        }
    }, [user, refetch]);

    // Handle profile save
    const handleSave = useCallback(async () => {
        if (!user) return;
        
        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user.id,
                    ...editedProfile
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }
            
            const updatedProfile = await response.json();
            setEditedProfile(updatedProfile);
            setIsEditing(false);
            refetch();
        } catch (error: any) {
            console.error(error.message || 'Failed to update profile');
        }
    }, [user, editedProfile, refetch]);

    // Loading state
    if (isLoading || queryLoading) return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <Skeleton className="h-[400px] w-full" />
                        <Skeleton className="h-[200px] w-full" />
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton className="h-[600px] w-full" />
                    </div>
                </div>
            </div>
        </div>
    );

    // Error state
    if (error) return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                        <div className="text-destructive">Error loading profile</div>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    // User not found state
    if (!user) return (
        <div className="min-h-screen p-6 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                        <div className="text-destructive">User not found</div>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <ProfileHeader user={user} isOwnProfile={isOwnProfile} acceptedConnections={acceptedConnections} setShowConnections={setShowConnections} setIsEditing={setIsEditing} />
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
                <div className="border-b mb-4 sm:mb-6 overflow-x-auto">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start h-9 sm:h-10 p-0 bg-transparent">
                            <TabsTrigger 
                                value="about" 
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 sm:px-4 h-9 sm:h-10 transition-all duration-300 ease-in-out hover:text-primary text-sm sm:text-base"
                            >
                                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger 
                                value="startups" 
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 sm:px-4 h-9 sm:h-10 transition-all duration-300 ease-in-out hover:text-primary text-sm sm:text-base"
                            >
                                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Startups
                            </TabsTrigger>
                            <TabsTrigger 
                                value="experience" 
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 sm:px-4 h-9 sm:h-10 transition-all duration-300 ease-in-out hover:text-primary text-sm sm:text-base"
                            >
                                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110" />
                                Experience
                            </TabsTrigger>
                        </TabsList>

                        <div className="mt-4 sm:mt-6">
                            <TabsContent value="about" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                                <About 
                                    user={user} 
                                    isOwnProfile={isOwnProfile} 
                                    isEditing={isEditing} 
                                    setIsEditing={setIsEditing}
                                    editedProfile={editedProfile} 
                                    setEditedProfile={setEditedProfile} 
                                    handleSave={handleSave} 
                                    isEditingSkills={isEditingSkills} 
                                    setIsEditingSkills={setIsEditingSkills} 
                                    newSkill={newSkill} 
                                    setNewSkill={setNewSkill} 
                                    handleUpdateSkills={handleUpdateSkills} 
                                    isEditingInterests={isEditingInterests} 
                                    setIsEditingInterests={setIsEditingInterests} 
                                    newInterest={newInterest} 
                                    setNewInterest={setNewInterest} 
                                    handleUpdateInterests={handleUpdateInterests} 
                                />
                            </TabsContent>

                            <TabsContent value="startups" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                               <StartupTab user={user} isOwnProfile={isOwnProfile} setIsEditing={setIsEditing} />
                            </TabsContent>

                            <TabsContent value="experience" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                               <ExpTab user={user} isOwnProfile={isOwnProfile} setIsEditing={setIsEditing} />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>

            {/* Connections Dialog */}
            <Dialog open={showConnections} onOpenChange={setShowConnections}>
                <DialogContent className="max-w-2xl w-[calc(100%-2rem)] sm:w-full">
                    <DialogHeader>
                        <DialogTitle>Connections</DialogTitle>
                        <CardDescription>

                        </CardDescription>
                    </DialogHeader>
                    {acceptedConnections.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {acceptedConnections.map((connection: any) => (
                                <div key={connection.id} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02]">
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-110">
                                        <AvatarImage 
                                            src={connection.sender?.avatar || ''} 
                                            alt={connection.sender?.username || ''} 
                                        />
                                        <AvatarFallback>
                                            {(connection.sender?.username || 'U').charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{connection.sender?.peru || 'Anonymous User'}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground">@{connection.sender?.username || 'anonymous'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 sm:gap-4 py-6">
                            <Users className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground transition-transform duration-300 hover:scale-110" />
                            <div>
                                <h3 className="text-sm sm:text-base lg:text-lg font-medium">No connections yet</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Connect with other users to build your network</p>
                            </div>
                            {isOwnProfile && (
                                <Button variant="outline" className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm">
                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                    Find Connections
                                </Button>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
} 