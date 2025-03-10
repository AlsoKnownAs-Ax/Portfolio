import { readable } from 'svelte/store';

/**
 * A Svelte store to detect if the user is on a mobile device
 * @param breakpoint The max width in pixels to consider a device as mobile (default: 768)
 * @returns A readable store with a boolean value indicating if the user is on a mobile device
 */
export function createIsMobileStore(breakpoint: number = 768) {
	// Create a readable store with an initial value
	return readable(false, (set) => {
		// Skip if we're not in the browser
		if (typeof window === 'undefined') {
			return;
		}

		// Function to update state based on window width
		const checkIsMobile = () => {
			set(window.innerWidth <= breakpoint);
		};

		// Initial check
		checkIsMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkIsMobile);

		// Clean up event listener when store has no more subscribers
		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	});
}

// Create a default store with breakpoint 768px
export const isMobile = createIsMobileStore();
