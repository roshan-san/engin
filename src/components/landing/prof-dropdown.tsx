"use client"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function MobileProfileDropdown() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return null;
      const response = await fetch(`/api/user?email=${session.user.email}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!session?.user?.email,
  });

  // Hide dropdown on profile routes
  if (pathname?.startsWith('/profile/')) {
    return null;
  }

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback>
                {(session?.user?.name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="flex items-center justify-start gap-3 p-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
              <AvatarFallback>
                {(session?.user?.name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{session?.user?.name || 'User'}</span>
              <span className="text-xs text-muted-foreground">{session?.user?.email || ''}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link 
              href={userData?.username ? `/profile/${userData.username}` : '#'} 
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e) => {
                if (!userData?.username) {
                  e.preventDefault();
                }
              }}
            >
              <User className="h-5 w-5" />
              <span className="text-base">View Profile</span>
              {isLoading && <span className="ml-auto text-xs text-muted-foreground">Loading...</span>}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => signOut()} 
            className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-base">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 