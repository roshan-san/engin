import { integer, pgTable, text, uuid, timestamp, pgEnum, index } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum('user_type', ['Creator/Collaborator', 'Investor', 'Mentor']);
export const employmentTypeEnum = pgEnum('employment_type', ['Full-Time', 'Part-Time', 'Contract']);
export const connectionStatusEnum = pgEnum('connection_status', ['pending', 'accepted', 'rejected',]);

export const startups = pgTable("startups", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  teamSize: integer("team_size").notNull(),
  patent: text("patent").notNull(),
  funding: integer("funding").notNull(),
  founderId: uuid("founder_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("id_idx").on(table.id),
]);

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  avatar_url: text("avatar_url").notNull(),
  email: text("email").notNull(),
  github_url: text("github_url"),
  linkedin_url: text("linkedin_url"),
  username: text("username").notNull(),
  bio: text("bio").notNull(),
  location: text("location").notNull(),
  skills: text("skills").array(),
  interests: text("interests").array(),
  user_type: userTypeEnum("user_type").notNull(),
  employment_type: employmentTypeEnum("employment_type").notNull(),
  full_name: text("full_name").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("id_idx").on(table.id),
]) ;

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  startupId: uuid("startup_id").references(() => startups.id),
},(table) => [
  index("startup_id_idx").on(table.startupId),
]);

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => jobs.id),
  profileId: uuid("profile_id").references(() => profiles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("job_id_idx").on(table.jobId),
  index("profile_id_idx").on(table.profileId),
]);

export const connections = pgTable("connections", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id").references(() => profiles.id).notNull(),
  receiverId: uuid("receiver_id").references(() => profiles.id).notNull(),
  status: connectionStatusEnum("status").default("pending").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("sender_id_idx").on(table.senderId),
  index("receiver_id_idx").on(table.receiverId),
]);


