import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { prePurchaseIntent } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';

export const POST: RequestHandler = async ({ request }) => {
	let body: { email?: string; tier?: string; turnstileToken?: string; website?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (body.website) {
		return json({ success: true }, { status: 201 });
	}

	const turnstileValid = await verifyTurnstile(body.turnstileToken ?? null);
	if (!turnstileValid) {
		return json({ error: 'Bot verification failed' }, { status: 400 });
	}

	const validation = validateEmail(body.email);
	if (!validation.valid) {
		return json({ error: validation.message }, { status: 400 });
	}

	if (!body.tier || !['stargazer', 'believer', 'celestial'].includes(body.tier)) {
		return json({ error: 'Invalid tier' }, { status: 400 });
	}

	try {
		const result = await db.insert(prePurchaseIntent).values({
			email: validation.email,
			tier: body.tier,
			app: 'celesto'
		}).returning();

		return json({ success: true, id: result[0].id }, { status: 201 });
	} catch (err) {
		console.error('Intent capture error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
