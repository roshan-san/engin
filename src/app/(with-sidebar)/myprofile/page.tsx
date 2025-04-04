"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { queryClient } from '@/queryclient';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image'
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Mail, MapPin, Briefcase, Users } from 'lucide-react';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaQuestionCircle, FaExclamation } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const fetchUser = async (email: any) => {
    const { data } = await axios.get(`http://localhost:4444/getuser/?email=${email}`);
    console.log(data);

    return data;
};


export default function UserProfile() {

    return (<QueryClientProvider client={queryClient}>
        <Comp />

    </QueryClientProvider>)
}
function Comp() {
    const session= useSession()
    const email = session.data?.user?.email;
    const [activeTab, setActiveTab] = useState('startups');

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUser(email),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const acceptedConnections = user?.receivedConnections?.filter(
        (connection: any) => connection.status === "accepted"
    ) || [];


    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile Page</h1>
                    <Button variant="outline">Edit Profile</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <Avatar className="w-24 h-24 mb-4">
                                        <AvatarImage src={user.avatar} alt={user.username} />
                                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-bold">{user.peru}</h2>
                                    <div className='flex items-center '>

                                        <p className="text-gray-500">{"@" + user.username + "    ~   " + user.type}</p>

                                    </div>
                                </div>


                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaLinkedin className="h-4 w-4 text-gray-500" />
                                        
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaGithub className="h-4 w-4 text-gray-500" />
                                        
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm">{user.location}</span>
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
                                    {user.skills.map((skill: string, index: number) => (
                                        <Badge key={index} variant="outline" className="rounded-md">
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
                                    {user.areasofinterest.map((interest: string, index: number) => (
                                        <Badge key={index} variant="outline" className="rounded-md">
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
                                <TabsTrigger value="startups">My Startups</TabsTrigger>
                                <TabsTrigger value="experience">Experience</TabsTrigger>
                                <TabsTrigger value="connections">Connections</TabsTrigger>
                            </TabsList>

                            <TabsContent value="startups" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {user.startups.map((startup: any) => (
                                        <div
                                            key={startup.id}
                                            className="relative bg-accent rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
                                        >
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{startup.name}</h2>
                                            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{startup.description}</p>

                                            <div className="mt-4 space-y-3">
                                                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                                                    <FaQuestionCircle className="w-4 h-4 text-yellow-500 mr-2" />
                                                    <span>{startup.problem}</span>
                                                </div>

                                                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                                                    <FaExclamation className="w-4 h-4 text-green-500 mr-2" />
                                                    <span>{startup.solution}</span>
                                                </div>

                                                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                                                    <Briefcase className="w-4 h-4 text-blue-500 mr-2" />
                                                    <span>{startup.industry}</span>
                                                </div>

                                                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                                                    <MapPin className="w-4 h-4 text-red-500 mr-2" />
                                                    <span>{startup.location}</span>
                                                </div>

                                                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                                                    <Users className="w-4 h-4 text-purple-500 mr-2" />
                                                    <span>Team Size: {startup.teamSize}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>




                            </TabsContent>


                            <TabsContent value="experience">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>My Experience</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {user.experiences.map((experience: any, index: number) => {
                                                const startDate = new Date(experience.startDate).toLocaleDateString(
                                                    'en-US',
                                                    { year: 'numeric', month: 'short', day: 'numeric' }
                                                );
                                                const endDate = experience.endDate
                                                    ? new Date(experience.endDate).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })
                                                    : 'Present';

                                                return (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-6 transition-transform transform hover:scale-102 hover:shadow-md"
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div>
                                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                                    {experience.name}
                                                                </h3>
                                                                <p className="text-xl text-gray-500 dark:text-gray-400">
                                                                    {experience.role} at {experience.company}
                                                                </p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {startDate} - {endDate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                                            {experience.description}
                                                        </p>
                                                        {experience.technologies && (
                                                            <div className="mt-4">
                                                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                                                    Technologies:
                                                                </h4>
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {experience.technologies.map(
                                                                        (tech: string, techIndex: number) => (
                                                                            <span
                                                                                key={techIndex}
                                                                                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs"
                                                                            >
                                                                                {tech}
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
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
                                        <CardTitle>Connections</CardTitle>
                                    </CardHeader>
                                    <CardContent>

                                        <div className="overflow-x-auto">
                                            <div className="w-full">
                                                {user.receivedConnections
                                                    .filter((conn: any) => conn.status === "accepted")
                                                    .map((conn: any) => (
                                                        <div key={conn.id} className="flex border-b border-gray-200">
                                                            <div className="p-3 w-1/3 flex items-center">
                                                                <div className="w-8 h-8 bg-gray-700 text-center text-sm rounded-full flex items-center justify-center">
                                                                    <Image width={50} height={50} src={conn.sender.avatar} alt={`${conn.sender.username}'s avatar`} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <span className="font-medium">{conn.sender.peru}</span>
                                                                    <p className="text-gray-400 text-xs">@{conn.sender.username}</p>
                                                                </div>
                                                            </div>
                                                            <div className="p-3 w-1/3 text-gray-400">
                                                                {conn.sender.collaborations?.[0]?.role?.name}
                                                            </div>
                                                            <div className="p-3 w-1/3 text-gray-400">{conn.sender.type}</div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div >
    );
}
