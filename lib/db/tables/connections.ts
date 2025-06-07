import { pgTable, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { profiles } from "./profiles";
import { connectionStatusEnum } from "./enums";

export const connections = pgTable("connections", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id").references(() => profiles.id).notNull(),
  receiverId: uuid("receiver_id").references(() => profiles.id).notNull(),
  status: connectionStatusEnum("status").default("pending").notNull(),
  
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("connections_sender_id_idx").on(table.senderId),
  index("connections_receiver_id_idx").on(table.receiverId),
]); 

export type Connection = typeof connections.$inferSelect
export type ConnectionInsert = typeof connections.$inferInsert 