<script lang="ts">
    import { MoreHorizontal } from 'lucide-svelte';
    import Card from '$lib/components/ui/card/Card.svelte';
    import CardContent from '$lib/components/ui/card/CardContent.svelte';
    import CardFooter from '$lib/components/ui/card/CardFooter.svelte';
    import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
    import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
    import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
    import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
    import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
    import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
    import Button from '$lib/components/ui/button/Button.svelte';
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
<Card>
    {#if bookTitle && bookCover}
        <div class="p-4 pb-0 flex items-center gap-3">
            <div class="relative h-12 w-8 flex-shrink-0">
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
<CardContent class="p-4">
    <p class="whitespace-pre-wrap">{content}</p>
</CardContent>
<CardFooter class="p-4 pt-0 flex justify-between items-center">
    <div class="flex flex-wrap gap-2">
    {#each categories as category}
        <CategoryTag name={category} size="sm" />
    {/each}
    </div>
    <div class="flex items-center gap-4">
    <span class="text-xs text-muted-foreground">{createdAt}</span>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" class="h-8 w-8">
            <MoreHorizontal class="h-4 w-4" />
            <span class="sr-only">메뉴 열기</span>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem>수정하기</DropdownMenuItem>
        <DropdownMenuItem class="text-destructive">삭제하기</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </div>
</CardFooter>
</Card>