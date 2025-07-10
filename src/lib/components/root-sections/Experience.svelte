<script lang="ts">
	import ExperienceCard from '$lib/components/experience-card.svelte';
	import { experiences } from '$lib/data/experience';
</script>

<section class="bg-muted/40 py-20" id="experience">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
			<p class="max-w-[85%] text-muted-foreground md:text-xl">
				My professional journey and work experience.
			</p>
		</div>
		<div class="mx-auto grid max-w-4xl gap-6 py-12 md:grid-cols-2">
			{#each experiences as experience, index}
				<ExperienceCard
				 {experience}
				 class={experiences.length % 2 === 1 && index === experiences.length - 1 ? 'md:col-span-2 md:justify-self-center md:max-w-md' : ''} 
				/>
			{/each}
		</div>
	</div>
</section>
