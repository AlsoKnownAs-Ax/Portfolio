<script lang="ts">
	import type { Project } from '$lib/types/projects';
	import { ExternalLink, Code, Github } from 'lucide-svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
</script>

<div
	class="group relative flex h-full min-h-96 flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md"
>
	<div class="flex items-center justify-between border-b px-5 py-4">
		<div class="rounded-full bg-primary/10 p-2.5 text-primary">
			<Code size={20} />
		</div>
		<span class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
			{project.category || 'Project'}
		</span>
	</div>

	<div class="flex grow flex-col px-5 pb-6 pt-5">
		<h3 class="mb-3 text-xl font-bold tracking-tight">{project.title}</h3>
		<p class="mb-5 line-clamp-3 grow text-sm leading-relaxed text-muted-foreground">
			{project.description}
		</p>

		<div class="mb-5 flex flex-wrap gap-2">
			{#each project.technologies.slice(0, 4) as tech}
				<span
					class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-muted/80"
				>
					{tech}
				</span>
			{/each}
			{#if project.technologies.length > 4}
				<span
					class="inline-flex items-center rounded-full bg-muted/70 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
				>
					+{project.technologies.length - 4} more
				</span>
			{/if}
		</div>

		<div class="mt-auto flex items-center gap-4 border-t pt-4">
			{#if project.url}
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
					aria-label="View project: {project.title}"
				>
					<ExternalLink size={16} />
					View Project
				</a>
			{/if}
			{#if project.github}
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					aria-label="View source code for: {project.title}"
				>
					<Github size={16} />
					Source Code
				</a>
			{/if}
		</div>
	</div>

	<div
		class="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-primary/60 to-primary transition-all duration-500 ease-out group-hover:w-full"
	></div>
</div>
