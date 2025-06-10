<script lang="ts">
    import { BarChart3, BookOpen, FileText, Calendar, TrendingUp, Tag } from "lucide-svelte"
    import { Input } from "$lib/components/ui/input/index.js"
    import * as Card from "$lib/components/ui/card/index.js"
    import { Progress } from "$lib/components/ui/progress/index.js"
    import { Badge } from "$lib/components/ui/badge/index.js"
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
    
    const getStats = () => {
        const totalBooks = books.length
        const totalNotes = books.reduce((sum, book) => sum + book.notes.length, 0)
        const totalProgress = books.reduce((sum, book) => sum + book.progress, 0)
        const avgProgress = totalBooks > 0 ? Math.round(totalProgress / totalBooks) : 0

        const allNotes = books.flatMap((book) => book.notes.map((note) => ({ ...note, bookTitle: book.title })))

        const importantNotes = allNotes.filter((note) => note.isImportant).length

        // 카테고리별 통계
        const categoryStats = books.reduce(
        (acc, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1
            return acc
        },
        {} as Record<string, number>,
        )

        // 태그별 통계
        const tagStats = allNotes.reduce(
        (acc, note) => {
            note.tags.forEach((tag) => {
            acc[tag] = (acc[tag] || 0) + 1
            })
            return acc
        },
        {} as Record<string, number>,
        )

        // 월별 활동 (최근 6개월)
        const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

        const booksThisMonth = books.filter((book) => {
            const bookDate = new Date(book.createdAt)
            const bookMonthKey = `${bookDate.getFullYear()}-${String(bookDate.getMonth() + 1).padStart(2, "0")}`
            return bookMonthKey === monthKey
        }).length

        const notesThisMonth = allNotes.filter((note) => {
            const noteDate = new Date(note.createdAt)
            const noteMonthKey = `${noteDate.getFullYear()}-${String(noteDate.getMonth() + 1).padStart(2, "0")}`
            return noteMonthKey === monthKey
        }).length

        return {
            month: date.toLocaleDateString("ko-KR", { month: "short" }),
            books: booksThisMonth,
            notes: notesThisMonth,
        }
        }).reverse()

        return {
        totalBooks,
        totalNotes,
        avgProgress,
        importantNotes,
        categoryStats,
        tagStats,
        monthlyActivity,
        }
    }

    $: stats = getStats()

    $: topCategories = Object.entries(stats.categoryStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)

    $: topTags = Object.entries(stats.tagStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)

</script>

<div class="p-6 space-y-6 bg-content min-h-full">
    <div>
      <h1 class="text-3xl font-bold text-foreground">통계</h1>
      <p class="text-cool mt-1">나의 독서 활동을 한눈에 확인해보세요</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card.Root class="border-secondary bg-card">
        <Card.Content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-cool">읽은 책</p>
              <p class="text-2xl font-bold text-foreground">{stats.totalBooks}</p>
            </div>
            <BookOpen class="h-8 w-8 text-accent" />
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root class="border-secondary bg-card">
        <Card.Content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-cool">작성한 노트</p>
              <p class="text-2xl font-bold text-foreground">{stats.totalNotes}</p>
            </div>
            <FileText class="h-8 w-8 text-accent" />
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root class="border-secondary bg-card">
        <Card.Content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-cool">평균 진행률</p>
              <p class="text-2xl font-bold text-foreground">{stats.avgProgress}%</p>
            </div>
            <TrendingUp class="h-8 w-8 text-accent" />
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root class="border-secondary bg-card">
        <Card.Content class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-cool">중요 노트</p>
              <p class="text-2xl font-bold text-foreground">{stats.importantNotes}</p>
            </div>
            <BarChart3 class="h-8 w-8 text-accent" />
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card.Root class="border-secondary bg-card">
        <Card.Header>
          <Card.Title class="text-foreground flex items-center gap-2">
            <Calendar class="h-5 w-5" />
            월별 활동 (최근 6개월)
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            {#each stats.monthlyActivity as month (month.month)}
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-foreground font-medium">{month.month}</span>
                  <span class="text-cool">
                    책 {month.books}권, 노트 {month.notes}개
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-cool">책</span>
                      <span class="text-foreground">{month.books}</span>
                    </div>
                    <Progress value={month.books * 20} class="h-2" />
                  </div>
                  <div class="space-y-1">
                    <div class="flex justify-between text-xs">
                      <span class="text-cool">노트</span>
                      <span class="text-foreground">{month.notes}</span>
                    </div>
                    <Progress value={Math.min(month.notes * 10, 100)} class="h-2" />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
      <Card.Root class="border-secondary bg-card">
        <Card.Header>
          <Card.Title class="text-foreground flex items-center gap-2">
            <BookOpen class="h-5 w-5" />
            카테고리별 책 수
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="space-y-3">
            {#if topCategories.length === 0}
              <p class="text-cool text-center py-4">아직 책이 없습니다.</p>
            {:else}
              {#each topCategories as [category, count]}
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-foreground font-medium">{category}</span>
                    <span class="text-cool">{count}권</span>
                  </div>
                  <Progress value={(count / stats.totalBooks) * 100} class="h-2" />
                </div>
              {/each}
            {/if}
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <Card.Root class="border-secondary bg-card">
      <Card.Header>
        <Card.Title class="text-foreground flex items-center gap-2">
          <Tag class="h-5 w-5" />
          자주 사용하는 태그
        </Card.Title>
      </Card.Header>
      <Card.Content>
        {#if topTags.length === 0}
          <p class="text-cool text-center py-4">아직 태그가 없습니다.</p>
        {:else}
          <div class="flex flex-wrap gap-2">
            {#each topTags as [tag, count]}
              <Badge
                variant="secondary"
                class="bg-ice text-primary hover:bg-ice/80 cursor-pointer border border-primary/20"
                style="font-size: {Math.min(0.75 + count * 0.1, 1.2)}rem; padding: {Math.min(4 + count, 8)}px {Math.min(8 + count * 2, 16)}px;"
              >
                {tag} ({count})
              </Badge>
            {/each}
          </div>
        {/if}
      </Card.Content>
    </Card.Root>

    <Card.Root class="border-secondary bg-card">
      <Card.Header>
        <Card.Title class="text-foreground">읽기 진행률 분포</Card.Title>
      </Card.Header>
      <Card.Content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each books as book}
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-foreground font-medium truncate">{book.title}</span>
                <span class="text-cool">{book.progress}%</span>
              </div>
              <Progress value={book.progress} class="h-2" />
            </div>
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>