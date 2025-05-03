"use client";
import { Laptop, Search, Users, MessageCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/supabase/actions";
export function LeftBar() {
  const pathname = usePathname();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Laptop },
    { title: "Startups", url: "/explore", icon: Search },
    { title: "Connections", url: "/connections", icon: Users },
    { title: "Messaging", url: "/message", icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/50 p-2 h-full">
        <div className="flex-1 flex flex-col">
          <TooltipProvider delayDuration={0}>
            <div className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <Tooltip key={item.title}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.url}
                        className={`flex justify-center p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon className="size-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-background text-foreground border border-border/50 shadow-sm">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/profile" 
                  className="flex justify-center p-2 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/50 transition-all duration-200 hover:ring-primary/50">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="rounded-lg">U</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-background text-foreground border border-border/50 shadow-sm">
                Profile
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-background text-foreground border border-border/50 shadow-sm">
                Sign Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/50 z-50 h-16">
        <div className="flex justify-around items-center h-full px-4">
          {items.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-accent-foreground"
                }`}
              >
                <item.icon className="size-5" />
                <span className="text-[10px] font-medium mt-0.5">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
