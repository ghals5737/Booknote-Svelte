<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";    
    import { cn } from '$lib/utils.js';   

    export let title: string;
    export let value: string;
    export let description: string;
    export let trend: "increase" | "decrease" | "neutral" = "neutral";
    export let className = "";
</script>

<Card.Root class={cn("", className)}>
    <Card.Header class="flex flex-row items-center justify-between pb-2">
      <Card.Title class="text-sm font-medium">{title}</Card.Title>
      <icon class="h-4 w-4 text-muted-foreground"></icon>
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">{value}</div>
      {#if description}
        <Card.Description class={cn("mt-1", trend === "increase" && "text-green-600", trend === "decrease" && "text-red-600")}>
          {description}
        </Card.Description>
      {/if}
    </Card.Content>
  </Card.Root>
