import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, Phone, MapPin, Globe, ChevronRight } from 'lucide-react';

const ProfilePage = () => {
  // Sample data
  const user = {
    username: "Anshan Haso",
    role: "Project Manager",
    avatar: "/api/placeholder/32/32",
    posts: 184,
    projects: 32,
    members: 4500,
    email: "anshan@gmail.com",
    phone: "+1 (876) 854 239 581",
    location: "New York",
    website: "https://shadcnkit.com",
    bio: "Hi I'm Anna Adam. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. European languages are members of the same family.",
    skills: ["Photoshop", "Figma", "HTML", "React", "Tailwind CSS", "CSS", "Laravel", "Nextjs"]
  };

  const activities = [
    {
      id: 1,
      title: "Shadcn UI Kit Application UI v2.0.0",
      label: "Latest",
      date: "December 2nd, 2023",
      description: "Get access to over 30+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages."
    },
    {
      id: 2,
      title: "Shadcn UI Kit Forms v1.0",
      date: "December 2nd, 2023",
      description: "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project."
    },
    {
      id: 3,
      title: "Shadcn UI Kit Library v1.2",
      date: "December 2nd, 2023",
      description: "Get started with dozens of web components and interactive elements built on top of Tailwind CSS."
    }
  ];

  const connections = [
    { id: 1, name: "Olivia Davis", email: "olivia.davis@example.com", connected: true },
    { id: 2, name: "John Doe", email: "john.doe@example.com", connected: false },
    { id: 3, name: "Alice Smith", email: "alice.smith@example.com", connected: true },
    { id: 4, name: "Michael Johnson", email: "michael.johnson@example.com", connected: true },
    { id: 5, name: "Emily Martinez", email: "emily.martinez@example.com", connected: false }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A complete e-commerce solution with payment processing and inventory management",
      progress: 75,
      team: ["John", "Alice", "Michael"],
      dueDate: "April 15, 2025",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication",
      progress: 90,
      team: ["Sarah", "David", "Emma"],
      dueDate: "May 20, 2025",
      status: "Review"
    },
    {
      id: 3,
      title: "Healthcare Management System",
      description: "Patient management system for hospitals and clinics",
      progress: 40,
      team: ["Robert", "Lisa", "James"],
      dueDate: "June 30, 2025",
      status: "In Progress"
    }
  ];

  const members = [
    { id: 1, name: "John Smith", role: "Developer", joined: "Jan 2023", projects: 12 },
    { id: 2, name: "Emily Johnson", role: "Designer", joined: "Mar 2023", projects: 8 },
    { id: 3, name: "Michael Brown", role: "Project Manager", joined: "Feb 2023", projects: 15 },
    { id: 4, name: "Sarah Davis", role: "Developer", joined: "Apr 2023", projects: 10 },
    { id: 5, name: "David Wilson", role: "Marketing", joined: "May 2023", projects: 5 }
  ];

  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Page</h1>
          <Button variant="outline">Settings</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/api/placeholder/100/100" alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-gray-500">{user.role}</p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 text-center border rounded-lg mb-6">
                  <div className="p-4 border-r">
                    <div className="font-bold">{user.posts}</div>
                    <div className="text-sm text-gray-500">Post</div>
                  </div>
                  <div className="p-4 border-r">
                    <div className="font-bold">{user.projects}</div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold">{user.members / 1000}K</div>
                    <div className="text-sm text-gray-500">Members</div>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{user.website}</span>
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
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Latest Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Latest Activity</CardTitle>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {activities.map((activity) => (
                        <div key={activity.id} className="border-l-4 border-gray-200 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            {activity.label && (
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {activity.label}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span>Released on {activity.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                          {activity.id === 1 && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download ZIP
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* About & Connections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm">{user.bio}</p>
                      <p className="mt-4 text-gray-700 text-sm">
                        You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>Connections</CardTitle>
                        <Button variant="ghost" size="sm" className="gap-1">
                          View All <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {connections.map((connection) => (
                          <div key={connection.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/api/placeholder/32/32" alt={connection.name} />
                                <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{connection.name}</p>
                                <p className="text-xs text-gray-500">{connection.email}</p>
                              </div>
                            </div>
                            <Button 
                              variant={connection.connected ? "default" : "outline"} 
                              size="sm"
                            >
                              {connection.connected ? "Connect" : "Disconnect"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {projects.map((project) => (
                        <div key={project.id} className="border p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{project.title}</h3>
                            <Badge variant={
                              project.status === "In Progress" ? "default" : 
                              project.status === "Review" ? "secondary" : "outline"
                            }>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                          
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <div>Team: {project.team.join(", ")}</div>
                            <div>Due: {project.dueDate}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activities">
                <Card>
                  <CardHeader>
                    <CardTitle>All Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {activities.concat(activities).map((activity, index) => (
                        <div key={`${activity.id}-${index}`} className="border-l-4 border-gray-200 pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            {activity.label && index < 3 && (
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {activity.label}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span>Released on {activity.date}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                          {index === 0 && (
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download ZIP
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="members">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Name</th>
                            <th className="text-left py-3 px-4 font-medium">Role</th>
                            <th className="text-left py-3 px-4 font-medium">Joined</th>
                            <th className="text-left py-3 px-4 font-medium">Projects</th>
                            <th className="text-right py-3 px-4 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.id} className="border-b">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="/api/placeholder/32/32" alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{member.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-gray-600">{member.role}</td>
                              <td className="py-3 px-4 text-gray-600">{member.joined}</td>
                              <td className="py-3 px-4 text-gray-600">{member.projects}</td>
                              <td className="py-3 px-4 text-right">
                                <Button size="sm">Contact</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
};

export default ProfilePage;