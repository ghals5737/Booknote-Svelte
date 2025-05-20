<script lang="ts">
    import { ArrowLeft, Save } from "lucide-svelte"
    import { goto } from "$app/navigation"
    //import { toast } from "$lib/components/ui/toast/index.js"
    import { Button } from "$lib/components/ui/button/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import CategoryTag from "$lib/components/category/CategoryTag.svelte"

    const mockBooks = [
        { id: "1", title: "사피엔스", author: "유발 하라리" },
        { id: "2", title: "아몬드", author: "손원평" },
        { id: "3", title: "달러구트 꿈 백화점", author: "이미예" },
        { id: "4", title: "어린왕자", author: "생텍쥐페리" },
        { id: "5", title: "이기적 유전자", author: "리처드 도킨스" },
        { id: "6", title: "총, 균, 쇠", author: "재레드 다이아몬드" },
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

    let selectedBook = ""
    let title = ""
    let content = ""
    let selectedCategories: string[] = []
    let newCategory = ""

    const toggleCategory = (category: string) => {
        selectedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category]
    }

    const addNewCategory = () => {
        if (!newCategory.trim()) return
        if (!allCategories.includes(newCategory) && !selectedCategories.includes(newCategory)) {
            selectedCategories = [...selectedCategories, newCategory]
            newCategory = ""
        }
    }

    const handleSaveNote = () => {
        if (!selectedBook) {
            // toast({
            //     title: "책을 선택해주세요",
            //     variant: "destructive",
            // })
            return
        }

        if (!content.trim()) {
            // toast({
            //     title: "노트 내용을 입력해주세요",
            //     variant: "destructive",
            // })
            return
        }
        console.log("Saving note:", {
            bookId: selectedBook,
            title,
            content,
            categories: selectedCategories,
        })

        // toast({
        //     title: "노트가 저장되었습니다",
        //     description: "노트 목록에서 확인할 수 있습니다.",
        // })
        goto("/notes")
    }
</script>

<div class="container py-6 space-y-6 max-w-3xl">
    <div class="flex items-center gap-4">
      <Button variant="ghost" size="icon">
        <a href="/notes">
          <ArrowLeft class="h-5 w-5" />
          <span class="sr-only">뒤로 가기</span>
        </a>
      </Button>
      <h1 class="text-3xl font-bold">새 노트 작성</h1>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <Label for="book">책 선택</Label>
        <Select.Root
          type="single"
          bind:value={selectedBook} 
        >
          <Select.Trigger id="book">
            노트를 작성할 책을 선택하세요
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              <Select.Label>내 서재</Select.Label>
              {#each mockBooks as book}
                <Select.Item value={book.id}>
                  {book.title} - {book.author}
                </Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      <div class="space-y-2">
        <Label for="title">제목 (선택사항)</Label>
        <Input
          id="title"
          placeholder="노트 제목을 입력하세요"
          value={title}
          onchange={(e: any) => title = e.target.value}
        />
      </div>

      <div class="space-y-2">
        <Label for="content">노트 내용</Label>
        <Textarea
          id="content"
          placeholder="책에 대한 생각이나 인상 깊은 구절을 기록해보세요..."
          class="min-h-[300px]"
          value={content}
          onchange={(e: any) => content = e.target.value}
        />
      </div>

      <div class="space-y-2">
        <Label>카테고리</Label>
        <div class="flex flex-wrap gap-2 mb-2">
          {#each allCategories as category}
            <CategoryTag
              name={category}
              isSelected={selectedCategories.includes(category)}
              onclick={() => toggleCategory(category)}
            />
          {/each}
        </div>
        <div class="flex gap-2">
          <Input
            placeholder="새 카테고리 추가"
            value={newCategory}
            onchange={(e: any) => newCategory = e.target.value}
            onkeydown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addNewCategory()
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onclick={addNewCategory}
            disabled={!newCategory.trim()}
            class="shrink-0"
          >
            추가
          </Button>
        </div>
      </div>

      <div class="bg-theme-gold/20 p-4 rounded-md">
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="text-sm font-medium">선택된 카테고리:</span>
          {#if selectedCategories.length === 0}
            <span class="text-sm text-muted-foreground">선택된 카테고리가 없습니다</span>
          {:else}
            {#each selectedCategories as category}
              <CategoryTag
                name={category}
                isSelected={true}
                onclick={() => toggleCategory(category)}
              />
            {/each}
          {/if}
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <Button variant="outline">
          <a href="/notes">취소</a>
        </Button>
        <Button class="bg-theme-brown hover:bg-theme-brown/90" onclick={handleSaveNote}>
          <Save class="h-4 w-4 mr-2" />
          저장하기
        </Button>
      </div>
    </div>
</div>
