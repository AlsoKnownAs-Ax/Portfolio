<script lang="ts">
	import { X, Menu } from 'lucide-svelte';
	import { Button } from '../ui/button';

	let isScrolled = $state(false);
	let isOpen = $state(false);

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 10;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const setIsOpen = (value: boolean) => {
		isOpen = value;
	};
</script>

<header
	class={`sticky top-0 z-50 flex w-full justify-center transition-all duration-200 ${isScrolled ? 'bg-background/80 shadow-sm backdrop-blur-md' : 'bg-background'}`}
>
	<div class="container flex h-16 items-center justify-between px-4 md:px-6">
		<a href="/" class="flex items-center gap-2">
			<span class="text-xl font-bold">Amzu Alex</span>
		</a>
		<nav class="hidden gap-6 md:flex">
			<a href="#about" class="text-sm font-medium transition-colors hover:text-primary">About</a>
			<a href="#testimonials" class="text-sm font-medium transition-colors hover:text-primary">
				Testimonials
			</a>
			<a href="#projects" class="text-sm font-medium transition-colors hover:text-primary">
				Projects
			</a>
			<a href="#test" class="text-sm font-medium transition-colors hover:text-primary">Skills</a>
			<a href="#test" class="text-sm font-medium transition-colors hover:text-primary">
				Experience
			</a>
			<a href="#test" class="text-sm font-medium transition-colors hover:text-primary">Contact</a>
		</nav>
		<div class="hidden items-center gap-4 md:flex">
			<Button
				size="sm"
				variant="default"
				href="/resume.pdf"
				download="Amzu_Alex_Resume.pdf"
				aria-label="Download my resume">Download CV</Button
			>
		</div>
		<div class="flex items-center gap-2 md:hidden">
			<Button
				variant="ghost"
				size="icon"
				onclick={() => setIsOpen(!isOpen)}
				aria-label="Toggle Menu"
			>
				{#if isOpen}
					<X class="size-6" />
				{:else}
					<Menu class="size-6" />
				{/if}
			</Button>
		</div>
	</div>
	{#if isOpen}
		<div class="container md:hidden">
			<div class="flex flex-col space-y-4 pb-6 pt-2">
				<a
					href="#test"
					class="text-sm font-medium transition-colors hover:text-primary"
					onclick={() => setIsOpen(false)}
				>
					About
				</a>
				<a
					href="#test"
					class="text-sm font-medium transition-colors hover:text-primary"
					onclick={() => setIsOpen(false)}
				>
					Projects
				</a>
				<a
					href="#test"
					class="text-sm font-medium transition-colors hover:text-primary"
					onclick={() => setIsOpen(false)}
				>
					Skills
				</a>
				<a
					href="#test"
					class="text-sm font-medium transition-colors hover:text-primary"
					onclick={() => setIsOpen(false)}
				>
					Experience
				</a>
				<a
					href="#test"
					class="text-sm font-medium transition-colors hover:text-primary"
					onclick={() => setIsOpen(false)}
				>
					Contact
				</a>
				<div class="pt-2">
					<Button size="sm" class="w-full justify-center">Download CV</Button>
				</div>
			</div>
		</div>
	{/if}
</header>
