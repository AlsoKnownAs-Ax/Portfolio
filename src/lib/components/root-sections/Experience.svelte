<script lang="ts">
	import ExperienceCard from '$lib/components/experience-card.svelte';
</script>

<section class="bg-muted/40 py-20">
	<div class="container px-4 md:px-6">
		<div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
			<p class="max-w-[85%] text-muted-foreground md:text-xl">
				My professional journey and work experience.
			</p>
		</div>
		<div class="mx-auto grid max-w-4xl gap-6 py-12 md:grid-cols-2">
			<ExperienceCard
				company="Tech Innovations Inc."
				role="Senior Software Engineer"
				period="2021 - Present"
				description="Lead developer for the company's flagship product. Architected and implemented new features, improved performance, and mentored junior developers."
			/>
			<ExperienceCard
				company="Digital Solutions LLC"
				role="Software Engineer"
				period="2018 - 2021"
				description="Developed and maintained multiple client projects. Worked on both frontend and backend systems, implemented CI/CD pipelines, and improved code quality."
			/>
			<ExperienceCard
				company="StartupX"
				role="Frontend Developer"
				period="2016 - 2018"
				description="Built responsive web applications using React. Collaborated with designers to implement UI/UX improvements and optimize user flows."
			/>
			<ExperienceCard
				company="University of Technology"
				role="Computer Science, BSc"
				period="2012 - 2016"
				description="Graduated with honors. Specialized in software engineering and data structures. Completed a thesis on optimizing database queries for large datasets."
			/>
		</div>
	</div>
</section>
