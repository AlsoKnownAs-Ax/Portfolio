<script lang="ts">
	interface Props {
		company: string;
		role: string;
		period: string;
		description: string;
	}

	let { company, role, period, description }: Props = $props();
</script>

<div
	class="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all duration-200 hover:shadow-md"
>
	<div class="flex flex-col gap-1">
		<h3 class="text-lg font-bold">{role}</h3>
		<p class="font-medium text-primary">{company}</p>
		<p class="text-sm text-muted-foreground">{period}</p>
	</div>
	<p class="text-sm text-muted-foreground">{description}</p>
</div>
