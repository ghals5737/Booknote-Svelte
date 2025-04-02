<script lang="ts">
    import { Camera, Upload } from '@lucide/svelte';
    import Button from '../../components/ui/button/Button.svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card/index.js';
    import { Input } from '../../components/ui/input/index.js';
    import { Label } from '../../components/ui/label/index.js';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs/index.js';
    import { Textarea } from '../../components/ui/textarea';
    import BookScan from '../../components/BookScan.svelte';
    
    let coverImage:any = null;
</script>
  
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8 text-[#8B4513]">Add New Book</h1>
    
    <div class="max-w-3xl mx-auto">
      <Tabs value="scan" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Scan ISBN</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>
        <TabsContent value="scan">
          <Card>
            <CardHeader>
              <CardTitle>Scan Book ISBN</CardTitle>
              <CardDescription>
                Use your camera to scan the ISBN barcode on your book
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <BookScan />
              <div class="text-center">
                <Button class="mt-4 bg-[#8B4513] hover:bg-[#6d3710]">
                  <Camera class="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Book Entry</CardTitle>
              <CardDescription>
                Enter the book details manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <Label for="title">Book Title</Label>
                      <Input id="title" placeholder="Enter book title" />
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="author">Author</Label>
                      <Input id="author" placeholder="Enter author name" />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <Label for="isbn">ISBN</Label>
                        <Input id="isbn" placeholder="Enter ISBN" />
                      </div>
                      <div class="space-y-2">
                        <Label for="pages">Total Pages</Label>
                        <Input id="pages" type="number" placeholder="Number of pages" />
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <Label for="description">Description</Label>
                      <Textarea id="description" placeholder="Enter book description" rows={4} />
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <Label>Book Cover</Label>
                    <div class="border-2 border-dashed rounded-lg p-4 text-center h-[240px] flex flex-col items-center justify-center bg-[#F5F5DC]/50">
                      {#if coverImage}
                        <div class="relative w-full h-full">
                          <img 
                            src={coverImage || "/placeholder.svg"} 
                            alt="Book cover preview" 
                            class="w-full h-full object-contain" 
                          />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            class="absolute top-2 right-2"
                            on:click={() => coverImage = null}
                          >
                            Remove
                          </Button>
                        </div>
                      {:else}
                        <Upload class="h-10 w-10 text-muted-foreground mb-2" />
                        <p class="text-sm text-muted-foreground mb-2">
                          Drag & drop or click to upload
                        </p>
                        <Button variant="outline" size="sm">
                          Select Image
                        </Button>
                      {/if}
                    </div>
                  </div>
                </div>
                
                <div class="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button class="bg-[#8B4513] hover:bg-[#6d3710]">Add Book</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  
  