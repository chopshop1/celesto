const COOKIE_NAME = 'analytics_session';
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

async function getKey(secret: string): Promise<CryptoKey> {
	const enc = new TextEncoder();
	return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
		'sign',
		'verify'
	]);
}

function toHex(buffer: ArrayBuffer): string {
	return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function fromHex(hex: string): Uint8Array {
	const bytes = new Uint8Array(hex.length / 2);
	for (let i = 0; i < hex.length; i += 2) {
		bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
	}
	return bytes;
}

/**
 * Creates a signed session token: `expiresAt.signature`
 */
export async function createSessionToken(secret: string): Promise<string> {
	const expiresAt = Date.now() + SESSION_DURATION_MS;
	const key = await getKey(secret);
	const enc = new TextEncoder();
	const signature = await crypto.subtle.sign('HMAC', key, enc.encode(String(expiresAt)));
	return `${expiresAt}.${toHex(signature)}`;
}

/**
 * Validates a session token. Returns true only if signature is valid and not expired.
 */
export async function validateSessionToken(token: string, secret: string): Promise<boolean> {
	const dotIndex = token.indexOf('.');
	if (dotIndex === -1) return false;

	const expiresAtStr = token.substring(0, dotIndex);
	const signatureHex = token.substring(dotIndex + 1);

	const expiresAt = Number(expiresAtStr);
	if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

	try {
		const key = await getKey(secret);
		const enc = new TextEncoder();
		const sigBytes = fromHex(signatureHex);
		const valid = await crypto.subtle.verify('HMAC', key, sigBytes.buffer as ArrayBuffer, enc.encode(expiresAtStr));
		return valid;
	} catch {
		return false;
	}
}

export function setSessionCookie(token: string): string {
	const maxAge = Math.floor(SESSION_DURATION_MS / 1000);
	return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
	return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export { COOKIE_NAME };
