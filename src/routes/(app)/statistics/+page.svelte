<script>
    import { onMount } from 'svelte';
    import { BookOpen, Clock, Star, FileText, Calendar } from 'lucide-svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
    
    // Mock data for demonstration
    const monthlyData = [
      { month: "Jan", books: 2, pages: 450 },
      { month: "Feb", books: 3, pages: 720 },
      { month: "Mar", books: 1, pages: 320 },
      { month: "Apr", books: 4, pages: 980 },
      { month: "May", books: 2, pages: 540 },
      { month: "Jun", books: 3, pages: 680 },
      { month: "Jul", books: 2, pages: 420 },
      { month: "Aug", books: 1, pages: 280 },
      { month: "Sep", books: 3, pages: 750 },
      { month: "Oct", books: 2, pages: 520 },
      { month: "Nov", books: 4, pages: 890 },
      { month: "Dec", books: 3, pages: 710 },
    ];
  
    const categoryData = [
      { name: "Fiction", value: 12, color: "#2E8B57" },
      { name: "Science", value: 8, color: "#8B4513" },
      { name: "Biography", value: 5, color: "#4682B4" },
      { name: "Self-Help", value: 7, color: "#CD853F" },
      { name: "History", value: 4, color: "#708090" },
    ];
  
    const readingTimeData = [
      { day: "Mon", hours: 1.5 },
      { day: "Tue", hours: 2.0 },
      { day: "Wed", hours: 1.0 },
      { day: "Thu", hours: 2.5 },
      { day: "Fri", hours: 1.8 },
      { day: "Sat", hours: 3.2 },
      { day: "Sun", hours: 2.7 },
    ];
    
    let barChartContainer;
    let pieChartContainer;
    let lineChartContainer;
    
    onMount(() => {
      // In a real app, you'd use a Svelte-compatible charting library
      // This is a simplified placeholder for demonstration
      if (barChartContainer) {
        barChartContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p>Bar Chart: Monthly Reading</p></div>';
      }
      
      if (pieChartContainer) {
        pieChartContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p>Pie Chart: Categories Distribution</p></div>';
      }
      
      if (lineChartContainer) {
        lineChartContainer.innerHTML = '<div class="flex items-center justify-center h-full"><p>Line Chart: Weekly Reading Time</p></div>';
      }
    });
  </script>
  
  <div class="container py-8">
    <h1 class="text-3xl font-bold mb-8 text-[#8B4513]">Reading Statistics</h1>
    
    <div class="flex items-center justify-between mb-6">
      <Tabs value="yearly" class="w-[400px]">
        <TabsList>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Select value="2023">
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Books Read</CardTitle>
          <BookOpen class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">24</div>
          <p class="text-xs text-muted-foreground">+8 from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Pages Read</CardTitle>
          <FileText class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">6,248</div>
          <p class="text-xs text-muted-foreground">+1,892 from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Reading Time</CardTitle>
          <Clock class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">156h</div>
          <p class="text-xs text-muted-foreground">+42h from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Average Rating</CardTitle>
          <Star class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">4.2</div>
          <p class="text-xs text-muted-foreground">+0.3 from last year</p>
        </CardContent>
      </Card>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Reading</CardTitle>
          <CardDescription>Books and pages read per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[300px]" bind:this={barChartContainer}>
            <!-- Bar chart will be rendered here -->
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Categories Distribution</CardTitle>
          <CardDescription>Books by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[300px]" bind:this={pieChartContainer}>
            <!-- Pie chart will be rendered here -->
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>Weekly Reading Time</CardTitle>
        <CardDescription>Hours spent reading per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="h-[300px]" bind:this={lineChartContainer}>
          <!-- Line chart will be rendered here -->
        </div>
      </CardContent>
    </Card>
  </div>
  
  