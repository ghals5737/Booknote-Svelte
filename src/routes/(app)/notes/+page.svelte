<script lang="ts">
  import { Search, Plus, BookOpen, Tag, Filter, ChevronDown } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardContent from '$lib/components/ui/card/CardContent.svelte';
  import CardDescription from '$lib/components/ui/card/CardDescription.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
  import Tabs from '$lib/components/ui/tabs/Tabs.svelte';
  import TabsContent from '$lib/components/ui/tabs/TabsContent.svelte';
  import TabsList from '$lib/components/ui/tabs/TabsList.svelte';
  import TabsTrigger from '$lib/components/ui/tabs/TabsTrigger.svelte';  
  import Input from '$lib/components/ui/input/Input.svelte';
  import Button from '$lib/components/ui/button/Button.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
  
  // Mock data for demonstration
  const notes = [
    {
      id: "1",
      title: "Character Analysis: Jay Gatsby",
      bookTitle: "The Great Gatsby",
      bookId: "1",
      excerpt: "Gatsby's character represents the American Dream and its ultimate failure...",
      date: "2023-04-15",
      tags: ["character", "analysis", "symbolism"],
    },
    {
      id: "2",
      title: "Themes of Justice",
      bookTitle: "To Kill a Mockingbird",
      bookId: "2",
      excerpt: "The novel explores various forms of justice and injustice through the trial...",
      date: "2023-03-22",
      tags: ["themes", "justice", "society"],
    },
    {
      id: "3",
      title: "Dystopian Elements",
      bookTitle: "1984",
      bookId: "3",
      excerpt: "Orwell's vision of a totalitarian future includes several key dystopian elements...",
      date: "2023-02-10",
      tags: ["dystopia", "totalitarianism", "surveillance"],
    },
    {
      id: "4",
      title: "Symbolism of the Green Light",
      bookTitle: "The Great Gatsby",
      bookId: "1",
      excerpt: "The green light at the end of Daisy's dock represents Gatsby's hopes and dreams...",
      date: "2023-04-10",
      tags: ["symbolism", "themes"],
    },
  ];
  
  // 모든 태그 추출
  const allTags = [...new Set(notes.flatMap(note => note.tags))];
  
  // 모든 책 추출
  const books = [...new Set(notes.map(note => ({ id: note.bookId, title: note.bookTitle })))];
  
  let searchQuery: string = "";
  let selectedTab: string = "all";
  let selectedTags: string[] = [];
  let selectedBooks: string[] = [];
  
  // 필터링된 노트
  $: filteredNotes = notes.filter(note => {
    // 검색어 필터링
    const matchesSearch = searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 태그 필터링
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => note.tags.includes(tag));
    
    // 책 필터링
    const matchesBooks = selectedBooks.length === 0 || 
      selectedBooks.includes(note.bookId);
    
    // 탭 필터링
    let matchesTab = true;
    if (selectedTab === "recent") {
      // 최근 30일 이내의 노트만 표시
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesTab = new Date(note.date) >= thirtyDaysAgo;
    } else if (selectedTab === "favorites") {
      // 실제로는 즐겨찾기 상태를 확인해야 함
      // 여기서는 예시로 id가 1, 3인 노트를 즐겨찾기로 가정
      matchesTab = ["1", "3"].includes(note.id);
    }
    
    return matchesSearch && matchesTags && matchesBooks && matchesTab;
  });
  
  function toggleTagFilter(tag: any) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }
  
  function toggleBookFilter(bookId: any) {
    if (selectedBooks.includes(bookId)) {
      selectedBooks = selectedBooks.filter(id => id !== bookId);
    } else {
      selectedBooks = [...selectedBooks, bookId];
    }
  }
  
  function formatDate(dateString: any) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<div class="container py-8">
  <div class="flex items-center justify-between mb-8">
    <h1 class="text-3xl font-bold text-[#2C4044]">My Notes</h1>
    <Button class="bg-[#E6A04A] hover:bg-[#d08f3f] text-white">
      <Plus class="mr-2 h-4 w-4" />
      New Note
    </Button>
  </div>
  
  <div class="flex flex-col md:flex-row gap-6">
    <div class="w-full md:w-64 space-y-4">
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search notes..."
          class="pl-8"
          bind:value={searchQuery}
        />
      </div>
      
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-base text-[#2C4044]">Filter by Tags</CardTitle>
        </CardHeader>
        <CardContent class="py-2">
          <div class="flex flex-wrap gap-2">
            {#each allTags as tag}
              <Button 
                variant={selectedTags.includes(tag) ? "default" : "outline"} 
                size="sm" 
                class="rounded-full {selectedTags.includes(tag) ? 'bg-[#E6A04A] hover:bg-[#d08f3f] text-white' : ''}"
                on:click={() => toggleTagFilter(tag)}
              >
                {tag}
              </Button>
            {/each}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-base text-[#2C4044]">Filter by Books</CardTitle>
        </CardHeader>
        <CardContent class="py-2 space-y-2">
          {#each books as book}
            <button 
              class="flex items-center w-full space-x-2 py-2 px-3 rounded-md text-sm hover:bg-[#DDE0B6] transition-colors {selectedBooks.includes(book.id) ? 'bg-[#DDE0B6] text-[#2C4044] font-medium' : 'text-muted-foreground'}"
              on:click={() => toggleBookFilter(book.id)}
            >
              <BookOpen class="h-4 w-4" />
              <span>{book.title}</span>
            </button>
          {/each}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="py-4">
          <CardTitle class="text-base text-[#2C4044]">Sort Notes</CardTitle>
        </CardHeader>
        <CardContent class="py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" class="w-full justify-between">
                <span>Date: Newest First</span>
                <ChevronDown class="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-[200px]">
              <DropdownMenuItem>Date: Newest First</DropdownMenuItem>
              <DropdownMenuItem>Date: Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Title: A to Z</DropdownMenuItem>
              <DropdownMenuItem>Title: Z to A</DropdownMenuItem>
              <DropdownMenuItem>Book: A to Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
    
    <div class="flex-1">
      <Tabs bind:value={selectedTab} class="w-full">
        <TabsList>
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="all" class="space-y-4 mt-4">
          {#if filteredNotes.length === 0}
            <div class="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen class="h-12 w-12 text-muted-foreground mb-4" />
              <h3 class="text-lg font-medium mb-1">No notes found</h3>
              <p class="text-muted-foreground mb-4">
                {searchQuery || selectedTags.length > 0 || selectedBooks.length > 0 
                  ? "Try adjusting your filters" 
                  : "Start by creating your first note"}
              </p>
              {#if !searchQuery && selectedTags.length === 0 && selectedBooks.length === 0}
                <Button class="bg-[#E6A04A] hover:bg-[#d08f3f] text-white">
                  <Plus class="mr-2 h-4 w-4" />
                  Create First Note
                </Button>
              {/if}
            </div>
          {:else}
            {#each filteredNotes as note}
              <a href={`/notes/${note.id}`} class="block">
                <Card class="hover:shadow-md transition-shadow">
                  <CardHeader class="pb-2">
                    <div class="flex justify-between items-start">
                      <div>
                        <CardTitle class="text-[#2C4044]">{note.title}</CardTitle>
                        <CardDescription class="mt-1 flex items-center">
                          <BookOpen class="h-3 w-3 mr-1" />
                          <a href={`/books/${note.bookId}`} class="hover:underline">
                            {note.bookTitle}
                          </a>
                        </CardDescription>
                      </div>
                      <div class="text-sm text-muted-foreground">{formatDate(note.date)}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{note.excerpt}</p>
                    <div class="flex flex-wrap gap-2">
                      {#each note.tags as tag}
                        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </CardContent>
                </Card>
              </a>
            {/each}
          {/if}
        </TabsContent>
        <TabsContent value="recent" class="mt-4">
          <!-- 최근 노트 내용 (all과 동일한 구조) -->
          <div class="space-y-4">
            {#if filteredNotes.length === 0}
              <div class="p-8 text-center text-muted-foreground">No recent notes found</div>
            {:else}
              {#each filteredNotes as note}
                <a href={`/notes/${note.id}`} class="block">
                  <Card class="hover:shadow-md transition-shadow">
                    <CardHeader class="pb-2">
                      <div class="flex justify-between items-start">
                        <div>
                          <CardTitle class="text-[#2C4044]">{note.title}</CardTitle>
                          <CardDescription class="mt-1 flex items-center">
                            <BookOpen class="h-3 w-3 mr-1" />
                            <a href={`/books/${note.bookId}`} class="hover:underline">
                              {note.bookTitle}
                            </a>
                          </CardDescription>
                        </div>
                        <div class="text-sm text-muted-foreground">{formatDate(note.date)}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{note.excerpt}</p>
                      <div class="flex flex-wrap gap-2">
                        {#each note.tags as tag}
                          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              {/each}
            {/if}
          </div>
        </TabsContent>
        <TabsContent value="favorites" class="mt-4">
          <!-- 즐겨찾기 노트 내용 (all과 동일한 구조) -->
          <div class="space-y-4">
            {#if filteredNotes.length === 0}
              <div class="p-8 text-center text-muted-foreground">No favorite notes found</div>
            {:else}
              {#each filteredNotes as note}
                <a href={`/notes/${note.id}`} class="block">
                  <Card class="hover:shadow-md transition-shadow">
                    <CardHeader class="pb-2">
                      <div class="flex justify-between items-start">
                        <div>
                          <CardTitle class="text-[#2C4044]">{note.title}</CardTitle>
                          <CardDescription class="mt-1 flex items-center">
                            <BookOpen class="h-3 w-3 mr-1" />
                            <a href={`/books/${note.bookId}`} class="hover:underline">
                              {note.bookTitle}
                            </a>
                          </CardDescription>
                        </div>
                        <div class="text-sm text-muted-foreground">{formatDate(note.date)}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p class="text-sm text-muted-foreground mb-3 line-clamp-2">{note.excerpt}</p>
                      <div class="flex flex-wrap gap-2">
                        {#each note.tags as tag}
                          <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                            {tag}
                          </span>
                        {/each}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              {/each}
            {/if}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</div>

