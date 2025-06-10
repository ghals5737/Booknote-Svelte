<script lang="ts">
    import { ArrowLeft, Save, Star, Tag, Plus } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { onMount } from "svelte";
	import { page } from "$app/stores";
	import type { Book } from "$lib/type/book/book.js";
	import { goto } from "$app/navigation";
    import { marked } from "marked";
    import TiptapEditor from "$lib/components/editor/TiptapEditor.svelte";
    const { id } = $page.params;    
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
    
    let initialNote = {
        id: "",
        title: "",
        content: "",
        html: "",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isImportant: false,
    }

    const handleSave = () => {
        
    }

    const handleAddTag = () => {
        // if (initialNote.tags.includes(initialNote.tags.trim())) {
        // initialNote.tags([...initialNote.tags, initialNote.tags.trim()])
        // initialNote.tags("")
        // }
    }

    const handleRemoveTag = (tag: string) => {

    }


    onMount(() => {
        selectedBook = books.find(book => book.id === id) ?? null
        if (selectedBook) {
            initialNote = {
                id: "",
                title: "",
                content: "",
                html: "",
                tags: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                isImportant: false,
            }
        }
        console.log("Note editor mounted");
        console.log("selectedBook", selectedBook)
        console.log("initialNote", initialNote)
    })
</script>

{#if !selectedBook}
    <div class="flex justify-center items-center h-full">
        <p class="text-2xl font-bold">책을 찾을 수 없습니다.</p>
    </div>
{:else}
    <div class="p-6 space-y-6 bg-content min-h-full">
        <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
            <Button
            variant="ghost"
            onclick={() => goto(`/book-detail/${id}`)}
            class="text-cool hover:bg-secondary hover:text-foreground"
            >
            <ArrowLeft class="h-4 w-4 mr-2" />책 상세로 돌아가기
            </Button>
            <div>
            <h1 class="text-2xl font-bold text-foreground">{initialNote.title ? "노트 수정" : "새 노트 작성"}</h1>
            <p class="text-cool">{selectedBook.title}</p>
            </div>
        </div>
        <Button
            onclick={handleSave}
            disabled={!initialNote.title.trim() || !initialNote.content.trim()}
            class="bg-primary hover:from-primary/90 hover:to-accent/90 text-white"
        >
            <Save class="h-4 w-4 mr-2" />
            저장
        </Button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-6">
            <Card.Root class="border-secondary bg-card">
            <Card.Header>
                <Card.Title class="text-foreground">노트 작성</Card.Title>
            </Card.Header>
            <Card.Content class="space-y-4">
                <div class="flex items-center gap-2">
                <Input
                    placeholder="노트 제목을 입력하세요"
                    bind:value={initialNote.title}
                    class="flex-1 border-secondary focus:border-accent bg-muted text-foreground placeholder:text-cool"
                />
                <Button
                    variant={initialNote.isImportant ? "default" : "outline"}
                    size="sm"
                    onclick={() => initialNote.isImportant = !initialNote.isImportant}
                    class={
                    initialNote.isImportant
                        ? "bg-accent hover:bg-accent/90 text-white"
                        : "border-accent text-accent hover:bg-accent/10"
                    }
                >
                    <Star class={`h-4 w-4 ${initialNote.isImportant ? "fill-current" : ""}`} />
                </Button>
                </div>

                <TiptapEditor
                    bind:content={initialNote.content}
                    bind:html={initialNote.html}
                />

                <div class="space-y-2">
                <div class="flex items-center gap-2">
                    <Input
                    placeholder="태그 추가"
                    bind:value={initialNote.tags}
                    onkeypress={(e) => e.key === "Enter" && handleAddTag()}
                    class="flex-1 border-secondary focus:border-accent bg-muted text-foreground placeholder:text-cool"
                    />
                    <Button
                    onclick={handleAddTag}
                    size="sm"
                    variant="outline"
                    class="border-accent text-accent hover:bg-accent/10"
                    >
                    <Plus class="h-4 w-4" />
                    </Button>
                </div>

                {#if initialNote.tags.length > 0}
                    <div class="flex flex-wrap gap-2">
                    {#each initialNote.tags as tag}
                        <Badge                        
                        variant="secondary"
                        class="bg-ice text-primary cursor-pointer hover:bg-ice/80 border border-primary/20"
                        onclick={() => handleRemoveTag(tag)}
                        >
                            <Tag class="h-3 w-3 mr-1" />
                            {tag}
                            <span class="ml-1 text-xs">×</span>
                        </Badge>
                    {/each}
                    </div>
                {/if}
                </div>  
            </Card.Content>
            </Card.Root>
        </div>

        <div class="space-y-6">
            <Card.Root class="border-secondary bg-card">
            <Card.Header>
                <Card.Title class="text-foreground">미리보기</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="space-y-4">
                <div class="flex items-center gap-2">
                    {#if initialNote.isImportant}
                        <Star class="h-4 w-4 text-accent fill-current" />
                    {/if}
                    <h3 class="text-lg font-semibold text-foreground">{initialNote.title || "제목을 입력하세요"}</h3>
                </div>

                <div class="prose prose-slate dark:prose-invert max-w-none">
                    {@html initialNote.html}
                </div>

                {#if initialNote.tags.length > 0}
                    <div class="flex flex-wrap gap-2 pt-2 border-t border-secondary">
                    {#each initialNote.tags as tag}
                        <Badge variant="outline" class="border-accent/30 text-accent">
                            {tag}
                        </Badge>
                    {/each}
                    </div>
                {/if}
                </div>
            </Card.Content>
            </Card.Root>

            <Card.Root class="border-secondary bg-card">
            <Card.Header>
                <Card.Title class="text-foreground">마크다운 가이드</Card.Title>
            </Card.Header>
            <Card.Content class="text-sm text-cool space-y-2">
                <p>
                <code class="bg-muted px-1 rounded"># 제목</code> - 큰 제목
                </p>
                <p>
                <code class="bg-muted px-1 rounded">## 소제목</code> - 작은 제목
                </p>
                <p>
                <code class="bg-muted px-1 rounded">**굵게**</code> - 굵은 글씨
                </p>
                <p>
                <code class="bg-muted px-1 rounded">*기울임*</code> - 기울임 글씨
                </p>
                <p>
                <code class="bg-muted px-1 rounded">- 목록</code> - 불릿 목록
                </p>
            </Card.Content>
            </Card.Root>
        </div>
        </div>
    </div>
{/if}


