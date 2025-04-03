<script lang="ts">
    import { onMount } from 'svelte';
    import { BookOpen, Clock, Star, FileText } from 'lucide-svelte';
    import Tabs  from "$lib/components/ui/tabs/Tabs.svelte";
    import TabsContent  from "$lib/components/ui/tabs/TabsContent.svelte";
    import TabsList  from "$lib/components/ui/tabs/TabsList.svelte";
    import TabsTrigger  from "$lib/components/ui/tabs/TabsTrigger.svelte";
    //import Card, CardContent, CardHeader, CardTitle from "$lib/components/ui/card/index.js";
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte";
    import CardTitle from "$lib/components/ui/card/CardTitle.svelte";
    import Chart from 'chart.js/auto';

    
    export let stats;
    
    let chartCanvas: HTMLCanvasElement;
    let chart: Chart;
    
    onMount(() => {
      if (typeof window !== 'undefined') {
        if (chartCanvas && stats.monthlyProgress) {
          chart = new Chart(chartCanvas, {
            type: 'bar',
            data: {
              labels: stats.monthlyProgress.map((d: any) => d.month),
              datasets: [{
                label: '읽은 책',
                data: stats.monthlyProgress.map((d: any) => d.books),
                backgroundColor: '#2E8B57',
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          });
        }
      }
      
      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    });
  </script>
  
  <Card>
    <CardHeader>
      <CardTitle>Reading Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs value="summary">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex items-center gap-2 p-4 border rounded-lg">
              <div class="p-2 rounded-full bg-[#F5F5DC]">
                <BookOpen class="h-5 w-5 text-[#8B4513]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Books Read</p>
                <p class="text-2xl font-bold">{stats.booksRead}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border rounded-lg">
              <div class="p-2 rounded-full bg-[#F5F5DC]">
                <FileText class="h-5 w-5 text-[#8B4513]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Pages Read</p>
                <p class="text-2xl font-bold">{stats.pagesRead}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border rounded-lg">
              <div class="p-2 rounded-full bg-[#F5F5DC]">
                <Star class="h-5 w-5 text-[#8B4513]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Avg. Rating</p>
                <p class="text-2xl font-bold">{stats.averageRating}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border rounded-lg">
              <div class="p-2 rounded-full bg-[#F5F5DC]">
                <Clock class="h-5 w-5 text-[#8B4513]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Reading Time</p>
                <p class="text-2xl font-bold">{stats.readingTime}h</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="progress">
          <div class="h-[300px] mt-4">
            <canvas bind:this={chartCanvas}></canvas>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
  
  