<script lang="ts">
	import { onMount } from 'svelte';
	const sections = [
		{ id: 'case', label: 'Projects' },
		{ id: 'postings', label: 'Experience' },
		{ id: 'statements', label: 'Testimonials' },
		{ id: 'contact', label: 'Contact' }
	];
	let active = $state('case');
	function current(id: string) {
		if (id === active) {
			return 'location' as const;
		}

		return undefined;
	}
	onMount(() => {
		const update = () => {
			if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
				active = 'contact';
				return;
			}

			active =
				sections.findLast((section) => {
					const element = document.getElementById(section.id);
					return element && element.getBoundingClientRect().top <= 120;
				})?.id ?? 'case';
		};
		update();
		addEventListener('scroll', update, { passive: true });
		addEventListener('resize', update);
		return () => {
			removeEventListener('scroll', update);
			removeEventListener('resize', update);
		};
	});
</script>

<nav
	aria-label="Board sections"
	class="sticky top-0 z-20 mx-auto flex max-w-[1440px] justify-center gap-[5px] bg-board-wall px-2 pt-3 after:absolute after:inset-x-0 after:bottom-0 after:h-2 after:bg-board-frame after:content-[''] board:gap-2.5 board:px-5 board:pt-6 board:after:h-[14px]"
>
	{#each sections as section (section.id)}
		<a
			href={`#${section.id}`}
			aria-current={current(section.id)}
			class="relative z-[1] flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-t-[6px] border border-b-0 border-board-frame bg-board-manila px-1.5 pb-[13px] pt-2.5 font-stencil text-base font-black uppercase tracking-[0.015em] text-board-ink no-underline shadow-board-tab transition-colors duration-150 hover:bg-board-card hover:text-board-red focus-visible:!outline-offset-[-5px] focus-visible:!outline-board-paper aria-[current=location]:bg-board-red aria-[current=location]:text-white motion-reduce:transition-none board:min-h-14 board:flex-none board:rounded-t-[9px] board:px-7 board:pb-4 board:pt-3 board:text-[22px] board:leading-normal board:tracking-[0.04em]"
			>{section.label}</a
		>
	{/each}
</nav>
