import { Config } from '$lib/config';
import { experiences } from '$lib/data/experience';
import { projects } from '$lib/data/projects';
import { testimonials } from '$lib/data/testimonials';

export const person = {
	name: 'Alex Amzu',
	fullName: 'Andrei Alexandru Amzu',
	title: 'Software Engineer',
	now: 'Platform team, Qogita',
	intro:
		"I started shipping software in high school, writing Lua systems for FiveM game servers. Today I build developer tools and shared infrastructure on Qogita's Platform team, working across the stack from FastAPI and Spring Boot to Svelte and Next.js.",
	portrait: '/main-photo.jpg',
	resume: '/resume.pdf',
	resumeName: 'Alex_Amzu_Resume.pdf'
};

export const links = {
	email: Config.MAIL,
	mailto: `mailto:${Config.MAIL}`,
	github: Config.GITHUB,
	linkedin: Config.LINKEDIN
};

export const isClassified = (description: string) => description === 'CLASSIFIED';

/** Experience oldest → newest, for the postings line. */
export const timeline = [...experiences].reverse();

export { projects, testimonials };
