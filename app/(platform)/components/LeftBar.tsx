'use client';
import { Laptop, Search, Users, MessageCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(landing)/server/actions";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop, label: "Dashboard" },
  { href: "/startups", icon: Search, label: "Discover" },
  { href: "/connect", icon: Users, label: "Connect" },
  { href: "/message", icon: MessageCircle, label: "Messages" },
];

async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function LeftBar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="flex h-screen flex-col items-center ">
      <div className="flex flex-col items-center gap-6 flex-grow py-8">
        {mainNavigationItems.map((item) => (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                    pathname === item.href 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    
      <div className="flex flex-col items-center gap-6 p-4 w-full">
        {isLoading ? (
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-10 w-10 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/20">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
                onClick={() => signOut()}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
