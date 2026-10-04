<script lang="ts">
	import { projects } from './content';
	import { projectTools, type BoardFocus } from './connections';
	import { stringPath, type StringConnection } from './string-geometry';
	let {
		container,
		leftIndices,
		focus
	}: { container: HTMLElement; leftIndices: number[]; focus: BoardFocus } = $props();
	let strings = $state<StringConnection[]>([]);
	let size = $state({ width: 0, height: 0 });

	function measure() {
		if (!container || matchMedia('(max-width: 900px)').matches) {
			strings = [];
			return;
		}

		const board = container.getBoundingClientRect();
		size = { width: board.width, height: board.height };
		strings = projects.flatMap((_, index) => {
			const card = container.querySelector(`[data-pin="p${index}"]`);
			if (!card) {
				return [];
			}

			const bounds = card.getBoundingClientRect();
			let x = bounds.left + 14;
			if (leftIndices.includes(index)) {
				x = bounds.right - 14;
			}

			const start = { x: x - board.left, y: bounds.top + bounds.height * 0.45 - board.top };
			return projectTools(index).flatMap((tool) => {
				const label = container.querySelector(`[data-pin="t-${CSS.escape(tool)}"]`);
				if (!label) {
					return [];
				}

				const pin = label.getBoundingClientRect();
				const end = { x: pin.left + pin.width / 2 - board.left, y: pin.top + 4 - board.top };
				return [{ id: `${index}-${tool}`, path: stringPath(start, end), project: index, tool }];
			});
		});
	}

	$effect(() => {
		if (!container) {
			return;
		}

		measure();
		let mounted = true;
		document.fonts.ready.then(() => {
			if (mounted) {
				measure();
			}
		});
		const observer = new ResizeObserver(measure);
		observer.observe(container);
		return () => {
			mounted = false;
			observer.disconnect();
		};
	});
</script>

<svg
	class="strings pointer-events-none absolute inset-0 z-0 hidden overflow-visible board:block"
	width={size.width}
	height={size.height}
	aria-hidden="true"
>
	{#each strings as connection, index (connection.id)}
		{@const linked =
			!!focus && (focus.project === connection.project || focus.tool === connection.tool)}
		<path
			d={connection.path}
			pathLength="1"
			data-lit={linked}
			data-dim={!!focus && !linked}
			style={`animation-delay:${300 + index * 45}ms`}
			class="animate-board-string fill-none stroke-board-string stroke-2 opacity-80 transition-[opacity,stroke-width] duration-200 [filter:drop-shadow(1px_4px_1.5px_rgb(0_0_0_/_0.35))] [stroke-dasharray:1] [stroke-linecap:round] data-[lit=true]:stroke-[3px] data-[dim=true]:opacity-[0.12] data-[lit=true]:opacity-100 motion-reduce:animate-none motion-reduce:transition-none motion-reduce:[stroke-dasharray:none]"
		/>
	{/each}
</svg>
