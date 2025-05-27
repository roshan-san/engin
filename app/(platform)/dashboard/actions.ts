import { db } from "@/lib/db/drizzle";
import { startups } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createClient } from "@/lib/supabase/server";

export async function getFriendRequests() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  // TODO: Implement actual friend request fetching
  // This is a placeholder that returns mock data
  return [
    { id: "1", username: "john_doe", avatar: "https://github.com/shadcn.png" },
    { id: "2", username: "jane_smith", avatar: "https://github.com/shadcn.png" },
  ];
}

export async function acceptFriendRequest(requestId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  // TODO: Implement actual friend request acceptance
  return { success: true };
}

export async function rejectFriendRequest(requestId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  // TODO: Implement actual friend request rejection
  return { success: true };
}

export async function getUserStartups() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");

  const res = await db.query.startups.findMany({
    where: eq(startups.founderId, user.id)
  });
  
  return res;
} 