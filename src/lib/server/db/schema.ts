import { pgTable, integer, varchar, timestamp, jsonb, text } from 'drizzle-orm/pg-core';
import type { WaitlistSurveyAnswers } from '$lib/waitlist-survey';
import type { AttributionData } from '$lib/attribution';

export const waitlist = pgTable('waitlist', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	email: varchar('email', { length: 320 }).notNull().unique(),
	referralSource: varchar('referral_source', { length: 100 }),
	app: varchar('app', { length: 50 }).notNull().default('celesto'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),

	// --- Ad attribution fields (populated from landing-page URL params) ---
	fbclid: text('fbclid'),
	utmSource: varchar('utm_source', { length: 255 }),
	utmMedium: varchar('utm_medium', { length: 255 }),
	utmCampaign: varchar('utm_campaign', { length: 255 }),
	utmContent: varchar('utm_content', { length: 255 }),
	utmTerm: varchar('utm_term', { length: 255 }),
	adId: varchar('ad_id', { length: 255 }),
	adsetId: varchar('adset_id', { length: 255 }),
	campaignId: varchar('campaign_id', { length: 255 }),
	landingUrl: text('landing_url'),
	attributionCapturedAt: timestamp('attribution_captured_at', { withTimezone: true })
});

export const waitlistSurveyResponses = pgTable('waitlist_survey_responses', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	waitlistId: integer('waitlist_id').notNull().unique().references(() => waitlist.id, { onDelete: 'cascade' }),
	email: varchar('email', { length: 320 }).notNull(),
	answers: jsonb('answers').$type<WaitlistSurveyAnswers>().notNull(),
	app: varchar('app', { length: 50 }).notNull().default('celesto'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});

export const prePurchaseIntent = pgTable('pre_purchase_intent', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	email: varchar('email', { length: 320 }).notNull(),
	tier: varchar('tier', { length: 50 }).notNull(),
	app: varchar('app', { length: 50 }).notNull().default('celesto'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});
