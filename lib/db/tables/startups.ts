import { integer, pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const startups = pgTable("startups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().default(""),
  location:text("location").notNull().default(""),
  description: text("description").notNull().default(""),
  problem: text("problem").notNull().default(""),
  solution: text("solution").notNull().default(""),
  teamSize: integer("team_size").notNull().default(1),
  patent: text("patent").notNull().default(""),
  funding: integer("funding").notNull().default(0),
  founderId: uuid("founder_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("startups_id_idx").on(table.id),
]);

export type Startup = typeof startups.$inferSelect
export type StartupInsert = typeof startups.$inferInsert