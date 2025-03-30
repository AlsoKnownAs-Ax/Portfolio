<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Config } from '$lib/config';
	import { Mail, Github, Linkedin, Send } from 'lucide-svelte';
</script>

<section id="contact" class="bg-muted/10 py-24">
	<div class="container px-4 md:px-6">
		<div class="mx-auto max-w-3xl">
			<div class="mb-10 text-center">
				<h2 class="mb-3 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Get In Touch
				</h2>
				<p class="mx-auto max-w-md text-muted-foreground">
					Interested in working together? Reach out through any of these channels.
				</p>
			</div>

			<Card class="border-0 bg-background/60 shadow-md backdrop-blur-sm">
				<CardHeader class="pb-0">
					<CardTitle class="text-center text-xl">Connect With Me</CardTitle>
				</CardHeader>
				<CardContent class="pt-6">
					<div class="grid gap-4 sm:grid-cols-3">
						<a
							href={`mailto:${Config.MAIL}`}
							class="flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all hover:bg-muted"
						>
							<div
								class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
							>
								<Mail size={24} />
							</div>
							<span class="font-medium">Email</span>
						</a>

						<a
							href={Config.GITHUB}
							target="_blank"
							rel="noopener noreferrer"
							class="flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all hover:bg-muted"
						>
							<div
								class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
							>
								<Github size={24} />
							</div>
							<span class="font-medium">GitHub</span>
						</a>

						<a
							href={Config.GITHUB}
							target="_blank"
							rel="noopener noreferrer"
							class="flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-all hover:bg-muted"
						>
							<div
								class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
							>
								<Linkedin size={24} />
							</div>
							<span class="font-medium">LinkedIn</span>
						</a>
					</div>

					<div class="mt-8 flex flex-col items-center">
						<p class="mb-4 text-center text-sm text-muted-foreground">
							Prefer direct contact? Send me an email.
						</p>
						<a href={`mailto:${Config.MAIL}`} class="flex items-center gap-2">
							<Button size="lg">
								<Send size={18} />
								<span>Message Me</span>
							</Button>
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
