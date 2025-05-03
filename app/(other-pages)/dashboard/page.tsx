"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Home, Users, Activity, Plus, User } from "lucide-react";

// Mock data - replace with actual data from your backend
const friendRequests = [
  { id: 1, name: "John Doe", avatar: "/avatars/john.png", mutualFriends: 3 },
  { id: 2, name: "Jane Smith", avatar: "/avatars/jane.png", mutualFriends: 5 },
];

const recentActivity = [
  { id: 1, type: "startup", title: "TechCorp", action: "added new feature" },
  { id: 2, type: "friend", title: "Mike Johnson", action: "joined your network" },
];

export default function DashboardPage() {
  type TabType = "overview" | "requests" | "activity";
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-4 ring-background">
            <AvatarImage src="/avatars/user.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-muted-foreground">Here's what's happening today</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === "overview" && (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/startups">
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                  <CardContent className="p-8 flex flex-col items-center justify-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-lg">View Startups</p>
                    <p className="text-sm text-muted-foreground mt-2">Browse and discover new startups</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-lg">Create Startup</p>
                  <p className="text-sm text-muted-foreground mt-2">Launch your own startup</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors">
                    <Badge variant="outline" className="h-8 px-3 py-1">{activity.type}</Badge>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2h ago</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "requests" && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Friend Requests</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {friendRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.avatar} />
                      <AvatarFallback>{request.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="default" className="bg-primary">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "activity" && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl">All Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors">
                  <Badge variant="outline" className="h-8 px-3 py-1">{activity.type}</Badge>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2h ago</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
