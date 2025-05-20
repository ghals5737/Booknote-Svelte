<script lang="ts">
  import { page } from "$app/stores";
  import { Heart, Save } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  import { Button } from "$lib/components/ui/button/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import NoteCard from '$lib/components/note/NoteCard.svelte';
  import CategoryTag from '$lib/components/category/CategoryTag.svelte';
  import ReadingProgress from '$lib/components/book/ReadingProgress.svelte';
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  //import { toast } from "$lib/components/ui/toast/index.js"
  
  const { id } = $page.params;
  
  const bookData = {
    id: "1",
    title: "사피엔스",
    subtitle: "유인원에서 사이보그까지, 인간 역사의 대담한 역사",
    author: "유발 하라리",
    publisher: "김영사",
    publishedDate: "2015-11-24",
    coverUrl: "/placeholder.svg?height=400&width=300",
    isFavorite: true,
    categories: ["인문", "역사", "과학"],
    totalPages: 524,
    currentPage: 312,
    notes: [
      {
        id: "note1",
        content:
          "인류의 역사는 세 번의 혁명으로 나눌 수 있다: 인지 혁명, 농업 혁명, 과학 혁명. 각각의 혁명은 인류의 생활 방식과 사고방식을 완전히 바꿔놓았다.",
        createdAt: "2023년 4월 12일",
        categories: ["인문", "역사"],
      },
      {
        id: "note2",
        content:
          "허구를 믿는 능력은 호모 사피엔스의 가장 독특하고 중요한 능력이다. 이것이 없었다면 대규모 협력이 불가능했을 것이다.",
        createdAt: "2023년 4월 10일",
        categories: ["인문"],
      },
      {
        id: "note3",
        content:
          "농업 혁명은 인류 역사상 가장 큰 사기라고 할 수 있다. 농업으로 인해 더 많은 음식을 생산할 수 있게 되었지만, 그것이 더 나은 식단이나 더 많은 여가 시간으로 이어지지는 않았다.",
        createdAt: "2023년 4월 5일",
        categories: ["역사", "과학"],
      },
    ],
  }

  let activeTab = "notes"
  let noteContent = ""
  let selectedCategories: string[] = [] 
  let currentPage = bookData.currentPage
  let isUpdatingProgress = false

  const toggleCategory = (category: string) => {
    selectedCategories = selectedCategories.includes(category) ? selectedCategories.filter((c) => c !== category) : [...selectedCategories, category]
  }

  const handleSaveNote = () => {
    if (!noteContent.trim()) return
    // 실제 구현에서는 API 호출을 통해 노트를 저장해야 합니다
    console.log("Saving note:", { content: noteContent, categories: selectedCategories })
    noteContent = ""
    selectedCategories = []
  }

  const handleUpdateProgress = () => {
    // 실제 구현에서는 API 호출을 통해 진행률을 저장해야 합니다
    console.log("Updating progress:", { currentPage })
      // toast({
      //   title: "독서 진행률이 업데이트되었습니다",
      //   description: `${currentPage}/${bookData.totalPages} 페이지 (${Math.round((currentPage / bookData.totalPages) * 100)}%)`,
      // })
    isUpdatingProgress = false
  }

  // 독서 상태 결정
  let readingStatus = "읽기 전"
  if (currentPage >= bookData.totalPages) {
    readingStatus = "완독"
  } else if (currentPage > 0) {
    readingStatus = "읽는 중"
  }
</script>

<div class="container py-6">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="md:col-span-1">
      <div class="relative aspect-3/4 w-full max-w-[300px] mx-auto md:mx-0">
        <img
          src={bookData.coverUrl || "/placeholder.svg"}
          alt={bookData.title}          
          class="object-cover rounded-md"
        />
      </div>
    </div>
    <div class="md:col-span-2 space-y-4">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold">{bookData.title}</h1>
          {#if bookData.subtitle}
            <p class="text-lg text-muted-foreground mt-1">{bookData.subtitle}</p>
          {/if}
        </div>
        <Button
          variant="ghost"
          size="icon"
          class={`rounded-full ${bookData.isFavorite && "text-theme-brown"}`}
          aria-label={bookData.isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          <Heart class={`h-5 w-5 ${bookData.isFavorite && "fill-theme-brown"}`} />
        </Button>
      </div>
      <div class="space-y-1">
        <p class="text-lg">{bookData.author}</p>
        <p class="text-sm text-muted-foreground">
          {bookData.publisher} · {bookData.publishedDate}
        </p>
      </div>
      <div class="flex flex-wrap gap-2 pt-2">
        {#each bookData.categories as category}
          <CategoryTag name={category} onclick={() => {}} />
        {/each}
      </div>

      <div class="bg-theme-gold/10 p-4 rounded-md space-y-3 mt-4">
        <div class="flex justify-between items-center">
          <h3 class="font-medium">독서 진행률</h3>
          <span class="text-sm font-medium">{readingStatus}</span>
        </div>

        <ReadingProgress currentPage={currentPage} totalPages={bookData.totalPages} size="md" className="w-full" />

        {#if !isUpdatingProgress}
          <div class="flex justify-end">
            <Button variant="outline" size="sm" onclick={() => isUpdatingProgress = true}>
              진행률 업데이트
            </Button>
          </div>
          {:else}
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <Label for="currentPage" class="w-24">
                현재 페이지:
              </Label>
              <Input
                id="currentPage"
                type="number"
                min="0"
                max={bookData.totalPages}
                value={currentPage.toString()}
                onchange={(e) => {
                  const target = e.target as HTMLInputElement;
                  currentPage = Number.parseInt(target.value) || 0;
                }}
                class="max-w-[100px]"
              />
              <span class="text-sm text-muted-foreground">/ {bookData.totalPages}페이지</span>
            </div>
            <div class="flex justify-end gap-2">
              <Button variant="outline" size="sm" onclick={() => isUpdatingProgress = false}>
                취소
              </Button>
              <Button size="sm" class="bg-theme-brown hover:bg-theme-brown/90" onclick={handleUpdateProgress}>
                저장
              </Button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <Tabs.Root value={activeTab}  class="space-y-4">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="notes">노트</Tabs.Trigger>
      <Tabs.Trigger value="write">노트 작성</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="notes" class="space-y-4">
      {#each bookData.notes as note}
        <NoteCard content={note.content} createdAt={note.createdAt} categories={note.categories} />
      {/each}
    </Tabs.Content>
    <Tabs.Content value="write">
      <div class="space-y-4 bg-theme-gold/20 p-4 rounded-md">
        <div class="space-y-2">
          <h3 class="font-medium">카테고리 선택</h3>
          <div class="flex flex-wrap gap-2">
            {#each bookData.categories as category}
              <CategoryTag
                name={category}
                isSelected={selectedCategories.includes(category)}
                onclick={() => toggleCategory(category)}
              />
            {/each}
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="font-medium">노트 내용</h3>
          <Textarea
            placeholder="책에 대한 생각이나 인상 깊은 구절을 기록해보세요..."
            class="min-h-[200px] bg-white"
            value={noteContent}
            onchange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              noteContent = target.value;
            }}
          />
        </div>
        <Button
          class="bg-theme-brown hover:bg-theme-brown/90"
          onclick={handleSaveNote}
          disabled={!noteContent.trim()}
        >
          <Save class="h-4 w-4 mr-2" />
          저장하기
        </Button>
      </div>
    </Tabs.Content>
  </Tabs.Root>
</div>

