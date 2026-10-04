<script lang="ts">
	import { ArrowUpRight } from 'lucide-svelte';
	import type { Project } from '$lib/types/projects';
	import type { BoardInteraction } from './board-interaction.svelte';
	import { isProjectLinked } from './connections';
	import { projectTilts } from './presentation';
	let {
		project,
		index,
		interaction
	}: { project: Project; index: number; interaction: BoardInteraction } = $props();
	const lit = $derived(isProjectLinked(interaction.focus, index));
	const dim = $derived(!!interaction.focus && !lit);
</script>

<article
	class="board-pin index bg-board-card bg-board-ruled px-5 pb-6 pt-4 text-[15px] leading-6 transition-[box-shadow,opacity] duration-200 [background-position:0_0,0_59px] data-[lit=true]:z-[4] data-[dim=true]:opacity-[0.55] data-[lit=true]:shadow-board-raised motion-reduce:transition-none phone-only:rotate-[calc(var(--tilt)/2)]"
	data-lit={lit}
	data-dim={dim}
	style={`--tilt:${projectTilts[index % projectTilts.length]}deg`}
	data-pin={`p${index}`}
	onmouseenter={() => interaction.preview({ project: index })}
	onmouseleave={() => interaction.preview(null)}
	onfocusin={() => interaction.preview({ project: index })}
	onfocusout={() => interaction.preview(null)}
>
	<h3
		class="board-heading relative mb-6 text-[1.9rem] leading-6 after:absolute after:-inset-x-5 after:-bottom-[13px] after:h-0.5 after:bg-[#e2898e] after:content-['']"
	>
		{project.title}
	</h3>
	<p>{project.description}</p>
	<p class="text-[12.5px] uppercase tracking-[0.05em] text-board-faint">
		{project.technologies.join(' · ')}
	</p>
	<p class="flex gap-[18px]">
		{#if project.url}<a
				class="board-link"
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				>Demo <ArrowUpRight size={14} aria-hidden="true" /><span class="sr-only"
					>: {project.title}</span
				></a
			>{/if}
		<a class="board-link" href={project.github} target="_blank" rel="noopener noreferrer"
			>Source <ArrowUpRight size={14} aria-hidden="true" /><span class="sr-only"
				>: {project.title}</span
			></a
		>
	</p>
</article>
