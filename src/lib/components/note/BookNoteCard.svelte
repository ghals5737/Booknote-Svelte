<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import CategoryTag from "$lib/components/category/CategoryTag.svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";    
    import MoreHorizontal from "lucide-svelte/icons/more-horizontal"
    
    interface BookNoteCardProps {
        content: string
        createdAt: string
        categories: string[]
        bookTitle: string
        bookCover: string
    }

    export let { content, createdAt, categories, bookTitle, bookCover }: BookNoteCardProps = {
        content: '',
        createdAt: '',
        categories: [],
        bookTitle: '',
        bookCover: ''
    }


</script>

<Card.Root class="overflow-hidden flex flex-col h-full">
    <Card.Header class="p-0">
      <div class="relative h-[120px] w-full bg-muted">
        <img src={bookCover || "/placeholder.svg"} alt={bookTitle} class="object-cover" />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-4">
          <a
            href={`/books/${encodeURIComponent(bookTitle)}`}
            class="text-white font-medium hover:underline line-clamp-1"
          >
            {bookTitle}
        </a>
        </div>
      </div>
    </Card.Header>
    <Card.Content class="p-4 flex-1">
      <p class="line-clamp-4 text-sm">{content}</p>
    </Card.Content>
    <Card.Footer class="p-4 pt-0 flex justify-between items-center">
      <div class="flex flex-wrap gap-1">
        {#each categories as category}
          <CategoryTag name={category} size="sm" onclick={() => {}} />
        {/each}
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">{createdAt}</span>
        <DropdownMenu.Root >
          <DropdownMenu.Trigger>
            <Button variant="ghost" size="icon" class="h-7 w-7">
              <MoreHorizontal class="h-4 w-4" />
              <span class="sr-only">메뉴 열기</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item>수정하기</DropdownMenu.Item>
            <DropdownMenu.Item class="text-destructive">삭제하기</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </Card.Footer>
</Card.Root>