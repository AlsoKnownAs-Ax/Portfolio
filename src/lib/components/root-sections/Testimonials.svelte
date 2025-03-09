<script lang="ts">
	import { testimonials } from '$lib/data/testimonials';
	import TestimonialCard from '$lib/components/testimonial-card.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import Autoplay from 'embla-carousel-autoplay';

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

<div class="relative mx-auto w-full max-w-2xl cursor-grab overflow-hidden py-12">
	<Carousel.Root
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
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
	<div class="py-2 text-center text-sm text-muted-foreground">
		Testimonial {current} of {count}
	</div>
</div>
