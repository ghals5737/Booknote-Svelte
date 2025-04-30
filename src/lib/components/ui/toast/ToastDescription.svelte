<script lang="ts">
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""

  const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

<div
  class={cn("text-sm opacity-90", className)}
  {...props}
>
  <slot />
</div> 