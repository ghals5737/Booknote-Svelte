<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { cn } from "$lib/utils/utils.js";

  let className = "";
  export { className as class };

  const isOpen = writable(false);
  
  setContext('dropdown', {
    isOpen,
    close: () => {
      $isOpen = false;
    }
  });
</script>

<div class={cn("relative inline-block text-left", className)} {...$$restProps}>
  <slot />
</div> 