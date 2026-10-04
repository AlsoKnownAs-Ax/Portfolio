import { projects } from './content';

export type BoardFocus = { project?: number; tool?: string } | null;
export const toolKey = (name: string) => name.toLowerCase();

const counts = new Map<string, { key: string; name: string; count: number }>();
projects.forEach((project) => {
	project.technologies.forEach((name) => {
		const key = toolKey(name);
		const tool = counts.get(key) ?? { key, name, count: 0 };
		tool.count++;
		counts.set(key, tool);
	});
});

export const sharedTools = [...counts.values()]
	.filter((tool) => tool.count >= 2)
	.sort((a, b) => b.count - a.count);
const sharedKeys = new Set(sharedTools.map((tool) => tool.key));
export const projectTools = (index: number) =>
	projects[index].technologies.map(toolKey).filter((key) => sharedKeys.has(key));

export function isProjectLinked(focus: BoardFocus, index: number) {
	return !!focus && (focus.project === index || projectTools(index).includes(focus.tool ?? ''));
}

export function isToolLinked(focus: BoardFocus, key: string) {
	if (focus?.project !== undefined) {
		return projectTools(focus.project).includes(key);
	}

	return focus?.tool === key;
}

export function describeTool(key: string | null) {
	if (!key) {
		return '';
	}

	const names = projects
		.filter((_, index) => projectTools(index).includes(key))
		.map((project) => project.title);
	return `${counts.get(key)?.name} is used in ${names.join(', ')}.`;
}
