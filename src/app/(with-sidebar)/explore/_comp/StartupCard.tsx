import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, DollarSign, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartupCardProps {
    id: number;
    name: string;
    description: string;
    industry: string;
    location: string;
    teamSize: number;
    funding: number;
    founder: {
        username: string;
        avatar: string;
    };
}

const StartupCard: React.FC<StartupCardProps> = ({
    id,
    name,
    description,
    industry,
    location,
    teamSize,
    funding,
    founder,
}) => {
    return (
        <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <Link href={`/startup/${id}`} className="block group">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{name}</h3>
                        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
                </CardHeader>
            </Link>
            <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
                        <Building2 className="h-4 w-4 text-primary" />
                        <Badge variant="secondary" className="font-medium">
                            {industry}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{teamSize} members</span>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">${funding.toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                    <Link 
                        href={`/profile/${founder.username}`} 
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                            <AvatarImage src={founder.avatar} alt={founder.username} />
                            <AvatarFallback>{founder.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-base font-semibold">{founder.username}</p>
                            <p className="text-xs text-muted-foreground">Founder</p>
                        </div>
                    </Link>
                    <Link href={`/profile/${founder.username}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <User className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default StartupCard; 