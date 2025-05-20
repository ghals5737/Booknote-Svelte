import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(),sveltekit()],
	optimizeDeps: {
		include: ['tagcloud']
	},
	preview: {
		allowedHosts: ['booknote.site', 'registry.booknote.site']
	}
});
