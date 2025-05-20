<script lang="ts">
    import { MoreHorizontal } from 'lucide-svelte';
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import CategoryTag from '../category/CategoryTag.svelte';            	
    interface NoteCardProps {
        content: string
        createdAt: string
        categories: string[]
        bookTitle?: string
        bookCover?: string
    }
    export let { content, createdAt, categories, bookTitle, bookCover }: NoteCardProps = {
        content: '',
        createdAt: '',
        categories: [],
        bookTitle: '',
        bookCover: ''
    }
</script>
<Card.Root>
    {#if bookTitle && bookCover}
        <div class="p-4 pb-0 flex items-center gap-3">
            <div class="relative h-12 w-8 shrink-0">
                <img src={bookCover || "/placeholder.svg"} alt={bookTitle} class="object-cover rounded" />
    </div>
    <a
        href={`/books/${encodeURIComponent(bookTitle)}`}
        class="font-medium hover:text-[#A02334] transition-colors"
    >
        {bookTitle}
            </a>
        </div>
    {/if}
<Card.Content class="p-4">
    <p class="whitespace-pre-wrap">{content}</p>
</Card.Content>
<Card.Footer class="p-4 pt-0 flex justify-between items-center">
    <div class="flex flex-wrap gap-2">
    {#each categories as category}
        <CategoryTag name={category} size="sm" onclick={() => {}} />
    {/each}
    </div>
    <div class="flex items-center gap-4">
    <span class="text-xs text-muted-foreground">{createdAt}</span>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger >
        <Button variant="ghost" size="icon" class="h-8 w-8">
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