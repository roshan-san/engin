import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Edit2, Users, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ProfileHeader({ 
    user, 
    isOwnProfile, 
    acceptedConnections, 
    setShowConnections, 
    setIsEditing,
    handleSave,
    isUpdating,
    updateError 
}: { 
    user: any, 
    isOwnProfile: boolean, 
    acceptedConnections: any[], 
    setShowConnections: (show: boolean) => void, 
    setIsEditing: (editing: boolean) => void,
    handleSave: (editedProfile: { peru?: string }) => Promise<void>,
    isUpdating: boolean,
    updateError: Error | null
}) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(user.peru || '');

    const handleSaveName = async () => {
        if (!editedName.trim()) {
            toast.error('Name cannot be empty');
            return;
        }
        
        try {
            await handleSave({ peru: editedName.trim() });
            setIsEditingName(false);
            toast.success('Name updated successfully');
        } catch (error: any) {
            console.error('Error updating name:', error);
            toast.error(error.message || 'Failed to update name');
        }
    };

    return (
        <div className="relative border-b">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="flex flex-row items-center sm:items-end gap-4 sm:gap-8">
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
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl sm:text-4xl font-bold transition-colors duration-300 hover:text-primary">{user.peru || 'Anonymous User'}</h1>
                                {isOwnProfile && (
                                    <Dialog open={isEditingName} onOpenChange={setIsEditingName}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 hover:bg-muted">
                                                <Edit2 className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:scale-110" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-md">
                                            <DialogHeader className="space-y-2">
                                                <DialogTitle className="text-xl">Edit Name</DialogTitle>
                                                <DialogDescription className="text-base">
                                                    Update your display name
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-2">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Name</label>
                                                    <Input
                                                        value={editedName}
                                                        onChange={(e) => setEditedName(e.target.value)}
                                                        className="h-10"
                                                        placeholder="Your name"
                                                    />
                                                </div>
                                                <Button 
                                                    onClick={handleSaveName} 
                                                    className="w-full h-10"
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
                                                    <p className="text-sm text-destructive">{updateError.message}</p>
                                                )}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
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
    )
}
