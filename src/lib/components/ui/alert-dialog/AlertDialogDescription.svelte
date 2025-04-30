<script lang="ts">
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  const props = $$restProps as HTMLAttributes<HTMLParagraphElement>
</script>

<p class={cn("text-sm text-muted-foreground", className)} {...props}>
  <slot />
</p> 