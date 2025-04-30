<script lang="ts">  
  import type { HTMLAttributes } from "svelte/elements"
  import { cn } from "$lib/utils/utils.js"

  export let className: string = ""
  const props = $$restProps as HTMLAttributes<HTMLButtonElement>
</script>

<button class={className} {...props}>
  <slot />
</button>