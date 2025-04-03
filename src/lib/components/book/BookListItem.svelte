<script lang="ts">
    import { Star, MoreHorizontal } from 'lucide-svelte';
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import Button from "$lib/components/ui/button/Button.svelte";
    import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte";
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte";
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte";
    import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte";
    import CircularProgress from "$lib/components/ui/progress/CircularProgress.svelte";
    
    export let book;
    
    // Format date to readable format
    $: formattedDate = new Date(book.lastRead).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  </script>
  
  <a href={`/books/${book.id}`} class="block">
    <Card class="hover:shadow-md transition-shadow">
      <CardContent class="p-0">
        <div class="flex items-start p-4">
          <div class="relative w-16 h-24 bg-[#F5F5DC] flex-shrink-0">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              class="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          
          <div class="ml-4 flex-1 min-w-0">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-lg line-clamp-1">{book.title}</h3>
                <p class="text-sm text-muted-foreground">{book.author}</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" class="h-8 w-8">
                    <MoreHorizontal class="h-4 w-4" />
                    <span class="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Mark as complete</DropdownMenuItem>
                  <DropdownMenuItem>Add to favorites</DropdownMenuItem>
                  <DropdownMenuItem class="text-destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div class="flex items-center mt-1 text-sm">
              <span class="inline-flex items-center rounded-full bg-[#F5F5DC]/50 px-2 py-0.5 text-xs font-medium text-[#8B4513]">
                {book.category}
              </span>
              <span class="mx-2 text-muted-foreground">•</span>
              <span class="text-muted-foreground">Last read: {formattedDate}</span>
            </div>
            
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center">
                {#each Array(5) as _, i}
                  <Star class="h-4 w-4 {i < book.rating ? 'fill-current text-[#8B4513]' : 'text-muted-foreground'}" />
                {/each}
              </div>
              
              <div class="flex items-center gap-3">
                <div class="text-sm text-muted-foreground">
                  {book.currentPage} / {book.totalPages}
                </div>
                <CircularProgress value={book.progress} size={32} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </a>
  
  