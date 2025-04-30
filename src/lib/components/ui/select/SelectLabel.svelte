<script lang="ts">
    import { cn } from "$lib/utils/utils.js"
    import type { HTMLAttributes } from "svelte/elements"

    export let className: string = ""
    const props = $$restProps as HTMLAttributes<HTMLDivElement>
</script>

<div class={cn("py-1.5 px-2 text-sm font-semibold", className)} {...props}>
    <slot />
</div> 