<script>
    import { Search, Plus, BookOpen } from 'lucide-svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';
    
    // Mock data for demonstration
    const notes = [
      {
        id: "1",
        title: "Character Analysis: Jay Gatsby",
        bookTitle: "The Great Gatsby",
        excerpt: "Gatsby's character represents the American Dream and its ultimate failure...",
        date: "2023-04-15",
        tags: ["character", "analysis", "symbolism"],
      },
      {
        id: "2",
        title: "Themes of Justice",
        bookTitle: "To Kill a Mockingbird",
        excerpt: "The novel explores various forms of justice and injustice through the trial...",
        date: "2023-03-22",
        tags: ["themes", "justice", "society"],
      },
      {
        id: "3",
        title: "Dystopian Elements",
        bookTitle: "1984",
        excerpt: "Orwell's vision of a totalitarian future includes several key dystopian elements...",
        date: "2023-02-10",
        tags: ["dystopia", "totalitarianism", "surveillance"],
      },
    ];
  </script>
  
  <div class="container py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#8B4513]">My Notes</h1>
      <Button class="bg-[#8B4513] hover:bg-[#6d3710]">
        <Plus class="mr-2 h-4 w-4" />
        New Note
      </Button>
    </div>
    
    <div class="flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-64 space-y-4">
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            class="pl-8"
          />
        </div>
        
        <Card>
          <CardHeader class="py-4">
            <CardTitle class="text-base">Filter by Tags</CardTitle>
          </CardHeader>
          <CardContent class="py-2">
            <div class="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" class="rounded-full">
                character
              </Button>
              <Button variant="outline" size="sm" class="rounded-full">
                themes
              </Button>
              <Button variant="outline" size="sm" class="rounded-full">
                analysis
              </Button>
              <Button variant="outline" size="sm" class="rounded-full">
                dystopia
              </Button>
              <Button variant="outline" size="sm" class="rounded-full">
                symbolism
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader class="py-4">
            <CardTitle class="text-base">Filter by Books</CardTitle>
          </CardHeader>
          <CardContent class="py-2 space-y-2">
            <div class="flex items-center space-x-2">
              <BookOpen class="h-4 w-4 text-muted-foreground" />
              <span>The Great Gatsby</span>
            </div>
            <div class="flex items-center space-x-2">
              <BookOpen class="h-4 w-4 text-muted-foreground" />
              <span>To Kill a Mockingbird</span>
            </div>
            <div class="flex items-center space-x-2">
              <BookOpen class="h-4 w-4 text-muted-foreground" />
              <span>1984</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div class="flex-1">
        <Tabs value="all" class="w-full">
          <TabsList>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="all" class="space-y-4 mt-4">
            {#each notes as note}
              <a href={`/notes/${note.id}`}>
                <Card class="hover:shadow-md transition-shadow">
                  <CardHeader class="pb-2">
                    <div class="flex justify-between items-start">
                      <div>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription class="mt-1">
                          From: {note.bookTitle}
                        </CardDescription>
                      </div>
                      <div class="text-sm text-muted-foreground">
                        {new Date(note.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p class="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {note.excerpt}
                    </p>
                    <div class="flex flex-wrap gap-2">
                      {#each note.tags as tag}
                        <span 
                          class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                        >
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </CardContent>
                </Card>
              </a>
            {/each}
          </TabsContent>
          <TabsContent value="recent" class="mt-4">
            <div class="p-8 text-center text-muted-foreground">
              Your recent notes will appear here
            </div>
          </TabsContent>
          <TabsContent value="favorites" class="mt-4">
            <div class="p-8 text-center text-muted-foreground">
              Your favorite notes will appear here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
  
  