<script lang="ts">
	import { testimonials } from './content';
	import SectionHeading from './SectionHeading.svelte';
	import WitnessCard from './WitnessCard.svelte';
</script>

<section
	id="statements"
	aria-labelledby="st-h"
	class="mt-[clamp(64px,8vw,104px)] scroll-mt-[110px]"
>
	<SectionHeading id="st-h">Witness statements</SectionHeading>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-9">
		{#each testimonials as testimonial, index (testimonial.name)}
			<WitnessCard {testimonial} {index} />
		{/each}
	</div>
</section>
