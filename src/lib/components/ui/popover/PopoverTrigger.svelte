<script lang="ts">
  import { open } from "./store.js"
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"
  import Button from "$lib/components/ui/button/Button.svelte"

  export let className: string = ""
  export let asChild = false

  const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

{#if asChild}
  <div
    class={cn("outline-none", className)}
    on:click={() => $open = !$open}
    {...props}
  >
    <slot />
  </div>
{:else}
  <button    
    class={cn("outline-none", className)}
    on:click={() => $open = !$open}
    {...$$restProps}
  >
    <slot />
  </button>
{/if} 