<script lang="ts">
  import { cn } from "$lib/utils/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  export let className: string = ""
  export let variant: "default" | "destructive" = "default"

  const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

<div
  class={cn(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    variant === "destructive" && "destructive group border-destructive bg-destructive text-destructive-foreground",
    className
  )}
  {...props}
>
  <slot />
</div> 