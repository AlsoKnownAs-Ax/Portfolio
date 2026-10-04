<script lang="ts">
	import type { BoardInteraction } from './board-interaction.svelte';
	import { sharedTools, isToolLinked, describeTool } from './connections';
	import { alternatingTilt } from './presentation';
	let { interaction }: { interaction: BoardInteraction } = $props();
</script>

<div class="relative z-[1] flex flex-col items-center gap-[14px]">
	<h2 class="sr-only">Tools shared across projects</h2>
	<ul class="flex flex-wrap justify-center gap-x-[14px] gap-y-[18px] pt-2">
		{#each sharedTools as tool, index (tool.key)}
			{@const lit = isToolLinked(interaction.focus, tool.key)}
			<li>
				<button
					class="board-pin inline-block cursor-pointer rounded-[3px] bg-board-label px-[13px] pb-1.5 pt-[7px] text-sm font-bold uppercase leading-normal tracking-[0.14em] text-board-chalk shadow-board-label-depth transition-[background-color,opacity,box-shadow] [text-shadow:0_1px_0_rgb(255_255_255_/_0.25)] [transition-duration:180ms] before:-top-1.5 before:-ml-1.5 before:size-3 focus-visible:!outline-board-chalk aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-offset-[-5px] aria-pressed:outline-board-chalk data-[lit=true]:bg-board-red data-[dim=true]:opacity-[0.45] data-[lit=true]:shadow-board-label-active motion-reduce:transition-none"
					data-lit={lit}
					data-dim={!!interaction.focus && !lit}
					style={`--tilt:${alternatingTilt(index, 1, -1) * (1 + (index % 3))}deg`}
					data-pin={`t-${tool.key}`}
					aria-pressed={interaction.pinned === tool.key}
					aria-label={`${tool.name}, used in ${tool.count} projects`}
					onmouseenter={() => interaction.preview({ tool: tool.key })}
					onmouseleave={() => interaction.preview(null)}
					onfocus={() => interaction.preview({ tool: tool.key })}
					onblur={() => interaction.preview(null)}
					onclick={() => interaction.toggle(tool.key)}>{tool.name}</button
				>
			</li>
		{/each}
	</ul>
	<p class="max-w-[34ch] text-center text-[13.5px] italic text-board-note">
		<span class="touch:hidden"
			>Hover a project or a tool to follow the string. Click a tool to pin it.</span
		><span class="hidden touch:inline">Tap a tool to see which projects use it.</span>
	</p>
	<p class="sr-only" aria-live="polite">{describeTool(interaction.pinned)}</p>
</div>
