<script lang="ts">
    import { ChevronDown } from "lucide-svelte";
    import Button from "$lib/components/ui/button/Button.svelte";    
    import DropdownMenu from "$lib/components/ui/dropdown-menu/DropdownMenu.svelte";
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/DropdownMenuContent.svelte";
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/DropdownMenuItem.svelte";
    import DropdownMenuTrigger from "$lib/components/ui/dropdown-menu/DropdownMenuTrigger.svelte";
    import Tabs from "$lib/components/ui/tabs/Tabs.svelte";
    import TabsContent from "$lib/components/ui/tabs/TabsContent.svelte";
    import TabsList from "$lib/components/ui/tabs/TabsList.svelte";
    import TabsTrigger from "$lib/components/ui/tabs/TabsTrigger.svelte";
    import Card from "$lib/components/ui/card/Card.svelte";
    import CardContent from "$lib/components/ui/card/CardContent.svelte";
    import CardDescription from "$lib/components/ui/card/CardDescription.svelte";
    import CardHeader from "$lib/components/ui/card/CardHeader.svelte";
    import CardTitle from "$lib/components/ui/card/CardTitle.svelte";

    let period = "이번 달";
</script>

<div class="container py-6 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-bold">독서 활동</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" class="w-[180px] justify-between">
            {period}
            <ChevronDown class="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem on:click={() => period = "이번 주"}>이번 주</DropdownMenuItem>
          <DropdownMenuItem on:click={() => period = "이번 달"}>이번 달</DropdownMenuItem>
          <DropdownMenuItem on:click={() => period = "올해"}>올해</DropdownMenuItem>
          <DropdownMenuItem on:click={() => period = "전체 기간"}>전체 기간</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <Tabs defaultValue="chart" class="space-y-4">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="chart">차트</TabsTrigger>
        <TabsTrigger value="timeline">타임라인</TabsTrigger>
        <TabsTrigger value="keywords">키워드</TabsTrigger>
      </TabsList>
      <TabsContent value="chart">
        <Card>
          <CardHeader>
            <CardTitle>독서 활동 통계</CardTitle>
            <CardDescription>{period} 동안의 독서 활동을 그래프로 확인하세요</CardDescription>
          </CardHeader>
          <CardContent class="h-[400px]">
            <ReadingActivityChart period={period} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="timeline">
        <Card>
          <CardHeader>
            <CardTitle>독서 타임라인</CardTitle>
            <CardDescription>{period} 동안의 독서 활동을 시간순으로 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <ReadingTimeline period={period} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="keywords">
        <Card>
          <CardHeader>
            <CardTitle>자주 사용한 키워드</CardTitle>
            <CardDescription>{period} 동안 노트에 자주 사용한 키워드를 확인하세요</CardDescription>
          </CardHeader>
          <CardContent class="h-[400px]">
            <KeywordCloud period={period} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
</div>