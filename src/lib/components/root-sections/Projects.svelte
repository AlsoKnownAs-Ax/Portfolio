<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import { projects } from '$lib/data/projects';
</script>

<section id="projects" class="bg-muted/40 py-24">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
			<p class="max-w-[85%] text-muted-foreground md:text-xl">
				A selection of my recent work and personal projects.
			</p>
		</div>

		<div class="mx-auto grid max-w-6xl gap-6 py-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
