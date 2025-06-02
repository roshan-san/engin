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

const mainNavigationItems = [
  { href: "/dashboard", icon: Laptop },
  { href: "/startups", icon: Search },
  { href: "/connect", icon: Users },
  { href: "/message", icon: MessageCircle },
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
        {isLoading ? (
          <div className="h-10 w-10 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
        ) : (
          <Avatar className="h-10 w-10 rounded-2xl">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 flex items-center justify-center rounded-xl hover:bg-primary/5 text-muted-foreground hover:text-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
