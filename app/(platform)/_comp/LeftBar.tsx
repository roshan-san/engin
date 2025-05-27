import {LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavItems } from "./NavItems";

export function LeftBar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/50 p-2 h-full">
        <div className="flex-1 flex flex-col">
          <NavItems />
        </div>
        
        <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
          <Link 
            href="/profile" 
            className="flex justify-center p-2 rounded-lg transition-all duration-200 hover:bg-accent/50 hover:text-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg ring-2 ring-border/50 transition-all duration-200 hover:ring-primary/50">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="rounded-lg">U</AvatarFallback>
            </Avatar>
          </Link>
          
          <Button variant="ghost">
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/50 z-50 h-16">
        <div className="flex justify-around items-center h-full px-4">
          <NavItems mobile />
        </div>
      </div>
    </>
  );
}
