<script lang="ts">
  import { Filter, Plus, Search, SortDesc } from "lucide-svelte"
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import RecentBookCard  from "$lib/components/book/RecentBookCard.svelte"
  import CategoryTag  from "$lib/components/category/CategoryTag.svelte"

  // 가상의 책 데이터
  const mockBooks = [
    {
      id: "1",
      title: "사피엔스",
      author: "유발 하라리",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 4월 12일",
      noteCount: 5,
      isFavorite: true,
      categories: ["인문", "역사", "과학"],
    },
    {
      id: "2",
      title: "아몬드",
      author: "손원평",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 4월 10일",
      noteCount: 3,
      isFavorite: false,
      categories: ["소설", "성장"],
    },
    {
      id: "3",
      title: "달러구트 꿈 백화점",
      author: "이미예",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 4월 5일",
      noteCount: 2,
      isFavorite: true,
      categories: ["소설", "판타지"],
    },
    {
      id: "4",
      title: "어린왕자",
      author: "생텍쥐페리",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 3월 28일",
      noteCount: 4,
      isFavorite: false,
      categories: ["소설", "고전"],
    },
    {
      id: "5",
      title: "이기적 유전자",
      author: "리처드 도킨스",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 3월 20일",
      noteCount: 6,
      isFavorite: false,
      categories: ["과학", "생물학"],
    },
    {
      id: "6",
      title: "총, 균, 쇠",
      author: "재레드 다이아몬드",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 3월 15일",
      noteCount: 3,
      isFavorite: true,
      categories: ["역사", "인류학"],
    },
    {
      id: "7",
      title: "팩트풀니스",
      author: "한스 로슬링",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 3월 10일",
      noteCount: 2,
      isFavorite: false,
      categories: ["인문", "사회과학"],
    },
    {
      id: "8",
      title: "원씽",
      author: "게리 켈러",
      coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
      lastUpdated: "2023년 3월 5일",
      noteCount: 1,
      isFavorite: false,
      categories: ["자기계발"],
    },
  ]

  // 상태 관리 (반응형 변수)
  let searchQuery = ''
  let selectedCategories: string[] = []
  let showFavoritesOnly = false
  let sortOrder: "newest" | "oldest" | "title" | "author" = "newest"

  // 모든 카테고리 추출
  $: allCategories = [...new Set(mockBooks.flatMap(book => book.categories))]

  // 필터링된 책 목록
  $: filteredBooks = mockBooks
      .filter((book) => {
        // 검색어 필터링
        if (
          searchQuery &&
          !book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !book.author.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false
        }

        // 카테고리 필터링
        if (selectedCategories.length > 0 && !book.categories.some((cat) => selectedCategories.includes(cat))) {
          return false
        }

        // 즐겨찾기 필터링
        if (showFavoritesOnly && !book.isFavorite) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        // 정렬
        switch (sortOrder) {
          case "newest":
            return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
          case "oldest":
            return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          case "title":
            return a.title.localeCompare(b.title)
          case "author":
            return a.author.localeCompare(b.author)
          default:
            return 0
        }
      })

  // 카테고리 토글 함수
  function toggleCategory(category: string) {
    selectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
  }

  // 필터 초기화 함수
  function clearFilters() {
    selectedCategories = []
    searchQuery = ''
    showFavoritesOnly = false
  }
</script>

