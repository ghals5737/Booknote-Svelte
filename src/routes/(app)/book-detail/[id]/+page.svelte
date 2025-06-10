<script lang="ts">
    import { ArrowLeft, Plus, Edit, Star, Clock, Tag } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Progress } from "$lib/components/ui/progress/index.js";
	import type { Book } from "$lib/type/book/book.js";
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";

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
    let selectedNote: any
    let currentView: string = "note-editor"

    function handleNoteClick(note: any) {
        selectedNote = note
        currentView = "note-editor"
    }

    function handleAddNote() {
        selectedNote = null
        currentView = "note-editor"
    }
    
    function handleBackToLibrary() {
        goto("/library")
    }

    $: selectedBook = books.find(book => book.id === id)
</script>

{#if selectedBook}
    <div class="p-6 space-y-6 bg-content min-h-full">
        <div class="flex items-center gap-4">
            <Button
                variant="ghost"
                onclick={handleBackToLibrary}
                class="text-cool hover:bg-secondary hover:text-foreground"
            >
                <ArrowLeft class="h-4 w-4 mr-2" />
                서재로 돌아가기
            </Button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-1">
                <Card.Root class="border-secondary bg-card">
                    <Card.Content class="p-6">
                        <div class="aspect-[3/4] w-full mb-4 rounded-lg overflow-hidden bg-muted">
                            <img
                                src={selectedBook.cover || "/placeholder.svg"}
                                alt={selectedBook.title}
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <h2 class="text-xl font-bold text-foreground mb-2">{selectedBook.title}</h2>
                        <p class="text-cool mb-4">{selectedBook.author}</p>

                        <div class="space-y-4">
                            <Badge variant="secondary" class="bg-ice text-primary border border-primary/20">
                                {selectedBook.category}
                            </Badge>

                            <div class="space-y-2">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-cool">읽기 진행률</span>
                                    <span class="text-foreground font-medium">{selectedBook.progress}%</span>
                                </div>
                                <Progress value={selectedBook.progress} class="h-2" />
                </div>

                            <div class="text-sm text-cool">
                                <p>시작일: {selectedBook.createdAt.toLocaleDateString()}</p>
                                <p>노트 수: {selectedBook.notes.length}개</p>
                            </div>
                        </div>
                    </Card.Content>
                </Card.Root>
            </div>

            <div class="lg:col-span-2">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-2xl font-bold text-foreground">노트 목록</h3>
                    <Button
                        onclick={handleAddNote}
                        class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                    >
                        <Plus class="h-4 w-4 mr-2" />
                        노트 추가
                    </Button>
                </div>

                <div class="space-y-4">
                    {#if selectedBook.notes.length === 0}
                        <Card.Root class="border-secondary bg-card">
                            <Card.Content class="p-8 text-center">
                                <p class="text-cool mb-4">아직 작성된 노트가 없습니다.</p>
                                <Button
                                    onclick={handleAddNote}
                                    variant="outline"
                                    class="border-accent text-accent hover:bg-accent/10"
                                >
                                    첫 번째 노트 작성하기
                                </Button>
                            </Card.Content>
                        </Card.Root>
                    {:else}
                        {#each selectedBook.notes as note (note.id)}
                            <Card.Root
                                class="cursor-pointer hover:shadow-lg transition-all duration-300 border-secondary hover:border-accent bg-card hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5"
                                onclick={() => handleNoteClick(note)}
                            >
                                <Card.Header class="pb-3">
                                    <div class="flex items-start justify-between">
                                        <Card.Title class="text-lg text-foreground flex items-center gap-2">
                                            {#if note.isImportant}
                                                <Star class="h-4 w-4 text-accent fill-current" />
                                            {/if}
                                            {note.title}
                                        </Card.Title>
                                        <Button variant="ghost" size="sm" class="text-cool hover:bg-secondary hover:text-foreground">
                                            <Edit class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Content class="pt-0">
                                    <p class="text-cool mb-3 line-clamp-2">{note.content}</p>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center gap-2">
                                            <Tag class="h-4 w-4 text-accent" />
                                            <div class="flex gap-1">
                                                {#each note.tags as tag}
                                                    <Badge variant="outline" class="text-xs border-accent/30 text-accent">
                                                        {tag}
                                                    </Badge>
                                                {/each}
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1 text-sm text-cool">
                                            <Clock class="h-4 w-4" />
                                            <span>{note.updatedAt.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </Card.Content>
                            </Card.Root>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="p-6 bg-content min-h-full">
        <p class="text-cool">책을 선택해주세요.</p>
    </div>
{/if}