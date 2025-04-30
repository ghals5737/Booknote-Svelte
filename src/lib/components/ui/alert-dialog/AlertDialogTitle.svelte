<script lang="ts">
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  const props = $$restProps as HTMLAttributes<HTMLHeadingElement>
</script>

<h2 class={cn("text-lg font-semibold", className)} {...props}>
  <slot />
</h2> 