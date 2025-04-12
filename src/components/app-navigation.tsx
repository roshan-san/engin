"use client";
import { useSession, signOut } from "next-auth/react";
import { Laptop, Search, Users, MessageCircle, DollarSign, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Ava() {
  const { data: session } = useSession();

  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    </Avatar>
  );
}

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Laptop },
    { title: "Explore Startups", url: "/explore", icon: Search },
    { title: "Connections", url: "/connections", icon: Users },
    { title: "Messaging", url: "/message", icon: MessageCircle },
    { title: "Funding", url: "/funding", icon: DollarSign },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col w-16 bg-background border-r border-border p-2 h-screen">
      <div className="flex-1 flex flex-col">
        <TooltipProvider>
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={`flex justify-center p-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-col gap-2 pt-2 border-t border-border">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center p-3 rounded-md hover:bg-accent hover:text-accent-foreground">
                <Ava />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              {session?.user?.name || "Profile"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleSignOut}
                className="flex justify-center p-3 w-full rounded-md transition-colors text-muted-foreground hover:bg-destructive hover:text-destructive-foreground border border-border/50 hover:border-destructive mt-2"
              >
                <LogOut className="size-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mt-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSignOut}
                className="flex justify-center p-3 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full"
              >
                <LogOut className="size-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
