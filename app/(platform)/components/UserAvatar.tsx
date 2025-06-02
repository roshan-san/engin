'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

async function getUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export function UserAvatar() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
  
  const avatarUrl = user?.user_metadata?.avatar_url;

  if (isLoading) {
    return (
      <div className="h-5 w-5 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    );
  }

  return (
    <Avatar className="h-8 w-8 rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/20">
      <AvatarImage src={avatarUrl || undefined} />
      <AvatarFallback className="bg-primary/10 text-primary">
        {user?.email?.[0]?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
} 