<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from './content';
	import { createBoardInteraction } from './board-interaction.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import SubjectCard from './SubjectCard.svelte';
	import ToolLabels from './ToolLabels.svelte';
	import StringLayer from './StringLayer.svelte';

	const interaction = createBoardInteraction();
	const indices = projects.map((_, index) => index);
	const midpoint = Math.ceil(projects.length / 2);
	const columns = [indices.slice(0, midpoint), indices.slice(midpoint)];
	let board: HTMLElement;
	onMount(() => {
		const clear = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				interaction.clear();
			}
		};
		addEventListener('keydown', clear);
		return () => removeEventListener('keydown', clear);
	});
</script>

<section
	id="case"
	bind:this={board}
	aria-labelledby="case-h"
	class="relative grid scroll-mt-[110px] grid-cols-1 items-start gap-7 board:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] board:gap-[clamp(20px,3vw,48px)]"
>
	<StringLayer container={board} leftIndices={columns[0]} focus={interaction.focus} />
	{#each columns as column, index}
		<div class="relative z-[1] flex flex-col gap-7 board:gap-[34px] board:pt-5">
			{#each column as projectIndex (projectIndex)}
				<ProjectCard project={projects[projectIndex]} index={projectIndex} {interaction} />
			{/each}
		</div>
		{#if index === 0}
			<div class="order-first flex flex-col items-stretch gap-[30px] board:order-none">
				<SubjectCard />
				<ToolLabels {interaction} />
			</div>
		{/if}
	{/each}
</section>
