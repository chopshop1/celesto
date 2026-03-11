<script lang="ts">
	import {
		getEmptyWaitlistSurveyAnswers,
		validateWaitlistSurveyAnswers,
		waitlistSurveyQuestions,
		type WaitlistSurveyAnswers
	} from '$lib/waitlist-survey';

	interface Props {
		waitlistId: number;
		email: string;
	}

	let { waitlistId, email }: Props = $props();

	let answers = $state<WaitlistSurveyAnswers>(getEmptyWaitlistSurveyAnswers());
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let errorMessage = $state('');
	let dismissed = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'loading') return;

		const validation = validateWaitlistSurveyAnswers(answers);
		if (!validation.valid) {
			status = 'error';
			errorMessage = validation.error;
			return;
		}

		status = 'loading';
		errorMessage = '';

		try {
			const res = await fetch('/api/waitlist-survey', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					waitlistId,
					email,
					answers: validation.answers
				})
			});

			const data = await res.json();

			if (!res.ok) {
				status = 'error';
				errorMessage = data.error || 'Something went wrong.';
				return;
			}

			status = 'success';
		} catch {
			status = 'error';
			errorMessage = 'Network error. Please try again.';
		}
	}

	function toggleFeature(feature: string, checked: boolean) {
		answers.important_features = checked
			? [...answers.important_features, feature]
			: answers.important_features.filter((item) => item !== feature);
	}

	function setSingleSelectAnswer(questionId: 'primary_use_case' | 'biggest_pain_point' | 'usage_frequency' | 'astrology_familiarity', value: string) {
		answers[questionId] = value;
	}
</script>

{#if !dismissed}
	<div class="survey-modal" role="dialog" aria-modal="true" aria-label="Waitlist survey">
		<button
			type="button"
			class="survey-backdrop"
			aria-label="Close survey"
			onclick={() => {
				dismissed = true;
			}}
		></button>

		<div class="survey-panel brutalist-border bg-void-surface/95 p-5 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in">
			<button
				type="button"
				onclick={() => {
					dismissed = true;
				}}
				class="absolute top-3 right-3 text-stone hover:text-parchment transition-colors font-mono text-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
				aria-label="Close survey"
			>
				&times;
			</button>

			{#if status === 'success'}
				<div class="space-y-2 text-left animate-fade-in pr-10">
					<p class="font-mono text-xs uppercase tracking-[0.24em] text-lavender">Thanks — saved</p>
					<h3 class="font-serif text-2xl text-parchment">We’ll build with this in mind.</h3>
					<p class="font-mono text-sm text-stone">Your answers are saved. Thanks for helping shape Celesto.</p>
					<div class="pt-3">
						<button
							type="button"
							onclick={() => {
								dismissed = true;
							}}
							class="bg-lavender text-void px-5 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:bg-lavender-light transition-colors border-2 border-lavender"
						>
							Done
						</button>
					</div>
				</div>
			{:else}
				<div class="mb-5 space-y-2 text-left pr-10">
					<p class="font-mono text-xs uppercase tracking-[0.24em] text-lavender">Optional follow-up</p>
					<h3 class="font-serif text-2xl text-parchment">A few quick questions so we can build this right</h3>
					<p class="font-mono text-sm text-stone">Mostly multiple choice. About 30 seconds.</p>
				</div>

				<form onsubmit={handleSubmit} class="space-y-6">
					{#each waitlistSurveyQuestions as question}
						<fieldset class="space-y-3">
							<legend class="font-mono text-sm text-parchment font-semibold">
								{question.label}
								{#if question.required}<span class="text-lavender"> *</span>{/if}
							</legend>

							{#if question.description}
								<p class="font-mono text-xs text-stone">{question.description}</p>
							{/if}

							{#if question.type === 'single_select'}
								<div class="grid gap-2">
									{#each question.options ?? [] as option}
										<label class="survey-option">
											<input
												type="radio"
												name={question.id}
												value={option}
												checked={answers[question.id] === option}
												onchange={() => setSingleSelectAnswer(question.id as 'primary_use_case' | 'biggest_pain_point' | 'usage_frequency' | 'astrology_familiarity', option)}
											/>
											<span>{option}</span>
										</label>
									{/each}
								</div>

								{#if question.id === 'primary_use_case' && answers.primary_use_case === 'Other'}
									<textarea
										bind:value={answers.primary_use_case_other}
										rows="3"
										placeholder="Tell us what you'd use it for"
										class="survey-textarea"
									></textarea>
								{/if}
							{:else if question.type === 'multi_select'}
								<div class="grid gap-2">
									{#each question.options ?? [] as option}
										<label class="survey-option">
											<input
												type="checkbox"
												checked={answers.important_features.includes(option)}
												onchange={(event) => toggleFeature(option, (event.currentTarget as HTMLInputElement).checked)}
											/>
											<span>{option}</span>
										</label>
									{/each}
								</div>
							{:else}
								<textarea
									bind:value={answers.value_definition}
									rows="4"
									placeholder={question.placeholder}
									class="survey-textarea"
								></textarea>
							{/if}
						</fieldset>
					{/each}

					{#if status === 'error'}
						<p class="font-mono text-xs text-red-400">{errorMessage}</p>
					{/if}

					<div class="flex flex-col sm:flex-row gap-3 sm:items-center">
						<button
							type="submit"
							disabled={status === 'loading'}
							class="bg-lavender text-void px-5 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:bg-lavender-light disabled:opacity-50 transition-colors border-2 border-lavender"
						>
							{status === 'loading' ? 'Saving...' : 'Save my answers'}
						</button>
						<button
							type="button"
							onclick={() => {
								dismissed = true;
							}}
							class="font-mono text-xs uppercase tracking-[0.2em] text-stone hover:text-parchment transition-colors"
						>
							Skip for now
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}

<style>
	.survey-modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.survey-backdrop {
		position: absolute;
		inset: 0;
		background: rgba(10, 10, 15, 0.82);
		backdrop-filter: blur(8px);
		border: 0;
		padding: 0;
		cursor: pointer;
	}

	.survey-panel {
		position: relative;
		box-shadow: 0 20px 80px rgba(0, 0, 0, 0.45);
	}

	.survey-option {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		border: 1px solid rgba(245, 239, 230, 0.16);
		background: rgba(255, 255, 255, 0.02);
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-parchment);
		cursor: pointer;
		transition: border-color 0.2s ease, background 0.2s ease;
	}

	.survey-option:hover {
		border-color: rgba(184, 169, 232, 0.5);
		background: rgba(184, 169, 232, 0.05);
	}

	.survey-option input {
		margin-top: 0.125rem;
		accent-color: var(--color-lavender);
	}

	.survey-textarea {
		width: 100%;
		background: var(--color-void-surface);
		border: 2px solid var(--color-parchment);
		padding: 0.875rem 1rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-parchment);
		resize: vertical;
		min-height: 7rem;
	}

	.survey-textarea:focus {
		outline: none;
		border-color: var(--color-lavender);
		box-shadow: 0 0 0 2px rgba(184, 169, 232, 0.25);
	}
</style>
