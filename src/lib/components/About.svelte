<script lang="ts">
	import { Code, Globe, PenTool } from 'lucide-svelte';
</script>

<section class="bg-muted/40 py-24" id="about">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<!-- <span class="text-primary text-sm font-medium uppercase tracking-widest">Get to know me</span> -->
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
			<p class="text-muted-foreground max-w-[85%] text-lg md:text-xl">
				I'm a software developer with 3+ years of experience building web applications and services.
			</p>
		</div>

		<div class="mx-auto grid max-w-4xl items-center gap-10 py-12 md:grid-cols-[2fr_1fr]">
			<div class="space-y-6">
				<p class="text-foreground leading-relaxed">
					I specialize in full-stack development with a focus on Svelte, TypeScript and Python. My
					journey in software engineering began during my High school studies, where I started to
					develop a passion for creating scripts to enhance the FiveM gameplay experience.
				</p>
				<p class="text-foreground leading-relaxed">
					Throughout my career, I've worked with startups and established companies, helping them
					build scalable applications and improve their development processes. I'm particularly
					interested in performance optimization, accessibility, and creating intuitive user
					experiences.
				</p>
				<p class="text-foreground leading-relaxed">
					When I'm not coding, you can find me contributing to open-source projects, writing
					technical articles, or exploring new technologies to expand my skill set.
				</p>
			</div>

			<div class="space-y-6">
				<h3 class="text-xl font-semibold">Core Skills</h3>
				<div class="space-y-4">
					<div class="flex items-center gap-3">
						<div class="bg-primary/10 text-primary rounded-full p-2">
							<Code size={20} />
						</div>
						<div>
							<h4 class="font-medium">Development</h4>
							<p class="text-muted-foreground text-sm">Svelte, TypeScript, Python</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="bg-primary/10 text-primary rounded-full p-2">
							<Globe size={20} />
						</div>
						<div>
							<h4 class="font-medium">Web Technologies</h4>
							<p class="text-muted-foreground text-sm">Full-stack, Responsive Design</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="bg-primary/10 text-primary rounded-full p-2">
							<PenTool size={20} />
						</div>
						<div>
							<h4 class="font-medium">UX/UI Design</h4>
							<p class="text-muted-foreground text-sm">User-centered, Accessible</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
