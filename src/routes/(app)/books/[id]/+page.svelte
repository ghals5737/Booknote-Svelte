<script lang="ts">
  import { page } from "$app/stores";
  import { ArrowLeft, BookOpen, Edit, Plus, Star,  Calendar,  MoreHorizontal } from 'lucide-svelte';

  import Button from '$lib/components/ui/button/Button.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardContent from '$lib/components/ui/card/CardContent.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/card/CardTitle.svelte';  
  import Tabs from '$lib/components/ui/tabs/Tabs.svelte';
  import TabsContent from '$lib/components/ui/tabs/TabsContent.svelte';
  import TabsList from '$lib/components/ui/tabs/TabsList.svelte';
  import TabsTrigger from '$lib/components/ui/tabs/TabsTrigger.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
  import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
  import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
  import CircularProgress from '$lib/components/ui/progress/CircularProgress.svelte';
  
  // 책 상세 정보 (실제로는 ID를 기반으로 데이터를 가져옴)
  const bookId = $page.params.id;
  
  // Mock data for demonstration
  const book = {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/placeholder.svg?height=300&width=200",
    progress: 75,
    totalPages: 180,
    currentPage: 135,
    rating: 4,
    category: "Fiction",
    lastRead: "2023-04-15",
    description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    publisher: "Scribner",
    publishedDate: "1925-04-10",
    isbn: "9780743273565",
    language: "English",
  };
  
  // 이 책에 관련된 노트 목록
  const bookNotes = [
    {
      id: "1",
      title: "Character Analysis: Jay Gatsby",
      excerpt: "Gatsby's character represents the American Dream and its ultimate failure...",
      date: "2023-04-15",
      tags: ["character", "analysis", "symbolism"],
    },
    {
      id: "2",
      title: "Symbolism of the Green Light",
      excerpt: "The green light at the end of Daisy's dock represents Gatsby's hopes and dreams...",
      date: "2023-04-10",
      tags: ["symbolism", "themes"],
    },
    {
      id: "3",
      title: "The Valley of Ashes",
      excerpt: "The valley of ashes represents the moral and social decay hidden by the beautiful façades...",
      date: "2023-03-28",
      tags: ["setting", "symbolism"],
    },
  ];
  
  // 날짜 포맷팅 함수
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  let activeTab = "overview";
</script>

<div class="container py-8">
  <div class="flex items-center mb-6">
    <a href="/books">
      <Button variant="ghost" size="icon">
        <ArrowLeft class="h-5 w-5" />
      </Button>
    </a>
    <h1 class="text-2xl font-bold ml-2 text-[#8B4513]">{book.title}</h1>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- 책 정보 사이드바 -->
    <div class="lg:col-span-1">
      <Card>
        <CardContent class="p-6">
          <div class="flex flex-col items-center mb-6">
            <div class="relative w-40 h-60 bg-[#F5F5DC] mb-4">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                class="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            
            <div class="flex items-center justify-center mb-2">
              {#each Array(5) as _, i}
                <Star class="h-5 w-5 {i < book.rating ? 'fill-current text-[#8B4513]' : 'text-muted-foreground'}"/>
              {/each}
            </div>
            
            <div class="flex items-center justify-center gap-2 mb-4">
              <CircularProgress value={book.progress} size={48} />
              <div class="text-sm">
                <p class="font-medium">{book.progress}% Complete</p>
                <p class="text-muted-foreground">{book.currentPage} of {book.totalPages} pages</p>
              </div>
            </div>
            
            <div class="flex gap-2 w-full">
              <Button class="flex-1 bg-[#8B4513] hover:bg-[#6d3710]">
                Update Progress
              </Button>
              <Button variant="outline" size="icon">
                <Edit class="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Author</h3>
              <p>{book.author}</p>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Category</h3>
              <div class="flex">
                <span class="inline-flex items-center rounded-full bg-[#F5F5DC]/50 px-2.5 py-1 text-xs font-medium text-[#8B4513]">
                  {book.category}
                </span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Last Read</h3>
              <div class="flex items-center">
                <Calendar class="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{formatDate(book.lastRead)}</span>
              </div>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Publisher</h3>
              <p>{book.publisher}</p>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Published Date</h3>
              <p>{formatDate(book.publishedDate)}</p>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">ISBN</h3>
              <p>{book.isbn}</p>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">Language</h3>
              <p>{book.language}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <!-- 책 상세 정보 및 노트 -->
    <div class="lg:col-span-2">
      <Tabs bind:value={activeTab} class="w-full">
        <TabsList class="w-full grid grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Notes ({bookNotes.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" class="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Book Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{book.description}</p>
            </CardContent>
          </Card>
          
          <!-- 추가 정보 섹션 -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">Started Reading</span>
                    <span>March 15, 2023</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">Reading Time</span>
                    <span>4h 30m</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">Pages per Day</span>
                    <span>12</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">Estimated Completion</span>
                    <span>May 10, 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Similar Books</CardTitle>
              </CardHeader>
              <CardContent>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <div class="w-8 h-12 bg-[#F5F5DC] mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font  mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-sm">The Catcher in the Rye</p>
                      <p class="text-xs text-muted-foreground">J.D. Salinger</p>
                    </div>
                  </li>
                  <li class="flex items-center">
                    <div class="w-8 h-12 bg-[#F5F5DC] mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-sm">This Side of Paradise</p>
                      <p class="text-xs text-muted-foreground">F. Scott Fitzgerald</p>
                    </div>
                  </li>
                  <li class="flex items-center">
                    <div class="w-8 h-12 bg-[#F5F5DC] mr-3 flex-shrink-0"></div>
                    <div>
                      <p class="font-medium text-sm">The Sun Also Rises</p>
                      <p class="text-xs text-muted-foreground">Ernest Hemingway</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes" class="mt-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-[#8B4513]">Book Notes</h2>
            <Button class="bg-[#8B4513] hover:bg-[#6d3710]">
              <Plus class="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
          
          {#if bookNotes.length === 0}
            <div class="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen class="h-12 w-12 text-muted-foreground mb-4" />
              <h3 class="text-lg font-medium mb-1">No notes yet</h3>
              <p class="text-muted-foreground mb-4">
                Start capturing your thoughts and insights about this book
              </p>
              <Button class="bg-[#8B4513] hover:bg-[#6d3710]">
                <Plus class="mr-2 h-4 w-4" />
                Create First Note
              </Button>
            </div>
          {:else}
            <div class="space-y-4">
              {#each bookNotes as note}
                <Card class="hover:shadow-md transition-shadow">
                  <CardHeader class="pb-2">
                    <div class="flex justify-between items-start">
                      <CardTitle class="text-lg">{note.title}</CardTitle>
                      <div class="flex items-center">
                        <span class="text-sm text-muted-foreground mr-2">{formatDate(note.date)}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" class="h-8 w-8">
                              <MoreHorizontal class="h-4 w-4" />
                              <span class="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem class="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p class="text-sm text-muted-foreground mb-3">{note.excerpt}</p>
                    <div class="flex flex-wrap gap-2">
                      {#each note.tags as tag}
                        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </CardContent>
                </Card>
              {/each}
            </div>
          {/if}
        </TabsContent>
      </Tabs>
    </div>
  </div>
</div>

