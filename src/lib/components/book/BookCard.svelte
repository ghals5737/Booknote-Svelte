<script lang="ts">
    import { Star } from "lucide-svelte";
    import CircularProgress from "../ui/progress/CircularProgress.svelte";
    
    export let book;
  </script>
  
<a href={`/books/${book.id}`} class="block h-full">
  <div class="overflow-hidden transition-all duration-200 hover:shadow-md h-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
    <div class="relative pt-[60%] bg-[#F5F5DC]">
      <img
        src={book.cover || "/placeholder.svg"}
        alt={book.title}
        class="absolute inset-0 object-cover w-full h-full p-2"
      />
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="font-semibold text-lg line-clamp-1 mb-1">{book.title}</h3>
      <p class="text-sm text-muted-foreground mb-2">{book.author}</p>
      
      <div class="flex items-center mb-3">
        {#each Array(5) as _, i}
          <Star class="h-3 w-3 {i < book.rating ? 'fill-current text-[#8B4513]' : 'text-muted-foreground'}" />
        {/each}
      </div>
      
      <div class="mt-auto flex items-center justify-between">
        <div class="text-sm">
          <p class="text-muted-foreground">
            {book.currentPage} / {book.totalPages}
          </p>
        </div>
        <CircularProgress value={book.progress} size={36} />
      </div>
    </div>
  </div>
</a>
  