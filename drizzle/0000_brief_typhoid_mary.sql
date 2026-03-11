CREATE TABLE "pre_purchase_intent" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pre_purchase_intent_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(320) NOT NULL,
	"tier" varchar(50) NOT NULL,
	"app" varchar(50) DEFAULT 'celesto' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "waitlist_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(320) NOT NULL,
	"referral_source" varchar(100),
	"app" varchar(50) DEFAULT 'celesto' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "waitlist_survey_responses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "waitlist_survey_responses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"waitlist_id" integer NOT NULL,
	"email" varchar(320) NOT NULL,
	"answers" jsonb NOT NULL,
	"app" varchar(50) DEFAULT 'celesto' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_survey_responses_waitlist_id_unique" UNIQUE("waitlist_id")
);
--> statement-breakpoint
ALTER TABLE "waitlist_survey_responses" ADD CONSTRAINT "waitlist_survey_responses_waitlist_id_waitlist_id_fk" FOREIGN KEY ("waitlist_id") REFERENCES "public"."waitlist"("id") ON DELETE cascade ON UPDATE no action;