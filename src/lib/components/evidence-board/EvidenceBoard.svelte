<script lang="ts">
	import BoardNavigation from './BoardNavigation.svelte';
	import ProjectEvidence from './ProjectEvidence.svelte';
	import KnownPostings from './KnownPostings.svelte';
	import WitnessStatements from './WitnessStatements.svelte';
	import ContactSection from './ContactSection.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@700;900&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="evidence-board min-h-screen overflow-x-clip bg-board-wall px-[clamp(8px,2vw,28px)] pb-[88px] font-typewriter text-base leading-normal text-board-ink selection:bg-board-red selection:text-white"
>
	<a
		class="fixed left-2 top-2 z-30 -translate-y-[150%] bg-board-paper px-[18px] py-3 text-board-ink focus:translate-y-0"
		href="#case">Skip to portfolio</a
	>
	<BoardNavigation />
	<main
		class="mx-auto max-w-[1440px] rounded border-8 border-board-frame bg-board-cork bg-cork-texture px-[14px] pb-7 pt-[18px] shadow-board-recess board:border-[14px] board:p-[clamp(20px,3vw,44px)]"
	>
		<ProjectEvidence />
		<KnownPostings />
		<WitnessStatements />
		<ContactSection />
	</main>
</div>
