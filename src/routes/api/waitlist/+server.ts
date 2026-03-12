import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import type { AttributionData } from '$lib/attribution';

export const POST: RequestHandler = async ({ request }) => {
	let body: {
		email?: string;
		referralSource?: string;
		turnstileToken?: string;
		website?: string;
		attribution?: AttributionData | null;
	};

	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	// Honeypot field — silently accept to fool bots
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

	// Sanitize attribution data — only accept known fields, enforce max length
	const attr = body.attribution ?? {};
	const sanitize = (val: string | undefined, maxLen = 255): string | null =>
		val && typeof val === 'string' ? val.slice(0, maxLen) : null;

	try {
		const result = await db.insert(waitlist).values({
			email: validation.email,
			referralSource: body.referralSource || 'direct',
			app: 'celesto',
			// Ad attribution fields from the client
			fbclid: sanitize(attr.fbclid, 500),
			utmSource: sanitize(attr.utm_source),
			utmMedium: sanitize(attr.utm_medium),
			utmCampaign: sanitize(attr.utm_campaign),
			utmContent: sanitize(attr.utm_content),
			utmTerm: sanitize(attr.utm_term),
			adId: sanitize(attr.ad_id),
			adsetId: sanitize(attr.adset_id),
			campaignId: sanitize(attr.campaign_id),
			landingUrl: sanitize(attr.landing_url, 2048),
			attributionCapturedAt: attr.captured_at ? new Date(attr.captured_at) : null
		}).returning();

		return json({ success: true, id: result[0].id, email: validation.email }, { status: 201 });
	} catch (err: unknown) {
		if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
			return json({ error: 'Email already registered' }, { status: 409 });
		}
		console.error('Waitlist signup error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
