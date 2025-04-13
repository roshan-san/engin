import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Edit2, Users } from 'lucide-react'
import React from 'react'

export default function ProfileHeader({ user, isOwnProfile, acceptedConnections, setShowConnections, setIsEditing }: { user: any, isOwnProfile: boolean, acceptedConnections: any[], setShowConnections: (show: boolean) => void, setIsEditing: (editing: boolean) => void }) {
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
  )
}
