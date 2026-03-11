import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist, waitlistSurveyResponses } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { validateWaitlistSurveyAnswers } from '$lib/waitlist-survey';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	let body: { waitlistId?: number; email?: string; answers?: unknown };

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (!body.waitlistId || typeof body.waitlistId !== 'number') {
		return json({ error: 'Valid waitlist ID is required' }, { status: 400 });
	}

	const emailValidation = validateEmail(body.email);
	if (!emailValidation.valid) {
		return json({ error: emailValidation.message }, { status: 400 });
	}

	const surveyValidation = validateWaitlistSurveyAnswers(body.answers);
	if (!surveyValidation.valid) {
		return json({ error: surveyValidation.error }, { status: 400 });
	}

	const matchingWaitlistEntry = await db.query.waitlist.findFirst({
		where: and(eq(waitlist.id, body.waitlistId), eq(waitlist.email, emailValidation.email))
	});

	if (!matchingWaitlistEntry) {
		return json({ error: 'Waitlist signup not found' }, { status: 404 });
	}

	try {
		const result = await db
			.insert(waitlistSurveyResponses)
			.values({
				waitlistId: body.waitlistId,
				email: emailValidation.email,
				answers: surveyValidation.answers,
				app: 'celesto'
			})
			.onConflictDoUpdate({
				target: waitlistSurveyResponses.waitlistId,
				set: {
					email: emailValidation.email,
					answers: surveyValidation.answers,
					app: 'celesto'
				}
			})
			.returning();

		return json({ success: true, id: result[0].id }, { status: 201 });
	} catch (err) {
		console.error('Waitlist survey error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
