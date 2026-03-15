import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { waitlistSurveyResponses } from '$lib/server/db/schema';
import { waitlistSurveyQuestions, type WaitlistSurveyAnswers } from '$lib/waitlist-survey';
import {
	createSessionToken,
	validateSessionToken,
	setSessionCookie,
	COOKIE_NAME
} from '$lib/server/analytics-auth';
import { sql } from 'drizzle-orm';

const priceTiers = ['Under $5/month', '$5–$10/month', '$10–$20/month', '$20–$40/month', '$40+/month'];

type AnswerEntry = { count: number; byPriceTier: Record<string, number> };

function buildMetrics(rows: { answers: unknown }[]) {
	const totalResponses = rows.length;

	const metrics: Record<
		string,
		{ question: string; type: string; totalAnswered: number; answers: Record<string, AnswerEntry> }
	> = {};

	for (const question of waitlistSurveyQuestions) {
		metrics[question.id] = {
			question: question.label,
			type: question.type,
			totalAnswered: 0,
			answers: {}
		};
	}

	function increment(questionId: string, label: string, priceTier: string) {
		if (!metrics[questionId].answers[label]) {
			metrics[questionId].answers[label] = { count: 0, byPriceTier: {} };
		}
		metrics[questionId].answers[label].count++;
		if (priceTier) {
			metrics[questionId].answers[label].byPriceTier[priceTier] =
				(metrics[questionId].answers[label].byPriceTier[priceTier] || 0) + 1;
		}
	}

	for (const row of rows) {
		const answers = row.answers as WaitlistSurveyAnswers;
		const priceTier = answers.monthly_price_expectation || '';

		for (const question of waitlistSurveyQuestions) {
			const value = answers[question.id];

			if (question.type === 'multi_select') {
				const arr = value as string[];
				if (arr && arr.length > 0) {
					metrics[question.id].totalAnswered++;
					for (const item of arr) {
						increment(question.id, item || '(empty)', priceTier);
					}
				}
			} else if (question.type === 'single_select') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					increment(question.id, str, priceTier);
				}
			} else if (question.type === 'long_text') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					increment(question.id, str, priceTier);
				}
			}
		}

		if (answers.primary_use_case === 'Other' && answers.primary_use_case_other) {
			increment('primary_use_case', `Other: ${answers.primary_use_case_other}`, priceTier);
		}
		if (answers.astrology_apps_used?.includes('Other') && answers.astrology_apps_used_other) {
			increment('astrology_apps_used', `Other: ${answers.astrology_apps_used_other}`, priceTier);
		}
	}

	for (const key of Object.keys(metrics)) {
		const sorted = Object.entries(metrics[key].answers)
			.sort(([, a], [, b]) => b.count - a.count)
			.reduce<Record<string, AnswerEntry>>((acc, [k, v]) => {
				acc[k] = v;
				return acc;
			}, {});
		metrics[key].answers = sorted;
	}

	return { generatedAt: new Date().toISOString(), totalResponses, priceTiers, questions: metrics };
}

/** GET — uses session cookie for auth */
export const GET: RequestHandler = async ({ cookies, url }) => {
	const token = cookies.get(COOKIE_NAME);
	if (!token || !env.ANALYTICS_PASSWORD || !(await validateSessionToken(token, env.ANALYTICS_PASSWORD))) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const paidOnly = url.searchParams.get('paid') === 'true';

	const query = db
		.select({ answers: waitlistSurveyResponses.answers })
		.from(waitlistSurveyResponses);

	const rows = paidOnly
		? await query.where(sql`${waitlistSurveyResponses.answers}->>'has_paid_before' = 'Yes'`)
		: await query;

	return json(buildMetrics(rows));
};

/** POST — password login, sets session cookie */
export const POST: RequestHandler = async ({ request, cookies, url }) => {
	let body: { password?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (!body.password || !env.ANALYTICS_PASSWORD || body.password !== env.ANALYTICS_PASSWORD) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const paidOnly = url.searchParams.get('paid') === 'true';

	const query = db
		.select({ answers: waitlistSurveyResponses.answers })
		.from(waitlistSurveyResponses);

	const rows = paidOnly
		? await query.where(sql`${waitlistSurveyResponses.answers}->>'has_paid_before' = 'Yes'`)
		: await query;

	const token = await createSessionToken(env.ANALYTICS_PASSWORD);

	cookies.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 // 24 hours
	});

	return json(buildMetrics(rows));
};
