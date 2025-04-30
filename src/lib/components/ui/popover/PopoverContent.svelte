<script lang="ts">
  import { open } from "./store.js"
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  export const align: "start" | "center" | "end" = "center"
  export const side: "top" | "right" | "bottom" | "left" = "bottom"
  export const sideOffset = 0

  const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

{#if $open}
  <div
    class={cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    <slot />
  </div>
{/if} 