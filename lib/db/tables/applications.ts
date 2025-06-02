import { pgTable, uuid, timestamp, index } from "drizzle-orm/pg-core";
import { jobs } from "./jobs";
import { profiles } from "./profiles";

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => jobs.id),
  profileId: uuid("profile_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("applications_job_id_idx").on(table.jobId),
  index("applications_profile_id_idx").on(table.profileId),
]); 