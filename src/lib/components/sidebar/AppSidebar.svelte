<script lang="ts">
    import { BookOpen, Search, RotateCcw, BarChart3, Home, Plus } from "lucide-svelte"
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	  import type { Book } from "$lib/type/book/book.js";
	import { goto } from "$app/navigation";

    let currentView = "";

    const books: Book[] = [
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

    const menuItems = [
        {
            title: "내 서재",
            icon: Home,
            view: "library" as const,
        },
        {
            title: "검색",
            icon: Search,
            view: "search" as const,
        },
        {
            title: "리마인드",
            icon: RotateCcw,
            view: "remind" as const,
        },
        {
            title: "통계",
            icon: BarChart3,
            view: "stats" as const,
        },
    ]

    function setCurrentView(view: string) {
        goto(`/${view}`);
    }
</script>

<Sidebar.Root class="border-r border-secondary bg-background">
    <Sidebar.Header class="border-b border-secondary">
      <div class="flex items-center gap-3 px-3 py-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <BookOpen class="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-foreground">Booknote</h1>
          <p class="text-sm text-cool">Smart Library</p>
        </div>
      </div>
    </Sidebar.Header>

    <Sidebar.Content class="bg-background">
      <Sidebar.Group>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each menuItems as item}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  onclick={() => setCurrentView(item.view)}
                  isActive={currentView === item.view}
                  class="text-cool hover:bg-secondary hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <item.icon class="h-4 w-4" />
                  <span>{item.title}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>

      <Sidebar.Group>
        <Sidebar.GroupLabel class="text-accent">최근 읽은 책</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {#each books.slice(0, 3) as book}
              <Sidebar.MenuItem >
                <Sidebar.MenuButton
                  onclick={() => {
                    setCurrentView("book-detail")
                  }}
                  class="text-cool hover:bg-secondary hover:text-foreground"
                >
                  <BookOpen class="h-4 w-4" />
                  <span class="truncate">{book.title}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Footer class="border-t border-secondary bg-background">
      <Button
        class="w-full hover:from-primary/90 hover:to-accent/90 text-white"
        onclick={() => setCurrentView("library")}
      >
        <Plus className="h-4 w-4 mr-2" />새 책 추가
      </Button>
    </Sidebar.Footer>
  </Sidebar.Root>

