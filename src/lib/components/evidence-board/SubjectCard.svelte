<script lang="ts">
	import { Download, Mail } from 'lucide-svelte';
	import { person, links } from './content';
</script>

<div
	class="board-pin board-paper z-[1] grid grid-cols-[minmax(0,1fr)_96px] gap-x-5 p-5 board:grid-cols-[minmax(0,1fr)_132px] board:p-6"
	style="--tilt:-1deg"
>
	<div>
		<p class="mb-1.5 text-xs uppercase leading-normal tracking-[0.14em] text-board-faint">
			Case file · Subject
		</p>
		<h1 id="case-h" class="board-heading text-[clamp(3rem,5vw,4.6rem)]">{person.name}</h1>
		<p class="mt-2.5 text-sm font-bold uppercase leading-[1.45] tracking-[0.06em]">
			{person.title}<br />Qogita, Platform team
		</p>
	</div>
	<figure
		class="relative mt-1 rotate-3 self-start bg-white px-[7px] pb-[18px] pt-[7px] shadow-[0_3px_10px_rgb(0_0_0_/_0.25)]"
	>
		<svg class="absolute -top-[22px] left-[14px] w-5" viewBox="0 0 40 110" aria-hidden="true"
			><path
				d="M12 100V18a8 8 0 0 1 16 0v74a5 5 0 0 1-10 0V26"
				fill="none"
				stroke="#7d848a"
				stroke-width="3.2"
				stroke-linecap="round"
			/></svg
		>
		<img
			class="block aspect-[3/4] w-full object-cover object-[40%_30%] contrast-[1.15] grayscale"
			src={person.portrait}
			alt="Portrait of Alex Amzu"
			width="600"
			height="800"
		/>
	</figure>
	<p class="col-span-full mt-[18px]">{person.intro}</p>
	<div class="col-span-full mt-[18px] flex flex-wrap gap-2.5">
		<a
			class="inline-flex items-center gap-2 border-[3px] border-double border-board-red px-[14px] py-2.5 text-sm font-bold uppercase leading-normal tracking-[0.08em] text-board-red no-underline transition-colors hover:bg-board-red hover:text-white"
			href={links.mailto}><Mail size={17} aria-hidden="true" /> Request contact</a
		>
		<a
			class="inline-flex items-center gap-2 border-2 border-board-ink px-[14px] py-2.5 text-sm font-bold uppercase leading-normal tracking-[0.08em] text-board-ink no-underline transition-colors hover:bg-board-ink hover:text-board-paper"
			href={person.resume}
			download={person.resumeName}><Download size={17} aria-hidden="true" /> Resume (PDF)</a
		>
	</div>
</div>
