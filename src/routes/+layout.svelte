<script lang="ts">
	import { Navbar } from '$lib/components/root-sections';
	import '../app.css';
	let { children } = $props();
</script>

<main>
	<Navbar />
	{@render children()}
</main>
