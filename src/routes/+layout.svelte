<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";

	import { Book, BookOpen, Home, Library, User } from 'lucide-svelte';
	import { fly } from "svelte/transition";
	import { cn } from "$lib/utils/utils.js";
	import Button from '$lib/components/ui/button/Button.svelte';
	import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
	import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
	import { goto } from "$app/navigation";

	const pathname = $page.url.pathname;

	let isMenuOpen = false;
	
	const navItems = [
		{
		name: "홈",
		href: "/home",
		icon: Home,
		},
		{
		name: "내서제",
		href: "/books",
		icon: Book,
		},
		{
		name: "내 노트",
		href: "/notes",
		icon: BookOpen,
		},
		{
		name: "카테고리",
		href: "/categories",
		icon: Library,
		},
		{
		name: "독서기록",
		href: "/logs",
		icon: Book,
		},
	];
	
	function toggleMenu() {
	  isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
	  isMenuOpen = false;
	}
</script>
<div class="flex flex-col justify-center items-center">
	<header class="sticky top-0 z-50 w-full border-b bg-background">
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
		  <div class="flex items-center gap-6 md:gap-10">
			<a href="/home" class="flex items-center space-x-2">
			  <span class="text-2xl font-bold text-theme-brown">북노트</span>
			</a>
			<nav class="hidden md:flex gap-6">
			  {#each navItems as item}
				<a				 
				  href={item.href}
				  class={cn(
					"flex items-center text-sm font-bold transition-colors hover:text-theme-brown",
					pathname === item.href ? "text-theme-brown" : "text-muted-foreground",
				  )}
				>
				  {item.name}
				</a>
			  {/each}
			</nav>
		  </div>
		  <div class="flex items-center gap-2">
			<Button
				on:click={() => {
					goto('/notes/create');
				}}
				variant="default" class="hidden md:flex bg-theme-brown hover:bg-theme-brown/90 text-white text-sm font-bold">
			  노트 작성하기
			</Button>
			<DropdownMenu>
			  <DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" class="rounded-full" aria-label="프로필 메뉴">
				  <User class="h-5 w-5" />
				</Button>
			  </DropdownMenuTrigger>
			  <DropdownMenuContent align="end" class="border-none z-50 bg-white">
				<DropdownMenuItem asChild class="text-sm font-bold hover:bg-theme-gold">
				  <a href="/profile">프로필</a>
				</DropdownMenuItem>
				<DropdownMenuItem asChild class="text-sm font-bold hover:hover:bg-theme-gold">
				  <a href="/settings">설정</a>
				</DropdownMenuItem>
				<DropdownMenuItem class="text-sm font-bold hover:hover:bg-theme-gold">로그아웃</DropdownMenuItem>
			  </DropdownMenuContent>
			</DropdownMenu>
		  </div>
		</div>
		<nav class="md:hidden flex overflow-auto border-t">		  
		{#each navItems as item}
			<a
			  href={item.href}
			  class={cn(
				"flex flex-1 flex-col items-center justify-center py-2 text-xs font-medium transition-colors hover:text-theme-brown",
				pathname === item.href ? "text-theme-brown" : "text-muted-foreground",
			  )}
			>
			  <item.icon class="h-5 w-5" />
			  <span>{item.name}</span>
			</a>
		{/each}
		</nav>
	  </header>
	
	<main class="w-full min-h-screen bg-background">
	  <div class="container mx-auto px-4">
		<slot />
	  </div>
	</main>
</div>
<!-- <style lang="postcss">
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
</style> -->