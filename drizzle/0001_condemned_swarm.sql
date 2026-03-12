ALTER TABLE "waitlist" ADD COLUMN "fbclid" text;--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "utm_source" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "utm_medium" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "utm_campaign" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "utm_content" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "utm_term" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "ad_id" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "adset_id" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "campaign_id" varchar(255);--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "landing_url" text;--> statement-breakpoint
ALTER TABLE "waitlist" ADD COLUMN "attribution_captured_at" timestamp with time zone;