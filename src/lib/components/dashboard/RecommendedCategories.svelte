<script>
    import { Tag } from 'lucide-svelte';
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte";
    import CardTitle from "$lib/components/ui/card/CardTitle.svelte";
    
    export let categories;
  </script>
  
  <Card>
    <CardHeader>
      <CardTitle>Categories</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        {#each categories as category}
          <a 
            href={`/categories/${category.id}`}
            class="flex items-center justify-between p-3 rounded-lg border hover:bg-[#F5F5DC] transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-full bg-[#F5F5DC]">
                <Tag class="h-4 w-4 text-[#8B4513]" />
              </div>
              <span>{category.name}</span>
            </div>
            <span class="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {category.count}
            </span>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
  
  