<script>
	import '../app.postcss';
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="min-h-full">
	<Navbar />
	<main class="min-h-[100vh]">
		{@render children?.()}
	</main>
	<Footer />
	<Toast />
</div>
