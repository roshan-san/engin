"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Linkedin, Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    role: "Founder & AI Innovator",
    bio: "Building AI tools for content creators. Technical co-founder seeking innovative opportunities.",
    skills: ["AI", "Machine Learning", "Product Management", "SaaS"],
    interests: ["AI & Machine Learning", "SaaS"],
    email: "alex.johnson@example.com",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Name</label>
                <Input 
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Role</label>
                <Input 
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Bio</label>
                <Textarea 
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Skills (comma-separated)</label>
                <Input 
                  name="skills"
                  value={profileData.skills.join(", ")}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(",").map(skill => skill.trim());
                    setProfileData(prev => ({
                      ...prev,
                      skills: skillsArray
                    }));
                  }}
                />
              </div>
              <Button onClick={() => setIsEditing(false)} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardContent className="pt-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="/path/to/avatar" alt={profileData.name} />
                <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.role}</p>
              <div className="mt-4 flex justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => window.open(profileData.linkedin, '_blank')}>
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => window.open(profileData.github, '_blank')}>
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{profileData.bio}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <p>Email: {profileData.email}</p>
                <p>Location: {profileData.location}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map(interest => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}