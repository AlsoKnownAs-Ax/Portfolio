<script lang="ts">
	import { testimonials } from '$lib/data/testimonials';
	import TestimonialCard from '$lib/components/testimonial-card.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';
	import { isMobile } from '$lib/hooks/isMobile';

	const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });
	let api = $state<CarouselAPI>();
	let current = $state(0);
	const count = $derived(api ? api.scrollSnapList().length : 0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<section id="testimonials">
	<div class="relative mx-auto w-full max-w-2xl cursor-grab py-12">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Testimonials</h2>
			<p class="max-w-[85%] text-muted-foreground md:text-xl">
				What people say about working with me.
			</p>
		</div>
		<Carousel.Root
			class="mt-10"
			plugins={[plugin]}
			setApi={(emblaApi) => (api = emblaApi)}
			opts={{
				align: 'center',
				loop: true
			}}
			onmouseenter={plugin.stop}
			onmouseleave={plugin.reset}
		>
			<Carousel.Content>
				{#each testimonials as testimonial, i (i)}
					<Carousel.Item>
						<div class="p-1">
							<TestimonialCard {testimonial} />
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			{#if !$isMobile}
				<Carousel.Previous />
				<Carousel.Next />
			{/if}
		</Carousel.Root>
		<div class="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
			{#each Array(count) as _, i (i)}
				<div
					class={`size-2 rounded-full bg-muted/50 transition-all duration-300 ease-in-out ${current === i + 1 ? 'bg-primary/50' : 'bg-muted/50'}`}
				></div>
			{/each}
		</div>
	</div>
</section>
