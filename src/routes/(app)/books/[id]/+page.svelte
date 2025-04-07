<script lang="ts">
  import { page } from "$app/stores";
  import { ArrowLeft, BookOpen, Edit, Plus, Star, Calendar, MoreHorizontal, ChevronDown } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  import Button from '$lib/components/ui/button/Button.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import CardContent from '$lib/components/ui/card/CardContent.svelte';
  import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
  import CardTitle from '$lib/components/ui/card/CardTitle.svelte';  
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
    cover: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
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
      content: "Gatsby's character represents the American Dream and its ultimate failure. Born into poverty, he amasses a fortune through questionable means, all in pursuit of winning back Daisy Buchanan, his first love. His wealth and lavish parties are merely a facade to impress Daisy, revealing the emptiness of materialism and the corruption of the American Dream. Despite his wealth, Gatsby remains emotionally stunted, unable to move past his idealized memory of Daisy from five years ago. His tragic flaw is his inability to accept that the past cannot be recreated, leading to his eventual downfall.",
      date: "2023-04-15",
      tags: ["character", "analysis", "symbolism"],
    },
    {
      id: "2",
      title: "Symbolism of the Green Light",
      excerpt: "The green light at the end of Daisy's dock represents Gatsby's hopes and dreams...",
      content: "The green light at the end of Daisy's dock represents Gatsby's hopes and dreams for the future. Throughout the novel, Gatsby stares at this light, which is visible from his mansion across the bay. It symbolizes his longing for Daisy and his belief that he can recapture the past. The green light also represents the broader American Dream—the idea that anyone can achieve success through hard work and determination. However, like Gatsby's dream of reuniting with Daisy, the green light is ultimately unattainable, representing the impossibility of fully realizing the American Dream.",
      date: "2023-04-10",
      tags: ["symbolism", "themes"],
    },
    {
      id: "3",
      title: "The Valley of Ashes",
      excerpt: "The valley of ashes represents the moral and social decay hidden by the beautiful façades...",
      content: "The valley of ashes represents the moral and social decay hidden by the beautiful façades of the wealthy. This desolate area, located between West Egg and New York City, is described as a 'fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens.' It symbolizes the consequences of the unbridled pursuit of wealth and the stark contrast between the lives of the rich and the poor. The valley of ashes is home to the Wilsons, whose lives are destroyed by the carelessness of the wealthy characters. The billboard of the eyes of Doctor T.J. Eckleburg overlooking the valley serves as a symbol of God's judgment on this moral decay, watching over the characters but unable to intervene.",
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
  
  // 노트 상세 보기 상태 관리
  let expandedNoteId: string | null = null;
  
  function toggleNoteExpansion(noteId: string) {
    if (expandedNoteId === noteId) {
      expandedNoteId = null;
    } else {
      expandedNoteId = noteId;
    }
  }
</script>

<div class="container py-8">
  <div class="flex items-center mb-6">
    <a href="/books">
      <Button variant="ghost" size="icon">
        <ArrowLeft class="h-5 w-5" />
      </Button>
    </a>
    <h1 class="text-2xl font-bold ml-2 text-[#255DAA]">{book.title}</h1>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- 책 정보 사이드바 -->
    <div class="lg:col-span-1">
      <Card>
        <CardContent class="p-6">
          <div class="flex flex-col items-center mb-6">
            <div class="relative w-40 h-60 bg-[#FCE0D4] mb-4">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                class="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            
            <div class="flex items-center justify-center mb-2">
              {#each Array(5) as _, i}
                <Star class="h-5 w-5 {i < book.rating ? 'fill-current text-[#DE525E]' : 'text-muted-foreground'}"/>
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
              <Button class="flex-1 bg-[#54A6E1] hover:bg-[#255DAA] text-white">
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
                <span class="inline-flex items-center rounded-full bg-[#D2EEFA]/50 px-2.5 py-1 text-xs font-medium text-[#255DAA]">
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
            
            <!-- Reading Stats 섹션을 사이드바로 이동 -->
            <div class="pt-4 border-t">
              <h3 class="text-sm font-medium text-[#255DAA] mb-3">Reading Stats</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Started Reading</span>
                  <span class="text-sm">March 15, 2023</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Reading Time</span>
                  <span class="text-sm">4h 30m</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Pages per Day</span>
                  <span class="text-sm">12</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted-foreground">Estimated Completion</span>
                  <span class="text-sm">May 10, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <!-- 노트 섹션 -->
    <div class="lg:col-span-2">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-[#255DAA]">Notes ({bookNotes.length})</h2>
        <Button class="bg-[#54A6E1] hover:bg-[#255DAA]">
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
          <Button class="bg-[#54A6E1] hover:bg-[#255DAA]">
            <Plus class="mr-2 h-4 w-4" />
            Create First Note
          </Button>
        </div>
      {:else}
        <div class="space-y-4">
          {#each bookNotes as note}
            <Card class="hover:shadow-md transition-shadow">
              <CardHeader class="pb-2 cursor-pointer" >
                <div class="flex justify-between items-start" on:click={() => toggleNoteExpansion(note.id)}>
                  <div class="flex-1">
                    <div class="flex items-center">
                      <CardTitle class="text-lg text-[#255DAA]">{note.title}</CardTitle>
                      <ChevronDown class="h-4 w-4 ml-2 text-muted-foreground transition-transform {expandedNoteId === note.id ? 'rotate-180' : ''}" />
                    </div>
                    <p class="text-sm text-muted-foreground mt-1">{note.excerpt}</p>
                    <div class="flex flex-wrap gap-2 mt-2">
                      {#each note.tags as tag}
                        <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="text-sm text-muted-foreground mr-2">{formatDate(note.date)}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" class="h-8 w-8" on:click={(e) => e.stopPropagation()}>
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
                {#if expandedNoteId === note.id}
                  <div class="pt-4" transition:slide={{ duration: 300 }}>
                    <h4 class="text-sm font-medium mb-2">Full Note</h4>
                    <p class="text-sm whitespace-pre-line">{note.content}</p>
                  </div>
                {/if}
              </CardContent>
            </Card>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

