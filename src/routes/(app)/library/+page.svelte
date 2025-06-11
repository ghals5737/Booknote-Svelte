<script lang="ts">
    import { Plus, BookOpen, Clock } from "lucide-svelte"
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js"
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Progress } from "$lib/components/ui/progress/index.js";
	  import type { Book } from "$lib/type/book/book.js";
	  import AddBookDialog from "$lib/components/book/AddBookDialog.svelte";
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
            currentPage: 100,
            totalPages: 200,
            publisher: "현대지성",
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
            currentPage: 100,
            totalPages: 200,
            publisher: "현대지성",
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
            currentPage: 100,
            totalPages: 200,
            publisher: "현대지성",
            createdAt: new Date("2024-02-10"),
            notes: [],
        },
    ]

    let showAddBookDialog = false    
</script>

<div class="p-6 space-y-6 bg-content min-h-full">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">내 서재</h1>
        <p class="text-cool mt-1">총 {books.length}권의 책이 있습니다</p>
      </div>
      <Button
        onclick={() => showAddBookDialog = true}
        class="bg-primary hover:from-primary/90 hover:to-accent/90 text-white"
      >
        <Plus class="h-4 w-4 " />책 추가
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each books as book}
        <Card.Root          
          class="cursor-pointer hover:shadow-lg transition-all duration-300 border-secondary hover:border-accent bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5"
          onclick={() => {goto(`/book-detail/${book.id}`)}}
        >
          <Card.Header class="pb-3">
            <div class="aspect-[3/4] w-full mb-3 rounded-lg overflow-hidden bg-muted">
              <img src={book.cover || "/placeholder.svg"} alt={book.title} class="w-full h-full object-cover" />
            </div>
            <Card.Title class="text-lg text-foreground line-clamp-2">{book.title}</Card.Title>
            <p class="text-sm text-cool">{book.author}</p>
          </Card.Header>
          <Card.Content class="pt-0">
            <div class="space-y-3">
              <Badge variant="secondary" class="bg-ice text-primary border border-primary/20">
                {book.category}
              </Badge>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-cool">읽기 진행률</span>
                  <span class="text-foreground font-medium">{book.progress}%</span>
                </div>
                <Progress value={book.progress} class="h-2" />
              </div>

              <div class="flex items-center justify-between text-sm text-cool">
                <div class="flex items-center gap-1">
                  <BookOpen class="h-4 w-4" />
                  <span>{book.notes.length}개 노트</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  <span>{book.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>

    <AddBookDialog books={books} bind:open={showAddBookDialog} />
</div>