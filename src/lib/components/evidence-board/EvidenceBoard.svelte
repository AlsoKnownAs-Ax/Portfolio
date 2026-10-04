<script lang="ts">
	// Red string connects project evidence to tools shared across the portfolio.
	import { onMount } from 'svelte';
	import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-svelte';
	import { person, links, timeline, projects, testimonials, isClassified } from './content';

	const key = (t: string) => t.toLowerCase();
	const counts = new Map<string, { name: string; n: number }>();
	projects.forEach((p) => {
		p.technologies.forEach((t) => {
			const c = counts.get(key(t)) ?? { name: t, n: 0 };
			c.n++;
			counts.set(key(t), c);
		});
	});
	const shared = [...counts.values()].filter((c) => c.n >= 2).sort((a, b) => b.n - a.n);
	const sharedKeys = new Set(shared.map((s) => key(s.name)));
	const tagsOf = (i: number) =>
		projects[i].technologies.filter((t) => sharedKeys.has(key(t))).map(key);
	const projectsUsing = (k: string) =>
		projects.filter((_, i) => tagsOf(i).includes(k)).map((p) => p.title);

	const projectIndices = projects.map((_, i) => i);
	const midpoint = Math.ceil(projects.length / 2);
	const left = projectIndices.slice(0, midpoint);
	const right = projectIndices.slice(midpoint);
	const tilt = [-2.2, 1.6, -1.1, 1.9, -1.6, 1.2];

	// Hover previews a connection; clicking a tool locks it until clicked again or Escape.
	type Focus = { project?: number; tool?: string } | null;
	let hover = $state<Focus>(null);
	let locked = $state<string | null>(null);
	const focus = $derived<Focus>(hover ?? pinnedTool());
	const linked = (i: number, k: string) => !focus || focus.project === i || focus.tool === k;
	const projectLit = (i: number) =>
		!!focus && (focus.project === i || tagsOf(i).includes(focus.tool ?? ''));
	function tagLit(k: string) {
		if (focus?.project !== undefined) {
			return tagsOf(focus.project).includes(k);
		}

		return focus?.tool === k;
	}
	function pinnedTool(): Focus {
		if (!locked) {
			return null;
		}

		return { tool: locked };
	}
	function toggleTool(k: string) {
		hover = null;
		if (locked === k) {
			locked = null;
			return;
		}

		locked = k;
	}
	function announcement() {
		if (!locked) {
			return '';
		}

		return `${counts.get(locked)?.name} is used in ${projectsUsing(locked).join(', ')}.`;
	}
	const announce = $derived(announcement());
	function alternatingTilt(n: number, positive: number, negative: number) {
		if (n % 2) {
			return positive;
		}

		return negative;
	}

	let board: HTMLElement;
	let strings = $state<{ id: string; d: string; i: number; k: string }[]>([]);
	let size = $state({ w: 0, h: 0 });
	const sections = [
		{ id: 'case', label: 'Projects' },
		{ id: 'postings', label: 'Experience' },
		{ id: 'statements', label: 'Testimonials' },
		{ id: 'contact', label: 'Contact' }
	];
	let activeSection = $state('case');

	function currentSection(id: string) {
		if (activeSection === id) {
			return 'location' as const;
		}

		return undefined;
	}

	function measure() {
		if (!board || matchMedia('(max-width: 900px)').matches) {
			strings = [];
			return;
		}

		const b = board.getBoundingClientRect();
		size = { w: b.width, h: b.height };
		const pin = (el: Element) => {
			const r = el.getBoundingClientRect();
			return { x: r.left + r.width / 2 - b.left, y: r.top + 4 - b.top };
		};
		const edge = (el: Element, i: number) => {
			const r = el.getBoundingClientRect();
			let x = r.left + 14;
			if (left.includes(i)) {
				x = r.right - 14;
			}

			return { x: x - b.left, y: r.top + r.height * 0.45 - b.top };
		};
		const out: typeof strings = [];
		projects.forEach((_, i) => {
			const card = board.querySelector(`[data-pin="p${i}"]`);
			if (!card) {
				return;
			}

			const a = edge(card, i);
			tagsOf(i).forEach((k) => {
				const tool = board.querySelector(`[data-pin="t-${CSS.escape(k)}"]`);
				if (!tool) {
					return;
				}

				const z = pin(tool);
				const sag = 24 + Math.abs(z.x - a.x) * 0.1;
				out.push({
					id: `${i}-${k}`,
					d: `M${a.x} ${a.y} Q${(a.x + z.x) / 2} ${Math.max(a.y, z.y) + sag} ${z.x} ${z.y}`,
					i,
					k
				});
			});
		});
		strings = out;
	}

	onMount(() => {
		measure();
		let mounted = true;
		document.fonts?.ready.then(() => {
			if (mounted) {
				measure();
			}
		});
		const ro = new ResizeObserver(measure);
		ro.observe(board);
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				locked = null;
				hover = null;
			}
		};
		const updateSection = () => {
			const atBottom =
				window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
			if (atBottom) {
				activeSection = 'contact';
				return;
			}

			const visibleSection = sections.findLast((section) => {
				const element = document.getElementById(section.id);
				return element && element.getBoundingClientRect().top <= 120;
			});
			activeSection = visibleSection?.id ?? 'case';
		};
		updateSection();
		addEventListener('scroll', updateSection, { passive: true });
		addEventListener('resize', updateSection);
		addEventListener('keydown', onKey);
		return () => {
			mounted = false;
			ro.disconnect();
			removeEventListener('keydown', onKey);
			removeEventListener('scroll', updateSection);
			removeEventListener('resize', updateSection);
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@700;900&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="wall">
	<a class="skip-link" href="#case">Skip to portfolio</a>
	<nav class="rail" aria-label="Board sections">
		{#each sections as section (section.id)}
			<a href={`#${section.id}`} aria-current={currentSection(section.id)}>{section.label}</a>
		{/each}
	</nav>

	<main class="cork">
		<!-- CASE: projects, subject, tools, strung together -->
		<section id="case" class="board" bind:this={board} aria-labelledby="case-h">
			<svg class="strings" width={size.w} height={size.h} aria-hidden="true">
				{#each strings as s, n (s.id)}
					<path
						d={s.d}
						pathLength="1"
						style={`--n:${n}`}
						class:on={!!focus && linked(s.i, s.k)}
						class:dim={!!focus && !linked(s.i, s.k)}
					/>
				{/each}
			</svg>

			<div class="col">
				{#each left as i}{@render card(i)}{/each}
			</div>

			<div class="center">
				<div class="sheet pinned title" style="--r:-1deg">
					<div class="title-text">
						<p class="case-no">Case file · Subject</p>
						<h1 id="case-h">Alex Amzu</h1>
						<p class="role">{person.title}<br />Qogita, Platform team</p>
					</div>
					<figure class="mug">
						<svg class="clip" viewBox="0 0 40 110" aria-hidden="true"
							><path
								d="M12 100V18a8 8 0 0 1 16 0v74a5 5 0 0 1-10 0V26"
								fill="none"
								stroke="#7d848a"
								stroke-width="3.2"
								stroke-linecap="round"
							/></svg
						>
						<img src={person.portrait} alt="Portrait of Alex Amzu" width="600" height="800" />
					</figure>
					<p class="intro">{person.intro}</p>
					<div class="actions">
						<a class="stamp-btn" href={links.mailto}
							><Mail size={17} aria-hidden="true" /> Request contact</a
						>
						<a class="plain-btn" href={person.resume} download={person.resumeName}
							><Download size={17} aria-hidden="true" /> Resume (PDF)</a
						>
					</div>
				</div>

				<div class="tools">
					<h2 class="sr">Tools shared across projects</h2>
					<ul class="tags">
						{#each shared as t, n}
							{@const k = key(t.name)}
							<li>
								<button
									class="dymo"
									class:lit={tagLit(k)}
									class:dim={!!focus && !tagLit(k)}
									style={`--r:${alternatingTilt(n, 1, -1) * (1 + (n % 3))}deg`}
									data-pin={`t-${k}`}
									aria-pressed={locked === k}
									aria-label={`${t.name}, used in ${t.n} projects`}
									onmouseenter={() => (hover = { tool: k })}
									onmouseleave={() => (hover = null)}
									onfocus={() => (hover = { tool: k })}
									onblur={() => (hover = null)}
									onclick={() => toggleTool(k)}>{t.name}</button
								>
							</li>
						{/each}
					</ul>
					<p class="hint">
						<span class="fine-pointer"
							>Hover a project or a tool to follow the string. Click a tool to pin it.</span
						>
						<span class="coarse-pointer">Tap a tool to see which projects use it.</span>
					</p>
					<p class="sr" aria-live="polite">{announce}</p>
				</div>
			</div>

			<div class="col">
				{#each right as i}{@render card(i)}{/each}
			</div>
		</section>

		{#snippet card(i: number)}
			{@const p = projects[i]}
			<article
				class="index pinned"
				class:lit={projectLit(i)}
				class:dim={!!focus && !projectLit(i)}
				style={`--r:${tilt[i % tilt.length]}deg`}
				data-pin={`p${i}`}
				onmouseenter={() => (hover = { project: i })}
				onmouseleave={() => (hover = null)}
				onfocusin={() => (hover = { project: i })}
				onfocusout={() => (hover = null)}
			>
				<h3>{p.title}</h3>
				<p>{p.description}</p>
				<p class="tech">{p.technologies.join(' · ')}</p>
				<p class="links">
					{#if p.url}<a href={p.url} target="_blank" rel="noopener noreferrer"
							>Demo <ArrowUpRight size={14} aria-hidden="true" /><span class="sr">: {p.title}</span
							></a
						>{/if}
					<a href={p.github} target="_blank" rel="noopener noreferrer"
						>Source <ArrowUpRight size={14} aria-hidden="true" /><span class="sr">: {p.title}</span
						></a
					>
				</p>
			</article>
		{/snippet}

		<!-- POSTINGS on a line -->
		<section id="postings" class="postings" aria-labelledby="post-h">
			<h2 id="post-h" class="label-strip">Known postings</h2>
			<ol class="line">
				{#each timeline as e, n}
					<li class="tag-card pinned" style={`--r:${alternatingTilt(n, 1.6, -1.6)}deg`}>
						<p class="when">{e.period}</p>
						<h3>{e.company}</h3>
						<p class="what">{e.role}</p>
						{#if isClassified(e.description)}
							<div class="classified">
								<div class="blackout" aria-hidden="true">
									<span style="width:90%"></span><span style="width:64%"></span><span
										style="width:78%"
									></span>
								</div>
								<span class="classified-stamp">CLASSIFIED</span>
							</div>
						{:else}
							<p class="desc">{e.description}</p>
						{/if}
						{#if n === timeline.length - 1}<span class="current">Current</span>{/if}
					</li>
				{/each}
			</ol>
		</section>

		<!-- STATEMENTS -->
		<section id="statements" class="statements" aria-labelledby="st-h">
			<h2 id="st-h" class="label-strip">Witness statements</h2>
			<div class="st-row">
				{#each testimonials as t, n}
					<article class="sheet pinned" style={`--r:${alternatingTilt(n, 1.2, -1)}deg`}>
						<header>
							<img src={`/testimonials/${t.avatar}`} alt="" width="56" height="56" />
							<dl>
								<div>
									<dt>Witness</dt>
									<dd>{t.name}</dd>
								</div>
								<div>
									<dt>Position</dt>
									<dd>{t.position}, {t.company}</dd>
								</div>
							</dl>
						</header>
						<blockquote>{t.text}</blockquote>
						{#if t.linkedin}<a href={t.linkedin} target="_blank" rel="noopener noreferrer"
								>Verify on LinkedIn <ArrowUpRight size={14} aria-hidden="true" /></a
							>{/if}
					</article>
				{/each}
			</div>
		</section>

		<!-- CONTACT -->
		<section id="contact" class="found" aria-labelledby="found-h">
			<div class="sheet pinned contact" style="--r:-0.8deg">
				<h2 id="found-h">If found, contact</h2>
				<ul>
					<li>
						<span>Email</span><a href={links.mailto}
							><Mail size={17} aria-hidden="true" /> {links.email}</a
						>
					</li>
					<li>
						<span>GitHub</span><a href={links.github} target="_blank" rel="noopener noreferrer"
							><Github size={17} aria-hidden="true" /> AlsoKnownAs-Ax</a
						>
					</li>
					<li>
						<span>LinkedIn</span><a href={links.linkedin} target="_blank" rel="noopener noreferrer"
							><Linkedin size={17} aria-hidden="true" /> Andrei Alexandru Amzu</a
						>
					</li>
					<li>
						<span>Resume</span><a href={person.resume} download={person.resumeName}
							><Download size={17} aria-hidden="true" /> Alex_Amzu_Resume.pdf</a
						>
					</li>
				</ul>
				<span class="stamp" aria-hidden="true">Cleared<br />for contact</span>
			</div>
			<p class="fine">© {new Date().getFullYear()} Alex Amzu</p>
		</section>
	</main>
</div>

<style>
	.wall {
		overflow-x: clip;
		--wall: #262c2b;
		--cork: #a67c4f;
		--paper: #eceee9;
		--card: #fbfbf8;
		--manila: #e7dfca;
		--ink: #17191b;
		--faint: #4f555a;
		--rule: #b9beb8;
		--red: #b3121f;
		--string: #c4161c;
		--row: 24px;
		background: var(--wall);
		color: var(--ink);
		min-height: 100vh;
		padding: 0 clamp(8px, 2vw, 28px) 88px;
		font-family: 'Courier Prime', 'Courier New', monospace;
		font-size: 16px;
		line-height: 1.5;
	}
	.wall :global(*::selection) {
		background: var(--red);
		color: #fff;
	}
	.wall :global(a:focus-visible),
	.wall :global(button:focus-visible) {
		outline: 3px dashed var(--red);
		outline-offset: 3px;
	}
	.wall a {
		text-underline-offset: 4px;
		text-decoration-thickness: 1.5px;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	.skip-link {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 30;
		padding: 12px 18px;
		background: var(--paper);
		color: var(--ink);
		transform: translateY(-150%);
	}
	.skip-link:focus {
		transform: translateY(0);
	}

	.rail {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		gap: 10px;
		justify-content: center;
		max-width: 1440px;
		margin: 0 auto;
		padding: 24px 20px 0;
		background: var(--wall);
	}
	.rail::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 14px;
		background: #4b3423;
	}
	.rail a {
		position: relative;
		z-index: 1;
		min-height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Big Shoulders Stencil Display', sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-size: 22px;
		color: var(--ink);
		text-decoration: none;
		padding: 12px 28px 16px;
		background: var(--manila);
		border: 1px solid #4b3423;
		border-bottom: 0;
		border-radius: 9px 9px 0 0;
		box-shadow: 0 -2px 8px rgb(0 0 0 / 0.16);
		transition:
			background 150ms,
			color 150ms;
	}
	.rail a:hover {
		background: var(--card);
		color: var(--red);
	}
	.rail a[aria-current='location'] {
		background: var(--red);
		color: #fff;
	}
	.wall .rail a:focus-visible {
		outline-color: var(--paper);
		outline-offset: -5px;
	}
	section[id] {
		scroll-margin-top: 110px;
	}

	.cork {
		max-width: 1440px;
		margin: 0 auto;
		padding: clamp(20px, 3vw, 44px);
		border: 14px solid #4b3423;
		border-radius: 4px;
		background-color: var(--cork);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .25 0 0 0 0 .15 0 0 0 0 .05 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		box-shadow:
			inset 0 0 40px rgb(0 0 0 / 0.35),
			inset 0 0 0 1px rgb(0 0 0 / 0.4),
			0 20px 50px -20px rgb(0 0 0 / 0.8);
	}

	/* pins and paper */
	.pinned {
		position: relative;
		transform: rotate(var(--r, 0deg));
		box-shadow:
			0 1px 2px rgb(0 0 0 / 0.25),
			0 10px 18px -8px rgb(0 0 0 / 0.5);
	}
	.pinned::before,
	.dymo::before {
		content: '';
		position: absolute;
		top: -5px;
		left: 50%;
		width: 16px;
		height: 16px;
		margin-left: -8px;
		z-index: 3;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #ff7a7a, var(--red) 55%, #6d0a12);
		box-shadow: 1px 3px 3px rgb(0 0 0 / 0.45);
	}
	.sheet {
		background-color: var(--paper);
		padding: 24px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	h1,
	h2,
	h3 {
		font-family: 'Big Shoulders Stencil Display', sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		line-height: 0.9;
		margin: 0;
		letter-spacing: 0.005em;
	}

	/* board */
	.board {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr) minmax(0, 1fr);
		gap: clamp(20px, 3vw, 48px);
		align-items: start;
	}
	.strings {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: visible;
	}
	.strings path {
		fill: none;
		stroke: var(--string);
		stroke-width: 2;
		stroke-linecap: round;
		opacity: 0.8;
		filter: drop-shadow(1px 4px 1.5px rgb(0 0 0 / 0.35));
		stroke-dasharray: 1;
		animation: draw 900ms cubic-bezier(0.65, 0, 0.35, 1) both;
		animation-delay: calc(300ms + var(--n) * 45ms);
		transition:
			opacity 200ms,
			stroke-width 200ms;
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
	.strings path.on {
		opacity: 1;
		stroke-width: 3;
	}
	.strings path.dim {
		opacity: 0.12;
	}
	.col,
	.title,
	.tools {
		position: relative;
		z-index: 1;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 34px;
		padding-top: 20px;
	}

	/* index cards: text sits on the ruled lines */
	.index {
		--top: 64px;
		padding: 16px 20px var(--row);
		font-size: 15px;
		line-height: var(--row);
		background-color: var(--card);
		background-image:
			linear-gradient(var(--card) calc(var(--top) - 5px), transparent 0),
			repeating-linear-gradient(
				transparent 0 calc(var(--row) - 1px),
				#c9dbe8 calc(var(--row) - 1px) var(--row)
			);
		background-position:
			0 0,
			0 calc(var(--top) - 5px);
		transition:
			box-shadow 220ms,
			opacity 200ms;
	}
	.index h3 {
		position: relative;
		font-size: 1.9rem;
		line-height: var(--row);
		margin-bottom: var(--row);
	}
	.index h3::after {
		content: '';
		position: absolute;
		left: -20px;
		right: -20px;
		bottom: -13px;
		height: 2px;
		background: #e2898e;
	}
	.index p {
		margin: 0;
	}
	.index.lit {
		z-index: 4;
		box-shadow:
			0 1px 2px rgb(0 0 0 / 0.25),
			0 22px 30px -10px rgb(0 0 0 / 0.6);
	}
	.index.dim {
		opacity: 0.55;
	}
	.tech {
		font-size: 12.5px;
		color: var(--faint);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.links {
		display: flex;
		gap: 18px;
	}
	.links a,
	.found a,
	.statements a {
		color: var(--ink);
		font-weight: 700;
		display: inline-flex;
		gap: 4px;
		align-items: center;
	}
	.links a:hover,
	.found a:hover,
	.statements a:hover {
		color: var(--red);
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 30px;
	}
	.title {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 132px;
		column-gap: 20px;
	}
	.case-no {
		margin: 0 0 6px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 12px;
		color: var(--faint);
	}
	h1 {
		font-size: clamp(3rem, 5vw, 4.6rem);
	}
	.role {
		margin: 10px 0 0;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 14px;
		line-height: 1.45;
	}
	.mug {
		position: relative;
		margin: 4px 0 0;
		padding: 7px 7px 18px;
		background: #fff;
		transform: rotate(3deg);
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.25);
		align-self: start;
	}
	.mug img {
		display: block;
		width: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		object-position: 40% 30%;
		filter: grayscale(1) contrast(1.15);
	}
	.clip {
		position: absolute;
		top: -22px;
		left: 14px;
		width: 20px;
	}
	.intro {
		grid-column: 1 / -1;
		margin: 18px 0 0;
	}
	.actions {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 18px;
	}
	.stamp-btn,
	.plain-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		text-transform: uppercase;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 10px 14px;
		font-size: 14px;
		transition:
			background 150ms,
			color 150ms;
	}
	.stamp-btn {
		color: var(--red);
		border: 3px double var(--red);
	}
	.stamp-btn:hover {
		background: var(--red);
		color: #fff;
	}
	.plain-btn {
		color: var(--ink);
		border: 2px solid var(--ink);
	}
	.plain-btn:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.tools {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}
	.tags {
		list-style: none;
		padding: 8px 0 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 18px 14px;
	}
	.dymo {
		all: unset;
		cursor: pointer;
		position: relative;
		display: inline-block;
		transform: rotate(var(--r));
		background: #141516;
		color: #f2f2f2;
		padding: 7px 13px 6px;
		border-radius: 3px;
		font-family: 'Courier Prime', monospace;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		font-size: 14px;
		text-shadow: 0 1px 0 rgb(255 255 255 / 0.25);
		box-shadow: 0 6px 10px -4px rgb(0 0 0 / 0.6);
		transition:
			background 180ms,
			opacity 180ms,
			box-shadow 180ms;
	}
	.dymo::before {
		width: 12px;
		height: 12px;
		margin-left: -6px;
		top: -6px;
	}
	.dymo.lit {
		background: var(--red);
		box-shadow: 0 10px 16px -6px rgb(0 0 0 / 0.7);
	}
	.dymo.dim {
		opacity: 0.45;
	}
	.dymo[aria-pressed='true'] {
		outline: 2px solid #f2f2f2;
		outline-offset: -5px;
	}
	.dymo:focus-visible {
		outline: 3px dashed #f2f2f2;
		outline-offset: 3px;
	}
	.hint {
		margin: 0;
		color: #24170b;
		font-size: 13.5px;
		font-style: italic;
		text-align: center;
		max-width: 34ch;
	}
	.coarse-pointer {
		display: none;
	}
	@media (hover: none) {
		.fine-pointer {
			display: none;
		}
		.coarse-pointer {
			display: inline;
		}
	}

	/* postings */
	.label-strip {
		display: inline-block;
		background: #141516;
		color: #f2f2f2;
		font-size: 1.6rem;
		padding: 7px 16px 5px;
		margin: 0 0 32px;
		transform: rotate(-1deg);
		letter-spacing: 0.06em;
	}
	.postings,
	.statements,
	.found {
		margin-top: clamp(64px, 8vw, 104px);
	}
	.line {
		position: relative;
		list-style: none;
		padding: 26px 0 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 18px;
		align-items: start;
	}
	.line::before {
		content: '';
		position: absolute;
		left: -10px;
		right: -10px;
		top: 16px;
		height: 2px;
		background: var(--string);
		box-shadow: 0 3px 2px rgb(0 0 0 / 0.3);
	}
	.tag-card {
		background: var(--manila);
		padding: 22px 16px 18px;
		font-size: 14.5px;
		line-height: 1.5;
	}
	.tag-card .when {
		margin: 0 0 6px;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--faint);
	}
	.tag-card h3 {
		font-size: 1.8rem;
		line-height: 0.95;
	}
	.what {
		margin: 6px 0 10px;
		font-weight: 700;
	}
	.desc {
		margin: 0;
	}
	.current {
		position: absolute;
		right: -8px;
		top: 14px;
		transform: rotate(8deg);
		font-family: 'Big Shoulders Stencil Display', sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--red);
		border: 3px solid var(--red);
		padding: 1px 8px;
		font-size: 15px;
		background: rgb(231 223 202 / 0.7);
	}
	.classified {
		position: relative;
		padding: 10px 0;
	}
	.blackout {
		display: flex;
		flex-direction: column;
		gap: 7px;
		margin: 0;
		filter: blur(2px);
		opacity: 0.6;
	}
	.blackout span {
		display: block;
		height: 1.05em;
		background: var(--ink);
	}
	.classified-stamp {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-10deg);
		font-family: 'Big Shoulders Stencil Display', sans-serif;
		font-weight: 900;
		font-size: 26px;
		line-height: 1;
		letter-spacing: 0.06em;
		color: var(--red);
		border: 4px double var(--red);
		padding: 6px 10px;
		background: var(--manila);
		white-space: nowrap;
	}

	.st-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		gap: 36px;
		align-items: start;
	}
	.statements header {
		display: flex;
		gap: 16px;
		align-items: center;
		padding-bottom: 14px;
		border-bottom: 1px dashed var(--rule);
	}
	.statements img {
		width: 56px;
		height: 56px;
		object-fit: cover;
		filter: grayscale(1) contrast(1.1);
		border: 3px solid #fff;
		box-shadow: 0 2px 5px rgb(0 0 0 / 0.3);
		transform: rotate(-3deg);
	}
	.statements dl {
		margin: 0;
		font-size: 14px;
	}
	.statements dl div {
		display: grid;
		grid-template-columns: 88px 1fr;
	}
	.statements dt {
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--faint);
	}
	.statements dd {
		margin: 0;
		font-weight: 700;
	}
	.statements blockquote {
		margin: 14px 0 14px;
		max-width: 68ch;
	}

	.found {
		display: grid;
		justify-items: center;
	}
	.contact {
		width: min(660px, 100%);
		padding: 28px 30px;
	}
	.contact h2 {
		font-size: clamp(2.4rem, 5vw, 3.6rem);
		color: var(--red);
		margin-bottom: 16px;
	}
	.contact ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.contact li {
		display: grid;
		grid-template-columns: 100px 1fr;
		align-items: center;
		padding: 10px 0;
		border-top: 1px solid var(--ink);
	}
	.contact li span {
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 12.5px;
		color: var(--faint);
	}
	.contact a {
		gap: 10px;
		word-break: break-all;
	}
	.contact .stamp {
		position: absolute;
		right: -18px;
		bottom: -28px;
		transform: rotate(-12deg);
		font-family: 'Big Shoulders Stencil Display', sans-serif;
		font-weight: 900;
		text-transform: uppercase;
		font-size: 24px;
		line-height: 0.95;
		text-align: center;
		color: var(--red);
		border: 4px solid var(--red);
		padding: 6px 12px;
		background: rgb(236 238 233 / 0.7);
	}
	.fine {
		color: #24170b;
		font-size: 13px;
		margin-top: 44px;
	}

	@media (max-width: 1180px) {
		.line {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (max-width: 900px) {
		.rail {
			gap: 5px;
			padding: 12px 8px 0;
		}
		.rail::after {
			height: 8px;
		}
		.rail a {
			flex: 1;
			min-width: 0;
			min-height: 48px;
			padding: 10px 6px 13px;
			font-size: 16px;
			letter-spacing: 0.015em;
			border-radius: 6px 6px 0 0;
		}
		.cork {
			border-width: 8px;
			padding: 18px 14px 28px;
		}
		.board {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.center {
			order: -1;
		}
		.strings {
			display: none;
		}
		.col {
			padding-top: 0;
			gap: 28px;
		}
		.title {
			grid-template-columns: minmax(0, 1fr) 96px;
			padding: 20px;
		}
		.line {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.line::before {
			display: none;
		}
		.contact li {
			grid-template-columns: 1fr;
			gap: 2px;
		}
		.contact .stamp {
			right: 4px;
			bottom: -34px;
			font-size: 20px;
		}
	}
	@media (max-width: 480px) {
		.tag-card,
		.index {
			transform: rotate(calc(var(--r) / 2));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.strings path {
			animation: none;
			stroke-dasharray: none;
		}
		.index,
		.dymo,
		.strings path,
		.rail a {
			transition: none;
		}
	}
</style>
