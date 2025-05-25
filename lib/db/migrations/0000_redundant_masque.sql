CREATE TYPE "public"."connection_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."employment_type" AS ENUM('Full-Time', 'Part-Time', 'Contract');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('Creator/Collaborator', 'Investor', 'Mentor');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid,
	"profile_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"status" "connection_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"startup_id" uuid
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"avatar_url" text NOT NULL,
	"email" text NOT NULL,
	"github_url" text,
	"linkedin_url" text,
	"username" text NOT NULL,
	"bio" text NOT NULL,
	"location" text NOT NULL,
	"skills" text[],
	"interests" text[],
	"user_type" "user_type" NOT NULL,
	"employment_type" "employment_type" NOT NULL,
	"full_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "startups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"problem" text NOT NULL,
	"solution" text NOT NULL,
	"team_size" integer NOT NULL,
	"patent" text NOT NULL,
	"funding" integer NOT NULL,
	"founder_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_sender_id_profiles_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_receiver_id_profiles_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_startup_id_startups_id_fk" FOREIGN KEY ("startup_id") REFERENCES "public"."startups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "startups" ADD CONSTRAINT "startups_founder_id_profiles_id_fk" FOREIGN KEY ("founder_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "applications_job_id_idx" ON "applications" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "applications_profile_id_idx" ON "applications" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "connections_sender_id_idx" ON "connections" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "connections_receiver_id_idx" ON "connections" USING btree ("receiver_id");--> statement-breakpoint
CREATE INDEX "jobs_startup_id_idx" ON "jobs" USING btree ("startup_id");--> statement-breakpoint
CREATE INDEX "profiles_id_idx" ON "profiles" USING btree ("id");--> statement-breakpoint
CREATE INDEX "startups_id_idx" ON "startups" USING btree ("id");