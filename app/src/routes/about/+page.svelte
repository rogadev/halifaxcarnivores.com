<script lang="ts">
	import Link from '$lib/components/LinkText.svelte';
	import { text } from '@sveltejs/kit';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="bg-white px-6 py-32 lg:px-8">
	<div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
		<p class="text-base font-semibold leading-7 text-indigo-600">Introducing</p>
		<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			Halifax Carnivores
		</h1>
		<p class="mt-6 text-xl leading-8">
			At Halifax Carnivores, we're passionate about bringing the fascinating world of carnivorous
			plants to Nova Scotia. Our mission is to provide plant enthusiasts and curious minds alike
			with an extraordinary selection of carnivorous wonders. From the iconic Venus Flytrap to rare
			and exotic pitcher plants, we're your go-to destination for these captivating botanical
			treasures.
		</p>
		<div class="mt-10">
			<p>
				Discover a diverse range of carnivorous plant species at Halifax Carnivores. Our collection
				includes the Venus flytrap, stunning pitcher plants, tropical and temperate sundews with
				their delicate dew-covered tentacles, and more. Whether you're a seasoned carnivorous plant
				collector or a newcomer, we offer plants suitable for all levels of expertise. Our plants
				are not only beautiful but also serve as natural pest control in your home or garden.
				Explore the intriguing world of these botanical marvels with Halifax Carnivores.
			</p>
			<ul role="list" class="mt-8 max-w-3xl space-y-8 text-gray-600">
				<li class="flex gap-x-3">
					<svg
						class="mt-1 h-5 w-5 flex-none text-indigo-600"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
					<span
						><strong class="font-semibold text-gray-900">Nepenthes.</strong> Commonly known as tropical
						pitcher plants, Nepenthes are captivating and otherworldly carnivorous plants that add a
						touch of exotic allure to any plant collection.</span
					>
				</li>
				<li class="flex gap-x-3">
					<svg
						class="mt-1 h-5 w-5 flex-none text-indigo-600"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
					<span
						><strong class="font-semibold text-gray-900">Drosera.</strong> Also known as sundew plants,
						Drosera captivate with their delicate, dewy tentacles that charm and trap insects. A mesmerizing
						blend of elegance and nature's ingenious design.</span
					>
				</li>
				<li class="flex gap-x-3">
					<svg
						class="mt-1 h-5 w-5 flex-none text-indigo-600"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
							clip-rule="evenodd"
						/>
					</svg>
					<span
						><strong class="font-semibold text-gray-900">Venus Fly Traps.</strong> Nature's cunning predators,
						Venus Fly Traps intrigue with their iconic snap-trap mechanism. These captivating plants
						effortlessly charm and capture insects, offering a mesmerizing blend of nature's elegance
						and ingenuity.</span
					>
				</li>
			</ul>
			<p class="mt-8">
				Currently, you can explore our captivating carnivorous plant collection
				<Link href="/shop">right here</Link> on our website. To make a purchase, simply
				<Link href="/contact">give us a call or send us an email</Link>, and our knowledgeable team
				will be delighted to assist you. Stay tuned, as we're actively working on an online store
				for your convenience, where you'll soon be able to browse and buy these botanical wonders
				with just a few clicks.
			</p>
			<h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
				Helping beginners grow beautiful exotics
			</h2>
			<p class="mt-6">
				At Halifax Carnivores, we're here to support you every step of the way on your exciting
				botanical adventure. Whether you're just starting or have a budding interest in carnivorous
				plants, we've got your back. Our commitment is to provide you with the knowledge and
				guidance you need to not only keep your new plants alive but to thrive in cultivating them.
				You'll find resources, care guides, and expert insights to demystify the process. With
				Halifax Carnivores as your trusted companion, you'll have the confidence to embrace the
				beauty and intrigue of these plants and succeed on your unique botanical journey.
			</p>
			<!-- <figure class="mt-10 border-l border-indigo-600 pl-9">
				<blockquote class="font-semibold text-gray-900">
					<p>
						“Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh
						ullamcorper ac dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget
						cras. Sem volutpat enim tristique.”
					</p>
				</blockquote>
				<figcaption class="mt-6 flex gap-x-4">
					<img
						class="h-6 w-6 flex-none rounded-full bg-gray-50"
						src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					/>
					<div class="text-sm leading-6">
						<strong class="font-semibold text-gray-900">Maria Hill</strong> – Marketing Manager
					</div>
				</figcaption>
			</figure> -->
			<p class="mt-10">
				If you have questions or need assistance, don't hesitate to reach out. Simply head over to
				our <Link href="/contact">Contact Page</Link>, and we'll be delighted to provide you with
				the support and information you need to nurture your carnivorous plants successfully. Your
				botanical journey is important to us, and we're here to help in any way we can.
			</p>
		</div>
		<!-- <figure class="mt-16">
			<img
				class="aspect-video rounded-xl bg-gray-50 object-cover"
				src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
				alt=""
			/>
			<figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
				<svg
					class="mt-0.5 h-5 w-5 flex-none text-gray-300"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
						clip-rule="evenodd"
					/>
				</svg>
				Faucibus commodo massa rhoncus, volutpat.
			</figcaption>
		</figure> -->
		<div class="mt-16 max-w-2xl">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900">
				Everything you need to get up and running
			</h2>
			<p class="mt-6">
				At Halifax Carnivores, we've got your complete botanical toolkit covered. Alongside our
				stunning carnivorous plant selection, we offer a range of essential supplies to ensure your
				success as a carnivorous plant enthusiast. From pots and peat moss to long fiber sphagnum
				moss and perlite, you'll find everything you need to create the perfect environment for your
				exotic carnivorous plants to thrive. We're your one-stop destination for both these
				captivating botanical wonders and the tools to help you nurture them. Your journey into the
				world of carnivorous plants starts right here, with all the essentials at your fingertips.
			</p>
			<p class="mt-8">
				If you're eager to acquire the essential supplies for your carnivorous plant collection,
				head over to our <Link href="/contact">Contact Page</Link>. There, you can inquire about and
				purchase all the items mentioned above, ensuring you have everything you need to create the
				ideal environment for these fascinating plants. Don't wait — start building your botanical
				toolkit today!
			</p>
		</div>
	</div>
</div>
