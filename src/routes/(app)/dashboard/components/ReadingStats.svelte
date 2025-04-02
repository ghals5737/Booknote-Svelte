<script lang="ts">
    import { onMount } from 'svelte';
    import BookOpen from '@lucide/svelte/icons/book-open';
    import Clock from '@lucide/svelte/icons/clock';
    import Star from '@lucide/svelte/icons/star';
    import FileText from '@lucide/svelte/icons/file-text';
    import Tabs  from "$lib/components/ui/tabs/Tabs.svelte";
    import TabsContent  from "$lib/components/ui/tabs/TabsContent.svelte";
    import TabsList  from "$lib/components/ui/tabs/TabsList.svelte";
    import TabsTrigger  from "$lib/components/ui/tabs/TabsTrigger.svelte";
    //import Card, CardContent, CardHeader, CardTitle from "$lib/components/ui/card/index.js";
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte";
    import CardTitle from "$lib/components/ui/card/CardTitle.svelte";

    
    export let stats;
    
    let chartContainer: HTMLDivElement;
    let chart: any;
    
    onMount(() => {
      if (typeof window !== 'undefined') {
        // 비동기 로직을 별도 함수로 분리
        const initChart = async () => {
          const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } = await import('recharts');
          
          if (chartContainer && stats.monthlyProgress) {
            const container = document.createElement('div');
            container.style.width = '100%';
            container.style.height = '100%';
            chartContainer.appendChild(container);
            
            // Note: This is a simplified implementation
            chart = new BarChart({
              target: container,
              props: {
                data: stats.monthlyProgress,
                margin: { top: 20, right: 30, left: 20, bottom: 5 },
                children: [
                  new XAxis({ dataKey: 'month' }),
                  new YAxis(),
                  new Tooltip(),
                  new Bar({ dataKey: 'books', fill: '#2E8B57', radius: [4, 4, 0, 0] })
                ]
              }
            });
          }
        };
        
        // 비동기 함수 실행
        initChart();
      }
      
      // 정리 함수 반환
      return () => {
        if (chart) {
          chart.$destroy();
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
          <div class="h-[300px] mt-4" bind:this={chartContainer}>
            <!-- Chart will be rendered here by Recharts -->
            <div class="flex items-center justify-center h-full text-muted-foreground">
              Loading chart...
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
  
  