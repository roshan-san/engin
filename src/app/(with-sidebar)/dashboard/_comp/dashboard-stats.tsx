"use client";
import { useSession } from "next-auth/react";
import { Users, Building2, TrendingUp } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStats() {
  const { data: session } = useSession();
  const email = session?.user?.email || undefined;
  const router = useRouter();
  
  const { stats, isLoading } = useDashboardStats(email);
  
  const { data: userData } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      if (!email) return null;
      const response = await fetch(`/api/user?email=${email}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!email,
  });

  const handleCardClick = () => {
    if (userData?.username) {
      router.push(`/profile/${userData.username}`);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card 
        onClick={handleCardClick}
        className="relative overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer hover:from-blue-500/20 hover:to-blue-600/20"
      >
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-600">Total Connections</CardTitle>
          <Users className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">{stats.totalConnections}</div>
          <p className="mt-2 text-sm text-blue-500/80">
            Your professional network
          </p>
        </CardContent>
      </Card>

      <Card 
        onClick={handleCardClick}
        className="relative overflow-hidden border-none bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer hover:from-green-500/20 hover:to-green-600/20"
      >
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-green-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-600">Startups</CardTitle>
          <Building2 className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{stats.startups}</div>
          <p className="mt-2 text-sm text-green-500/80">
            Your startup ventures
          </p>
        </CardContent>
      </Card>

      <Card 
        onClick={handleCardClick}
        className="relative overflow-hidden border-none bg-gradient-to-br from-amber-500/10 to-amber-600/10 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer hover:from-amber-500/20 hover:to-amber-600/20"
      >
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-amber-500/10 blur-2xl" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-600">Active Projects</CardTitle>
          <TrendingUp className="h-5 w-5 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-600">{stats.activeProjects}</div>
          <p className="mt-2 text-sm text-amber-500/80">
            Ongoing collaborations
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 