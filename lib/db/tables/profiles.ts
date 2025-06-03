import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { userTypeEnum, workTypeEnum } from "./enums";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  avatar_url: text("avatar_url").notNull(),
  email: text("email").notNull(),
  github_url: text("github_url").default(""),
  linkedin_url: text("linkedin_url").default(""),
  username: text("username").notNull(),
  bio: text("bio").default(""),
  location: text("location").default(""),
  skills: text("skills").array(),
  interests: text("interests").array(),
  user_type: userTypeEnum("user_type").notNull(),
  work_type: workTypeEnum("work_type").notNull(),
  full_name: text("full_name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("profiles_id_idx").on(table.id),
]); 
export type Profile = typeof profiles.$inferSelect