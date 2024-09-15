// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Product {
		id: number;
		name: string;
		species: string;
		href: string;
		imgSrc: string;
		imgAlt: string;
		priceLow?: number;
		priceHigh?: number;
		stock: number;
		bannerText?: string;
		bannerColor?: string;
		onSale?: boolean;
		salePrice?: number;
	}
}

export { };
