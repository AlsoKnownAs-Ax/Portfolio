<script lang="ts">
	import { Lightbulb, Shield, Users } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
</script>

<section class="bg-muted/40 py-24" id="about">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<!-- <span class="text-primary text-sm font-medium uppercase tracking-widest">Get to know me</span> -->
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
			<p class="max-w-[85%] text-lg text-muted-foreground md:text-xl">
				I'm a software developer with 3+ years of experience building web applications and services.
			</p>
		</div>

		<div class="mx-auto grid max-w-4xl items-center gap-10 py-12 md:grid-cols-[2fr_1fr]">
			<div class="space-y-6">
				<p class="leading-relaxed text-foreground">
					My coding journey began in high school when I discovered FiveM role-play servers.
					Frustrated with existing server limitations, I decided to build my own solutions, creating
					custom scripts and interactive UI components using Lua. This experience sparked my passion
					for software development and provided me with foundational insights into game mechanics
					and backend logic.
				</p>
				<p class="leading-relaxed text-foreground">
					Driven by this newfound passion, I expanded into web development, mastering frameworks
					like Svelte, TypeScript, React.js, and Vue.js. Today, I specialize in full-stack
					development, primarily using Svelte, TypeScript, and Python. Professionally, I've worked
					on building scalable web applications with secure authentication, user management, data
					analytics, and access control systems to enhance efficiency and usability.
				</p>
				<p class="leading-relaxed text-foreground">
					I'm passionate about creating efficient, secure, and user-focused web solutions that
					simplify and enhance experiences. I'm always eager to learn, collaborate, and innovate.
				</p>
			</div>

			<div class="flex flex-col items-center justify-center space-y-4 md:block md:space-y-6">
				<h3 class="text-xl font-semibold">My Approach</h3>
				<Separator class="md:hidden" />
				<div class="space-y-4">
					<div class="flex items-center gap-3">
						<div class="rounded-full bg-primary/10 p-2 text-primary">
							<Lightbulb size={20} />
						</div>
						<div>
							<h4 class="font-medium">Problem-Solving First</h4>
							<p class="text-sm text-muted-foreground">Understanding challenges before coding</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="rounded-full bg-primary/10 p-2 text-primary">
							<Shield size={20} />
						</div>
						<div>
							<h4 class="font-medium">Security-Minded</h4>
							<p class="text-sm text-muted-foreground">Building robust, secure applications</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="rounded-full bg-primary/10 p-2 text-primary">
							<Users size={20} />
						</div>
						<div>
							<h4 class="font-medium">Collaboration</h4>
							<p class="text-sm text-muted-foreground">Working effectively in teams</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