<div class="container py-6 space-y-6">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <h1 class="text-3xl font-bold">내 서재</h1>
    <div class="flex items-center gap-2">
      <div class="relative flex-1 md:w-64">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="책 제목, 저자 검색..."
          class="pl-8"
          bind:value={searchQuery}
        />
      </div>

      <DropdownMenu.DropdownMenu>
        <DropdownMenu.DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <Filter class="h-4 w-4" />
            <span class="sr-only">필터</span>
          </Button>
        </DropdownMenu.DropdownMenuTrigger>
        <DropdownMenu.DropdownMenuContent align="end" class="w-56">
          <DropdownMenu.DropdownMenuLabel>필터</DropdownMenu.DropdownMenuLabel>
          <DropdownMenu.DropdownMenuSeparator />

          <DropdownMenu.DropdownMenuGroup>
            <DropdownMenu.DropdownMenuLabel class="text-xs font-normal text-muted-foreground">카테고리</DropdownMenu.DropdownMenuLabel>
            <div class="p-2 flex flex-wrap gap-1">
              {#each allCategories as category}
                <CategoryTag
                  name={category}
                  size="sm"
                  isSelected={selectedCategories.includes(category)}
                  onclick={() => toggleCategory(category)}
                />
              {/each}
            </div>
          </DropdownMenu.DropdownMenuGroup>

          <DropdownMenu.DropdownMenuSeparator />

          <DropdownMenu.DropdownMenuItem
            onselect={() => showFavoritesOnly = !showFavoritesOnly}
            class="flex items-center gap-2"
          >
            <div
              class={`w-3 h-3 rounded-full ${showFavoritesOnly ? "bg-theme-brown" : "border border-muted-foreground"}`}
            ></div>
            <span>즐겨찾기만 보기</span>
          </DropdownMenu.DropdownMenuItem>

          <DropdownMenu.DropdownMenuSeparator />

          <DropdownMenu.DropdownMenuItem onselect={clearFilters}>필터 초기화</DropdownMenu.DropdownMenuItem>
        </DropdownMenu.DropdownMenuContent>
      </DropdownMenu.DropdownMenu>

      <DropdownMenu.DropdownMenu>
        <DropdownMenu.DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <SortDesc class="h-4 w-4" />
            <span class="sr-only">정렬</span>
          </Button>
        </DropdownMenu.DropdownMenuTrigger>
        <DropdownMenu.DropdownMenuContent align="end">
          <DropdownMenu.DropdownMenuItem
            onselect={() => sortOrder = "newest"}
            class={sortOrder === "newest" ? "bg-muted" : ""}
          >
            최신순
          </DropdownMenu.DropdownMenuItem>
          <DropdownMenu.DropdownMenuItem
            onselect={() => sortOrder = "oldest"}
            class={sortOrder === "oldest" ? "bg-muted" : ""}
          >
            오래된순
          </DropdownMenu.DropdownMenuItem>
          <DropdownMenu.DropdownMenuItem
            onselect={() => sortOrder = "title"}
            class={sortOrder === "title" ? "bg-muted" : ""}
          >
            제목순
          </DropdownMenu.DropdownMenuItem>
          <DropdownMenu.DropdownMenuItem
            onselect={() => sortOrder = "author"}
            class={sortOrder === "author" ? "bg-muted" : ""}
          >
            저자순
          </DropdownMenu.DropdownMenuItem>
        </DropdownMenu.DropdownMenuContent>
      </DropdownMenu.DropdownMenu>

      <Button class="bg-theme-brown hover:bg-theme-brown/90">
        <a href="/books/add" class="flex items-center gap-2">
          <Plus class="h-4 w-4" />
          <span class="hidden md:inline">책 등록</span>
        </a>
      </Button>
    </div>
  </div>

  {#if selectedCategories.length > 0 || showFavoritesOnly}
    <div class="flex flex-wrap gap-2 items-center">
      <span class="text-sm text-muted-foreground">필터:</span>
      {#each selectedCategories as category}
        <CategoryTag
          name={category}
          size="sm"
          isSelected={true}
          onclick={() => toggleCategory(category)}
        />
      {/each}
      {#if showFavoritesOnly}
        <CategoryTag name="즐겨찾기" size="sm" isSelected={true} onclick={() => showFavoritesOnly = false} />
      {/if}
      <Button variant="ghost" size="sm" onclick={clearFilters} class="h-6 px-2 text-xs">
        초기화
      </Button>
    </div>
  {/if}

  {#if filteredBooks.length === 0}
    <div class="flex flex-col items-center justify-center py-12 text-center">
      <div class="w-16 h-20 bg-muted flex items-center justify-center rounded-md mb-4">
        <Search class="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 class="text-lg font-medium">책을 찾을 수 없습니다</h3>
      <p class="text-muted-foreground mt-1">
        {#if searchQuery || selectedCategories.length > 0 || showFavoritesOnly}
          검색 조건에 맞는 책이 없습니다. 다른 검색어나 필터를 시도해보세요.
        {:else}
          아직 등록한 책이 없습니다. 새 책을 등록해보세요.
        {/if}
      </p>
      {#if searchQuery || selectedCategories.length > 0 || showFavoritesOnly}
        <Button variant="outline" class="mt-4" onclick={clearFilters}>
          필터 초기화
        </Button>
      {/if}
      <Button class="mt-2 bg-theme-brown hover:bg-theme-brown/90">
        <a href="/books/search">책 등록하기</a>
      </Button>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each filteredBooks as book}
        <RecentBookCard
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl}
          lastUpdated={book.lastUpdated}
          noteCount={book.noteCount}
          isFavorite={book.isFavorite}
        />
      {/each}
    </div>
  {/if}
</div>
 

