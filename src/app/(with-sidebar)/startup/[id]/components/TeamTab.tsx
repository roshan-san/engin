import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Startup } from "../types";

interface TeamTabProps {
  startup: Startup;
  isOwner: boolean;
}

export function TeamTab({ startup, isOwner }: TeamTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>People working at {startup.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={startup.founder.avatar} alt={startup.founder.username} />
              <AvatarFallback>{startup.founder.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{startup.founder.username}</h3>
              <p className="text-sm text-muted-foreground">Founder</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Founder</Badge>
          </div>
          <div className="text-center p-6">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No other team members yet</h3>
            <p className="text-muted-foreground mt-2">
              {isOwner 
                ? "Add team members as you grow" 
                : "The team is currently small but growing"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 