<script lang="ts">
	import {
		X,
		Menu,
		User,
		MessageSquareQuote,
		LayoutGrid,
		Code2,
		Briefcase,
		Mail,
		Download
	} from 'lucide-svelte';
	import { Button } from '../ui/button';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

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

	<Sheet.Root bind:open={isOpen}>
		<Sheet.Content side="right" class="w-full max-w-md sm:max-w-sm">
			<Sheet.Header class="px-1 pb-2 pt-6">
				<Sheet.Title class="text-xl font-bold">Navigation</Sheet.Title>
				<Sheet.Description class="text-sm text-muted-foreground">
					Jump directly to any section of the portfolio
				</Sheet.Description>
			</Sheet.Header>

			<div class="py-6">
				<nav class="flex flex-col space-y-5">
					<a
						href="#about"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<User size={20} />
						</div>
						<span class="group-hover:text-primary">About</span>
					</a>

					<a
						href="#testimonials"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<MessageSquareQuote size={20} />
						</div>
						<span class="group-hover:text-primary">Testimonials</span>
					</a>

					<a
						href="#projects"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<LayoutGrid size={20} />
						</div>
						<span class="group-hover:text-primary">Projects</span>
					</a>

					<a
						href="#skills"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<Code2 size={20} />
						</div>
						<span class="group-hover:text-primary">Skills</span>
					</a>

					<a
						href="#experience"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<Briefcase size={20} />
						</div>
						<span class="group-hover:text-primary">Experience</span>
					</a>

					<a
						href="#contact"
						class="group flex items-center gap-3 rounded-lg px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted"
						onclick={() => (isOpen = false)}
					>
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<Mail size={20} />
						</div>
						<span class="group-hover:text-primary">Contact</span>
					</a>
				</nav>
			</div>

			<Sheet.Footer
				class="flex w-full justify-center pb-8 pt-6 text-center text-xs text-muted-foreground"
			>
				© {new Date().getFullYear()} Amzu Alex
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</header>
