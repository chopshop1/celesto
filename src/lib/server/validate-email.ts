import { disposableDomains } from './disposable-domains';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export type ValidationResult =
	| { valid: true; email: string }
	| { valid: false; message: string };

export function validateEmail(raw: unknown): ValidationResult {
	if (!raw || typeof raw !== 'string') {
		return { valid: false, message: 'Email is required' };
	}

	const email = raw.trim().toLowerCase();

	if (!EMAIL_REGEX.test(email)) {
		return { valid: false, message: 'Please enter a valid email address.' };
	}

	if (email.length > MAX_EMAIL_LENGTH) {
		return { valid: false, message: 'Email address is too long.' };
	}

	const domain = email.split('@')[1];
	if (disposableDomains.has(domain)) {
		return { valid: false, message: 'Please use a permanent email address.' };
	}

	return { valid: true, email };
}
