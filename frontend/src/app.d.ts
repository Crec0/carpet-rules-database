// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare interface Umami {
		track: (event?: string, data?: Record<string, any>) => void
	}

	declare interface Window {
		umami: Umami;
	}
}

export {};
