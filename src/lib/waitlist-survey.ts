export type SurveyQuestionType = 'single_select' | 'multi_select' | 'long_text';

export interface SurveyQuestion {
	id: keyof WaitlistSurveyAnswers;
	label: string;
	type: SurveyQuestionType;
	required: boolean;
	options?: string[];
	placeholder?: string;
	description?: string;
}

export interface WaitlistSurveyAnswers {
	astrology_apps_used: string[];
	astrology_apps_used_other: string;
	primary_use_case: string;
	primary_use_case_other: string;
	biggest_pain_point: string;
	important_features: string[];
	usage_frequency: string;
	astrology_familiarity: string;
	has_paid_before: string;
	monthly_price_expectation: string;
	value_definition: string;
}

export const waitlistSurveyQuestions: SurveyQuestion[] = [
	{
		id: 'astrology_apps_used',
		label: 'Have you used astrology apps before?',
		type: 'multi_select',
		required: false,
		description: "Select any you've tried.",
		options: [
			'Co-Star',
			'The Pattern',
			'CHANI',
			'Sanctuary',
			'TimePassages',
			'Nebula',
			'Astrology Zone',
			'No, this is my first astrology app',
			'Other'
		]
	},
	{
		id: 'primary_use_case',
		label: 'What would you want to use Celesto for most?',
		type: 'single_select',
		required: true,
		options: [
			'Daily horoscope guidance',
			'Understanding my birth chart',
			'Timing big life decisions',
			'Relationship compatibility',
			'Career and money insights',
			'Emotional/self-reflection support',
			'Other'
		]
	},
	{
		id: 'biggest_pain_point',
		label: "What's your biggest frustration with astrology apps today?",
		type: 'single_select',
		required: true,
		options: [
			'Too generic',
			'Too confusing / hard to understand',
			'Feels inaccurate',
			"Doesn't help with real-life decisions",
			'Too focused on content instead of guidance',
			'Too expensive',
			"I haven't found one I like yet"
		]
	},
	{
		id: 'important_features',
		label: 'Which features would matter most to you?',
		type: 'multi_select',
		required: true,
		description: 'Choose all that apply.',
		options: [
			'Personalized birth chart reading',
			'Daily horoscope based on my chart',
			'Transit explanations in plain English',
			'Calendar timing for important days',
			'Relationship / compatibility readings',
			'AI chat for astrology questions',
			'Journaling / reflection prompts',
			'Rituals or action steps',
			'Voice-based guidance',
			'Weekly planning insights'
		]
	},
	{
		id: 'usage_frequency',
		label: 'How often would you use something like this?',
		type: 'single_select',
		required: true,
		options: ['Multiple times a day', 'Daily', 'A few times a week', 'Weekly', 'Only during big life moments']
	},
	{
		id: 'astrology_familiarity',
		label: 'How familiar are you with astrology already?',
		type: 'single_select',
		required: true,
		options: [
			"I'm totally new to it",
			'I know my sun sign and basics',
			'I know my birth chart fairly well',
			"I'm very into astrology / advanced"
		]
	},
	{
		id: 'has_paid_before',
		label: 'Have you ever paid for a service like this before?',
		type: 'single_select',
		required: true,
		options: ['Yes', 'No']
	},
	{
		id: 'monthly_price_expectation',
		label: 'What would you be willing to pay monthly for a service like this?',
		type: 'single_select',
		required: false,
		options: ['Under $10/month', '$10–$20/month', '$20–$40/month', '$40+/month']
	},
	{
		id: 'value_definition',
		label: 'What would make Celesto feel truly valuable to you?',
		type: 'long_text',
		required: false,
		placeholder:
			'Examples: better timing, more clarity, less anxiety, stronger self-understanding, better relationship insight…'
	}
];

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function normalizeString(value: unknown) {
	return typeof value === 'string' ? value.trim() : '';
}

function normalizeStringArray(value: unknown) {
	if (!Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
}

export function getEmptyWaitlistSurveyAnswers(): WaitlistSurveyAnswers {
	return {
		astrology_apps_used: [],
		astrology_apps_used_other: '',
		primary_use_case: '',
		primary_use_case_other: '',
		biggest_pain_point: '',
		important_features: [],
		usage_frequency: '',
		astrology_familiarity: '',
		has_paid_before: '',
		monthly_price_expectation: '',
		value_definition: ''
	};
}

export function validateWaitlistSurveyAnswers(raw: unknown):
	| { valid: true; answers: WaitlistSurveyAnswers }
	| { valid: false; error: string } {
	if (!isRecord(raw)) {
		return { valid: false, error: 'Invalid survey payload' };
	}

	const answers: WaitlistSurveyAnswers = {
		astrology_apps_used: normalizeStringArray(raw.astrology_apps_used),
		astrology_apps_used_other: normalizeString(raw.astrology_apps_used_other),
		primary_use_case: normalizeString(raw.primary_use_case),
		primary_use_case_other: normalizeString(raw.primary_use_case_other),
		biggest_pain_point: normalizeString(raw.biggest_pain_point),
		important_features: normalizeStringArray(raw.important_features),
		usage_frequency: normalizeString(raw.usage_frequency),
		astrology_familiarity: normalizeString(raw.astrology_familiarity),
		has_paid_before: normalizeString(raw.has_paid_before),
		monthly_price_expectation: normalizeString(raw.monthly_price_expectation),
		value_definition: normalizeString(raw.value_definition)
	};

	// If user has not paid before, clear and skip the price question
	if (answers.has_paid_before !== 'Yes') {
		answers.monthly_price_expectation = '';
	}

	for (const question of waitlistSurveyQuestions) {
		// Skip monthly_price_expectation validation when user hasn't paid before
		if (question.id === 'monthly_price_expectation' && answers.has_paid_before !== 'Yes') {
			continue;
		}

		if (question.type === 'single_select') {
			const value = answers[question.id];
			if (typeof value !== 'string') {
				return { valid: false, error: `Invalid answer for ${question.id}` };
			}
			if (question.required && !value) {
				return { valid: false, error: 'Please answer all required questions.' };
			}
			if (value && question.options && !question.options.includes(value)) {
				return { valid: false, error: `Invalid answer for ${question.id}` };
			}
		}

		if (question.type === 'multi_select') {
			const value = answers[question.id];
			if (!Array.isArray(value)) {
				return { valid: false, error: `Invalid answer for ${question.id}` };
			}
			if (question.required && value.length === 0) {
				return { valid: false, error: 'Please answer all required questions.' };
			}
			if (question.options && value.some((item) => !question.options?.includes(item))) {
				return { valid: false, error: `Invalid answer for ${question.id}` };
			}
		}
	}

	if (answers.primary_use_case !== 'Other') {
		answers.primary_use_case_other = '';
	}

	if (!answers.astrology_apps_used.includes('Other')) {
		answers.astrology_apps_used_other = '';
	}

	return { valid: true, answers };
}
