<script lang="ts">
    import { ArrowLeft, Calendar, Check, Save, Search, Upload } from 'lucide-svelte';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import BookScan from '$lib/components/book/BookScan.svelte';
    import * as Popover from "$lib/components/ui/popover/index.js";
    //import CalendarComponent from '$lib/components/ui/calendar/Calendar.svelte';    
    // import { toast } from "$lib/components/ui/toast/index.js"
    import ReadingProgress from '$lib/components/book/ReadingProgress.svelte';
    import CategoryTag from '$lib/components/category/CategoryTag.svelte';

    import { format } from "date-fns"
    import { ko } from "date-fns/locale"
    
    let coverImage:any = null;
    const mockSearchResults = [
      {
        id: "1",
        title: "사피엔스",
        author: "유발 하라리",
        publisher: "김영사",
        publishedDate: "2015-11-24",
        coverUrl: "/abstract-human-history.png",
        isRegistered: false,
        totalPages: 524,
      },
      {
        id: "2",
        title: "아몬드",
        author: "손원평",
        publisher: "창비",
        publishedDate: "2017-03-31",
        coverUrl: "/abstract-almond-cover.png",
        isRegistered: false,
        totalPages: 272,
      },
      {
        id: "3",
        title: "달러구트 꿈 백화점",
        author: "이미예",
        publisher: "팩토리나인",
        publishedDate: "2020-07-08",
        coverUrl: "/dream-department-store-cover.png",
        isRegistered: false,
        totalPages: 308,
      },
    ]
    const allCategories = [
      "인문",
      "역사",
      "과학",
      "소설",
      "성장",
      "판타지",
      "자기계발",
      "경제",
      "고전",
      "생물학",
      "인류학",
      "사회과학",
    ]
    let searchQuery = ""
    let searchResults: typeof mockSearchResults = []
    let isSearching = false
    let selectedBook: any = null

  // 책 정보 상태
  let bookInfo = {
    title: "",
    author: "",
    publisher: "",
    publishedDate: "",
    isbn: "",
    coverUrl: "https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg",
    description: "",
    categories: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    rating: 0,
    notes: "",
    totalPages: 0,
    currentPage: 0,
    readingStatus: "not-started" as "not-started" | "in-progress" | "completed",
  }

  const handleSearch = (e: Event) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    isSearching = true

    // 실제 구현에서는 API 호출을 해야 합니다
    setTimeout(() => {
      searchResults  = mockSearchResults.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      isSearching = false
    }, 500)
  }

  const selectBook = (book: any) => {
    selectedBook = book
    bookInfo = {
      ...bookInfo,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      publishedDate: book.publishedDate,
      coverUrl: book.coverUrl,
      totalPages: book.totalPages || 0,
      currentPage: 0,
      readingStatus: "not-started",
    }           
  }

  const toggleCategory = (category: string) => {
    bookInfo = {
      ...bookInfo,
      categories: bookInfo.categories.includes(category)
        ? bookInfo.categories.filter((c) => c !== category)
        : [...bookInfo.categories, category],
    }
  }

  const handleSave = () => {
    if (!bookInfo.title) {
      // toast({
      //   title: "책 제목을 입력해주세요",
      //   variant: "destructive",
      // })
      return
    }

    if (!bookInfo.author) {
      // toast({
      //   title: "저자를 입력해주세요",
      //   variant: "destructive",
      // })
      return
    }

    // 독서 상태 업데이트
    let readingStatus = bookInfo.readingStatus
    if (bookInfo.totalPages > 0) {
      if (bookInfo.currentPage === 0) {
        readingStatus = "not-started"
      } else if (bookInfo.currentPage >= bookInfo.totalPages) {
        readingStatus = "completed"
      } else {
        readingStatus = "in-progress"
      }
    }

    // 실제 구현에서는 API 호출을 통해 책을 저장해야 합니다
    console.log("Saving book:", { ...bookInfo, readingStatus })

    // toast({
    //   title: "책이 등록되었습니다",
    //   description: "내 서재에서 확인할 수 있습니다.",
    // })

    // 저장 후 내 서재 페이지로 이동
    window.location.href = "/books"
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      // 실제 구현에서는 이미지 업로드 API를 호출해야 합니다
      // 여기서는 임시로 URL.createObjectURL을 사용합니다
      const imageUrl = URL.createObjectURL(file)
      bookInfo = {
        ...bookInfo,
        coverUrl: imageUrl,
      }
    }
  }

  const handleCurrentPageChange = (e: any) => {
    const value = Number.parseInt(e.target.value) || 0
    const currentPage = Math.max(0, Math.min(value, bookInfo.totalPages))

    let readingStatus = "not-started"
    if (currentPage === 0) {
      readingStatus = "not-started"
    } else if (currentPage >= bookInfo.totalPages) {
      readingStatus = "completed"
    } else {
      readingStatus = "in-progress"
    }

    bookInfo = {
      ...bookInfo,
      currentPage,
      readingStatus: readingStatus as "not-started" | "in-progress" | "completed",
    }
  }

  const handleTotalPagesChange = (e: any) => {
    const value = Number.parseInt(e.target.value) || 0
    const totalPages = Math.max(0, value)

    // 현재 페이지가 총 페이지보다 크면 조정
    let currentPage = bookInfo.currentPage
    if (currentPage > totalPages) {
      currentPage = totalPages
    }

    let readingStatus = bookInfo.readingStatus
    if (currentPage === 0) {
      readingStatus = "not-started"
    } else if (currentPage >= totalPages && totalPages > 0) {
      readingStatus = "completed"
    } else if (currentPage > 0) {
      readingStatus = "in-progress"
    }

    bookInfo = {
      ...bookInfo,
      totalPages,
      currentPage,
      readingStatus: readingStatus as "not-started" | "in-progress" | "completed",
    }
  }

  const setReadingStatus = (status: "not-started" | "in-progress" | "completed") => {
    let currentPage = bookInfo.currentPage

    if (status === "not-started") {
      currentPage = 0
    } else if (status === "completed") {
      currentPage = bookInfo.totalPages
    } else if (status === "in-progress" && (currentPage === 0 || currentPage >= bookInfo.totalPages)) {
      // 읽는 중으로 변경 시 현재 페이지가 0이거나 총 페이지와 같으면 중간값으로 설정
      currentPage = Math.floor(bookInfo.totalPages / 2)
    }

    bookInfo = {
      ...bookInfo,
      readingStatus: status,
      currentPage,
    }
  }
