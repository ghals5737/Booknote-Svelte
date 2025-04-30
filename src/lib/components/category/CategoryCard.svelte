<script lang="ts">
    import Card from "$lib/components/ui/card/Card.svelte"
    import CardContent from "$lib/components/ui/card/CardContent.svelte"
    import CardFooter from "$lib/components/ui/card/CardFooter.svelte"
    import { Book, MoreHorizontal, Edit2, Trash } from "lucide-svelte"
    import Button from "$lib/components/ui/button/Button.svelte"
    import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte"
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte"
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte"
    import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte"
    import AlertDialog from "$lib/components/ui/alert-dialog/AlertDialog.svelte"
    import AlertDialogContent from "$lib/components/ui/alert-dialog/AlertDialogContent.svelte"
    import AlertDialogHeader from "$lib/components/ui/alert-dialog/AlertDialogHeader.svelte"
    import AlertDialogTitle from "$lib/components/ui/alert-dialog/AlertDialogTitle.svelte"
    import AlertDialogDescription from "$lib/components/ui/alert-dialog/AlertDialogDescription.svelte"
    import AlertDialogFooter from "$lib/components/ui/alert-dialog/AlertDialogFooter.svelte"
    import AlertDialogCancel from "$lib/components/ui/alert-dialog/AlertDialogCancel.svelte"
    import AlertDialogAction from "$lib/components/ui/alert-dialog/AlertDialogAction.svelte"

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
<Card class="flex flex-col">
<CardContent class="flex items-center justify-between p-4 flex-1">
    <div class="flex items-center gap-3">
    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-theme-gold/20">
        <Book class="h-5 w-5 text-theme-brown" />
    </div>
    <div>
        <h3 class="font-medium">{name}</h3>
        <p class="text-sm text-muted-foreground">{count}개의 노트</p>
    </div>
    </div>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" class="h-8 w-8">
        <MoreHorizontal class="h-4 w-4" />
        <span class="sr-only">메뉴 열기</span>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
        <a href={`/categories/${id}`}>
            <Edit2 class="h-4 w-4 mr-2" />
            수정하기
        </a>
        </DropdownMenuItem>
        <DropdownMenuItem class="text-destructive" onClick={() => isDeleteDialogOpen = true}>
        <Trash class="h-4 w-4 mr-2" />
        삭제하기
        </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
</CardContent>
<CardFooter class="p-4 pt-0">
    <Button
    variant="outline"
    class="w-full text-theme-gold hover:bg-theme-gold hover:text-theme-black"
    asChild
    >
    <a href={`/notes?category=${encodeURIComponent(name)}`}>이 카테고리 노트 보기</a>
    </Button>
</CardFooter>
</Card>

<AlertDialog open={isDeleteDialogOpen} onOpenChange={() => isDeleteDialogOpen = false}>
<AlertDialogContent>
    <AlertDialogHeader>
    <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
    <AlertDialogDescription>
        정말로 "{name}" 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
    </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
    <AlertDialogCancel>취소</AlertDialogCancel>
    <AlertDialogAction onClick={handleDelete} class="bg-destructive text-destructive-foreground">
        삭제
    </AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>
</div>