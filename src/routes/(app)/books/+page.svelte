<script lang="ts">
  import { Search, Filter, Grid, List, BookOpen, Star, Clock, ChevronDown, Plus } from 'lucide-svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardContent from '$lib/components/ui/card/CardContent.svelte';
  import Input from '$lib/components/ui/input/Input.svelte';
  import Tabs from '$lib/components/ui/tabs/Tabs.svelte';
  import TabsContent from '$lib/components/ui/tabs/TabsContent.svelte';
  import TabsList from '$lib/components/ui/tabs/TabsList.svelte';
  import TabsTrigger from '$lib/components/ui/tabs/TabsTrigger.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
  import BookCard from '$lib/components/book/BookCard.svelte';
  import BookListItem from '$lib/components/book/BookListItem.svelte';
	import { goto } from '$app/navigation';
  
  // Mock data for demonstration
  const books = [
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      progress: 75,
      totalPages: 180,
      currentPage: 135,
      rating: 4,
      category: "Fiction",
      lastRead: "2023-04-15",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      progress: 30,
      totalPages: 281,
      currentPage: 84,
      rating: 5,
      category: "Fiction",
      lastRead: "2023-03-22",
    },
    {
      id: "3",
      title: "1984",
      author: "George Orwell",
      cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
      progress: 100,
      totalPages: 328,
      currentPage: 328,
      rating: 4,
      category: "Science Fiction",
      lastRead: "2023-02-10",
    },
    {
      id: "4",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      cover: "https://shopping-phinf.pstatic.net/main_4684697/46846973619.20240404092858.jpg",
      progress: 50,
      totalPages: 224,
      currentPage: 112,
      rating: 3,
      category: "Fiction",
      lastRead: "2023-01-05",
    },
    {
      id: "5",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://shopping-phinf.pstatic.net/main_4482364/44823643672.20231224070856.jpg0",
      progress: 100,
      totalPages: 279,
      currentPage: 279,
      rating: 5,
      category: "Classic",
      lastRead: "2023-05-20",
    },
    {
      id: "6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "https://shopping-phinf.pstatic.net/main_4482364/44823643672.20231224070856.jpg",
      progress: 65,
      totalPages: 310,
      currentPage: 201,
      rating: 4,
      category: "Fantasy",
      lastRead: "2023-06-12",
    },
    {
      id: "7",
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      cover: "https://shopping-phinf.pstatic.net/main_3243831/32438310784.20230913071313.jpg",
      progress: 40,
      totalPages: 443,
      currentPage: 177,
      rating: 5,
      category: "Non-Fiction",
      lastRead: "2023-07-03",
    },
    {
      id: "8",
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://shopping-phinf.pstatic.net/main_3243831/32438310784.20230913071313.jpg",
      progress: 100,
      totalPages: 197,
      currentPage: 197,
      rating: 4,
      category: "Fiction",
      lastRead: "2023-03-15",
    },
  ];
  
  const categories = [
    { id: "1", name: "All Categories", count: books.length },
    { id: "2", name: "Fiction", count: books.filter(b => b.category === "Fiction").length },
    { id: "3", name: "Science Fiction", count: books.filter(b => b.category === "Science Fiction").length },
    { id: "4", name: "Fantasy", count: books.filter(b => b.category === "Fantasy").length },
    { id: "5", name: "Classic", count: books.filter(b => b.category === "Classic").length },
    { id: "6", name: "Non-Fiction", count: books.filter(b => b.category === "Non-Fiction").length },
  ];
  
  let viewMode = "grid";
  let selectedCategory = "All Categories";
  let searchQuery = "";
  let sortOption = "lastRead";
  
  $: filteredBooks = books
    .filter(book => 
      (selectedCategory === "All Categories" || book.category === selectedCategory) &&
      (searchQuery === "" || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "author") {
        return a.author.localeCompare(b.author);
      } else if (sortOption === "progress") {
        return b.progress - a.progress;
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      } else { // lastRead
        return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
      }
    });
  
  function handleCategorySelect(category: any) {
    selectedCategory = category;
  }
  
  function goToAddBook() {
    goto("/books/add");
  }
</script>

