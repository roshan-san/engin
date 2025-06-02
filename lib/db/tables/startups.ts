import { integer, pgTable, text, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";

export const startups = pgTable("startups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  location:text("location").notNull(),
  description: text("description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  teamSize: integer("team_size").notNull(),
  patent: text("patent").notNull(),
  funding: integer("funding").notNull(),
  founderId: uuid("founder_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("startups_id_idx").on(table.id),
]);
export type Startup= typeof startups.$inferInsert