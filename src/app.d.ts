// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				DATABASE_URL: string;
				TURNSTILE_SECRET_KEY: string;
			};
		}
	}

	interface Window {
		turnstile: {
			render: (
				element: HTMLElement,
				options: {
					sitekey: string;
					callback: (token: string) => void;
					theme?: string;
					size?: string;
				}
			) => string;
			reset: (widgetId: string) => void;
			remove: (widgetId: string) => void;
		};
	}
}

export {};
