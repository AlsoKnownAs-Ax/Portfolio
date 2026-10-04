<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import { testimonials } from './content';
	import { alternatingTilt } from './presentation';
	let { testimonial, index }: { testimonial: (typeof testimonials)[number]; index: number } =
		$props();
</script>

<article class="board-pin board-paper p-6" style={`--tilt:${alternatingTilt(index, 1.2, -1)}deg`}>
	<header class="flex items-center gap-4 border-b border-dashed border-board-rule pb-[14px]">
		<img
			class="size-14 -rotate-3 border-[3px] border-white object-cover shadow-[0_2px_5px_rgb(0_0_0_/_0.3)] contrast-[1.1] grayscale"
			src={`/testimonials/${testimonial.avatar}`}
			alt=""
			width="56"
			height="56"
		/>
		<dl class="text-sm leading-normal">
			<div class="grid grid-cols-[88px_1fr]">
				<dt class="uppercase tracking-[0.1em] text-board-faint">Witness</dt>
				<dd class="font-bold">{testimonial.name}</dd>
			</div>
			<div class="grid grid-cols-[88px_1fr]">
				<dt class="uppercase tracking-[0.1em] text-board-faint">Position</dt>
				<dd class="font-bold">{testimonial.position}, {testimonial.company}</dd>
			</div>
		</dl>
	</header>
	<blockquote class="my-[14px] max-w-[68ch]">{testimonial.text}</blockquote>
	{#if testimonial.linkedin}<a
			class="board-link"
			href={testimonial.linkedin}
			target="_blank"
			rel="noopener noreferrer">Verify on LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a
		>{/if}
</article>
