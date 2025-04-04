<script lang="ts">
  import { ArrowLeft, BookOpen, Save, Eye, Edit } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';    
  import Button from '$lib/components/ui/button/Button.svelte';
  import Card from '$lib/components/ui/card/Card.svelte';
  import Tabs from '$lib/components/ui/tabs/Tabs.svelte';
  import TabsContent from '$lib/components/ui/tabs/TabsContent.svelte';
  import TabsList from '$lib/components/ui/tabs/TabsList.svelte';
  import TabsTrigger from '$lib/components/ui/tabs/TabsTrigger.svelte';
  import Textarea from '$lib/components/ui/textarea/Textarea.svelte';
  
  let mode: string = "edit";
  let content: string = `
  # Character Analysis: Jay Gatsby
  
  ## Introduction
  Jay Gatsby, the titular character of F. Scott Fitzgerald's "The Great Gatsby," is one of the most enigmatic and well-crafted characters in American literature.
  
  ## Background
  - Born James Gatz to poor farmers in North Dakota
  - Reinvented himself as Jay Gatsby after meeting Dan Cody
  - Accumulated wealth through questionable means
  - Driven by his love for Daisy Buchanan
  
  ## Symbolism
  Gatsby represents the American Dream and its corruption. His pursuit of wealth is solely to win Daisy's love, representing how the dream had been reduced to materialism.
  
  ## Key Quotes
  > "Gatsby believed in the green light, the orgastic future that year by year recedes before us."
  
  > "Can't repeat the past? Why of course you can!"
  
  ## Analysis
  Gatsby's tragic flaw is his inability to accept that the past cannot be recreated. His idealization of Daisy and their relationship leads to his downfall.
    `;
  
    // Mock book data
    const book = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "/placeholder.svg?height=300&width=200",
    };
    
    let markdownContent;
    
    onMount(async () => {
      // In a real app, you'd use a Svelte-compatible markdown library
      // This is a simplified placeholder
      markdownContent = content;
    });
  </script>
  
  <div class="container py-8">
    <div class="flex items-center mb-8">
      <a href="/notes">
        <Button variant="ghost" size="icon">
          <ArrowLeft class="h-5 w-5" />
        </Button>
      </a>
      <h1 class="text-2xl font-bold ml-2 text-[#8B4513]">Character Analysis: Jay Gatsby</h1>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-1/3 xl:w-1/4 order-2 lg:order-1">
        <Card class="p-4">
          <div class="flex items-start space-x-4">
            <div class="relative w-16 h-24 bg-[#F5F5DC]">
              <img
                src={book.cover || "/placeholder.svg"}
                alt={book.title}
                class="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 class="font-medium">{book.title}</h3>
              <p class="text-sm text-muted-foreground">{book.author}</p>
              <div class="mt-2">
                <Button variant="outline" size="sm" class="w-full justify-start">
                  <BookOpen class="mr-2 h-4 w-4" />
                  View Book
                </Button>
              </div>
            </div>
          </div>
          
          <div class="mt-4">
            <h4 class="font-medium mb-2">Tags</h4>
            <div class="flex flex-wrap gap-2">
              <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                character
              </span>
              <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                analysis
              </span>
              <span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                symbolism
              </span>
            </div>
          </div>
          
          <div class="mt-4">
            <h4 class="font-medium mb-2">Created</h4>
            <p class="text-sm text-muted-foreground">April 15, 2023</p>
          </div>
          
          <div class="mt-4">
            <h4 class="font-medium mb-2">Last Updated</h4>
            <p class="text-sm text-muted-foreground">April 18, 2023</p>
          </div>
        </Card>
      </div>
      
      <div class="flex-1 order-1 lg:order-2">
        <Card>
          <div class="border-b p-4 flex items-center justify-between">
            <Tabs bind:value={mode}>
              <TabsList>
                <TabsTrigger value="edit" >
                  <Edit class="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye class="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button class="bg-[#8B4513] hover:bg-[#6d3710]">
              <Save class="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
          
          <div class="p-4">
            {#if mode === "edit"}
              <Textarea
                bind:value={content}
                class="min-h-[500px] font-mono"
              />
            {:else}
              <div class="prose max-w-none">
                <h1>Character Analysis: Jay Gatsby</h1>
                
                <h2>Introduction</h2>
                <p>Jay Gatsby, the titular character of F. Scott Fitzgerald's "The Great Gatsby," is one of the most enigmatic and well-crafted characters in American literature.</p>
                
                <h2>Background</h2>
                <ul>
                  <li>Born James Gatz to poor farmers in North Dakota</li>
                  <li>Reinvented himself as Jay Gatsby after meeting Dan Cody</li>
                  <li>Accumulated wealth through questionable means</li>
                  <li>Driven by his love for Daisy Buchanan</li>
                </ul>
                
                <h2>Symbolism</h2>
                <p>Gatsby represents the American Dream and its corruption. His pursuit of wealth is solely to win Daisy's love, representing how the dream had been reduced to materialism.</p>
                
                <h2>Key Quotes</h2>
                <blockquote>
                  <p>"Gatsby believed in the green light, the orgastic future that year by year recedes before us."</p>
                </blockquote>
                
                <blockquote>
                  <p>"Can't repeat the past? Why of course you can!"</p>
                </blockquote>
                
                <h2>Analysis</h2>
                <p>Gatsby's tragic flaw is his inability to accept that the past cannot be recreated. His idealization of Daisy and their relationship leads to his downfall.</p>
              </div>
            {/if}
          </div>
        </Card>
      </div>
    </div>
  </div>
  
  