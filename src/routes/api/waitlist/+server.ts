import { json } from '@sveltejs/kit';
import { and, eq, isNull } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import type { AttributionData } from '$lib/attribution';

/** Sanitize a string field — only accept known types, enforce max length. */
const sanitize = (val: string | undefined, maxLen = 255): string | null =>
	val && typeof val === 'string' ? val.slice(0, maxLen) : null;

/**
 * Build a clean attribution column map from raw client data.
 * Returns null if no attribution params are present.
 */
function buildAttributionColumns(attr: AttributionData | null | undefined) {
	if (!attr || typeof attr !== 'object') return null;

	const columns = {
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
	};

	// Check if there's at least one real attribution value (not just landing_url/timestamp)
	const hasData = columns.fbclid || columns.utmSource || columns.utmMedium ||
		columns.utmCampaign || columns.utmContent || columns.utmTerm ||
		columns.adId || columns.adsetId || columns.campaignId;

	return hasData ? columns : null;
}

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

	const attrColumns = buildAttributionColumns(body.attribution);

	try {
		const result = await db.insert(waitlist).values({
			email: validation.email,
			referralSource: body.referralSource || 'direct',
			app: 'celesto',
			// Spread attribution fields if present
			...(attrColumns ?? {})
		}).returning();

		return json({ success: true, id: result[0].id, email: validation.email }, { status: 201 });
	} catch (err: unknown) {
		if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
			// Email already registered — backfill attribution if the existing
			// record has none and the client sent attribution data now.
			if (attrColumns) {
				try {
					await db.update(waitlist)
						.set(attrColumns)
						.where(and(
							eq(waitlist.email, validation.email),
							// Only update if attribution wasn't already captured
							// (preserves first-touch attribution in the DB)
							isNull(waitlist.attributionCapturedAt)
						));
				} catch (updateErr) {
					// Non-critical — log but don't fail the response
					console.error('Attribution backfill error:', updateErr);
				}
			}

			return json({ error: 'Email already registered' }, { status: 409 });
		}
		console.error('Waitlist signup error:', err);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
