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

function buildMetrics(rows: { answers: unknown }[]) {
	const totalResponses = rows.length;

	const metrics: Record<
		string,
		{ question: string; type: string; totalAnswered: number; answers: Record<string, number> }
	> = {};

	for (const question of waitlistSurveyQuestions) {
		metrics[question.id] = {
			question: question.label,
			type: question.type,
			totalAnswered: 0,
			answers: {}
		};
	}

	for (const row of rows) {
		const answers = row.answers as WaitlistSurveyAnswers;

		for (const question of waitlistSurveyQuestions) {
			const value = answers[question.id];

			if (question.type === 'multi_select') {
				const arr = value as string[];
				if (arr && arr.length > 0) {
					metrics[question.id].totalAnswered++;
					for (const item of arr) {
						const label = item || '(empty)';
						metrics[question.id].answers[label] = (metrics[question.id].answers[label] || 0) + 1;
					}
				}
			} else if (question.type === 'single_select') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					metrics[question.id].answers[str] = (metrics[question.id].answers[str] || 0) + 1;
				}
			} else if (question.type === 'long_text') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					metrics[question.id].answers[str] = (metrics[question.id].answers[str] || 0) + 1;
				}
			}
		}

		if (answers.primary_use_case === 'Other' && answers.primary_use_case_other) {
			const key = `Other: ${answers.primary_use_case_other}`;
			metrics['primary_use_case'].answers[key] =
				(metrics['primary_use_case'].answers[key] || 0) + 1;
		}
		if (answers.astrology_apps_used?.includes('Other') && answers.astrology_apps_used_other) {
			const key = `Other: ${answers.astrology_apps_used_other}`;
			metrics['astrology_apps_used'].answers[key] =
				(metrics['astrology_apps_used'].answers[key] || 0) + 1;
		}
	}

	for (const key of Object.keys(metrics)) {
		const sorted = Object.entries(metrics[key].answers)
			.sort(([, a], [, b]) => b - a)
			.reduce<Record<string, number>>((acc, [k, v]) => {
				acc[k] = v;
				return acc;
			}, {});
		metrics[key].answers = sorted;
	}

	return { generatedAt: new Date().toISOString(), totalResponses, questions: metrics };
}

/** GET — uses session cookie for auth */
export const GET: RequestHandler = async ({ cookies }) => {
	const token = cookies.get(COOKIE_NAME);
	if (!token || !env.ANALYTICS_PASSWORD || !(await validateSessionToken(token, env.ANALYTICS_PASSWORD))) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const rows = await db
		.select({ answers: waitlistSurveyResponses.answers })
		.from(waitlistSurveyResponses);

	return json(buildMetrics(rows));
};

/** POST — password login, sets session cookie */
export const POST: RequestHandler = async ({ request, cookies }) => {
	let body: { password?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (!body.password || !env.ANALYTICS_PASSWORD || body.password !== env.ANALYTICS_PASSWORD) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const rows = await db
		.select({ answers: waitlistSurveyResponses.answers })
		.from(waitlistSurveyResponses);

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
