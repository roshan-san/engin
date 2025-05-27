'use client';
import { Laptop, Search, Users, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  mobile?: boolean;
}

export function NavItems({ mobile }: NavItemsProps) {
  const pathname = usePathname();
  
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Laptop },
    { title: "Startups", url: "/startups", icon: Search },
    { title: "Connections", url: "/connections", icon: Users },
    { title: "Messaging", url: "/message", icon: MessageCircle },
  ];

  if (mobile) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
        return (
          <Link
            key={item.title}
            href={item.url}
            className={`flex justify-center p-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            }`}
          >
            <item.icon className="size-5" />
          </Link>
        );
      })}
    </div>
  );
} 