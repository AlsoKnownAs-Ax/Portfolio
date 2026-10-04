export type Point = { x: number; y: number };
export type StringConnection = { id: string; path: string; project: number; tool: string };

export function stringPath(start: Point, end: Point) {
	const sag = 24 + Math.abs(end.x - start.x) * 0.1;
	return `M${start.x} ${start.y} Q${(start.x + end.x) / 2} ${Math.max(start.y, end.y) + sag} ${end.x} ${end.y}`;
}
