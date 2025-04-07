<script lang="ts">
    import { BookOpen } from 'lucide-svelte';
    import Card from '$lib/components/ui/card/Card.svelte';
    import CardContent from '$lib/components/ui/card/CardContent.svelte';
    import CircularProgress from '$lib/components/ui/progress/CircularProgress.svelte';
    
    export let book;
  </script>
  
<a href={`/books/${book.id}`}>
  <Card class="h-full hover:shadow-md transition-shadow border-1 border-gray-300">
    <CardContent class="p-4">
      <div class="flex flex-col items-center">
        <div class="relative w-32 h-48 bg-[#FCE0D4] mb-3">
          <img
            src={book.cover || "/placeholder.svg"}
            alt={book.title}
            class="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        
        <div class="text-center mb-2">
          <h3 class="font-bold line-clamp-2">{book.title}</h3>
          <p class="text-sm text-muted-foreground">{book.author}</p>
        </div>
        
        <div class="flex items-center justify-center gap-2 w-full">
          <CircularProgress value={book.progress} size={36}/>
          <div class="text-xs">
            <p class="font-medium">{book.progress}%</p>
            <p class="text-muted-foreground">{book.currentPage}/{book.totalPages}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</a>
  