let email = $state('');

export function getWaitlistEmail() {
	return email;
}

export function setWaitlistEmail(value: string) {
	email = value;
}
