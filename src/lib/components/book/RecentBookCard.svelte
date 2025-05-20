<script lang="ts">    
    import { BookOpen,Heart } from 'lucide-svelte';
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import ReadingProgress from '$lib/components/book/ReadingProgress.svelte';
	  import { cn } from '$lib/utils.js';

    export let coverUrl: string;
    export let title: string;
    export let author: string;
    export let lastUpdated: string;
    export let noteCount: number;
    export let isFavorite: boolean = false;
    export let className = "";    
    export let currentPage: number = 0;
    export let totalPages: number = 0;

    const hasProgress = currentPage > 0 && totalPages > 0;
</script>

<Card.Root class={cn("overflow-hidden", className)}>
    <Card.Header class="p-0">
      <div class="relative h-[200px] w-full bg-gray-50">
        <img 
          src={coverUrl || "/placeholder.svg"} 
          alt={title} 
          class="object-contain w-full h-full" 
        />
        <Button
          size="icon"
          class="absolute top-2 right-2 bg-white hover:bg-theme-brown backdrop-blur-xs rounded-full"
          aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          <Heart class={cn("h-4 w-4", isFavorite && "fill-theme-brown text-theme-brown")} />
        </Button>       
      </div>
     
    </Card.Header>
    <Card.Content class="p-4">    
      <div class="space-y-1.5">        
        <a
          href={`/books/${encodeURIComponent(title)}`}
          class="font-semibold hover:text-theme-brown transition-colors line-clamp-1"
        >
          {title}
      </a>
        <p class="text-sm text-muted-foreground">{author}</p>
        {#if hasProgress}                
          <ReadingProgress currentPage={currentPage} totalPages={totalPages} size="sm" showText={false} />        
          <div class="flex justify-between items-center text-xs text-muted-foreground mt-1">
            <span>
              {#if currentPage === 0}
                읽기 전
              {:else if currentPage >= totalPages}
                완독
              {:else}
                {Math.round((currentPage / totalPages) * 100)}% 
              {/if}
            </span>
            {#if currentPage > 0 && currentPage < totalPages}
              <span>
                {currentPage}/{totalPages}p
              </span>
            {/if}
          </div>
        {/if}
      </div>
    </Card.Content>
    <Card.Footer class="p-4 pt-0 flex justify-between items-center">
      <p class="text-xs text-muted-foreground">{lastUpdated}</p>
      <Badge class="bg-theme-gold hover:bg-theme-gold/90">노트 {noteCount}개</Badge>
    </Card.Footer>
  </Card.Root>
