"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Briefcase, Users, Calendar, Building2 } from 'lucide-react';
import { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const fetchUser = async (email: string | null | undefined) => {
    if (!email) throw new Error('Email is required');
    const response = await fetch(`/api/user?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
};

export default function UserProfile() {
    const session = useSession();
    const email = session.data?.user?.email;
    const [activeTab, setActiveTab] = useState('startups');

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUser(email),
        enabled: !!email,
    });

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

    const acceptedConnections = user?.receivedConnections?.filter(
        (connection: any) => connection.status === "accepted"
    ) || [];

    const handleSocialLink = (platform: 'linkedin' | 'github', url: string | null) => {
        if (!url) return null;
        return (
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
            >
                {platform === 'linkedin' ? (
                    <FaLinkedin className="h-4 w-4" />
                ) : (
                    <FaGithub className="h-4 w-4" />
                )}
                <span className="text-sm">View Profile</span>
            </a>
        );
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Profile Page</h1>
                        <p className="text-sm text-muted-foreground">Manage your professional profile</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                        </svg>
                        Edit Profile
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <Card className="relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary to-primary/80" />
                            <CardContent className="pt-20">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <Avatar className="w-24 h-24 mb-4 border-4 border-background">
                                        <AvatarImage src={user.avatar} alt={user.username} />
                                        <AvatarFallback className="text-xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">{user.peru}</h2>
                                    <div className="flex items-center gap-2">
                                        <p className="text-muted-foreground">@{user.username}</p>
                                        <span className="text-muted-foreground">•</span>
                                        <Badge variant="secondary">{user.type}</Badge>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    {handleSocialLink('linkedin', user.linkedin)}
                                    {handleSocialLink('github', user.github)}
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{user.location || 'Location not specified'}</span>
                                    </div>
                                </div>

                                <Button className="w-full" variant="outline">
                                    Complete Your Profile
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills?.map((skill: string, index: number) => (
                                        <Badge key={index} variant="secondary" className="rounded-md">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Areas Of Interest</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {user.areasofinterest?.map((interest: string, index: number) => (
                                        <Badge key={index} variant="secondary" className="rounded-md">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-2">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="startups" className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    My Startups
                                </TabsTrigger>
                                <TabsTrigger value="experience" className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4" />
                                    Experience
                                </TabsTrigger>
                                <TabsTrigger value="connections" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Connections
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="startups" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {user.startups?.map((startup: any) => (
                                        <Card key={startup.id} className="hover:shadow-lg transition-all duration-300">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-bold mb-4">{startup.name}</h2>
                                                <p className="text-muted-foreground text-sm mb-4">{startup.description}</p>

                                                <div className="space-y-3">
                                                    <div className="flex items-center text-sm">
                                                        <Briefcase className="w-4 h-4 text-muted-foreground mr-2" />
                                                        <span>{startup.industry}</span>
                                                    </div>

                                                    <div className="flex items-center text-sm">
                                                        <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
                                                        <span>{startup.location}</span>
                                                    </div>

                                                    <div className="flex items-center text-sm">
                                                        <Users className="w-4 h-4 text-muted-foreground mr-2" />
                                                        <span>Team Size: {startup.teamSize}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="experience">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">My Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {user.experiences?.map((experience: any, index: number) => {
                                                const startDate = new Date(experience.startDate).toLocaleDateString(
                                                    'en-US',
                                                    { year: 'numeric', month: 'short' }
                                                );
                                                const endDate = experience.endDate
                                                    ? new Date(experience.endDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                    })
                                                    : 'Present';

                                                return (
                                                    <div key={index}>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="text-lg font-semibold">
                                                                    {experience.role}
                                                                </h3>
                                                                <p className="text-muted-foreground">
                                                                    {experience.company}
                                                                </p>
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {startDate} - {endDate}
                                                            </div>
                                                        </div>
                                                        {experience.description && (
                                                            <p className="text-sm text-muted-foreground mt-2">
                                                                {experience.description}
                                                            </p>
                                                        )}
                                                        {index < user.experiences.length - 1 && (
                                                            <Separator className="my-4" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="connections">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">My Connections</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {acceptedConnections.map((connection: any) => (
                                                <div key={connection.id} className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarImage src={connection.sender.avatar} alt={connection.sender.username} />
                                                        <AvatarFallback>{connection.sender.username.charAt(0).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold">{connection.sender.peru}</h3>
                                                        <p className="text-sm text-muted-foreground">@{connection.sender.username}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
