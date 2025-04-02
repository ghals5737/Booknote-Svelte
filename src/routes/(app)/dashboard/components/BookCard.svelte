<script lang="ts">
    import CircularProgress from "./CircularProgress.svelte";
    
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
        <p class="text-sm text-muted-foreground mb-3">{book.author}</p>
        
        <div class="mt-auto flex items-center justify-between">
          <div class="text-sm">
            <p class="text-muted-foreground">
              {book.currentPage} / {book.totalPages} pages
            </p>
          </div>
          <CircularProgress value={book.progress} size={36} />
        </div>
      </div>
    </div>
  </a>
  
  