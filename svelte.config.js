import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: 'src/lib/components/markdown/MarkdownLayout.svelte'
			},
			smartypants: true,
			highlight: {
				highlighter: (code, lang) => {
					return `<pre class="language-${lang}"><code>${code}</code></pre>`;
				}
			}
		})
	]
};

export default config;
