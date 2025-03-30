<script lang="ts">
	import { X, Menu } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { fade } from 'svelte/transition';

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
	class={`sticky top-0 z-50 flex w-full justify-center transition-all duration-200 ${
		isScrolled && !isOpen ? 'bg-background/80 shadow-sm backdrop-blur-md' : 'bg-background'
	}`}
>
	<div class="container flex h-16 items-center justify-between px-4 md:px-6">
		<a href="/" class="z-[60] flex items-center gap-2">
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
			<a href="#skills" class="text-sm font-medium transition-colors hover:text-primary">Skills</a>
			<a href="#experience" class="text-sm font-medium transition-colors hover:text-primary">
				Experience
			</a>
			<a href="#contact" class="text-sm font-medium transition-colors hover:text-primary">Contact</a
			>
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
				class="z-[60]"
			>
				{#if isOpen}
					<X class="z-50 size-6" />
				{:else}
					<Menu class="size-6" />
				{/if}
			</Button>
		</div>
	</div>

	{#if isOpen}
		<div
			class="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
			transition:fade={{ duration: 200 }}
		>
			<!-- Header space to match the normal header height -->
			<div class="h-16"></div>

			<!-- Content area -->
			<div class="flex flex-1 flex-col items-center justify-center px-4 py-8">
				<nav class="flex h-full w-full flex-col items-center justify-center space-y-8 text-center">
					<a
						href="#about"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						About
					</a>
					<a
						href="#testimonials"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						Testimonials
					</a>
					<a
						href="#projects"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						Projects
					</a>
					<a
						href="#skills"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						Skills
					</a>
					<a
						href="#experience"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						Experience
					</a>
					<a
						href="#contact"
						class="text-2xl font-medium transition-colors hover:text-primary"
						onclick={() => setIsOpen(false)}
					>
						Contact
					</a>
					<div class="mt-4 w-full max-w-[200px]">
						<Button
							size="lg"
							class="w-full justify-center"
							href="/resume.pdf"
							download="Amzu_Alex_Resume.pdf"
						>
							Download CV
						</Button>
					</div>
				</nav>
			</div>
		</div>
	{/if}
</header>
