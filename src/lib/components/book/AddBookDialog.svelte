<script lang="ts">
    import { Plus } from "lucide-svelte"
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import type { Book } from "$lib/type/book/book.js";

    export let books: Book[] = []    
    export let open: boolean
    
    let title = ""
    let author = ""
    let category = ""
    let progress = 0

  const categories = ["자기계발", "개발", "역사", "소설", "에세이", "경제", "과학", "철학", "기타"]

  const handleSubmit = () => {
    e.preventDefault()

    if (!title.trim() || !author.trim() || !category) return

    addBook({
      title: title.trim(),
      author: author.trim(),
      category,
      cover: `/placeholder.svg?height=200&width=150&query=${encodeURIComponent(title + " book cover")}`,
      notes: [],
      progress,
    })

    // Reset form
    title = ""
    author = ""
    category = ""
    progress = 0
    onOpenChange(false)
  }
</script>

<Dialog.Root>
    <Dialog.Content class="sm:max-w-[425px] bg-card border-secondary">
      <Dialog.Header>
        <Dialog.Title class="text-foreground">새 책 추가</Dialog.Title>
      </Dialog.Header>
      <form onsubmit={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="title" class="text-cool">
            책 제목
          </Label>
          <Input
            id="title"
            bind:value={title}
            placeholder="책 제목을 입력하세요"
            class="border-secondary focus:border-accent bg-muted text-foreground placeholder:text-cool"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="author" class="text-cool">
            저자
          </Label>
          <Input
            id="author"
            bind:value={author}
            placeholder="저자명을 입력하세요"
            class="border-secondary focus:border-accent bg-muted text-foreground placeholder:text-cool"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="category" class="text-cool">
            카테고리
          </Label>
          <Select.Root type="single" bind:value={category}>
            <Select.Trigger class="border-secondary focus:border-accent bg-muted text-foreground">              
                {category}
            </Select.Trigger>
            <Select.Content class="bg-card border-secondary">
              {#each categories as cat}
                <Select.Item value={cat} class="text-foreground hover:bg-muted">
                  {cat}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <div class="space-y-2">
          <Label for="progress" class="text-cool">
            읽기 진행률 (%)
          </Label>
          <Input
            id="progress"
            type="number"
            min="0"
            max="100"
            bind:value={progress}
            placeholder="0"
            class="border-secondary focus:border-accent bg-muted text-foreground placeholder:text-cool"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onclick={() => open = false}
            class="border-accent text-accent hover:bg-accent/10"
          >
            취소
          </Button>
          <Button
            type="submit"
            class="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            추가
          </Button>
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root>