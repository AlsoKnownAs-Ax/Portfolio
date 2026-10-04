export const projectTilts = [-2.2, 1.6, -1.1, 1.9, -1.6, 1.2];

export function alternatingTilt(index: number, positive: number, negative: number) {
	if (index % 2) {
		return positive;
	}

	return negative;
}
