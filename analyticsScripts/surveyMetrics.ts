import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { waitlistSurveyResponses } from '../src/lib/server/db/schema';
import { waitlistSurveyQuestions, type WaitlistSurveyAnswers } from '../src/lib/waitlist-survey';

async function main() {
	const sql = neon(process.env.DATABASE_URL!);
	const db = drizzle({ client: sql });

	const rows = await db.select({ answers: waitlistSurveyResponses.answers }).from(waitlistSurveyResponses);

	const totalResponses = rows.length;

	// Build metrics: for each question, count occurrences of each answer
	const metrics: Record<string, { question: string; type: string; totalAnswered: number; answers: Record<string, number> }> = {};

	for (const question of waitlistSurveyQuestions) {
		metrics[question.id] = {
			question: question.label,
			type: question.type,
			totalAnswered: 0,
			answers: {}
		};
	}

	for (const row of rows) {
		const answers = row.answers as WaitlistSurveyAnswers;

		for (const question of waitlistSurveyQuestions) {
			const value = answers[question.id];

			if (question.type === 'multi_select') {
				const arr = value as string[];
				if (arr && arr.length > 0) {
					metrics[question.id].totalAnswered++;
					for (const item of arr) {
						const label = item || '(empty)';
						metrics[question.id].answers[label] = (metrics[question.id].answers[label] || 0) + 1;
					}
				}
			} else if (question.type === 'single_select') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					metrics[question.id].answers[str] = (metrics[question.id].answers[str] || 0) + 1;
				}
			} else if (question.type === 'long_text') {
				const str = value as string;
				if (str) {
					metrics[question.id].totalAnswered++;
					// For free text, collect each response individually
					metrics[question.id].answers[str] = (metrics[question.id].answers[str] || 0) + 1;
				}
			}
		}

		// Handle "Other" text fields
		if (answers.primary_use_case === 'Other' && answers.primary_use_case_other) {
			const key = `Other: ${answers.primary_use_case_other}`;
			metrics['primary_use_case'].answers[key] = (metrics['primary_use_case'].answers[key] || 0) + 1;
		}
		if (answers.astrology_apps_used?.includes('Other') && answers.astrology_apps_used_other) {
			const key = `Other: ${answers.astrology_apps_used_other}`;
			metrics['astrology_apps_used'].answers[key] = (metrics['astrology_apps_used'].answers[key] || 0) + 1;
		}
	}

	// Sort answers by count descending for each question
	for (const key of Object.keys(metrics)) {
		const sorted = Object.entries(metrics[key].answers)
			.sort(([, a], [, b]) => b - a)
			.reduce<Record<string, number>>((acc, [k, v]) => { acc[k] = v; return acc; }, {});
		metrics[key].answers = sorted;
	}

	const output = {
		generatedAt: new Date().toISOString(),
		totalResponses,
		questions: metrics
	};

	const outPath = join(__dirname, 'survey-metrics-output.json');
	writeFileSync(outPath, JSON.stringify(output, null, 2));
	console.log(`Done! ${totalResponses} responses processed.`);
	console.log(`Output written to: ${outPath}`);
}

main().catch((err) => {
	console.error('Error:', err);
	process.exit(1);
});
