import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import Link from "next/link";

const navigationItems = [
  { href: "/dashboard", icon: Laptop, label: "Home" },
  { href: "/startups", icon: Search, label: "Search" },
  { href: "/connections", icon: Users, label: "Teams" },
  { href: "/message", icon: MessageCircle, label: "Chat" },
];

export function BottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16">
      <div className="flex justify-around items-center h-full px-4">
        {navigationItems.map(({ href, icon: Icon, label }) => (
          <Link 
            key={href}
            href={href} 
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Icon className="size-5" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 