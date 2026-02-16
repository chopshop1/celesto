import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';
import { validateEmail } from '$lib/server/validate-email';
import { verifyTurnstile } from '$lib/server/turnstile';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	signup: async ({ request }) => {
		const data = await request.formData();

		if (data.get('website')) {
			return { success: true };
		}

		const turnstileValid = await verifyTurnstile(data.get('cf-turnstile-response') as string);
		if (!turnstileValid) {
			return fail(400, { error: 'Bot verification failed' });
		}

		const validation = validateEmail(data.get('email'));
		if (!validation.valid) {
			return fail(400, { error: validation.message });
		}

		try {
			await db.insert(waitlist).values({
				email: validation.email,
				referralSource: (data.get('referralSource') as string) || 'direct',
				app: 'celesto'
			});
			return { success: true };
		} catch (err: unknown) {
			if (err && typeof err === 'object' && 'code' in err && err.code === '23505') {
				return fail(409, { error: 'Email already registered' });
			}
			return fail(500, { error: 'Internal server error' });
		}
	}
};
