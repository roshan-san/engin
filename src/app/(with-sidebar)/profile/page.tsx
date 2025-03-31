"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { queryClient } from '@/queryclient';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Mail, MapPin, Briefcase, Users } from 'lucide-react';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaQuestionCircle, FaExclamation } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const fetchUser = async (email:string) => {
  const { data } = await axios.get(`http://localhost:4444/getuser/?email=${email}`);
  return data;
};


export default function UserProfile(){
    return(<QueryClientProvider client={queryClient}>
        <Comp/>

    </QueryClientProvider>)
}
function Comp() {
  const email = 'roshanjeyarubanr@gmail.com';
  const [activeTab, setActiveTab] = useState('startups');

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUser(email),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const acceptedConnections = user?.receivedConnections?.filter(
    (connection:any) => connection.status === "accepted"
  ) || [];


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <Button variant="outline">Edit Profile</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                {/* Profile Header */}
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


                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaLinkedin className="h-4 w-4 text-gray-500" />
                    <Link href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline" >

                      {user.linkedin}
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaGithub className="h-4 w-4 text-gray-500" />
                    <Link href={user.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline" >

                      {user.github}
                    </Link>
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

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="rounded-md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Interest */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Areas Of Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.areasofinterest.map((interested, index) => (
                    <Badge key={index} variant="outline" className="rounded-md">
                      {interested}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>



          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="startups">My Startups</TabsTrigger>
                <TabsTrigger value="experience ">Experience</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
              </TabsList>

              <TabsContent value="startups" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {user.startups.map((startup) => (
        <div
          key={startup.id}
          className="relative bg-accent rounded-2xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Startup Name */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{startup.name}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{startup.description}</p>

          {/* Details Section */}
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


            <TabsContent value="experience ">
              <Card>
                <CardHeader>
                  <CardTitle>My Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {user.experience.map((ex, index) => (
                      <div key={`${ex.id}-${index}`} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{ex.title}</h4>
                          {ex.label && index < 3 && (
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {activity.label}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>Released on {activity.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                        
                      </div>
                    ))}
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
                <div className="bg-gray-900 text-white rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Connections</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th> {/* Role from Collaboration */}
              <th className="p-3">Location</th> {/* Location from User */}
            </tr>
          </thead>
          <tbody>
            {acceptedConnections.map((conn:any) => (
              <tr key={conn.id} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="p-3 flex items-center">
                  <div className="w-8 h-8 bg-gray-700 text-center text-sm rounded-full flex items-center justify-center">
                    {conn.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <span className="font-medium">{conn.peru}</span>
                    <p className="text-gray-400 text-xs">@{conn.username}</p>
                  </div>
                </td>
                <td className="p-3 text-gray-400">{conn.collaborations[0]?.role.name || "N/A"}</td>
                <td className="p-3 text-gray-400">{conn.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
