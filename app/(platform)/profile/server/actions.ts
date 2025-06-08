"use server"

import { db } from "@/lib/db/";
import { profiles } from "@/lib/db/schema";
import { safeWrap } from "@/lib/utils/error-handler";
import { eq } from "drizzle-orm";

export async function getProfileById(id: string) {
  return safeWrap(async function () {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, id))
      .limit(1);

    if (!profile.length) {
      return null;
    }

    return profile[0];
  }, "Error finding the profile");
}
