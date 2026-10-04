<script lang="ts">
	import { timeline } from './content';
	import SectionHeading from './SectionHeading.svelte';
	import PostingCard from './PostingCard.svelte';
</script>

<section
	id="postings"
	aria-labelledby="post-h"
	class="mt-[clamp(64px,8vw,104px)] scroll-mt-[110px]"
>
	<SectionHeading id="post-h">Known postings</SectionHeading>
	<ol
		class="relative grid grid-cols-1 items-start gap-6 pt-[26px] board:grid-cols-3 board:gap-[18px] board:before:absolute board:before:-inset-x-2.5 board:before:top-4 board:before:h-0.5 board:before:bg-board-string board:before:shadow-[0_3px_2px_rgb(0_0_0_/_0.3)] board:before:content-[''] board-wide:grid-cols-5"
	>
		{#each timeline as experience, index}
			<PostingCard {experience} {index} current={index === timeline.length - 1} />
		{/each}
	</ol>
</section>
