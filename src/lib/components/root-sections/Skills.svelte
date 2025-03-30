<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Skills } from '$lib/data/skills';
	import type { Skill } from '$lib/types/skills';
	import { Search } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { cn, fuzzySearch } from '$lib/utils';

	let searchQuery = $state('');
	let skills: Skill[] = $state(Skills);

	let filteredSkills = $derived(
		searchQuery ? skills.filter((skill) => fuzzySearch(skill.name, searchQuery)) : skills
	);
</script>

<section id="skills" class="py-24">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
			<p class="max-w-[85%] text-muted-foreground md:text-xl">
				Technical skills and competencies I've developed throughout my career.
			</p>
		</div>
		<div class="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-8 py-12">
			<div class="relative flex w-full max-w-md">
				<Input
					type="text"
					placeholder="Search tech stacks..."
					class="w-full pl-10"
					bind:value={searchQuery}
				/>
				<div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
					<Search size={18} />
				</div>
			</div>
			<div class="min-h-64 w-full max-w-xl">
				<div class="flex flex-wrap justify-center gap-3">
					{#each filteredSkills as skill}
						<Badge class={cn('flex h-8 items-center gap-2 px-3 hover:bg-opacity-60', skill.color)}>
							<img src={skill.icon} alt={skill.name} class="h-4 w-4 object-contain" />
							<span class="text-sm">{skill.name}</span>
						</Badge>
					{/each}
				</div>

				{#if filteredSkills.length === 0}
					<div class="flex h-48 w-full items-center justify-center">
						<p class="text-muted-foreground">No skills match your search.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
