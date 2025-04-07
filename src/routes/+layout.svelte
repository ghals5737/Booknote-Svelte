<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import { BookOpen, Menu, Search } from 'lucide-svelte';
	import { fly } from "svelte/transition";
	
	let isMenuOpen = false;
	
	const navItems = [
	  {
		name: "Dashboard",
		href: "/dashboard",
		icon: "Home",
	  },
	  {
		name: "My Books",
		href: "/books",
		icon: "BookOpen",
	  },	  
	  {
		name: "Notes",
		href: "/notes",
		icon: "BookmarkPlus",
	  },
	  {
		name: "Categories",
		href: "/categories",
		icon: "Tag",
	  },
	  {
		name: "Statistics",
		href: "/statistics",
		icon: "BarChart2",
	  },
	];
	
	function toggleMenu() {
	  isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
	  isMenuOpen = false;
	}
</script>
  
  <div class="flex min-h-screen flex-col">
	<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	  <div class="container mx-auto flex h-16 items-center">
		<div class="mr-4 hidden md:flex">
		  <a href="/" class="mr-6 flex items-center space-x-2">
			<BookOpen class="h-6 w-6 text-[#54A6E1]" />
			<span class="font-bold text-xl text-[#54A6E1]">BookNote</span>
		  </a>
		  <nav class="flex items-center space-x-6 text-sm font-medium">
			{#each navItems as item}
			  <a
				href={item.href}
				class="flex items-center text-sm font-semibold transition-colors hover:text-[#54A6E1] {$page.url.pathname === item.href ? 'text-[#54A6E1] font-semibold' : 'text-muted-foreground'}"
			  >
				<!-- {#await import(`lucide-svelte`) then module}
					<svelte:component this={module[item.icon]} class="mr-2 h-4 w-4" />
				{/await} -->				
				{item.name}
			  </a>
			{/each}
		  </nav>
		</div>
		
		<button class="md:hidden mr-2" on:click={toggleMenu}>
		  <Menu class="h-5 w-5" />
		  <span class="sr-only">Toggle menu</span>
		</button>
		
		<a href="/" class="mr-6 flex items-center space-x-2 md:hidden">
		  <BookOpen class="h-6 w-6 text-[#54A6E1]" />
		  <span class="font-bold text-xl text-[#54A6E1]">BookNote</span>
		</a>
		
		<div class="flex flex-1 items-center justify-end space-x-4">
		  <div class="w-full flex-1 md:w-auto md:flex-none">
			<button class="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
			  <Search class="h-4 w-4" />
			  <span class="sr-only">Search</span>
			</button>
		  </div>
		</div>
	  </div>
	</header>
	
	{#if isMenuOpen}
	  <div
		class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
		on:click={closeMenu}
		transition:fly={{ x: -100, duration: 250 }}
	  >
		<div
		  class="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg"
		  on:click|stopPropagation={() => {}}
		>
		  <a href="/" class="flex items-center space-x-2">
			<BookOpen class="h-6 w-6 text-[#54A6E1]" />
			<span class="font-bold text-xl text-[#54A6E1]">BookNote</span>
		  </a>
		  <nav class="mt-8 flex flex-col space-y-4">
			{#each navItems as item}
			  <a
				href={item.href}
				class="flex items-center py-2 text-base font-medium transition-colors hover:text-[#54A6E1] {$page.url.pathname === item.href ? 'text-[#54A6E1] font-semibold' : 'text-muted-foreground'}"
				on:click={closeMenu}
			  >
				<!-- <svelte:component this={import(`lucide-svelte`).then(m => m[item.icon])} class="mr-3 h-5 w-5" /> -->
				{item.name}
			  </a>
			{/each}
		  </nav>
		</div>
	  </div>
	{/if}
	
	<main class="flex-1">
	  <slot />
	</main>
  </div>

<style lang="postcss">
	@layer base {
		* {
			border-color: hsl(var(--border));
		}

		:global(body) {
			background-color: hsl(var(--background));
			color: hsl(var(--foreground));
		}
	}

	@layer components {
		.container {
			margin-left: auto;
			margin-right: auto;
			padding-left: 1rem;
			padding-right: 1rem;
			max-width: 80rem;
		}
	}
</style>