<script>
	import '../app.postcss';
	import Navbar from './Navbar.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="min-h-full">
	<Navbar />
	<slot />
	<Footer />
</div>
