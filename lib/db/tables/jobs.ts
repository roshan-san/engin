import { pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { startups } from "./startups";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  startupId: uuid("startup_id").references(() => startups.id),
},(table) => [
  index("jobs_startup_id_idx").on(table.startupId),
]); 

export type Job = typeof jobs.$inferSelect
export type JobInsert = typeof jobs.$inferInsert 