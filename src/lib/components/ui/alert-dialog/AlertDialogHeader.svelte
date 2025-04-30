<script lang="ts">
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

<div class={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props}>
  <slot />
</div> 