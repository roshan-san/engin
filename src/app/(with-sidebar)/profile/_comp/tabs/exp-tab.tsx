import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Plus } from 'lucide-react';
import React from 'react'

export default function ExpTab({
    user,
    isOwnProfile,
    setIsEditing
}: {
    user: any,
    isOwnProfile: boolean,
    setIsEditing: (isEditing: boolean) => void
}) {
  return (
    <>
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
                    {isOwnProfile && (
                        <Button variant="outline" size="sm" className="mt-2 transition-all duration-300 hover:scale-105 h-8 sm:h-9 text-xs sm:text-sm">
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                            Add Experience
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )}
            </>
  )
}
