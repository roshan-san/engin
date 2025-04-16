"use client";

import { useSession } from "next-auth/react";
import { useUserStartups } from "@/hooks/useUserStartups";
import { StartupCard } from "@/components/StartupCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function StartupsPage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  
  const { 
    data: startups, 
    isLoading, 
    isError, 
    error 
  } = useUserStartups({ 
    userEmail,
    enabled: !!userEmail
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Startups</h1>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Create Startup
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load your startups"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Startups</h1>
        <Button asChild>
          <Link href="/dashboard">
            <Plus className="mr-2 h-4 w-4" />
            Create Startup
          </Link>
        </Button>
      </div>

      {startups && startups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <StartupCard 
              key={startup.id} 
              startup={startup}
              showFounder={false}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">No startups yet</h2>
          <p className="text-muted-foreground mb-4">
            Create your first startup to get started
          </p>
          <Button asChild>
            <Link href="/dashboard">
              <Plus className="mr-2 h-4 w-4" />
              Create Startup
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

