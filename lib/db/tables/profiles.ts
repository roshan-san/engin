import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { userTypeEnum, workTypeEnum } from "./enums";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  avatar_url: text("avatar_url").notNull(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),

  username: text("username").notNull(),
  location: text("location").default(""),
  
  work_type: workTypeEnum("work_type").notNull(),
  user_type: userTypeEnum("user_type").notNull(),
  github_url: text("github_url").default(""),
  linkedin_url: text("linkedin_url").default(""),

  bio: text("bio").default(""),
  
  interests: text("interests").array().default([""]),
  skills: text("skills").array().default([""]),

  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("profiles_id_idx").on(table.id),
]); 
export type Profile = typeof profiles.$inferSelect
export type ProfileInsert = typeof profiles.$inferInsert
