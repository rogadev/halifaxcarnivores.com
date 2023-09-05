<script lang="ts">
	import BlogSectionArticle from './BlogSectionArticle.svelte';

	export let articles = [
		{
			title: "The Enchanting World of Drosera: A Beginner's Guide",
			description:
				'Discover the fascinating world of Drosera, also known as sundews, and learn how to care for these insectivorous plants in your own exotic garden.',
			datetime: '2023-09-05',
			date: 'September 5, 2023',
			link: '/blog/the-enchanting-world-of-drosera',
			author: { image: 'img/ryanroga.jpg', name: 'Ryan Roga', title: 'Owner, Halifax Carnivores' },
			categories: [
				{ title: 'Drosera', link: '/category/drosera', primary: true },
				{ title: 'Plant Care Tips', link: '/category/plant-care-tips' }
			]
		},
		{
			title: 'Nurturing Nepenthes: Tips and Tricks for Growing Pitcher Plants',
			description:
				'Explore the captivating Nepenthes species and unlock the secrets to nurturing these magnificent pitcher plants in your exotic plant collection.',
			datetime: '2023-09-12',
			date: 'September 12, 2023',
			link: '/blog/nurturing-nepenthes',
			author: { image: 'img/ryanroga.jpg', name: 'Ryan Roga', title: 'Owner, Halifax Carnivores' },
			categories: [
				{ title: 'Nepenthes', link: '/category/nepenthes', primary: true },
				{ title: 'Exotic Plants', link: '/category/exotic-plants' }
			]
		},
		{
			title: 'Venus Fly Traps: A Comprehensive Care Guide',
			description:
				'Embark on a journey through the care and maintenance of Venus Fly Traps, one of the most famous carnivorous plants, in your very own exotic garden.',
			datetime: '2023-09-19',
			date: 'September 19, 2023',
			link: '/blog/venus-fly-traps-care-guide',
			author: { image: 'img/ryanroga.jpg', name: 'Ryan Roga', title: 'Owner, Halifax Carnivores' },
			categories: [
				{ title: 'Venus Fly Traps', link: '/category/venus-fly-traps', primary: true },
				{ title: 'Plant Care Guide', link: '/category/plant-care-guide' }
			]
		}
	];
</script>

<section id="blog">
	<h2 class="text-3xl mb-4 font-bold">From the blog</h2>
	<p>Dive deep into the world of carnivorous plants with our insightful blog posts...</p>
	<div class="bg-white">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div
				class="mx-auto md:mt-0 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-6 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				{#each articles as article}
					<BlogSectionArticle
						title={article.title}
						description={article.description}
						date={article.date}
						datetime={article.datetime}
						link={article.link}
						author={article.author}
						categories={article.categories}
					/>
				{/each}

				<!-- More posts... -->
			</div>
		</div>
	</div>
</section>
