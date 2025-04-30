<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let open = false
  export let className: string = ""

  const dispatch = createEventDispatcher()
  const props = $$restProps as HTMLAttributes<HTMLDivElement>

  function handleOpenChange(value: boolean) {
    open = value
    dispatch("openChange", { open: value })
  }
</script>

<div
  class={cn("relative z-50", className)}
  {...props}
>
  <slot {open} />
</div> 