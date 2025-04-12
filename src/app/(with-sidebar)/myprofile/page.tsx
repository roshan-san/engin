"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Briefcase, Users, Calendar, Building2, Edit2, Plus, Link as LinkIcon, Globe, Twitter, Instagram, Phone, X, User } from 'lucide-react';
import { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [showConnections, setShowConnections] = useState(false);

    const { data: user, isLoading, error, refetch } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUser(email),
        enabled: !!email,
    });

    const handleUpdateProfile = async (formData: FormData) => {
        try {
            // Validate required fields
            const requiredFields = ['peru', 'username', 'type', 'location'];
            const missingFields = requiredFields.filter(field => !formData.get(field));
            
            if (missingFields.length > 0) {
                toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
                return;
            }

            // Validate URLs if provided
            const linkedin = formData.get('linkedin') as string;
            const github = formData.get('github') as string;
            
            if (linkedin && !linkedin.startsWith('https://www.linkedin.com/')) {
                toast.error('Please enter a valid LinkedIn URL');
                return;
            }
            
            if (github && !github.startsWith('https://github.com/')) {
                toast.error('Please enter a valid GitHub URL');
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
            
            toast.success('Profile updated successfully');
            setIsEditing(false);
            refetch();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile');
        }
    };

    const handleUpdateSkills = async (skills: string[]) => {
        try {
            // Validate skills
            if (skills.some(skill => skill.length < 2)) {
                toast.error('Skills must be at least 2 characters long');
                return;
            }

            if (skills.some(skill => skill.length > 50)) {
                toast.error('Skills must be less than 50 characters long');
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
            
            toast.success('Skills updated successfully');
            setIsEditingSkills(false);
            setNewSkill('');
            refetch();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update skills');
        }
    };

    const handleUpdateInterests = async (interests: string[]) => {
        try {
            // Validate interests
            if (interests.some(interest => interest.length < 2)) {
                toast.error('Interests must be at least 2 characters long');
                return;
            }

            if (interests.some(interest => interest.length > 50)) {
                toast.error('Interests must be less than 50 characters long');
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
            
            toast.success('Areas of interest updated successfully');
            setIsEditingInterests(false);
            setNewInterest('');
            refetch();
        } catch (error: any) {
            toast.error(error.message || 'Failed to update areas of interest');
        }
    };

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

    const acceptedConnections = user.receivedConnections?.filter(
        (connection: any) => connection.status === "accepted"
    ) || [];

    return (
        <div className="min-h-screen bg-background">
            {/* Profile Header */}
            <div className="relative border-b">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="flex flex-row items-center sm:items-end gap-4 sm:gap-8">
                        {/* Avatar with enhanced styling */}
                        <motion.div 
                            className="relative group"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Avatar className="w-20 h-20 sm:w-36 sm:h-36 border-2 border-border rounded-full ring-2 ring-primary/20 shadow-sm transition-all duration-300 group-hover:ring-primary/40 group-hover:shadow-md">
                                <AvatarImage src={user.avatar || ''} alt={user.username || ''} />
                                <AvatarFallback className="text-2xl sm:text-4xl bg-muted">
                                    {(user.username || 'U').charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </motion.div>
                        
                        {/* User info with enhanced styling */}
                        <div className="flex-1">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="space-y-2 sm:space-y-3"
                            >
                                <h1 className="text-2xl sm:text-4xl font-bold transition-colors duration-300 hover:text-primary">{user.peru || 'Anonymous User'}</h1>
                                <p className="text-muted-foreground text-base sm:text-xl">@{user.username || 'anonymous'}</p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-4">
                                    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-300 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm">
                                        {user.type || 'User'}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-300 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm">
                                        {user.location || 'Location not specified'}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        className="text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-300 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm"
                                        onClick={() => setShowConnections(true)}
                                    >
                                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 transition-transform duration-300 group-hover:scale-110" />
                                        {acceptedConnections.length} Connections
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
                {/* Navigation Tabs */}
                <div className="border-b mb-4 sm:mb-6 overflow-x-auto">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="w-full justify-start h-9 sm:h-10 p-0 bg-transparent">
                            <TabsTrigger 
                                value="about" 
                                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-3 sm:px-4 h-9 sm:h-10 transition-all duration-300 ease-in-out hover:text-primary text-sm sm:text-base"
                            >
                                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:scale-110" />
                                About
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

                        {/* Tab Content */}
                        <div className="mt-4 sm:mt-6">
                            <TabsContent value="about" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                                {/* About Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {/* Left Column - Bio and Contact */}
                                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">About</CardTitle>
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

                                    {/* Right Column - Skills and Interests */}
                                    <div className="space-y-4 sm:space-y-6">
                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">Skills</CardTitle>
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
                                                                                const updatedSkills = user.skills.filter((_: string, i: number) => i !== index);
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
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm"
                                                                onClick={() => setIsEditingSkills(true)}
                                                            >
                                                                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                                Add Skills
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="transition-all duration-300 hover:shadow-sm border-border">
                                            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
                                                <CardTitle className="text-base sm:text-lg">Areas of Interest</CardTitle>
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
                                                                                const updatedInterests = user.areasofinterest.filter((_: string, i: number) => i !== index);
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
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm" 
                                                                className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm"
                                                                onClick={() => setIsEditingInterests(true)}
                                                            >
                                                                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                                Add Interest
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="startups" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                                {user.startups && user.startups.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                        {user.startups.map((startup: any) => (
                                            <Card key={startup.id} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                                                <CardContent className="p-3 sm:p-4 lg:p-6">
                                                    <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-4">{startup.name}</h2>
                                                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">{startup.description}</p>

                                                    <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                                                        <div className="flex items-center text-xs sm:text-sm group">
                                                            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mr-1.5 sm:mr-2 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                            <span className="truncate">{startup.industry}</span>
                                                        </div>

                                                        <div className="flex items-center text-xs sm:text-sm group">
                                                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mr-1.5 sm:mr-2 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                            <span className="truncate">{startup.location}</span>
                                                        </div>

                                                        <div className="flex items-center text-xs sm:text-sm group">
                                                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground mr-1.5 sm:mr-2 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                                            <span>Team Size: {startup.teamSize}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                                            <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                                                <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground transition-transform duration-300 hover:scale-110" />
                                                <div>
                                                    <h3 className="text-sm sm:text-base lg:text-lg font-medium">No startups yet</h3>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Add your startups to showcase your work</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm">
                                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                    Add Startup
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="experience" className="space-y-4 sm:space-y-6 transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=active]:opacity-100">
                                {user.experiences && user.experiences.length > 0 ? (
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-3 sm:p-4 lg:p-6">
                                            <div className="space-y-4 sm:space-y-6">
                                                {user.experiences.map((experience: any, index: number) => {
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
                                                        <div key={index} className="group transition-all duration-300 hover:bg-muted/30 p-2 sm:p-3 rounded-lg">
                                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                                                                <div>
                                                                    <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                                                                        {experience.role}
                                                                    </h3>
                                                                    <p className="text-muted-foreground text-sm">
                                                                        {experience.company}
                                                                    </p>
                                                                </div>
                                                                <div className="text-xs sm:text-sm text-muted-foreground">
                                                                    {startDate} - {endDate}
                                                                </div>
                                                            </div>
                                                            {experience.description && (
                                                                <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                                                                    {experience.description}
                                                                </p>
                                                            )}
                                                            {index < (user.experiences?.length || 0) - 1 && (
                                                                <Separator className="my-3 sm:my-4" />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card className="transition-all duration-300 hover:shadow-md">
                                        <CardContent className="p-3 sm:p-4 lg:p-6 text-center">
                                            <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
                                                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground transition-transform duration-300 hover:scale-110" />
                                                <div>
                                                    <h3 className="text-sm sm:text-base lg:text-lg font-medium">No experience yet</h3>
                                                    <p className="text-xs sm:text-sm text-muted-foreground">Add your work experience to build your profile</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm">
                                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                                    Add Experience
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>

            {/* Connections Dialog */}
            <Dialog open={showConnections} onOpenChange={setShowConnections}>
                <DialogContent className="max-w-2xl w-[calc(100%-2rem)] sm:w-full">
                    <DialogHeader>
                        <DialogTitle>My Connections</DialogTitle>
                        <CardDescription>
                            View and manage your connections
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
                            <Button variant="outline" className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm">
                                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                                Find Connections
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
