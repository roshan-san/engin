import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { userTypeEnum, employmentTypeEnum } from "./enums";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  avatar_url: text("avatar_url").notNull(),
  email: text("email").notNull(),
  github_url: text("github_url"),
  linkedin_url: text("linkedin_url"),
  username: text("username").notNull(),
  bio: text("bio").default(""),
  location: text("location").notNull(),
  skills: text("skills").array(),
  interests: text("interests").array(),
  user_type: userTypeEnum("user_type").notNull(),
  employment_type: employmentTypeEnum("employment_type").notNull(),
  full_name: text("full_name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("profiles_id_idx").on(table.id),
]); 
export type Profile = typeof profiles.$inferInsert