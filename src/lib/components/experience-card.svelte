<script lang="ts">
	import type { Experience } from '$lib/types/experience';

	interface Props {
		experience: Experience;
	}

	let { experience }: Props = $props();
</script>

<div
	class="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all duration-200 hover:shadow-md"
>
	<div class="flex flex-col gap-1">
		<h3 class="text-lg font-bold">{experience.role}</h3>
		<p class="font-medium text-primary">{experience.company}</p>
		<p class="text-sm text-muted-foreground">{experience.period}</p>
	</div>
	<p class="text-sm text-muted-foreground">{experience.description}</p>
</div>
