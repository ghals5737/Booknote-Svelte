<script lang="ts">
    import { Plus, Search, BookOpen, Loader2, ArrowLeft } from "lucide-svelte"
  
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";    
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
	  import type { Book, SearchResult } from "$lib/type/book/book.js";
	  import { searchBooks } from "$lib/api/search.js";    

    export let books: Book[] = []    
    export let open: boolean
    
    let searchQuery = ""
    let isSearching = false
    let searchResults: SearchResult[] = []
    let showSearchResults = false
    let mode = "manual"
    const categories = ["자기계발", "개발", "역사", "소설", "에세이", "경제", "과학", "철학", "기타"]
    let initialBook: Book = {
        id: "",
        title: "",
        author: "",
        category: categories[0],
        progress: 0,
        currentPage: 0,
        totalPages: 0,
        publisher: "",
        isbn: "",
        description: "",
        cover: "",
        notes: [],
        createdAt: new Date(),
    }  

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    isSearching = true
    try {
      const results = await searchBooks(searchQuery)
      console.log("results",results)
      searchResults = results
      showSearchResults = true
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      isSearching = false
    }
  }

  const handleSelectBook = (result: SearchResult) => {
    console.log("a",result)
    // initialBook.title = book.title
    // initialBook.author = book.author
    // initialBook.publisher = book.publisher
    // initialBook.isbn = book.isbn
    // initialBook.description = book.description
    // initialBook.cover = book.image
    showSearchResults = false
    mode = "manual"
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()

    //if (!title.trim() || !author.trim() || !category) return

    // Calculate progress from pages if provided
    //const calculatedProgress = totalPages > 0 ? Math.round((currentPage / totalPages) * 100) : progress

    // addBook({
    //   title: title.trim(),
    //   author: author.trim(),
    //   category,
    //   cover: cover || `/placeholder.svg?height=200&width=150&query=${encodeURIComponent(title + " book cover")}`,
    //   notes: [],
    //   progress: calculatedProgress,
    //   currentPage,
    //   totalPages,
    //   isbn: isbn || undefined,
    //   publisher: publisher || undefined,
    //   description: description || undefined,
    // })

    // Reset form
    resetForm()
    open = false
  }

  const resetForm = () => {
    initialBook.title = ""
    initialBook.author = ""
    initialBook.category = ""
    initialBook.progress = 0
    initialBook.currentPage = 0
    initialBook.totalPages = 0
    initialBook.publisher = ""
    initialBook.isbn = ""
    initialBook.description = ""
    initialBook.cover = ""
    searchQuery = ""
    searchResults = []
    showSearchResults = false
    mode = "search"
  }

  const handleClose = () => {
    resetForm()
    open = false
  }
</script>

