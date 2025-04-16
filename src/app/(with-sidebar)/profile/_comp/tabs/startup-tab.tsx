import { StartupCard } from '@/components/StartupCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Plus } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function StartupTab({
    user,
    isOwnProfile,
    setIsEditing
}: {
    user: any,
    isOwnProfile: boolean,
    setIsEditing: (isEditing: boolean) => void
}) {
  const router = useRouter();

  return (
    <>
    {user.startups && user.startups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {user.startups.map((startup: any) => (
                <StartupCard
                    key={startup.id}
                    startup={startup}
                    showFounder={false}
                />
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
                    {isOwnProfile && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm"
                            onClick={() => router.push('/dashboard')}
                        >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                            Add Startup
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )}
            </>
  )
}
