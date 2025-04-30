<script lang="ts">
    import Card from "$lib/components/ui/card/Card.svelte"
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte"
    import CardContent from "$lib/components/ui/card/CardContent.svelte"
    import CardFooter from "$lib/components/ui/card/CardFooter.svelte"
    import CategoryTag from "$lib/components/category/CategoryTag.svelte"
    import Button from "$lib/components/ui/button/Button.svelte"
    import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte"
    import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte"
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte"
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte"
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

<Card class="overflow-hidden flex flex-col h-full">
    <CardHeader class="p-0">
      <div class="relative h-[120px] w-full bg-muted">
        <img src={bookCover || "/placeholder.svg"} alt={bookTitle} class="object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <a
            href={`/books/${encodeURIComponent(bookTitle)}`}
            class="text-white font-medium hover:underline line-clamp-1"
          >
            {bookTitle}
        </a>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-4 flex-1">
      <p class="line-clamp-4 text-sm">{content}</p>
    </CardContent>
    <CardFooter class="p-4 pt-0 flex justify-between items-center">
      <div class="flex flex-wrap gap-1">
        {#each categories as category}
          <CategoryTag name={category} size="sm" />
        {/each}
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-muted-foreground">{createdAt}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" class="h-7 w-7">
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