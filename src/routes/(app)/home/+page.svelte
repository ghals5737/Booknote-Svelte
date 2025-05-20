<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { ChevronRight, Book, BookOpen, Plus } from 'lucide-svelte';
    import { Separator } from "$lib/components/ui/separator/index.js";
    import StatsCard from '$lib/components/stat-card/StatsCard.svelte'
    import RecentBookCard from '$lib/components/book/RecentBookCard.svelte';
</script>

<div class="container py-6 space-y-8">
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">최근 등록한 책</h2>
        <Button variant="ghost" size="sm">
          <a href="/books" class="flex items-center gap-1">
            더보기
            <ChevronRight class="h-4 w-4" />
          </a>
        </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RecentBookCard          
          title="사피엔스"
          author="유발 하라리"
          coverUrl="https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg"
          lastUpdated="2023년 4월 12일"
          noteCount={5}
          isFavorite={true}
          currentPage={312}
          totalPages={524}
        />
        <RecentBookCard
          title="아몬드"
          author="손원평"
          coverUrl="https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg"
          lastUpdated="2023년 4월 10일"
          noteCount={3}
          isFavorite={false}
          currentPage={272}
          totalPages={272}
        />
        <RecentBookCard
          title="달러구트 꿈 백화점"
          author="이미예"
          coverUrl="https://shopping-phinf.pstatic.net/main_3244103/32441031070.20231011075212.jpg"
          lastUpdated="2023년 4월 5일"
          noteCount={2}
          isFavorite={false}
          currentPage={150}
          totalPages={308}
        />
      </div>
    </section>

    <Separator />

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">독서 통계</h2>
        <Button variant="ghost" size="sm">
          <a href="/logs" class="flex items-center gap-1">
            자세히 보기
            <ChevronRight class="h-4 w-4" />
          </a>
        </Button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="이번 달 독서량"
          value="5권"
          description="지난 달보다 2권 증가했어요!"
          trend="increase"
        />
        <StatsCard
          title="작성한 노트"
          value="23개"
          description="꾸준히 기록 중이에요"
          trend="neutral"
        />
        <StatsCard
          title="가장 많이 읽은 장르"
          value="인문학"
          description="총 8권을 읽었어요"
          trend="neutral"
        />
      </div>
    </section>

    <section class="bg-theme-gold/20 rounded-lg p-6 space-y-4">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-2">
          <h2 class="text-2xl font-bold">새로운 책을 등록해보세요</h2>
          <p class="text-muted-foreground">책을 검색하고 나만의 독서 노트를 작성해보세요.</p>
        </div>
        <Button class="bg-theme-brown hover:bg-theme-brown/90 text-white">
          <a href="/books/search" class="flex items-center gap-2">
            <Plus class="h-4 w-4" />책 등록하기
          </a>
        </Button>
      </div>
    </section>
  </div>