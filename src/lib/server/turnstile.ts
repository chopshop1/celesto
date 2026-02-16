import { env } from '$env/dynamic/private';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token: string | null): Promise<boolean> {
	const secret = env.TURNSTILE_SECRET_KEY;

	if (!secret) {
		console.warn('TURNSTILE_SECRET_KEY not set, skipping Turnstile verification');
		return true;
	}

	if (!token) {
		return false;
	}

	try {
		const response = await fetch(VERIFY_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret,
				response: token
			})
		});

		const data: { success: boolean } = await response.json();
		return data.success === true;
	} catch (err) {
		console.error('Turnstile verification error:', err);
		return false;
	}
}