</script>
  
<div class="container py-6 space-y-6 max-w-4xl">
  <div class="flex items-center gap-4">
    <Button variant="ghost" size="icon">
      <a href="/books">
        <ArrowLeft class="h-5 w-5" />
        <span class="sr-only">뒤로 가기</span>
      </a>
    </Button>
    <h1 class="text-3xl font-bold">새 책 등록</h1>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">    
    <div class="md:col-span-1 space-y-4">
      <Card.Root>
        <Card.Content class="p-4 space-y-4">
          <h2 class="text-lg font-semibold">책 검색</h2>
          <form onsubmit={handleSearch} class="space-y-2">
            <div class="flex gap-2">
              <Input
                type="search"
                placeholder="책 제목, 저자 검색"
                value={searchQuery}
                onchange={(e: any) => searchQuery = e.target.value}
                class="flex-1"
              />
              <Button
                type="submit"
                class="bg-theme-gold hover:bg-theme-gold/90 text-theme-black"
                disabled={isSearching}
              >
                <Search class="h-4 w-4" />
                <span class="sr-only">검색</span>
              </Button>
            </div>
          </form>

          {#if isSearching}
            <div class="text-center py-4">검색 중...</div>
          {:else if searchResults.length > 0}
            <div class="space-y-2 max-h-[300px] overflow-y-auto">
              {#each searchResults as book}
                <div
                  class={`flex gap-2 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                    selectedBook?.id === book.id ? "bg-muted" : ""
                  }`}
                  onclick={() => selectBook(book)}
                  onkeydown={(e) => e.key === 'Enter' && selectBook(book)}
                  tabindex="0"
                  role="button"
                >
                  <div class="relative h-16 w-12 shrink-0">
                    <img
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      class="object-cover rounded"
                    />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium line-clamp-1">{book.title}</p>
                    <p class="text-xs text-muted-foreground">{book.author}</p>
                    <p class="text-xs text-muted-foreground">{book.publisher}</p>
                  </div>
                  {#if selectedBook?.id === book.id}
                    <div class="flex items-center">
                      <Check class="h-4 w-4 text-theme-brown" />
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {:else}
            <div class="text-center py-4">검색 결과가 없습니다.</div>
          {/if}

          <Separator />

          <div class="relative aspect-3/4 w-full bg-muted rounded-md overflow-hidden">
            <img
              src={bookInfo.coverUrl || "/placeholder.svg"}
              alt={bookInfo.title || "책 표지"}
              class="object-cover"
            />
          </div>
          <div class="space-y-2">
            <Label for="cover">책 표지 업로드</Label>
            <div class="flex items-center gap-2">
              <Input id="cover" type="file" accept="image/*" class="hidden" onchange={handleImageUpload} />
              <Button
                variant="outline"
                class="w-full"
                onclick={() => document.getElementById("cover")?.click()}
              >
                <Upload class="h-4 w-4 mr-2" />
                이미지 업로드
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="md:col-span-2 space-y-4">
      <Card.Root>
        <Card.Content class="p-6 space-y-4">
          <h2 class="text-xl font-semibold">책 정보</h2>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="title">책 제목 *</Label>
              <Input
                id="title"
                value={bookInfo.title}
                onchange={(e: any) => bookInfo.title = e.target.value}
                placeholder="책 제목을 입력하세요"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="author">저자 *</Label>
              <Input
                id="author"
                value={bookInfo.author}
                onchange={(e: any) => bookInfo.author = e.target.value}
                placeholder="저자를 입력하세요"
                required
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="publisher">출판사</Label>
                <Input
                  id="publisher"
                  value={bookInfo.publisher}
                  onchange={(e: any) => bookInfo.publisher = e.target.value}
                  placeholder="출판사를 입력하세요"
                />
              </div>

              <div class="space-y-2">
                <Label for="publishedDate">출판일</Label>
                <Input
                  id="publishedDate"
                  value={bookInfo.publishedDate}
                  onchange={(e: any) => bookInfo.publishedDate = e.target.value}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={bookInfo.isbn}
                onchange={(e: any) => bookInfo.isbn = e.target.value}
                placeholder="ISBN을 입력하세요"
              />
            </div>

            <div class="space-y-4 p-4 bg-theme-gold/10 rounded-md">
              <h3 class="font-medium">독서 진행률</h3>

              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={bookInfo.readingStatus === "not-started" ? "default" : "outline"}
                    class={
                      bookInfo.readingStatus === "not-started" ? "bg-theme-brown hover:bg-theme-brown/90" : ""
                    }
                    onclick={() => setReadingStatus("not-started")}
                  >
                    읽기 전
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={bookInfo.readingStatus === "in-progress" ? "default" : "outline"}
                    class={
                      bookInfo.readingStatus === "in-progress"
                        ? "bg-theme-gold hover:bg-theme-gold/90 text-theme-black"
                        : ""
                    }
                    onclick={() => setReadingStatus("in-progress")}
                  >
                    읽는 중
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={bookInfo.readingStatus === "completed" ? "default" : "outline"}
                    class={
                      bookInfo.readingStatus === "completed" ? "bg-theme-brown hover:bg-theme-brown/90" : ""
                    }
                    onclick={() => setReadingStatus("completed")}
                  >
                    완독
                  </Button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <Label for="totalPages">총 페이지</Label>
                  <Input
                    id="totalPages"
                    type="number"
                    min="0"
                    value={String(bookInfo.totalPages) || ""}
                    onchange={handleTotalPagesChange}
                    placeholder="총 페이지 수"
                  />
                </div>

                <div class="space-y-2">
                  <Label for="currentPage">현재 페이지</Label>
                  <Input
                    id="currentPage"
                    type="number"
                    min="0"
                    max={bookInfo.totalPages}
                    value={String(bookInfo.currentPage) || ""}
                    onchange={handleCurrentPageChange}
                    placeholder="현재 읽은 페이지"
                    disabled={bookInfo.totalPages === 0}
                  />
                </div>
              </div>

              {#if bookInfo.totalPages > 0}
                <!-- <ReadingProgress currentPage={bookInfo.currentPage} totalPages={bookInfo.totalPages} size="md" /> -->
              {/if}
            </div>

            <div class="space-y-2">
              <Label>카테고리</Label>
              <div class="flex flex-wrap gap-2">
                {#each allCategories as category}
                  <CategoryTag
                    name={category}
                    isSelected={bookInfo.categories.includes(category)}
                    onclick={() => toggleCategory(category)}
                  />
                {/each}
              </div>
            </div>

            <div class="space-y-2">
              <Label for="description">책 소개</Label>
              <Textarea
                id="description"
                value={bookInfo.description}
                onchange={(e: any) => bookInfo.description = e.target.value}
                placeholder="책에 대한 간단한 소개나 설명을 입력하세요"
                rows={4}
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label>독서 시작일</Label>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline" class="w-full justify-start text-left font-normal">
                      <Calendar class="mr-2 h-4 w-4" />
                      {#if bookInfo.startDate}
                        {format(bookInfo.startDate, "PPP", { locale: ko })}
                      {:else}
                        <span>날짜 선택</span>
                      {/if}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0">
                    <!-- <CalendarComponent
                      mode="single"
                      selected={bookInfo.startDate || undefined}
                      onSelect={(date) => setBookInfo((prev) => ({ ...prev, startDate: date }))}
                      initialFocus
                    /> -->
                  </Popover.Content>
                </Popover.Root>
              </div>

              <div class="space-y-2">
                <Label>독서 완료일</Label>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="outline" class="w-full justify-start text-left font-normal">
                      <Calendar class="mr-2 h-4 w-4" />
                      {#if bookInfo.endDate}
                        {format(bookInfo.endDate, "PPP", { locale: ko })}
                      {:else}
                        <span>날짜 선택</span>
                      {/if}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content class="w-auto p-0">
                    <!-- <CalendarComponent
                      mode="single"
                      selected={bookInfo.endDate || undefined}
                      onSelect={(date) => setBookInfo((prev) => ({ ...prev, endDate: date }))}
                      initialFocus
                    /> -->
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>

            <div class="space-y-2">
              <Label>별점</Label>
              <div class="flex items-center gap-1">
                {#each [1, 2, 3, 4, 5] as star}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    class={`h-8 w-8 ${bookInfo.rating >= star ? "text-theme-gold" : "text-muted"}`}
                    onclick={() => bookInfo.rating = star}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </Button>
                {/each}
                <span class="ml-2 text-sm text-muted-foreground">
                  {bookInfo.rating > 0 ? `${bookInfo.rating}점` : "평가 없음"}
                </span>
              </div>
            </div>

            <div class="space-y-2">
              <Label for="notes">메모</Label>
              <Textarea
                id="notes"
                value={bookInfo.notes}
                onchange={(e: any) => bookInfo.notes = e.target.value}
                placeholder="책에 대한 간단한 메모나 감상을 남겨보세요"
                rows={3}
              />
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <div class="flex justify-end gap-4 pt-4">
        <Button variant="outline" >
          <a href="/books">취소</a>
        </Button>
        <Button class="bg-theme-brown hover:bg-theme-brown/90" onclick={handleSave}>
          <Save class="h-4 w-4 mr-2" />책 등록하기
        </Button>
      </div>
    </div>
  </div>
</div>