import type { BoardFocus } from './connections';

/** State is local to each board, shared by its project cards, tool labels and strings. */
export function createBoardInteraction() {
	let preview = $state<BoardFocus>(null);
	let pinned = $state<string | null>(null);
	const focus = $derived.by(() => {
		if (preview) {
			return preview;
		}

		if (pinned) {
			return { tool: pinned };
		}

		return null;
	});

	return {
		get focus() {
			return focus;
		},
		get pinned() {
			return pinned;
		},
		preview(value: BoardFocus) {
			preview = value;
		},
		toggle(key: string) {
			preview = null;
			if (pinned === key) {
				pinned = null;
				return;
			}

			pinned = key;
		},
		clear() {
			preview = null;
			pinned = null;
		}
	};
}

export type BoardInteraction = ReturnType<typeof createBoardInteraction>;
