<script lang="ts">
    import { Plus } from "lucide-svelte"
    import Button from "$lib/components/ui/button/Button.svelte"
    import Input  from "$lib/components/ui/input/Input.svelte"
    import CategoryCard from "$lib/components/category/CategoryCard.svelte"

    const initialCategories = [
        { id: "1", name: "인문", count: 12 },
        { id: "2", name: "역사", count: 8 },
        { id: "3", name: "과학", count: 5 },
        { id: "4", name: "소설", count: 15 },
        { id: "5", name: "자기계발", count: 7 },
        { id: "6", name: "경제", count: 4 },
    ]

    let categories = initialCategories
    let newCategory = ""

    const handleAddCategory = (e: Event) => {
        e.preventDefault()
        if (!newCategory.trim()) return

        const newId = String(Date.now())
        categories = [...categories, { id: newId, name: newCategory, count: 0 }]
        newCategory = ""
    }

    const handleDeleteCategory = (id: string) => {
        categories = categories.filter((category) => category.id !== id)
    }
</script>

<div class="container py-6 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-bold">카테고리 관리</h1>
      <form onsubmit={handleAddCategory} class="flex gap-2">
        <Input
          type="text"
          placeholder="새 카테고리 이름"
          value={newCategory}
          on:change={(e) => newCategory = (e.target as HTMLInputElement).value}
          class="max-w-[200px]"
        />
        <Button
          type="submit"
          class="bg-theme-gold hover:bg-theme-gold/90 text-theme-black"
          disabled={!newCategory.trim()}
        >
          <Plus class="h-4 w-4 mr-2" />
          추가
        </Button>
      </form>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each initialCategories as category}
        <CategoryCard          
          id={category.id}
          name={category.name}
          count={category.count}
          onDelete={handleDeleteCategory}
        />
      {/each}
    </div>
</div>
