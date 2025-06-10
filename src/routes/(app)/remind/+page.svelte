<script lang="ts">
    import { RotateCcw, Star, CheckCircle, Shuffle } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js"
    import * as Card from "$lib/components/ui/card/index.js"
    import { Badge } from "$lib/components/ui/badge/index.js"
    import { Progress } from "$lib/components/ui/progress/index.js"
    import { Label } from "$lib/components/ui/label/index.js"
	import type { Book } from "$lib/type/book/book.js";
	import type { Note } from "$lib/type/note/note.js";
    
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
    let selectedNote: Note | null = null
    let currentView: string = "note-editor"
    let completedNotes: string[] = []
    let randomNotes: Note[] = []

    $: allNotes = books?.flatMap((book) =>
        book.notes?.map((note) => ({
            ...note,
            bookTitle: book.title,
            bookId: book.id,
            book: book,
        })) || []
    ) || []

    $: importantNotes = allNotes.filter((note) => note.isImportant)

    $: todayReminders = (() => {
        const shuffled = [...allNotes].sort(() => Math.random() - 0.5)
        const important = shuffled.filter((note) => note.isImportant).slice(0, 3)
        const regular = shuffled.filter((note) => !note.isImportant).slice(0, 2)
        return [...important, ...regular]
    })()

    $: randomNotes = getRandomNotes()

    function handleNoteClick(note: any) {
        selectedBook = note.book
        selectedNote = note
        currentView = "note-editor"
    }

    function handleCompleteReminder(noteId: string) {
        completedNotes = [...completedNotes, noteId]
    }

    function getRandomNotes() {
        const shuffled = [...allNotes].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 5)
    }

    function refreshRandomNotes() {
        randomNotes = getRandomNotes()
    }
</script>

<div class="p-6 space-y-6 bg-content min-h-full">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">리마인드</h1>
        <p class="text-cool mt-1">복습으로 기억을 더욱 단단하게 만들어보세요</p>
      </div>
      <Button
        onclick={() => refreshRandomNotes()}
        variant="outline"
        class="border-accent text-accent hover:bg-accent/10"
      >
        <Shuffle class="h-4 w-4 mr-2" />
        랜덤 복습
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-6">
        <Card.Root class="border-secondary bg-card">
          <Card.Header>
            <Card.Title class="text-foreground flex items-center gap-2">
              <RotateCcw class="h-5 w-5" />
              오늘의 복습 ({todayReminders.length})
            </Card.Title>
          </Card.Header>
          <Card.Content class="space-y-3">
            {#if todayReminders.length === 0}
              <p class="text-cool text-center py-4">복습할 노트가 없습니다.</p>
            {:else}
              {#each todayReminders as note}
                <div
                  class={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    completedNotes.includes(note.id)
                      ? "bg-green-50 border-green-200"
                      : "bg-muted border-secondary hover:border-accent"
                  }`}
                  onclick={() => !completedNotes.includes(note.id) && handleNoteClick(note)}
                  onkeydown={(e) => e.key === 'Enter' && !completedNotes.includes(note.id) && handleNoteClick(note)}
                  role="button"
                  tabindex="0"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        {#if note.isImportant}
                          <Star class="h-4 w-4 text-accent fill-current" />
                        {/if}
                        <h4 class="font-medium text-foreground">{note.title}</h4>
                      </div>
                      <p class="text-sm text-cool line-clamp-2 mb-2">{note.content}</p>
                      <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                        {note.bookTitle}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant={completedNotes.includes(note.id) ? "default" : "outline"}
                      onclick={(e) => {
                        e.stopPropagation()
                        handleCompleteReminder(note.id)
                      }}
                      class={
                        completedNotes.includes(note.id)
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "border-accent text-accent hover:bg-accent/10"
                      }
                    >
                      <CheckCircle class="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              {/each}
            {/if}
          </Card.Content>
        </Card.Root>

        <Card.Root class="border-secondary bg-card">
          <Card.Header>
            <Card.Title class="text-foreground flex items-center gap-2">
              <Star class="h-5 w-5 text-accent" />
              중요 노트 ({importantNotes.length})
            </Card.Title>
          </Card.Header>
          <Card.Content class="space-y-3">
            {#if importantNotes.length === 0}
              <p class="text-cool text-center py-4">중요 표시된 노트가 없습니다.</p>
            {:else}
              {#each importantNotes.slice(0, 5) as note}
                <div
                  class="p-3 rounded-lg border border-accent/30 bg-accent/5 hover:border-accent/50 transition-all duration-300 cursor-pointer"
                  onclick={() => handleNoteClick(note)}
                  onkeydown={(e) => e.key === 'Enter' && handleNoteClick(note)}
                  role="button"
                  tabindex="0"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-medium text-foreground mb-1">{note.title}</h4>
                      <p class="text-sm text-cool line-clamp-2 mb-2">{note.content}</p>
                      <Badge variant="outline" class="text-xs border-accent/50 text-accent">
                        {note.bookTitle}
                      </Badge>
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </Card.Content>
        </Card.Root>
      </div>

      <div class="space-y-6">
        <Card.Root class="border-secondary bg-card">
          <Card.Header>
            <Card.Title class="text-foreground">복습 통계</Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 rounded-lg bg-muted border border-secondary">
                <div class="text-2xl font-bold text-foreground">{allNotes.length}</div>
                <div class  ="text-sm text-cool">전체 노트</div>
              </div>
              <div class="text-center p-3 rounded-lg bg-accent/10 border border-accent/30">
                <div class="text-2xl font-bold text-foreground">{importantNotes.length}</div>
                <div class="text-sm text-cool">중요 노트</div>
              </div>
              <div class="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                <div class="text-2xl font-bold text-green-700">{completedNotes.length}</div>
                <div class="text-sm text-green-600">오늘 복습</div>
              </div>
              <div class="text-center p-3 rounded-lg bg-primary/10 border border-primary/30">
                <div class="text-2xl font-bold text-foreground">{books.length}</div>
                <div class="text-sm text-cool">읽은 책</div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root class="border-secondary bg-card">
          <Card.Header>
            <Card.Title class="text-foreground flex items-center gap-2">
              <Shuffle class="h-5 w-5" />
              랜덤 복습
            </Card.Title>
          </Card.Header>
          <Card.Content class="space-y-3">
            {#each randomNotes as note}
              <div
                class="p-3 rounded-lg border border-primary/30 bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onclick={() => handleNoteClick(note)}
                onkeydown={(e) => e.key === 'Enter' && handleNoteClick(note)}
                role="button"
                tabindex="0"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      {#if note.isImportant}
                        <Star class="h-4 w-4 text-accent fill-current" />
                      {/if}
                      <h4 class="font-medium text-foreground">{note.title}</h4>
                    </div>
                    <p class="text-sm text-cool line-clamp-1 mb-2">{note.content}</p>
                    <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                      {note.bookTitle}
                    </Badge>
                  </div>
                </div>
              </div>
            {/each}
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>