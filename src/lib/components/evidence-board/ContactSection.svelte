<script lang="ts">
	import { Download, Github, Linkedin, Mail } from 'lucide-svelte';
	import { person, links } from './content';
	const channels = [
		{ label: 'Email', text: links.email, href: links.mailto, icon: Mail },
		{ label: 'GitHub', text: 'AlsoKnownAs-Ax', href: links.github, icon: Github, target: '_blank' },
		{
			label: 'LinkedIn',
			text: person.fullName,
			href: links.linkedin,
			icon: Linkedin,
			target: '_blank'
		},
		{
			label: 'Resume',
			text: person.resumeName,
			href: person.resume,
			icon: Download,
			download: person.resumeName
		}
	];
</script>

<section
	id="contact"
	aria-labelledby="found-h"
	class="mt-[clamp(64px,8vw,104px)] grid scroll-mt-[110px] justify-items-center"
>
	<div class="board-pin board-paper w-full max-w-[660px] px-[30px] py-7" style="--tilt:-0.8deg">
		<h2 id="found-h" class="board-heading mb-4 text-[clamp(2.4rem,5vw,3.6rem)] text-board-red">
			If found, contact
		</h2>
		<ul>
			{#each channels as channel (channel.label)}
				<li
					class="grid grid-cols-1 items-center gap-0.5 border-t border-board-ink py-2.5 board:grid-cols-[100px_1fr] board:gap-0"
				>
					<span class="text-[12.5px] uppercase tracking-[0.1em] text-board-faint"
						>{channel.label}</span
					>
					<a
						class="board-link gap-2.5 break-all"
						href={channel.href}
						target={channel.target}
						download={channel.download}
						rel="noopener noreferrer"><channel.icon size={17} aria-hidden="true" />{channel.text}</a
					>
				</li>
			{/each}
		</ul>
		<span
			class="absolute -bottom-[34px] right-1 -rotate-[12deg] border-4 border-board-red bg-board-paper/70 px-3 py-1.5 text-center font-stencil text-xl font-black uppercase leading-[0.95] text-board-red board:-bottom-7 board:-right-[18px] board:text-2xl board:leading-[0.95]"
			aria-hidden="true">Cleared<br />for contact</span
		>
	</div>
	<p class="mt-11 text-[13px] text-board-note">© {new Date().getFullYear()} Alex Amzu</p>
</section>
