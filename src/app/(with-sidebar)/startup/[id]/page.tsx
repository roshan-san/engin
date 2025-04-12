"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  DollarSign, 
  FileText, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Edit,
  Plus,
  Settings,
  Trash2
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobsTab } from "./components/JobsTab";
import { TeamTab } from "./components/TeamTab";
import { InvestorsTab } from "./components/InvestorsTab";
import { Startup } from "./types";

async function fetchStartup(id: string) {
  const response = await fetch(`/api/startup?id=${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch startup");
  }
  return response.json() as Promise<Startup>;
}

export default function StartupPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("jobs");
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: startup, isLoading, error, refetch } = useQuery({
    queryKey: ["startup", params.id],
    queryFn: () => fetchStartup(params.id as string),
  });

  const isOwner = session?.user?.email && startup?.founder?.email && session.user.email === startup.founder.email;

  const handleApply = async (jobId: number) => {
    if (!session?.user?.id) {
      toast.error("Please sign in to apply for this position");
      return;
    }
    
    try {
      const response = await fetch("/api/job-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          userId: session.user.id,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to apply");
      }
      
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleEditStartup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startup) return;
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
        problem: formData.get("problem"),
        solution: formData.get("solution"),
        industry: formData.get("industry"),
        location: formData.get("location"),
        teamSize: parseInt(formData.get("teamSize") as string),
        patent: formData.get("patent") || null,
        funding: formData.get("funding") ? parseInt(formData.get("funding") as string) : null,
      };
      
      const response = await fetch(`/api/startup/${startup.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update startup");
      }
      
      toast.success("Startup updated successfully!");
      setIsEditing(false);
      refetch();
    } catch (error) {
      toast.error("Failed to update startup. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Startup not found</h1>
      </div>
    );
  }

  return (
    <div className="container py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 mb-6">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background">{startup.industry}</Badge>
                {isOwner && (
                  <Badge variant="secondary">Owner</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold">{startup.name}</h1>
              <p className="text-muted-foreground">{startup.description}</p>
            </div>
            
            {isOwner && (
              <div className="flex items-start">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit Startup Details</DialogTitle>
                      <DialogDescription>
                        Update your startup information. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditStartup}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" name="name" defaultValue={startup.name} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">Description</Label>
                          <Textarea id="description" name="description" defaultValue={startup.description} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="problem" className="text-right">Problem</Label>
                          <Textarea id="problem" name="problem" defaultValue={startup.problem} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="solution" className="text-right">Solution</Label>
                          <Textarea id="solution" name="solution" defaultValue={startup.solution} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="industry" className="text-right">Industry</Label>
                          <Input id="industry" name="industry" defaultValue={startup.industry} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">Location</Label>
                          <Input id="location" name="location" defaultValue={startup.location} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="teamSize" className="text-right">Team Size</Label>
                          <Input id="teamSize" name="teamSize" type="number" defaultValue={startup.teamSize} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="patent" className="text-right">Patent</Label>
                          <Input id="patent" name="patent" defaultValue={startup.patent || ""} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="funding" className="text-right">Funding</Label>
                          <Input id="funding" name="funding" type="number" defaultValue={startup.funding || ""} className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Founder Info */}
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={startup.founder.avatar} alt={startup.founder.username} />
                <AvatarFallback>{startup.founder.username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link href={`/profile/${startup.founder.username}`} className="font-medium hover:underline">
                  {startup.founder.username}
                </Link>
                <p className="text-xs text-muted-foreground">Founder</p>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Problem</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{startup.problem}</p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Solution</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{startup.solution}</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-sm text-muted-foreground">{startup.location}</p>
            </div>
            
            {startup.patent && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Patent</span>
                </div>
                <p className="text-sm text-muted-foreground">{startup.patent}</p>
              </div>
            )}
            
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Team</span>
              </div>
              <p className="text-sm text-muted-foreground">{startup.teamSize} members</p>
            </div>
            
            {startup.funding && (
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Funding</span>
                </div>
                <p className="text-sm text-muted-foreground">${startup.funding.toLocaleString()}</p>
              </div>
            )}
          </div>
          
          {/* Social Links */}
          {(startup.founder.linkedin || startup.founder.github) && (
            <div className="flex gap-2">
              {startup.founder.linkedin && (
                <Link href={startup.founder.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    LinkedIn
                  </Button>
                </Link>
              )}
              {startup.founder.github && (
                <Link href={startup.founder.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" />
                    GitHub
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="jobs">Open Positions</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs">
          <JobsTab startup={startup} isOwner={!!isOwner} onRefetch={refetch} />
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <TeamTab startup={startup} isOwner={!!isOwner} />
        </TabsContent>

        {/* Investors Tab */}
        <TabsContent value="investors">
          <InvestorsTab startup={startup} isOwner={!!isOwner} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 