<script lang="ts">
    import { ChevronDown } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Card from "$lib/components/ui/card/index.js";    
    import ReadingActivityChart from "$lib/components/log/ReadingActivityChart.svelte";
    import ReadingTimeline from "$lib/components/log/ReadingTimeline.svelte";
    import KeywordCloud from "$lib/components/log/KeywordCloud.svelte";

    let period = "이번 달";
</script>

<div class="container py-6 space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 class="text-3xl font-bold">독서 활동</h1>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" class="w-[180px] justify-between">
            {period}
            <ChevronDown class="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onclick={() => period = "이번 주"}>이번 주</DropdownMenu.Item>
          <DropdownMenu.Item onclick={() => period = "이번 달"}>이번 달</DropdownMenu.Item>
          <DropdownMenu.Item onclick={() => period = "올해"}>올해</DropdownMenu.Item>
          <DropdownMenu.Item onclick={() => period = "전체 기간"}>전체 기간</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>

    <Tabs.Root value="chart" class="space-y-4">
      <Tabs.List class="grid w-full grid-cols-3">
        <Tabs.Trigger value="chart">차트</Tabs.Trigger>
        <Tabs.Trigger value="timeline">타임라인</Tabs.Trigger>
        <Tabs.Trigger value="keywords">키워드</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="chart">
        <Card.Root>
          <Card.Header>
            <Card.Title>독서 활동 통계</Card.Title>
            <Card.Description>{period} 동안의 독서 활동을 그래프로 확인하세요</Card.Description>
          </Card.Header>
          <Card.Content class="h-[400px]">
            <ReadingActivityChart period={period} />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="timeline">
        <Card.Root>
          <Card.Header>
            <Card.Title>독서 타임라인</Card.Title>
            <Card.Description>{period} 동안의 독서 활동을 시간순으로 확인하세요</Card.Description>
          </Card.Header>
          <Card.Content>
            <ReadingTimeline period={period} />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="keywords">
        <Card.Root>
          <Card.Header>
            <Card.Title>자주 사용한 키워드</Card.Title>
            <Card.Description>{period} 동안 노트에 자주 사용한 키워드를 확인하세요</Card.Description>
          </Card.Header>
          <Card.Content class="h-[400px]">
            <KeywordCloud period={period} />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
</div>