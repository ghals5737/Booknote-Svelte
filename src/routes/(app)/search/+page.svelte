<script lang="ts">
    import { Search, BookOpen, FileText, Tag, Clock } from "lucide-svelte"
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
	import type { Book } from "$lib/type/book/book.js";
	import { goto } from "$app/navigation";


    let books: Book[] = [
        {
            id: "1",
            title: "아토믹 해빗",
            author: "제임스 클리어",
            cover: "/placeholder.svg?height=200&width=150",
            category: "자기계발",
            progress: 75,
            createdAt: new Date("2024-01-15"),
            notes: [
            {
                id: "1",
                title: "1% 법칙의 힘",
                content: "매일 1%씩 개선하면 1년 후 37배 성장한다. 작은 변화가 복리 효과를 만든다.",
                tags: ["핵심개념", "수학"],
                createdAt: new Date("2024-01-16"),
                updatedAt: new Date("2024-01-16"),
                isImportant: true,
            },
            {
                id: "2",
                title: "습관 스택킹",
                content: '기존 습관에 새로운 습관을 연결하는 방법. "커피를 마신 후에 명상을 5분 한다"',
                tags: ["실천방법", "습관"],
                createdAt: new Date("2024-01-18"),
                updatedAt: new Date("2024-01-18"),
                isImportant: false,
            },
            ],
        },
        {
            id: "2",
            title: "클린 코드",
            author: "로버트 C. 마틴",
            cover: "/placeholder.svg?height=200&width=150",
            category: "개발",
            progress: 45,
            createdAt: new Date("2024-02-01"),
            notes: [
            {
                id: "3",
                title: "의미있는 이름 짓기",
                content: "변수명, 함수명은 그 의도를 명확히 드러내야 한다. 주석이 필요없을 정도로.",
                tags: ["네이밍", "기본원칙"],
                createdAt: new Date("2024-02-02"),
                updatedAt: new Date("2024-02-02"),
                isImportant: true,
            },
            ],
        },
        {
            id: "3",
            title: "사피엔스",
            author: "유발 하라리",
            cover: "/placeholder.svg?height=200&width=150",
            category: "역사",
            progress: 20,
            createdAt: new Date("2024-02-10"),
            notes: [],
        },
    ]
    let selectedBook: Book | null = null
    let searchQuery = ""

    $: searchResults = getSearchResults()

    function getSearchResults() {
    if (!searchQuery.trim()) return { books: [], notes: [] }

        const query = searchQuery.toLowerCase()
        const matchedBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query),
    )

    const matchedNotes = books.flatMap((book) =>
      book.notes
        .filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query) ||
            note.tags.some((tag) => tag.toLowerCase().includes(query)),
        )
        .map((note) => ({ ...note, bookTitle: book.title, bookId: book.id })),
    )

    return { books: matchedBooks, notes: matchedNotes }
  }

  function handleBookClick(book: any) {
        goto(`/book-detail/${book.id}`)
  }

  function handleNoteClick(note: any) {
    const book = books.find((b) => b.id === note.bookId)
    if (book) {
    //   selectedBook = book
    //   selectedNote = note
    //   currentView = "note-editor"
    }
  }

  function highlightText(text: string, query: string) {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return `<mark class="bg-accent/20 text-accent px-1 rounded">${part}</mark>`
      }
      return part
    }).join('')
  }
    
</script>

<div class="p-6 space-y-6 bg-content min-h-full">
    <div class="space-y-4">
      <h1 class="text-3xl font-bold text-foreground">검색</h1>

      <div class="relative max-w-2xl">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent" />
        <Input
          placeholder="책 제목, 저자, 노트 내용, 태그를 검색하세요..."
          value={searchQuery}
          onchange={(e) => searchQuery = (e.target as HTMLInputElement).value}
          class="pl-10 border-secondary focus:border-accent text-lg py-3 bg-muted text-foreground placeholder:text-cool"
        />
      </div>
    </div>

    {#if searchQuery.trim()}
      <div class="space-y-6">
        <div class="text-sm text-cool">
          검색 결과: 책 {searchResults.books.length}권, 노트 {searchResults.notes.length}개
        </div>

        {#if searchResults.books.length > 0}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-foreground flex items-center gap-2">
              <BookOpen class="h-5 w-5" />책 ({searchResults.books.length})
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each searchResults.books as book}
                <Card.Root
                  class="cursor-pointer hover:shadow-lg transition-all duration-300 border-secondary hover:border-accent bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5"
                  onclick={() => handleBookClick(book)}
                >
                  <Card.Content class="p-4">
                    <div class="flex gap-3">
                      <div class="w-12 h-16 rounded bg-muted flex-shrink-0">
                        <img
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          class="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-foreground truncate">
                          {highlightText(book.title, searchQuery)}
                        </h3>
                        <p class="text-sm text-cool truncate">{highlightText(book.author, searchQuery)}</p>
                        <Badge
                          variant="secondary"
                          class="bg-ice text-primary text-xs mt-1 border border-primary/20"
                        >
                          {highlightText(book.category, searchQuery)}
                        </Badge>
                        <p class="text-xs text-cool mt-1">{book.notes.length}개 노트</p>
                      </div>
                    </div>
                  </Card.Content>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/if}

        {#if searchResults.notes.length > 0}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold text-foreground flex items-center gap-2">
              <FileText class="h-5 w-5" />
              노트 ({searchResults.notes.length})
            </h2>
            <div class="space-y-3">
              {#each searchResults.notes as note}
                <Card.Root                  
                  class="cursor-pointer hover:shadow-lg transition-all duration-300 border-secondary hover:border-accent bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5"
                  onclick={() => handleNoteClick(note)}
                >
                  <Card.Content class="p-4">
                    <div class="space-y-2">
                      <div class  ="flex items-start justify-between">
                        <h3 class="font-semibold text-foreground">{highlightText(note.title, searchQuery)}</h3>
                        <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                          {note.bookTitle}
                        </Badge>
                      </div>

                      <p class="text-cool text-sm line-clamp-2">{highlightText(note.content, searchQuery)}</p>

                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <Tag class="h-4 w-4 text-accent" />
                          <div class="flex gap-1">
                            {#each note.tags as tag}
                              <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                                {highlightText(tag, searchQuery)}
                              </Badge>
                            {/each}
                          </div>
                        </div>
                        <div class="flex items-center gap-1 text-xs text-cool">
                          <Clock class="h-3 w-3" />
                          <span>{note.updatedAt.toLocaleDateString()}</span>
                        </div>
                      </div>  
                    </div>
                  </Card.Content>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/if}

        {#if searchResults.books.length === 0 && searchResults.notes.length === 0}
          <Card.Root class="border-secondary bg-card">
            <Card.Content   class="p-8 text-center">
              <Search class="h-12 w-12 text-accent mx-auto mb-4" />
              <p class="text-foreground mb-2">검색 결과가 없습니다</p>
              <p class="text-sm text-cool">다른 키워드로 검색해보세요</p>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
    {/if}

    {#if !searchQuery.trim()}
      <Card.Root class="border-secondary bg-card">
        <Card.Content class="p-8 text-center">
          <Search class="h-12 w-12 text-accent mx-auto mb-4" />
          <p class="text-foreground mb-2">검색어를 입력해주세요</p>
          <p class="text-sm text-cool">책 제목, 저자, 노트 내용, 태그를 검색할 수 있습니다</p>
        </Card.Content>
      </Card.Root>
    {/if}
</div>