<Dialog.Root open={open}>
  <Dialog.Content class="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-secondary rounded-xl shadow-soft-lg">
    <Dialog.Header>
      <Dialog.Title class="text-gradient flex items-center gap-2">
        <BookOpen class="h-5 w-5" />새 책 추가
      </Dialog.Title>
    </Dialog.Header>

    {#if !showSearchResults}
      <div class="space-y-6">
        <div class="flex gap-2">
          <Button
            type="button"
            variant={mode === "search" ? "default" : "outline"}
            onclick={() => mode = "search"}
            class={mode === "search" ? "button-primary" : "border-accent text-accent hover:bg-accent/10"}
          >
            <Search class="h-4 w-4" />책 검색
          </Button>
          <Button
            type="button"
            variant={mode === "manual" ? "default" : "outline"}
            onclick={() => mode = "manual"}
            class={mode === "manual" ? "button-primary" : "border-accent text-accent hover:bg-accent/10"}
          >
            <Plus class="h-4 w-4" />
            직접 입력
          </Button>
        </div>

        {#if mode === "search"}
          <div class="space-y-4">
            <div class="space-y-2">
              <Label class="text-cool font-medium">책 제목으로 검색</Label>
              <div class="flex gap-2">
                <Input
                  bind:value={searchQuery}                  
                  placeholder="검색할 책 제목을 입력하세요"
                  class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                  onkeypress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  onclick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  class="button-primary rounded-lg"
                >
                  {#if isSearching}
                    <Loader2 class="h-4 w-4 animate-spin" />
                  {:else}
                    <Search class="h-4 w-4" />
                  {/if}
                </Button>
              </div>
            </div>

            <div class="text-center py-8">
              <BookOpen class="h-12 w-12 text-accent mx-auto mb-4" />
              <p class="text-cool">책 제목을 검색하여 정보를 자동으로 가져오세요</p>
              <p class="text-sm text-cool/70 mt-1">또는 '직접 입력' 탭에서 수동으로 입력할 수 있습니다</p>
            </div>
          </div>
        
        {/if}

        {#if mode === "manual"}
          <form onsubmit={handleSubmit} class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label class="text-cool font-medium">
                  책 제목 *
                </Label>
                <Input
                  id="title"
                  bind:value={initialBook.title}
                  placeholder="책 제목을 입력하세요"
                  class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                  required
                />
              </div>

              <div class="space-y-2">
                <Label class="text-cool font-medium">
                  저자 *
                </Label>
                <Input
                  id="author"
                  bind:value={initialBook.author}
                  placeholder="저자명을 입력하세요"
                  class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label class="text-cool font-medium">
                  카테고리 *
                </Label>
                <Select.Root type="single" bind:value={initialBook.category} required>
                  <Select.Trigger class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground w-full">
                    {initialBook.category}
                  </Select.Trigger>
                  <Select.Content class="bg-card border-secondary rounded-lg shadow-soft-lg">
                    {#each categories as cat}
                      <Select.Item value={cat} class="text-foreground hover:bg-muted rounded">
                        {cat}
                      </Select.Item>
                    {/each}
                  </Select.Content>
                </Select.Root>
              </div>

              <div class="space-y-2">
                <Label class="text-cool font-medium">
                  출판사
                </Label>
                <Input
                  id="publisher"
                  bind:value={initialBook.publisher}
                  placeholder="출판사를 입력하세요"
                  class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label class="text-cool font-medium">
                책 설명
              </Label>
              <Textarea
                id="description"
                bind:value={initialBook.description}
                placeholder="책에 대한 간단한 설명을 입력하세요"
                class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool resize-none"
                rows={3}
              />
            </div>

            <div class="space-y-4">
              <Label class="text-cool font-medium">읽기 진행 상황</Label>

              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label class="text-sm text-cool">
                    현재 페이지
                  </Label>
                  <Input
                    id="currentPage"
                    type="number"
                    min="0"
                    bind:value={initialBook.currentPage}
                    placeholder="0"
                    class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                  />
                </div>
                <div class="space-y-2">
                  <Label class="text-sm text-cool">
                    총 페이지
                  </Label>
                  <Input
                    id="totalPages"
                    type="number"
                    min="0"
                    bind:value={initialBook.totalPages}
                    placeholder="0"
                    class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <Label class="text-sm text-cool">
                  읽기 진행률 (%){" "}
                  {initialBook.totalPages > 0 &&
                    initialBook.currentPage > 0 &&
                    `- 자동 계산: ${Math.round((initialBook.currentPage / initialBook.totalPages) * 100)}%`}
                </Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  bind:value={initialBook.progress}
                  placeholder="0"
                  disabled={initialBook.totalPages > 0 && initialBook.currentPage > 0}
                  class="border-secondary focus:border-accent bg-muted rounded-lg text-foreground placeholder:text-cool disabled:opacity-50"
                />
              </div>
            </div>

            <div class="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onclick={handleClose}
                class="border-accent text-accent hover:bg-accent/10 rounded-lg"
              >
                취소
              </Button>
              <Button type="submit" class="button-primary rounded-lg">
                <Plus class="h-4 w-4" />
                추가
              </Button>
            </div>
          </form>
        {/if}
      </div>
    {:else}
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Button
            variant="ghost"
            onclick={() => showSearchResults = false}
            class="text-cool hover:bg-secondary rounded-lg"
          >
            <ArrowLeft class="h-4 w-4 mr-2" />
            검색으로 돌아가기
          </Button>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-foreground">검색 결과 ({searchResults.length})</h3>

          {#if searchResults.length === 0}
            <Card.Root class="border-secondary bg-muted/50 rounded-lg">
              <Card.Content class="p-6 text-center">
                <Search class="h-8 w-8 text-cool mx-auto mb-2" />
                <p class="text-cool">검색 결과가 없습니다</p>
                <p class="text-sm text-cool/70">다른 키워드로 검색해보세요</p>
              </Card.Content>
            </Card.Root>
          {:else}
            <div class="space-y-3 max-h-96 overflow-y-auto">
              {#each searchResults as result}
                <Card.Root
                  class="cursor-pointer card-hover border-secondary bg-card rounded-lg"
                  onclick={() => handleSelectBook(result)}
                >
                  <Card.Content class="p-4">
                    <div class="flex gap-4">
                      <div class="w-16 h-20 rounded bg-muted flex-shrink-0 overflow-hidden">
                        <img
                          src={result.image || "/placeholder.svg"}
                          alt={result.title}
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div class="flex-1 min-w-0 overflow-hidden">
                        <h4 class="font-semibold text-foreground truncate">{result.title}</h4>
                        <p class="text-sm text-cool truncate">{result.author}</p>
                        <div class="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                            {result.publisher}
                          </Badge>
                          {#if result.isbn}
                            <Badge variant="outline" class="text-xs border-cool/30 text-cool">
                              ISBN: {result.isbn}
                            </Badge>
                          {/if}
                        </div>
                        {#if result.description}
                          <p class="text-xs text-cool/70 mt-2 line-clamp-2">{result.description}</p>
                        {/if}
                      </div>
                    </div>
                  </Card.Content>
                </Card.Root>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>