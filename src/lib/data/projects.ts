import type { Project } from '$lib/types/projects';

export const projects: Project[] = [
	{
		title: 'StreamTube',
		description:
			'A modern streaming platform showcasing movies from the IMDb API with descriptions, reviews, and trailers for an engaging viewing experience.',
		technologies: ['TypeScript', 'NextJS', 'JavaScript', 'Tailwind', 'IMBb API'],
		url: 'https://stream-tube-gamma.vercel.app/',
		github: 'https://github.com/AlsoKnownAs-Ax/StreamTube',
		category: 'Web Development'
	},
	{
		title: 'SnoopieChat',
		description:
			"SnoopieChat is a privacy-first messaging app that protects user data and metadata using advanced anonymization in a real-time chat environment",
		technologies: [
			'Spring Boot', 
			'TypeScript', 
			'Svelte', 
			"OpenAPI",
			"Tailwind", 
			"Zod",
			"SocketJS",
			"Javalin"
		],
		url: "https://drive.google.com/file/d/10bRtmmUT3avDvwhWTvyCOrg86k6_Rcyt/view",
		github: 'https://github.com/AlsoKnownAs-Ax/SnoopieChat',
		category: 'Web Development'
	},
	{
		title: 'Chat Application',
		description: 'A real-time chat app built with modern tools like Next.js, Socket.IO, and Redis. Designed for scalability and low-latency communication.',
		technologies: ['TypeScript', 'Next.js', 'Redis', 'Express', 'socket.io', 'upstash'],
		github: 'https://github.com/AlsoKnownAs-Ax/Next-Project',
		category: 'Web Development'
	},
	{
		title: 'Bug Bounty Bank',
		description:
			'Bug-Bounty-Bank An intentionally vulnerable banking website for security practitioners to find and exploit web application vulnerabilities.',
		technologies: [
			'FastAPI',
			'Svelte',
			'Python',
			'hey-API',
			'Zod',
			'SQLite',
			'SQL Model',
			'UV Python',
			'Pydantic'
		],
		github: 'https://github.com/AlsoKnownAs-Ax/Bug-Bounty-Bank',
		category: 'Web Development'
	},
	{
		title: 'Tetris Knapsack Solver',
		description:
			'A Java application that uses the Dancing Links (DLX) algorithm to optimally fit 3D pentominoes into a cargo space.',
		technologies: ['Java', 'JavaFX', 'CSS'],
		github: 'https://github.com/AlsoKnownAs-Ax/Project_1-1-Tetris-Knapsack-Solver',
		category: 'Software Development'
	},
	{
		title: 'Slots Machine App',
		description: 'A simple and fun slot machine game',
		technologies: ['Vue', 'SCSS', 'JQuery', 'JavaScript'],
		url: 'https://github.com/AlsoKnownAs-Ax/Ax_slots/blob/main/html/assets/preview.png',
		github: 'https://github.com/AlsoKnownAs-Ax/Ax_slots',
		category: 'Web Development'
	},
	// {
	// 	title: 'Fivem Garages System',
	// 	description:
	// 		' vRP garage system for FiveM where players park and retrieve vehicles from the same garage',
	// 	technologies: ['Lua', 'SCSS', 'Vue', 'JavaScript'],
	// 	url: 'https://www.youtube.com/watch?v=BHs-sTnQNGw',
	// 	github: 'https://github.com/AlsoKnownAs-Ax/ax_garages-FiveM',
	// 	category: 'FiveM Development'
	// }
];
