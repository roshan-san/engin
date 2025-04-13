import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Mail, MapPin, Briefcase, Edit2, X, Plus, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge';

export default function About({
    user,
    isOwnProfile,
    isEditing,
    setIsEditing,
    editedProfile,
    setEditedProfile,
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
    handleUpdateInterests
}: {
    user: {
        bio?: string;
        email?: string;
        location?: string;
        type?: string;
        skills?: string[];
        areasofinterest?: string[];
    };
    isOwnProfile: boolean;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    editedProfile: {
        bio?: string;
    };
    setEditedProfile: (profile: { bio?: string }) => void;
    handleSave: () => void;
    isEditingSkills: boolean;
    setIsEditingSkills: (isEditing: boolean) => void;
    newSkill: string;
    setNewSkill: (skill: string) => void;
    handleUpdateSkills: (skills: string[]) => void;
    isEditingInterests: boolean;
    setIsEditingInterests: (isEditing: boolean) => void;
    newInterest: string;
    setNewInterest: (interest: string) => void;
    handleUpdateInterests: (interests: string[]) => void;
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveWithLoading = async () => {
    setIsSaving(true);
    try {
      await handleSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="p-4 sm:p-6">
                                                <div className="flex flex-row items-center justify-between">
                                                    <CardTitle className="text-base sm:text-lg">About</CardTitle>
                                                    {isOwnProfile && (
                                                        <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                                            <DialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 transition-all duration-300 hover:bg-muted">
                                                                    <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="w-[calc(100%-2rem)] sm:w-full">
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit About</DialogTitle>
                                                                    <CardDescription>
                                                                        Update your bio information
                                                                    </CardDescription>
                                                                </DialogHeader>
                                                                <div className="space-y-4">
                                                                    <div>
                                                                        <label className="text-sm font-medium">Bio</label>
                                                                        <Textarea
                                                                            value={editedProfile.bio}
                                                                            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                                                                            className="mt-2"
                                                                        />
                                                                    </div>
                                                                    <Button 
                                                                        onClick={handleSaveWithLoading} 
                                                                        className="w-full"
                                                                        disabled={isSaving}
                                                                    >
                                                                        {isSaving ? (
                                                                            <>
                                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                                Saving...
                                                                            </>
                                                                        ) : (
                                                                            "Save Changes"
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                                <p className="text-muted-foreground text-sm sm:text-base">{user.bio || 'No bio provided'}</p>
                                            </CardContent>
                                        </Card>

                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">Contact Information</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                                <div className="space-y-3 sm:space-y-4">
                                                    <div className="flex items-center gap-2 sm:gap-3 group">
                                                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                        <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.email || 'No email provided'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 sm:gap-3 group">
                                                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                        <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.location || 'Location not specified'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 sm:gap-3 group">
                                                        <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                        <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.type || 'User type not specified'}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-4 sm:space-y-6">
                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">Skills</CardTitle>
                                                {isOwnProfile && (
                                                    <Dialog open={isEditingSkills} onOpenChange={setIsEditingSkills}>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 transition-all duration-300 hover:bg-muted">
                                                                <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="w-[calc(100%-2rem)] sm:w-full">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Skills</DialogTitle>
                                                                <CardDescription>
                                                                    Add or remove skills from your profile
                                                                </CardDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-3 sm:space-y-4">
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        placeholder="Add a new skill"
                                                                        value={newSkill}
                                                                        onChange={(e) => setNewSkill(e.target.value)}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Enter' && newSkill.trim()) {
                                                                                const updatedSkills = [...(user.skills || []), newSkill.trim()];
                                                                                handleUpdateSkills(updatedSkills);
                                                                                setNewSkill('');
                                                                            }
                                                                        }}
                                                                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 h-9 sm:h-10"
                                                                    />
                                                                    <Button 
                                                                        onClick={() => {
                                                                            if (newSkill.trim()) {
                                                                                const updatedSkills = [...(user.skills || []), newSkill.trim()];
                                                                                handleUpdateSkills(updatedSkills);
                                                                                setNewSkill('');
                                                                            }
                                                                        }}
                                                                        className="transition-all duration-300 hover:scale-105 h-9 sm:h-10"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </div>
                                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                                    {user.skills?.map((skill: string, index: number) => (
                                                                        <Badge 
                                                                            key={index} 
                                                                            variant="secondary"
                                                                            className="group relative pr-8 transition-all duration-300 hover:bg-muted text-xs sm:text-sm"
                                                                        >
                                                                            {skill}
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-3.5 w-3.5 sm:h-4 sm:w-4 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                                                onClick={() => {
                                                                                    const updatedSkills = user.skills?.filter((_: string, i: number) => i !== index) || [];
                                                                                    handleUpdateSkills(updatedSkills);
                                                                                }}
                                                                            >
                                                                                <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                                                            </Button>
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {user.skills?.map((skill: string, index: number) => (
                                                        <Badge 
                                                            key={index} 
                                                            variant="secondary" 
                                                            className="rounded-md hover:bg-muted transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {(!user.skills || user.skills.length === 0) && (
                                                        <div className="text-center w-full py-3 sm:py-4">
                                                            <p className="text-xs sm:text-sm text-muted-foreground">No skills added yet</p>
                                                            {isOwnProfile && (
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm" 
                                                                    className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm"
                                                                    onClick={() => setIsEditingSkills(true)}
                                                                >
                                                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                                    Add Skills
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">Areas of Interest</CardTitle>
                                                {isOwnProfile && (
                                                    <Dialog open={isEditingInterests} onOpenChange={setIsEditingInterests}>
                                                        <DialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 transition-all duration-300 hover:bg-muted">
                                                                <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 hover:scale-110" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="w-[calc(100%-2rem)] sm:w-full">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Areas of Interest</DialogTitle>
                                                                <CardDescription>
                                                                    Add or remove areas of interest from your profile
                                                                </CardDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-3 sm:space-y-4">
                                                                <div className="flex gap-2">
                                                                    <Input
                                                                        placeholder="Add a new area of interest"
                                                                        value={newInterest}
                                                                        onChange={(e) => setNewInterest(e.target.value)}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Enter' && newInterest.trim()) {
                                                                                const updatedInterests = [...(user.areasofinterest || []), newInterest.trim()];
                                                                                handleUpdateInterests(updatedInterests);
                                                                                setNewInterest('');
                                                                            }
                                                                        }}
                                                                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 h-9 sm:h-10"
                                                                    />
                                                                    <Button 
                                                                        onClick={() => {
                                                                            if (newInterest.trim()) {
                                                                                const updatedInterests = [...(user.areasofinterest || []), newInterest.trim()];
                                                                                handleUpdateInterests(updatedInterests);
                                                                                setNewInterest('');
                                                                            }
                                                                        }}
                                                                        className="transition-all duration-300 hover:scale-105 h-9 sm:h-10"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </div>
                                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                                    {user.areasofinterest?.map((interest: string, index: number) => (
                                                                        <Badge 
                                                                            key={index} 
                                                                            variant="secondary"
                                                                            className="group relative pr-8 transition-all duration-300 hover:bg-muted text-xs sm:text-sm"
                                                                        >
                                                                            {interest}
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-3.5 w-3.5 sm:h-4 sm:w-4 absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                                                onClick={() => {
                                                                                    const updatedInterests = user.areasofinterest?.filter((_: string, i: number) => i !== index) || [];
                                                                                    handleUpdateInterests(updatedInterests);
                                                                                }}
                                                                            >
                                                                                <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                                                            </Button>
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                    {user.areasofinterest?.map((interest: string, index: number) => (
                                                        <Badge 
                                                            key={index} 
                                                            variant="secondary" 
                                                            className="rounded-md hover:bg-muted transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                                                        >
                                                            {interest}
                                                        </Badge>
                                                    ))}
                                                    {(!user.areasofinterest || user.areasofinterest.length === 0) && (
                                                        <div className="text-center w-full py-3 sm:py-4">
                                                            <p className="text-xs sm:text-sm text-muted-foreground">No interests added yet</p>
                                                            {isOwnProfile && (
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm" 
                                                                    className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm"
                                                                    onClick={() => setIsEditingInterests(true)}
                                                                >
                                                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                                    Add Interest
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
  )
}
