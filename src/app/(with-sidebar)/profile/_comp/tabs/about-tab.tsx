import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Mail, MapPin, Briefcase, Edit2, X, Plus, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function About({
    user,
    isOwnProfile,
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
    isUpdating,
    updateError
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
    handleSave: (editedProfile: { 
        bio?: string;
        email?: string;
        location?: string;
        type?: string;
    }) => Promise<void>;
    isEditingSkills: boolean;
    setIsEditingSkills: (isEditing: boolean) => void;
    newSkill: string;
    setNewSkill: (skill: string) => void;
    handleUpdateSkills: (skills: string[]) => Promise<void>;
    isEditingInterests: boolean;
    setIsEditingInterests: (isEditing: boolean) => void;
    newInterest: string;
    setNewInterest: (interest: string) => void;
    handleUpdateInterests: (interests: string[]) => Promise<void>;
    isUpdating: boolean;
    updateError: Error | null;
}) {
    const [editedBio, setEditedBio] = useState(user.bio || '');
    const [editedLocation, setEditedLocation] = useState(user.location || '');
    const [editedType, setEditedType] = useState(user.type || '');

    const handleSaveWithLoading = async () => {
        try {
            await handleSave({ 
                bio: editedBio,
                location: editedLocation,
                type: editedType
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    const handleAddSkill = async () => {
        if (!newSkill.trim()) return;
        try {
            const updatedSkills = [...(user.skills || []), newSkill.trim()];
            await handleUpdateSkills(updatedSkills);
            setNewSkill('');
            toast.success('Skill added successfully');
        } catch (error) {
            toast.error('Failed to add skill');
        }
    };

    const handleRemoveSkill = async (skillToRemove: string) => {
        try {
            const updatedSkills = (user.skills || []).filter(skill => skill !== skillToRemove);
            await handleUpdateSkills(updatedSkills);
            toast.success('Skill removed successfully');
        } catch (error) {
            toast.error('Failed to remove skill');
        }
    };

    const handleAddInterest = async () => {
        if (!newInterest.trim()) return;
        try {
            const updatedInterests = [...(user.areasofinterest || []), newInterest.trim()];
            await handleUpdateInterests(updatedInterests);
            setNewInterest('');
            toast.success('Interest added successfully');
        } catch (error) {
            toast.error('Failed to add interest');
        }
    };

    const handleRemoveInterest = async (interestToRemove: string) => {
        try {
            const updatedInterests = (user.areasofinterest || []).filter(interest => interest !== interestToRemove);
            await handleUpdateInterests(updatedInterests);
            toast.success('Interest removed successfully');
        } catch (error) {
            toast.error('Failed to remove interest');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <Card className="transition-all duration-300 hover:shadow-md border-border">
                    <CardHeader className="p-5 sm:p-6 border-b">
                        <div className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg sm:text-xl font-semibold">About</CardTitle>
                            {isOwnProfile && (
                                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 hover:bg-muted">
                                            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:scale-110" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-2xl">
                                        <DialogHeader className="space-y-2">
                                            <DialogTitle className="text-xl">Edit Profile</DialogTitle>
                                            <CardDescription className="text-base">
                                                Update your profile information
                                            </CardDescription>
                                        </DialogHeader>
                                        <div className="space-y-5 py-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Location</label>
                                                <Input
                                                    value={editedLocation}
                                                    onChange={(e) => setEditedLocation(e.target.value)}
                                                    className="h-10"
                                                    placeholder="Your location"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Type</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                                                    <Button
                                                        type="button"
                                                        variant={editedType === "creator/collaborator" ? "default" : "outline"}
                                                        onClick={() => setEditedType("creator/collaborator")}
                                                        className="text-xs h-8 sm:h-9 py-1 px-2 sm:px-3"
                                                    >
                                                        Creator/Collaborator
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={editedType === "mentor" ? "default" : "outline"}
                                                        onClick={() => setEditedType("mentor")}
                                                        className="text-xs h-8 sm:h-9 py-1 px-2 sm:px-3"
                                                    >
                                                        Mentor
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={editedType === "investor" ? "default" : "outline"}
                                                        onClick={() => setEditedType("investor")}
                                                        className="text-xs h-8 sm:h-9 py-1 px-2 sm:px-3"
                                                    >
                                                        Investor
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Bio</label>
                                                <Textarea
                                                    value={editedBio}
                                                    onChange={(e) => setEditedBio(e.target.value)}
                                                    className="min-h-[120px] resize-none"
                                                    placeholder="Tell us about yourself"
                                                />
                                            </div>
                                            <Button 
                                                onClick={handleSaveWithLoading} 
                                                className="w-full h-10 mt-2"
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    "Save Changes"
                                                )}
                                            </Button>
                                            {updateError && (
                                                <p className="text-sm text-destructive mt-2">{updateError.message}</p>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-5 sm:p-6 space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-base font-medium text-foreground">Bio</h3>
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{user.bio || 'No bio provided'}</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-base font-medium text-foreground">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 group">
                                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.email || 'No email provided'}</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.location || 'Location not specified'}</span>
                                </div>
                                <div className="flex items-center gap-3 group">
                                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                    <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-300">{user.type || 'User type not specified'}</span>
                                </div>
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
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                placeholder="Add a skill"
                                                className="flex-1"
                                            />
                                            <Button 
                                                onClick={handleAddSkill}
                                                disabled={isUpdating || !newSkill.trim()}
                                            >
                                                {isUpdating ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Plus className="h-4 w-4" />
                                                )}
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
                                                        className="absolute right-1 h-4 w-4 p-0 hover:bg-transparent"
                                                        onClick={() => handleRemoveSkill(skill)}
                                                    >
                                                        <X className="h-3 w-3" />
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
                                        <DialogTitle>Edit Interests</DialogTitle>
                                        <CardDescription>
                                            Add or remove areas of interest from your profile
                                        </CardDescription>
                                    </DialogHeader>
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex gap-2">
                                            <Input
                                                value={newInterest}
                                                onChange={(e) => setNewInterest(e.target.value)}
                                                placeholder="Add an interest"
                                                className="flex-1"
                                            />
                                            <Button 
                                                onClick={handleAddInterest}
                                                disabled={isUpdating || !newInterest.trim()}
                                            >
                                                {isUpdating ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Plus className="h-4 w-4" />
                                                )}
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
                                                        className="absolute right-1 h-4 w-4 p-0 hover:bg-transparent"
                                                        onClick={() => handleRemoveInterest(interest)}
                                                    >
                                                        <X className="h-3 w-3" />
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
                                            Add Interests
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