<div class="container py-8">
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-3xl font-bold text-[#8B4513]">My Books</h1>    
    <Button class="bg-[#8B4513] hover:bg-[#6d3710]" on:click={goToAddBook}>
      <Plus class="mr-2 h-4 w-4" />
      Add Book
    </Button>
  </div>
  
  <div class="flex flex-col md:flex-row gap-6">
    <div class="w-full md:w-64 space-y-4">
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search books..."
          class="pl-8"
          bind:value={searchQuery}
        />
      </div>
      
      <Card>
        <CardContent class="p-4">
          <h3 class="font-medium mb-3">Categories</h3>
          <div class="space-y-1">
            {#each categories as category}
              <button
                class="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-[#F5F5DC] transition-colors {selectedCategory === category.name ? 'bg-[#F5F5DC] text-[#8B4513] font-medium' : 'text-muted-foreground'}"
                on:click={() => handleCategorySelect(category.name)}
              >
                <span>{category.name}</span>
                <span class="text-xs bg-muted px-2 py-0.5 rounded-full">{category.count}</span>
              </button>
            {/each}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <h3 class="font-medium mb-3">Reading Status</h3>
          <div class="space-y-1">
            <button class="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-[#F5F5DC] transition-colors">
              <span>Currently Reading</span>
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full">
                {books.filter(b => b.progress > 0 && b.progress < 100).length}
              </span>
            </button>
            <button class="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-[#F5F5DC] transition-colors">
              <span>Completed</span>
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full">
                {books.filter(b => b.progress === 100).length}
              </span>
            </button>
            <button class="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-[#F5F5DC] transition-colors">
              <span>Not Started</span>
              <span class="text-xs bg-muted px-2 py-0.5 rounded-full">
                {books.filter(b => b.progress === 0).length}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-4">
          <h3 class="font-medium mb-3">Rating</h3>
          <div class="space-y-1">
            {#each [5, 4, 3, 2, 1] as rating}
              <button class="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm hover:bg-[#F5F5DC] transition-colors">
                <div class="flex items-center">
                  {#each Array(rating) as _, i}
                    <Star class="h-4 w-4 fill-current text-[#8B4513]" />
                  {/each}
                  {#each Array(5 - rating) as _, i}
                    <Star class="h-4 w-4 text-muted-foreground" />
                  {/each}
                </div>
                <span class="text-xs bg-muted px-2 py-0.5 rounded-full">
                  {books.filter(b => b.rating === rating).length}
                </span>
              </button>
            {/each}
          </div>
        </CardContent>
      </Card>
    </div>
    
    <!-- Main content -->
    <div class="flex-1">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div class="flex items-center">
          <Tabs value={viewMode} class="mr-4">
            <TabsList>
              <TabsTrigger value="grid" on:click={() => viewMode = "grid"}>
                <Grid class="h-4 w-4 mr-1" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" on:click={() => viewMode = "list"}>
                <List class="h-4 w-4 mr-1" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <span class="text-sm text-muted-foreground">
            {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" class="flex items-center">
                <Filter class="h-4 w-4 mr-2" />
                Sort by
                <ChevronDown class="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem on:click={() => sortOption = "lastRead"} class={sortOption === "lastRead" ? "bg-accent" : ""}>
                <Clock class="h-4 w-4 mr-2" />
                Last Read
              </DropdownMenuItem>
              <DropdownMenuItem on:click={() => sortOption = "title"} class={sortOption === "title" ? "bg-accent" : ""}>
                <BookOpen class="h-4 w-4 mr-2" />
                Title
              </DropdownMenuItem>
              <DropdownMenuItem on:click={() => sortOption = "author"} class={sortOption === "author" ? "bg-accent" : ""}>
                Author
              </DropdownMenuItem>
              <DropdownMenuItem on:click={() => sortOption = "progress"} class={sortOption === "progress" ? "bg-accent" : ""}>
                Progress
              </DropdownMenuItem>
              <DropdownMenuItem on:click={() => sortOption = "rating"} class={sortOption === "rating" ? "bg-accent" : ""}>
                <Star class="h-4 w-4 mr-2" />
                Rating
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {#if viewMode === "grid"}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each filteredBooks as book}
            <BookCard {book} />
          {/each}
        </div>
      {:else}
        <div class="space-y-4">
          {#each filteredBooks as book}
            <BookListItem {book} />
          {/each}
        </div>
      {/if}
      
      {#if filteredBooks.length === 0}
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen class="h-12 w-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium mb-1">No books found</h3>
          <p class="text-muted-foreground">
            {searchQuery ? `No books match "${searchQuery}"` : "Try adjusting your filters"}
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>

