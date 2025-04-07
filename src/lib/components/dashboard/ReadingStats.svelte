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
  
  <Card class="border-1 border-gray-300">    
    <CardContent>
      <Tabs value="summary">
        <TabsList class="mt-2 grid w-full grid-cols-2">
          <TabsTrigger value="summary" class="font-semibold">Summary</TabsTrigger>
          <TabsTrigger value="progress" class="font-semibold">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" class="space-y-4">
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg">
              <div class="p-2 rounded-full bg-[#D2EEFA]">
                <BookOpen class="h-5 w-5 text-[#255DAA]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground font-semibold">Books Read</p>
                <p class="text-2xl font-bold">{stats.booksRead}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg">
              <div class="p-2 rounded-full bg-[#D2EEFA]">
                <FileText class="h-5 w-5 text-[#255DAA]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground font-semibold">Pages Read</p>
                <p class="text-2xl font-bold">{stats.pagesRead}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg">
              <div class="p-2 rounded-full bg-[#D2EEFA]">
                <Star class="h-5 w-5 text-[#255DAA]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground font-semibold">Avg. Rating</p>
                <p class="text-2xl font-bold">{stats.averageRating}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 p-4 border border-gray-300 rounded-lg">
              <div class="p-2 rounded-full bg-[#D2EEFA]">
                <Clock class="h-5 w-5 text-[#255DAA]" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground font-semibold">Reading Time</p>
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
  
  