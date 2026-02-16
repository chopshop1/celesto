import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';

export const POST: RequestHandler = async ({ request }) => {
	let body: { email?: string; referralSource?: string; turnstileToken?: string; website?: string };

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (body.website) {
		return json({ success: true, id: 'ok' }, { status: 201 });
	}

	const turnstileValid = await verifyTurnstile(body.turnstileToken ?? null);
	if (!turnstileValid) {
		return json({ error: 'Bot verification failed' }, { status: 400 });
	}

	const validation = validateEmail(body.email);
	if (!validation.valid) {
		return json({ error: validation.message }, { status: 400 });
	}

	try {
		const result = await db.insert(waitlist).values({
			email: validation.email,
			referralSource: body.referralSource || 'direct',
			app: 'celesto'
		}).returning();

		return json({ success: true, id: result[0].id }, { status: 201 });
	} catch (err: unknown) {
		if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
			return json({ error: 'Email already registered' }, { status: 409 });
		}
		console.error('Waitlist signup error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
