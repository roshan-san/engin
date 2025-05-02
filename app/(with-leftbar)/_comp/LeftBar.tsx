"use client";
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

export function LeftBar() {
  const pathname = usePathname();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Laptop },
    { title: "Startups", url: "/explore", icon: Search },
    { title: "Connections", url: "/connections", icon: Users },
    { title: "Messaging", url: "/message", icon: MessageCircle },
    { title: "Funding", url: "/funding", icon: DollarSign },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-16 bg-background border-r border-border p-2 h-full">
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
                <Link href="/profile" className="flex justify-center p-3 rounded-md hover:bg-accent hover:text-accent-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="rounded-lg">U</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Profile
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
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
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 h-16">
        <div className="flex justify-around items-center h-full">
          {items.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-accent-foreground"
                }`}
              >
                <item.icon className="size-5" />
                <span className="text-xs mt-1">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
