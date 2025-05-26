"use client";
import { useSession } from "next-auth/react";
import { Check, X } from "lucide-react";
import { usePendingConnections } from "@/hooks/usePendingConnections";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function PendingConnections() {
  const { data: session } = useSession();
  const email = session?.user?.email || undefined;
  
  const { 
    pendingConnections, 
    isLoading, 
    handleAcceptConnection, 
    handleRejectConnection 
  } = usePendingConnections(email);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pending Connections</CardTitle>
          <CardDescription>Loading your connection requests...</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pendingConnections.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pending Connections</CardTitle>
          <CardDescription>You have no pending connection requests</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Pending Connections</CardTitle>
        <CardDescription>Manage your connection requests</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {pendingConnections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center justify-between p-3 hover:bg-muted/50"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={connection.sender.avatar} />
                  <AvatarFallback>
                    {connection.sender.peru.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{connection.sender.peru}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">{connection.sender.email}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                  onClick={() => handleAcceptConnection(connection.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRejectConnection(connection.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 