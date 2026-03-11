import { pgTable, integer, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core';
import type { WaitlistSurveyAnswers } from '$lib/waitlist-survey';

export const waitlist = pgTable('waitlist', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	email: varchar('email', { length: 320 }).notNull().unique(),
	referralSource: varchar('referral_source', { length: 100 }),
	app: varchar('app', { length: 50 }).notNull().default('celesto'),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
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
