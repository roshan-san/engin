"use client"
import { Laptop, Search, Users, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/dashboard", icon: Laptop, },
  { href: "/startups", icon: Search, },
  { href: "/connect", icon: Users, },
  { href: "/message", icon: MessageCircle,},
  { href: `/profile/`, icon: User,},
];

export function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t">
      <div className="flex justify-around items-center h-full px-4">
        {navigationItems.map(({ href, icon: Icon }) => (
          <Link 
            key={href}
            href={href} 
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
              pathname === href 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    </div>
  );
} 