<script lang="ts">
  import * as Popper from '@popperjs/core'
  import { cn } from "$lib/utils/utils.js"
  import { onDestroy } from "svelte"
  import { open } from "./store.js"

  export let className: string = ""
  export let align: "start" | "center" | "end" = "center"
  export let side: "top" | "right" | "bottom" | "left" = "bottom"
  export let sideOffset = 0

  let popperInstance: any = null
  let popperRef: HTMLElement
  let popperContent: HTMLElement

  function setRef(node: HTMLElement) {
    popperRef = node
  }

  function setContent(node: HTMLElement) {
    popperContent = node
  }

  $: if (popperRef && popperContent) {
    popperInstance = Popper.createPopper(popperRef, popperContent, {
      placement: `${side}-${align}` as any,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, sideOffset],
          },
        },
      ],
    })
  }

  onDestroy(() => {
    if (popperInstance) {
      popperInstance.destroy()
    }
  })
</script>

<div class={cn("relative", className)}>
  <slot />
</div> 