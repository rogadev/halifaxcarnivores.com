<script lang="ts">
	export let title: string;
	export let description: string;
	export let date: string;
	export let datetime: string;
	export let link: string;
	export let author: { name: string; title: string; image: string };
	export let categories: { title: string; link: string; primary?: boolean }[];

	$: primaryCategory = categories.find((category) => category.primary);
</script>

<article class="flex max-w-xl flex-col items-start justify-between">
	<div class="flex items-center gap-x-4 text-xs">
		<time {datetime} class="text-gray-500">{date}</time>
		{#if primaryCategory}
			<a
				href={primaryCategory.link}
				class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
				>{primaryCategory.title}</a
			>
		{/if}
	</div>
	<div class="group relative">
		<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
			<a href={link}>
				<span class="absolute inset-0" />
				{title}
			</a>
		</h3>
		<p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
			{description}
		</p>
	</div>
	<div class="relative mt-8 flex items-center gap-x-4">
		<img src={author.image} alt="" class="h-10 w-10 rounded-full bg-gray-50" />
		<div class="text-sm leading-6">
			<p class="font-semibold text-gray-900">
				<span class="absolute inset-0" />
				{author.name}
			</p>
			<p class="text-gray-600">{author.title}</p>
		</div>
	</div>
</article>
