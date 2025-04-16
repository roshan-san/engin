"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Briefcase, Building2, Users, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import ProfileHeader from "../_comp/ProfileHeader";
import About from "../_comp/tabs/about-tab";
import ExpTab from "../_comp/tabs/exp-tab";
import StartupTab from "../_comp/tabs/startup-tab";
import { useUserProfile } from "@/hooks/user/useUserProfile";

export default function UserProfile() {
    const params = useParams();
    const username = params.username as string;
    const { data: session } = useSession();
    const currentUserEmail = session?.user?.email;
    
    const [activeTab, setActiveTab] = useState('about');
    
    const {
        user,
        isLoading,
        error,
        isEditing,
        setIsEditing,
        handleSave,
        isEditingSkills,
        setIsEditingSkills,
        newSkill,
        setNewSkill,
        handleUpdateSkills,
        isEditingInterests,
        setIsEditingInterests,
        newInterest,
        setNewInterest,
        handleUpdateInterests,
        showConnections,
        setShowConnections,
        acceptedConnections,
        isUpdating,
        updateError
    } = useUserProfile(username);

    const isOwnProfile = useMemo(() => {
        return currentUserEmail === user?.email;
    }, [currentUserEmail, user?.email]);

    if (isLoading) return (
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
            <ProfileHeader 
                user={user} 
                isOwnProfile={isOwnProfile} 
                acceptedConnections={acceptedConnections} 
                setShowConnections={setShowConnections} 
                setIsEditing={setIsEditing} 
            />
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
                                    isUpdating={isUpdating}
                                    updateError={updateError}
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