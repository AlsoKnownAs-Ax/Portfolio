<script lang="ts">
	let { id, children }: { id: string; children: import('svelte').Snippet } = $props();
</script>

<h2
	{id}
	class="board-heading mb-8 inline-block -rotate-1 bg-board-label px-4 pb-[5px] pt-[7px] text-[1.6rem] tracking-[0.06em] text-board-chalk"
>
	{@render children()}
</h2>
