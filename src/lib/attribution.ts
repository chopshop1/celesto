/**
 * Ad Attribution Module
 *
 * Captures Facebook/Meta ad parameters and UTM tags from landing page URLs,
 * stores them in localStorage (first-party, privacy-conscious), and provides
 * them for inclusion in signup requests.
 *
 * Tracked parameters:
 * - fbclid: Facebook click identifier
 * - utm_source, utm_medium, utm_campaign, utm_content, utm_term: Standard UTM tags
 * - ad_id, adset_id, campaign_id: Meta Ads internal identifiers
 */

/** The localStorage key used to persist attribution data. */
const STORAGE_KEY = 'celesto_attribution';

/** All URL parameters we capture for ad attribution. */
const ATTRIBUTION_PARAMS = [
	'fbclid',
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
	'ad_id',
	'adset_id',
	'campaign_id'
] as const;

/** Attribution data shape — all fields optional since any subset may be present. */
export interface AttributionData {
	fbclid?: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	utm_content?: string;
	utm_term?: string;
	ad_id?: string;
	adset_id?: string;
	campaign_id?: string;
	/** The full landing page URL (without hash) for reference. */
	landing_url?: string;
	/** ISO timestamp of when the attribution was captured. */
	captured_at?: string;
}

/**
 * Captures attribution parameters from the current URL and stores them
 * in localStorage. Uses first-touch attribution: only stores data on the
 * first visit (won't overwrite existing attribution).
 *
 * Call this once on app initialization (e.g., in root +layout.svelte).
 */
export function captureAttribution(): void {
	if (typeof window === 'undefined') return;

	// First-touch: don't overwrite existing attribution data
	const existing = localStorage.getItem(STORAGE_KEY);
	if (existing) return;

	const url = new URL(window.location.href);
	const data: AttributionData = {};
	let hasParams = false;

	// Extract each tracked parameter from the URL query string
	for (const param of ATTRIBUTION_PARAMS) {
		const value = url.searchParams.get(param);
		if (value) {
			data[param] = value;
			hasParams = true;
		}
	}

	// Only store if we found at least one attribution parameter
	if (!hasParams) return;

	// Record the landing URL (strip hash for privacy) and capture timestamp
	data.landing_url = `${url.origin}${url.pathname}${url.search}`;
	data.captured_at = new Date().toISOString();

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	} catch {
		// localStorage may be full or unavailable — silently ignore
	}
}

/**
 * Retrieves stored attribution data, or null if none exists.
 */
export function getAttribution(): AttributionData | null {
	if (typeof window === 'undefined') return null;

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw) as AttributionData;
	} catch {
		return null;
	}
}

/**
 * Clears stored attribution data. Call after successful signup
 * if you want to reset for future visits.
 */
export function clearAttribution(): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch {
		// Ignore
	}
}
