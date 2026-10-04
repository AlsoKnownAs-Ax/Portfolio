<script lang="ts">
	import type { Experience } from '$lib/types/experience';
	import { isClassified } from './content';
	import { alternatingTilt } from './presentation';
	import ClassifiedMark from './ClassifiedMark.svelte';
	let { experience, index, current }: { experience: Experience; index: number; current: boolean } =
		$props();
</script>

<li
	class="board-pin bg-board-manila px-4 pb-[18px] pt-[22px] text-[14.5px] leading-normal phone-only:rotate-[calc(var(--tilt)/2)]"
	style={`--tilt:${alternatingTilt(index, 1.6, -1.6)}deg`}
>
	<p class="mb-1.5 text-xs font-bold uppercase leading-normal tracking-[0.06em] text-board-faint">
		{experience.period}
	</p>
	<h3 class="board-heading text-[1.8rem] leading-[0.95]">{experience.company}</h3>
	<p class="mb-2.5 mt-1.5 font-bold">{experience.role}</p>
	{#if isClassified(experience.description)}
		<ClassifiedMark />
	{:else}
		<p class="desc">{experience.description}</p>
	{/if}
	{#if current}<span
			class="absolute -right-2 top-[14px] rotate-[8deg] border-[3px] border-board-red bg-board-manila/70 px-2 py-px font-stencil text-[15px] font-black uppercase tracking-[0.06em] text-board-red"
			>Current</span
		>{/if}
</li>
