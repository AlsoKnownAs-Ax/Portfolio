import type { Experience } from '$lib/types/experience';

export const experiences: Experience[] = [
	{
		company: 'Qogita',
		role: 'Software Engineer Intern',
		period: 'Jul 2025 - Present',
		description:
			'Contributing to a wholesale marketplace platform connecting suppliers and buyers. Improved scalability by migrating to Next.js App Router and enhanced deployment safety with feature flags and advanced Git workflows.'
	},
	{
		company: 'AQI Travel',
		role: 'Full Stack Developer Intern',
		period: 'Nov 2024 - Jun 2025',
		description:
			'Built a B2B dashboard with Svelte/SvelteKit and Python, featuring secure authentication, subscription management, and real-time analytics. Implemented admin approval workflows with email notifications to streamline business operations.'
	},
	{
		company: 'Freelancer',
		role: 'FiveM Script Developer',
		period: 'Dec 2022 - Sep 2024',
		description:
			'Developed optimized game systems for FiveM servers using Lua, reducing resource consumption by 25% for high-player environments. Created responsive UI components with HTML/CSS/JS frameworks and implemented SQL optimizations that cut query executions by 50%. Built robust security systems to protect against cheats and exploits.'
	}
];
