<script lang="ts">
	import "../app.css";	
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/sidebar/AppSidebar.svelte";
</script>

<Sidebar.Provider>
	<div class="flex min-h-screen w-full bg-background">
	<AppSidebar />	
	<Sidebar.Inset class="flex-1">
		<header class="flex h-16 shrink-0 items-center gap-2 border-b border-secondary glass-effect px-4">
		  <Sidebar.Trigger class="text-foreground hover:bg-secondary rounded-lg transition-all duration-200" />
		  <div class="flex-1" />
		</header>
		<main class="flex-1 overflow-auto bg-content">
			<slot />
		</main>
	  </Sidebar.Inset>
	</div>
</Sidebar.Provider>
