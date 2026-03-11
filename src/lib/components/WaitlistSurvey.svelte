<script lang="ts">
	import {
		getEmptyWaitlistSurveyAnswers,
		validateWaitlistSurveyAnswers,
		waitlistSurveyQuestions,
		type WaitlistSurveyAnswers
	} from '$lib/waitlist-survey';
	import { browser } from '$app/environment';
	import DiscordIcon from './DiscordIcon.svelte';

	interface Props {
		waitlistId?: number | null;
		email: string;
	}

	let { waitlistId = null, email }: Props = $props();

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

	function toggleMultiSelectAnswer(questionId: 'astrology_apps_used' | 'important_features', option: string, checked: boolean) {
		const currentValues = answers[questionId];
		answers[questionId] = checked
			? [...currentValues, option]
			: currentValues.filter((item) => item !== option);
	}

	function setSingleSelectAnswer(questionId: 'primary_use_case' | 'biggest_pain_point' | 'usage_frequency' | 'astrology_familiarity', value: string) {
		answers[questionId] = value;
	}

	function portal(node: HTMLElement) {
		if (!browser) return;

		document.body.appendChild(node);

		return {
			destroy() {
				node.remove();
			}
		};
	}

	$effect(() => {
		if (!browser || dismissed) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

{#if !dismissed}
	<div use:portal class="survey-modal" role="dialog" aria-modal="true" aria-label="Waitlist survey">
			<button
				type="button"
				class="survey-backdrop"
				aria-label="Close survey"
				onclick={() => {
					dismissed = true;
				}}
			></button>

			<div class="survey-panel brutalist-border relative z-10 animate-fade-in flex flex-col">
				<div class="survey-glow" aria-hidden="true"></div>
				<div class="survey-shell flex-1 flex flex-col p-6 pt-16 sm:p-8 sm:pt-20 lg:p-12 lg:pt-24">
					<button
						type="button"
						onclick={() => {
							dismissed = true;
						}}
						class="absolute top-3 right-3 sm:top-5 sm:right-5 text-stone hover:text-parchment transition-colors font-mono text-lg min-w-[44px] min-h-[44px] flex items-center justify-center z-20"
						aria-label="Close survey"
					>
						&times;
					</button>

					{#if status === 'success'}
						<div class="space-y-2 text-left animate-fade-in pr-10 flex-1 flex flex-col justify-center">
							<p class="font-mono text-xs uppercase tracking-[0.24em] text-lavender">Thanks — saved</p>
							<h3 class="font-serif text-2xl text-parchment">We’ll build with this in mind.</h3>
							<p class="font-mono text-sm text-stone">Your answers are saved. Thanks for helping shape Celesto.</p>
							<div class="pt-3 flex flex-col sm:flex-row gap-3">
								<a
									href="https://discord.gg/gpjt2cqP"
									target="_blank"
									rel="noreferrer"
									class="inline-flex items-center justify-center gap-2 border-2 border-parchment/30 text-parchment px-5 py-3 font-mono text-sm font-semibold uppercase tracking-widest hover:border-lavender hover:text-lavender transition-colors"
								>
									<DiscordIcon class="w-4 h-4" />
									Join Our Discord
								</a>
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
						<div class="mb-8 space-y-4 text-left pr-10 shrink-0">
							<p class="font-mono text-xs uppercase tracking-[0.3em] text-lavender">Optional follow-up</p>
							<h3 class="font-serif text-3xl sm:text-4xl text-parchment leading-tight">A few quick questions so we can build this right</h3>
							<p class="font-mono text-sm sm:text-base text-stone max-w-3xl">Mostly multiple choice. About 30 seconds. Your email is already saved. This screen should have your full attention for one moment, then you are done.</p>
						</div>

						<form onsubmit={handleSubmit} class="space-y-6 flex-1 pr-1 survey-form">
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
												<label class:selected={answers[question.id] === option} class="survey-option">
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
												<label class:selected={answers[question.id].includes(option)} class="survey-option">
													<input
														type="checkbox"
														checked={answers[question.id].includes(option)}
														onchange={(event) => toggleMultiSelectAnswer(question.id as 'astrology_apps_used' | 'important_features', option, (event.currentTarget as HTMLInputElement).checked)}
													/>
													<span>{option}</span>
												</label>
											{/each}
										</div>

										{#if question.id === 'astrology_apps_used' && answers.astrology_apps_used.includes('Other')}
											<textarea
												bind:value={answers.astrology_apps_used_other}
												rows="3"
												placeholder="Tell us which astrology apps you've used"
												class="survey-textarea"
											></textarea>
										{/if}
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

							<div class="flex flex-col sm:flex-row gap-3 sm:items-center pb-6 sm:pb-8">
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
	</div>
{/if}

<style>
	.survey-modal {
		position: fixed;
		inset: 0;
		z-index: 100000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		isolation: isolate;
		overflow-y: auto;
	}

	.survey-backdrop {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at top, rgba(184, 169, 232, 0.14), transparent 34%),
			linear-gradient(180deg, rgba(4, 4, 8, 0.92) 0%, rgba(4, 4, 8, 0.98) 100%);
		backdrop-filter: blur(18px);
		border: 0;
		padding: 0;
		cursor: pointer;
	}

	.survey-panel {
		position: relative;
		width: min(100vw, 1440px);
		min-height: 100dvh;
		max-height: 100dvh;
		border-width: 0;
		background:
			linear-gradient(135deg, rgba(184, 169, 232, 0.08), transparent 24%),
			linear-gradient(180deg, rgba(15, 15, 22, 0.995) 0%, rgba(7, 7, 12, 1) 100%);
		box-shadow:
			0 0 0 1px rgba(184, 169, 232, 0.14),
			0 40px 160px rgba(0, 0, 0, 0.66);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.survey-panel::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(245, 239, 230, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(245, 239, 230, 0.04) 1px, transparent 1px);
		background-size: 32px 32px;
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.7));
		pointer-events: none;
	}

	.survey-glow {
		position: absolute;
		inset: -20% auto auto 8%;
		width: min(38rem, 52vw);
		aspect-ratio: 1;
		border-radius: 9999px;
		background: radial-gradient(circle, rgba(184, 169, 232, 0.18) 0%, rgba(184, 169, 232, 0.06) 34%, transparent 70%);
		filter: blur(28px);
		pointer-events: none;
	}

	.survey-shell {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		min-height: 100%;
	}

	.survey-option {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem 1.1rem;
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

	.survey-option.selected {
		border-color: rgba(184, 169, 232, 0.88);
		background: linear-gradient(180deg, rgba(184, 169, 232, 0.16) 0%, rgba(184, 169, 232, 0.08) 100%);
		box-shadow:
			inset 0 0 0 1px rgba(184, 169, 232, 0.32),
			0 0 0 1px rgba(184, 169, 232, 0.2);
	}

	.survey-option.selected span {
		color: var(--color-parchment);
		font-weight: 600;
	}

	.survey-option input {
		margin-top: 0.125rem;
		accent-color: var(--color-lavender);
		transform: scale(1.1);
	}

	.survey-option input:checked {
		filter: drop-shadow(0 0 6px rgba(184, 169, 232, 0.7));
	}

	.survey-textarea {
		width: 100%;
		background: rgba(255, 255, 255, 0.02);
		border: 2px solid var(--color-parchment);
		padding: 1rem 1.1rem;
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

	.survey-form {
		scrollbar-width: thin;
		scrollbar-color: rgba(184, 169, 232, 0.6) rgba(255, 255, 255, 0.05);
	}

	@media (min-width: 900px) {
		.survey-panel {
			width: min(calc(100vw - 32px), 1480px);
			min-height: min(calc(100dvh - 32px), 980px);
			max-height: min(calc(100dvh - 32px), 980px);
			border-width: 2px;
		}
	}
</style>
