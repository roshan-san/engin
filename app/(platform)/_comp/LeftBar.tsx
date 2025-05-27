'use client';

import { Laptop, Search, Users, MessageCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop },
  { href: "/startups", icon: Search },
  { href: "/connections", icon: Users },
  { href: "/message", icon: MessageCircle },
];

export function LeftBar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col items-center py-4">
      <div className="flex flex-col items-center gap-4 flex-grow py-4">
        {mainNavigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
              pathname === item.href 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    

      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-10 w-10 rounded-2xl">
          <AvatarImage src="/avatar.png" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 flex items-center justify-center rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
