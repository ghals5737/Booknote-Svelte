<script lang="ts">  
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  const props = $$restProps as HTMLAttributes<HTMLButtonElement>
</script>

<button class={className} {...props}>
  <slot />
</button>