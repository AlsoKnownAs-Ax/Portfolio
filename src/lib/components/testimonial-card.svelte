<script lang="ts">
	import type { Testimonial } from '$lib/types/testimonials';

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();
</script>

<div
	class="transition-theme group relative w-full max-w-2xl overflow-hidden rounded-xl border bg-background p-8 shadow-lg"
>
	<div
		class="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100"
	></div>
	<div
		class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/10 opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100"
	></div>

	<div class="relative z-10 flex flex-col items-center text-center">
		<div
			class="relative mb-4 h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-primary/20"
		>
			<img
				src={testimonial.avatar || '/testimonials/placeholder.png'}
				alt={testimonial.name}
				class="object-cover"
			/>
		</div>

		<div class="relative">
			<div class="absolute -left-2 -top-2 text-4xl text-primary opacity-20">"</div>
			<p class="relative z-10 mb-6 text-lg">{testimonial.text}</p>
			<div class="absolute -bottom-2 -right-2 text-4xl text-primary opacity-20">"</div>
		</div>

		<h3 class="mt-4 text-xl font-bold">{testimonial.company}</h3>
		<p class="text-sm text-muted-foreground">{testimonial.position}</p>
	</div>
</div>
