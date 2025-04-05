"use client";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Laptop, MessageCircle, Search, Users, DollarSign } from "lucide-react";
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
    <div className="flex flex-col w-24 bg-sidebar border-r p-2 h-full">
      <div className="flex-1">
        <TooltipProvider>
          <div className="space-y-4">
            {items.map((item) => {
              const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.url}
                      className={`flex flex-col justify-center p-3 text-center items-center gap-1 rounded-md transition-all ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "hover:bg-sidebar-hover text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-popover text-popover-foreground">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
      
      <div className="mt-auto pt-6 space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-center">
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
                className="flex justify-center p-3 w-full text-center items-center rounded-md transition-all hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover text-popover-foreground">
              Sign Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
