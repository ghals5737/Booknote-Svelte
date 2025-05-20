<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Book, MoreHorizontal, Edit2, Trash } from "lucide-svelte"
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";

    interface CategoryCardProps {
        id: string
        name: string
        count: number
        onDelete: (id: string) => void
    }

    export let id: string
    export let name: string
    export let count: number
    export let onDelete: (id: string) => void

    let isDeleteDialogOpen = false

    function handleDelete() {
        onDelete(id)
        isDeleteDialogOpen = false
    }

</script>

<div>
<Card.Root class="flex flex-col">
<Card.Content class="flex items-center justify-between p-4 flex-1">
    <div class="flex items-center gap-3">
    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-theme-gold/20">
        <Book class="h-5 w-5 text-theme-brown" />
    </div>
    <div>
        <h3 class="font-medium">{name}</h3>
        <p class="text-sm text-muted-foreground">{count}개의 노트</p>
    </div>
    </div>
    <DropdownMenu.Root>
    <DropdownMenu.Trigger >
        <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">메뉴 열기</span>
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
        <DropdownMenu.Item >
        <a href={`/categories/${id}`}>
            <Edit2 class="h-4 w-4 mr-2" />
            수정하기
        </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item class="text-destructive" onclick={() => isDeleteDialogOpen = true}>
        <Trash class="h-4 w-4 mr-2" />
        삭제하기
        </DropdownMenu.Item>
    </DropdownMenu.Content>
    </DropdownMenu.Root>
</Card.Content>
<Card.Footer class="p-4 pt-0">
    <Button
    variant="outline"
    class="w-full text-theme-gold hover:bg-theme-gold hover:text-theme-black"    
    >
    <a href={`/notes?category=${encodeURIComponent(name)}`}>이 카테고리 노트 보기</a>
    </Button>
</Card.Footer>
</Card.Root>

<AlertDialog.Root open={isDeleteDialogOpen} onOpenChange={() => isDeleteDialogOpen = false}>
<AlertDialog.Content>
    <AlertDialog.Header>
    <AlertDialog.Title>카테고리 삭제</AlertDialog.Title>
    <AlertDialog.Description>
        정말로 "{name}" 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
    </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
    <AlertDialog.Cancel>취소</AlertDialog.Cancel>
    <AlertDialog.Action onclick={handleDelete} class="bg-destructive text-destructive-foreground">
        삭제
    </AlertDialog.Action>
    </AlertDialog.Footer>
</AlertDialog.Content>
</AlertDialog.Root>
</div>