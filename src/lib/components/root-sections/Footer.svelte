<script lang="ts">
	import { ArrowUp, Heart } from 'lucide-svelte';
</script>

<footer class="border-t bg-background/80 py-8 backdrop-blur-sm">
	<div class="container px-4 md:px-6">
		<!-- Main Footer Content -->
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<!-- Logo/Brand -->
			<div class="flex flex-col items-center gap-1 md:items-start">
				<span class="text-lg font-bold tracking-tight">Amzu Alex</span>
				<p class="text-xs text-muted-foreground">Full Stack Developer</p>
			</div>

			<!-- Quick navigation -->
			<div class="flex flex-wrap justify-center gap-6 text-sm md:justify-end">
				<a
					href="#top"
					class="flex items-center gap-1.5 rounded-full bg-muted/80 px-4 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
				>
					<span>Back to top</span>
					<ArrowUp size={14} />
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class="my-5 h-px w-full bg-border/60"></div>

		<!-- Copyright & Back to top -->
		<div class="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
			<p class="text-center text-xs text-muted-foreground md:text-left">
				© {new Date().getFullYear()} Amzu Alex. All rights reserved.
			</p>
			<p class="flex items-center gap-1 text-xs text-muted-foreground">
				Built with <Heart size={12} class="fill-red-500 text-red-500" /> using Svelte & Tailwind
			</p>
		</div>
	</div>
</footer>
