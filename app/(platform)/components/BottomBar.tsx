"use client"
import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./UserAvatar";

const navigationItems = [
  { href: "/dashboard", icon: Laptop, },
  { href: "/startups", icon: Search, },
  { href: "/connect", icon: Users, },
  { href: "/message", icon: MessageCircle,},
];
export function BottomBar() {
  const pathname = usePathname();
  return (
      <div className="flex justify-around items-center h-full p-2">
        {navigationItems.map(({ href, icon: Icon }) => (
          <Link 
            key={href}
            href={href} 
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
              pathname === href 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
        <Link 
          href="/profile"
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
            pathname =="profile"
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
          )}
        >
          <UserAvatar />
        </Link>
      </div>
  );
} 