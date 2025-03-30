<script lang="ts">
	import { ArrowRight, Linkedin, Github } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Config } from '$lib/config';
</script>

<section class="relative overflow-hidden bg-background py-20 md:py-32" id="hero">
	<div class="container px-4 md:px-6">
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
			<div class="flex flex-col justify-center space-y-6">
				<div class="space-y-3">
					<h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
						<span class="text-primary">Amzu Alex</span>
						<br />
						<span class="text-foreground">Software Developer</span>
					</h1>
					<p class="max-w-[600px] text-lg leading-relaxed text-muted-foreground md:text-xl">
						Computer Science Student crafting full-stack applications with clean architecture and
						intuitive interfaces. Passionate about solving complex problems through elegant,
						high-performance code.
					</p>
				</div>
				<div class="flex flex-col gap-3 min-[400px]:flex-row">
					<Button size="lg" class="group" href="#projects" aria-label="View my projects">
						View Projects
						<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Button>
					<Button
						size="lg"
						variant="outline"
						href="/resume.pdf"
						download="Amzu_Alex_Resume.pdf"
						aria-label="Download my resume"
					>
						Download Resume
					</Button>
				</div>
				<div class="flex gap-5 pt-4">
					<a
						href={Config.GITHUB}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit my GitHub profile"
					>
						<Github
							class="size-6 cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-primary"
						/>
					</a>
					<a
						href={Config.LINKEDIN}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Visit my LinkedIn profile"
					>
						<Linkedin
							class="size-6 cursor-pointer text-muted-foreground transition-colors duration-200 hover:text-primary"
						/>
					</a>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<div
					class="relative h-[350px] w-full max-w-[350px] overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1 shadow-xl transition-all hover:shadow-2xl"
				>
					<img
						src="/main-photo.jpg"
						alt="Amzu Alex - Software Engineer"
						width={350}
						height={350}
						loading="lazy"
						class="-translate-y-10 scale-105 rounded-full object-cover transition-transform duration-300 hover:scale-110"
					/>
				</div>
			</div>
		</div>
	</div>
</section>
