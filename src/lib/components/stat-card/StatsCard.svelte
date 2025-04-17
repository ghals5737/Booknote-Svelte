<script lang="ts">
    import Card from '$lib/components/ui/card/Card.svelte';
    import CardContent from '$lib/components/ui/card/CardContent.svelte';
    import CardDescription from '$lib/components/ui/card/CardDescription.svelte';
    import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
    import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
    import { cn } from '$lib/utils/utils.js';
    import { Icon } from 'lucide-svelte';

    export let title: string;
    export let value: string;
    export let description: string;
    export let trend: "increase" | "decrease" | "neutral" = "neutral";
    export let className = "";
    export let icon: Icon;
</script>

<Card class={cn("", className)}>
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="text-sm font-medium">{title}</CardTitle>
      <icon class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{value}</div>
      {#if description}
        <CardDescription class={cn("mt-1", trend === "increase" && "text-green-600", trend === "decrease" && "text-red-600")}>
          {description}
        </CardDescription>
      {/if}
    </CardContent>
  </Card>
