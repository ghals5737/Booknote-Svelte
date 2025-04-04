<script>
    import { Plus, Search, Tag, MoreHorizontal, Trash2, Edit2, BookOpen } from 'lucide-svelte';
    import Button from '$lib/components/ui/button/Button.svelte';
    import Card from '$lib/components/ui/card/Card.svelte';
    import CardContent from '$lib/components/ui/card/CardContent.svelte';
    import CardHeader from '$lib/components/ui/card/CardHeader.svelte';
    import CardTitle from '$lib/components/ui/card/CardTitle.svelte';
    import Input from '$lib/components/ui/input/Input.svelte';
    import Label from '$lib/components/ui/label/Label.svelte';
    import Dialog from '$lib/components/ui/dialog/Dialog.svelte';
    import DialogContent from '$lib/components/ui/dialog/DialogContent.svelte';
    import DialogDescription from '$lib/components/ui/dialog/DialogDescription.svelte';
    import DialogFooter from '$lib/components/ui/dialog/DialogFooter.svelte';
    import DialogHeader from '$lib/components/ui/dialog/DialogHeader.svelte';
    import DialogTitle from '$lib/components/ui/dialog/DialogTitle.svelte';
    import DialogTrigger from '$lib/components/ui/dialog/DialogTrigger.svelte';
    import DropdownMenu from '$lib/components/ui/dropdown-menu/DropdownMenu.svelte';
    import DropdownMenuContent from '$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte';
    import DropdownMenuItem from '$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte';
    import DropdownMenuTrigger from '$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte';
    
    // Mock data for demonstration
    let categories = [
      { id: "1", name: "Fiction", count: 12, color: "#2E8B57" },
      { id: "2", name: "Science", count: 8, color: "#8B4513" },
      { id: "3", name: "Biography", count: 5, color: "#4682B4" },
      { id: "4", name: "Self-Help", count: 7, color: "#CD853F" },
      { id: "5", name: "History", count: 4, color: "#708090" },
      { id: "6", name: "Philosophy", count: 3, color: "#556B2F" },
      { id: "7", name: "Poetry", count: 2, color: "#800080" },
      { id: "8", name: "Fantasy", count: 9, color: "#B8860B" },
    ];
    
    let dialogOpen = false;
  </script>
  
  <div class="container py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#8B4513]">Categories</h1>
      
      <Dialog bind:open={dialogOpen}>
        <DialogTrigger asChild>
          <Button class="bg-[#8B4513] hover:bg-[#6d3710]">
            <Plus class="mr-2 h-4 w-4" />
            New Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to organize your books
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="name">Category Name</Label>
              <Input id="name" placeholder="Enter category name" />
            </div>
            <div class="grid gap-2">
              <Label for="color">Color</Label>
              <div class="flex gap-2">
                {#each ["#2E8B57", "#8B4513", "#4682B4", "#CD853F", "#708090", "#556B2F", "#800080", "#B8860B"] as color}
                  <button
                    class="w-8 h-8 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
                    style="background-color: {color}"
                  />
                {/each}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" on:click={() => dialogOpen = false}>Cancel</Button>
            <Button class="bg-[#8B4513] hover:bg-[#6d3710]">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    
    <div class="mb-6 flex items-center">
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          class="pl-8"
        />
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each categories as category}
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-xl font-semibold">{category.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal class="h-4 w-4" />
                  <span class="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit2 class="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem class="text-destructive">
                  <Trash2 class="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded-full mr-2" 
                  style="background-color: {category.color}"
                />
                <span class="text-sm text-muted-foreground">
                  {category.count} {category.count === 1 ? 'book' : 'books'}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <BookOpen class="mr-2 h-4 w-4" />
                View Books
              </Button>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </div>