<script lang="ts">
    import { BookOpen, Filter, Search, SortDesc } from "lucide-svelte"
    import Button from "$lib/components/ui/button/Button.svelte"
    import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte"
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte"
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte"
    import DropdownMenuLabel from "$lib/components/ui/dropdown-menu/DropdownMenuLabel.svelte"
    import DropdownMenuSeparator from "$lib/components/ui/dropdown-menu/DropdownMenuSeparator.svelte"
    import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte"
    import DropdownMenuGroup from "$lib/components/ui/dropdown-menu/DropdownMenuGroup.svelte"
    import Input from "$lib/components/ui/input/Input.svelte"
    import Tabs from "$lib/components/ui/tabs/Tabs.svelte"
    import TabsList from "$lib/components/ui/tabs/TabsList.svelte"
    import TabsTrigger from "$lib/components/ui/tabs/TabsTrigger.svelte"
    import NoteCard from "$lib/components/note/NoteCard.svelte"
    import BookNoteCard from "$lib/components/note/BookNoteCard.svelte"
    import CategoryTag from "$lib/components/category/CategoryTag.svelte"

    const mockNotes = [
        {
            id: "note1",
            bookId: "1",
            bookTitle: "사피엔스",
            bookCover: "/placeholder.svg?height=200&width=150",
            content:
            "인류의 역사는 세 번의 혁명으로 나눌 수 있다: 인지 혁명, 농업 혁명, 과학 혁명. 각각의 혁명은 인류의 생활 방식과 사고방식을 완전히 바꿔놓았다.",
            createdAt: "2023년 4월 12일",
            categories: ["인문", "역사"],
        },
        {
            id: "note2",
            bookId: "1",
            bookTitle: "사피엔스",
            bookCover: "/placeholder.svg?height=200&width=150",
            content:
            "허구를 믿는 능력은 호모 사피엔스의 가장 독특하고 중요한 능력이다. 이것이 없었다면 대규모 협력이 불가능했을 것이다.",
            createdAt: "2023년 4월 10일",
            categories: ["인문"],
        },
        {
            id: "note3",
            bookId: "1",
            bookTitle: "사피엔스",
            bookCover: "/placeholder.svg?height=200&width=150",
            content:
            "농업 혁명은 인류 역사상 가장 큰 사기라고 할 수 있다. 농업으로 인해 더 많은 음식을 생산할 수 있게 되었지만, 그것이 더 나은 식단이나 더 많은 여가 시간으로 이어지지는 않았다.",
            createdAt: "2023년 4월 5일",
            categories: ["역사", "과학"],
        },
        {
            id: "note4",
            bookId: "2",
            bookTitle: "아몬드",
            bookCover: "/placeholder.svg?height=200&width=150",
            content:
            "감정을 느끼지 못하는 주인공 윤재의 이야기. 아몬드라 불리는 편도체가 작아 공포나 분노와 같은 감정을 느끼지 못하는 희귀한 질환을 가진 소년의 성장 이야기.",
            createdAt: "2023년 4월 8일",
            categories: ["소설", "성장"],
        },
        {
            id: "note5",
            bookId: "3",
            bookTitle: "달러구트 꿈 백화점",
            bookCover: "/placeholder.svg?height=200&width=150",
            content:
            "잠들어야만 입장할 수 있는 달러구트 꿈 백화점은 잠들어 있는 사이 우리가 꿈을 선택할 수 있게 해주는 특별한 공간이다. 이곳에서 일어나는 다양한 이야기들이 우리에게 삶의 의미를 다시 생각하게 한다.",
            createdAt: "2023년 4월 3일",
            categories: ["소설", "판타지"],
        },
    ]

    const allCategories = ["인문", "역사", "과학", "소설", "성장", "판타지", "자기계발", "경제"]    
    const allBooks = [
    { id: "1", title: "사피엔스" },
    { id: "2", title: "아몬드" },
    { id: "3", title: "달러구트 꿈 백화점" },
    { id: "4", title: "어린왕자" },
    ]
    let view:string = "list"
    let searchQuery:string = ""
    let selectedCategories:string[] = []
    let selectedBooks:string[] = []
    let sortOrder:string = "newest"

    const filteredNotes = mockNotes
        .filter((note) => {
        // 검색어 필터링
        if (
            searchQuery &&
            !note.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !note.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false
        }

        // 카테고리 필터링
        if (selectedCategories.length > 0 && !note.categories.some((cat) => selectedCategories.includes(cat))) {
            return false
        }

        // 책 필터링
        if (selectedBooks.length > 0 && !selectedBooks.includes(note.bookId)) {
            return false
        }

        return true
        })
        .sort((a, b) => {
        // 날짜 정렬 (간단한 예시)
        if (sortOrder === "newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        })

    const toggleCategory = (category: string) => {
        selectedCategories = selectedCategories.includes(category) ? selectedCategories.filter((c) => c !== category) : [...selectedCategories, category]
    }

    const toggleBook = (bookId: string) => {
        selectedBooks = selectedBooks.includes(bookId) ? selectedBooks.filter((id) => id !== bookId) : [...selectedBooks, bookId]
    }

    const clearFilters = () => {
        selectedCategories = []
        selectedBooks = []
        searchQuery = ""
    }
    
</script>

 <div class="container py-6 space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 class="text-3xl font-bold">내 노트</h1>
        <div class="flex items-center gap-2">
          <div class="relative flex-1 md:w-64">
            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="노트 내용 검색..."
              class="pl-8"
              value={searchQuery}
              onChange={(e: Event) => searchQuery = (e.target as HTMLInputElement).value}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter class="h-4 w-4" />
                <span class="sr-only">필터</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <DropdownMenuLabel>필터</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel class="text-xs font-normal text-muted-foreground">카테고리</DropdownMenuLabel>
                <div class="p-2 flex flex-wrap gap-1">
                  {#each allCategories as category}
                    <CategoryTag
                      name={category}
                      size="sm"
                      isSelected={selectedCategories.includes(category)}
                      on:click={() => toggleCategory(category)}
                    />
                  {/each}
                </div>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel class="text-xs font-normal text-muted-foreground">책</DropdownMenuLabel>
                {#each allBooks as book}
                  <DropdownMenuItem
                    key={book.id}
                    className="flex items-center gap-2"
                    onSelect={(e: Event) => {
                      e.preventDefault()
                      toggleBook(book.id)
                    }}
                  >
                    <div
                      class={`w-3 h-3 rounded-full ${selectedBooks.includes(book.id) ? "bg-[#96CEB4]" : "border border-muted-foreground"}`}
                    ></div>
                    <span>{book.title}</span>
                  </DropdownMenuItem>
                {/each}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onSelect={clearFilters}>필터 초기화</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SortDesc class="h-4 w-4" />
                <span class="sr-only">정렬</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() => sortOrder = "newest"}
                class={sortOrder === "newest" ? "bg-muted" : ""}
              >
                최신순
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => sortOrder = "oldest"}
                class={sortOrder === "oldest" ? "bg-muted" : ""}
              >
                오래된순
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tabs value={view} onValueChange={(v) => view = v as "list" | "grid"} class="hidden md:block">
            <TabsList class="grid w-16 grid-cols-2">
              <TabsTrigger value="list" class="px-2">
                <BookOpen class="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="grid" class="px-2">
                <div class="grid grid-cols-2 gap-0.5">
                  <div class="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div class="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div class="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div class="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {#if selectedCategories.length > 0 || selectedBooks.length > 0}
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-sm text-muted-foreground">필터:</span>
          {#each selectedCategories as category}
            <CategoryTag
              name={category}
              size="sm"
              isSelected={true}
              on:click={() => toggleCategory(category)}
            />
          {/each}
          {#each selectedBooks as bookId}
            {#if allBooks.find((b) => b.id === bookId)}
              <CategoryTag
                name={allBooks.find((b) => b.id === bookId)?.title || ""}
                size="sm"
                isSelected={true}
                on:click={() => toggleBook(bookId)}
              />
            {/if}
          {/each}
          <Button variant="ghost" size="sm" onClick={clearFilters} class="h-6 px-2 text-xs">
            초기화
          </Button>
        </div>
      {/if}

      {#if filteredNotes.length === 0}
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen class="h-12 w-12 text-muted-foreground mb-4" />
          <h3 class="text-lg font-medium">노트가 없습니다</h3>
          <p class="text-muted-foreground mt-1">
            {searchQuery || selectedCategories.length > 0 || selectedBooks.length > 0
              ? "검색 조건에 맞는 노트가 없습니다. 다른 검색어나 필터를 시도해보세요."
              : "아직 작성한 노트가 없습니다. 책을 등록하고 노트를 작성해보세요."}
          </p>
          {#if searchQuery || selectedCategories.length > 0 || selectedBooks.length > 0}
            <Button variant="outline" class="mt-4" onClick={clearFilters}>
              필터 초기화
            </Button>
          {/if}
        </div>
        {/if}
      <div class={view === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
        {#each filteredNotes as note}
          {#if view === "list"}
              <NoteCard
                content={note.content}
                createdAt={note.createdAt}
                categories={note.categories}
                bookTitle={note.bookTitle}
                bookCover={note.bookCover}
              />
          {/if}
          {#if view === "grid"}
              <BookNoteCard
                content={note.content}
                createdAt={note.createdAt}
                categories={note.categories}
                bookTitle={note.bookTitle}
                bookCover={note.bookCover}
              />
          {/if}
        {/each}
      </div>
    </div>