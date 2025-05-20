<script lang="ts">
    import { cn } from "$lib/utils.js";
    import { Badge } from "$lib/components/ui/badge/index.js";

    export let name: string;
    export let size: "sm" | "md" = "md";
    export let isSelected = false;
    export let onclick: () => void;
</script>

<Badge
    variant="outline"
    class={cn(
        "cursor-pointer transition-colors",
        size === "sm" ? "text-xs py-0 px-2" : "text-sm",
        isSelected
            ? "bg-theme-gold text-theme-black hover:bg-theme-gold/90"
            : "hover:bg-theme-gold hover:text-theme-black hover:border-theme-gold"
    )}
    onclick={onclick}
>
    {name}
</Badge>
