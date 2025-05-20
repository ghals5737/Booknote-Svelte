<script lang="ts">
    import { Book, BookOpen } from 'lucide-svelte';

    export let period: string;

    const timelineData = [
    {
      date: "2023년 4월 12일",
      type: "book",
      title: "사피엔스",
      description: "새 책을 등록했습니다.",
    },
    {
      date: "2023년 4월 12일",
      type: "note",
      title: "인지 혁명에 대한 생각",
      description: "사피엔스에 노트를 작성했습니다.",
    },
    {
      date: "2023년 4월 10일",
      type: "note",
      title: "허구에 대한 생각",
      description: "사피엔스에 노트를 작성했습니다.",
    },
    {
      date: "2023년 4월 10일",
      type: "book",
      title: "아몬드",
      description: "새 책을 등록했습니다.",
    },
    {
      date: "2023년 4월 5일",
      type: "note",
      title: "농업 혁명에 대한 생각",
      description: "사피엔스에 노트를 작성했습니다.",
    },
  ]    
</script>

<div class="space-y-4">
    {#each timelineData as item}
        <div class="flex gap-4">
        <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-theme-gold/20">
            {#if item.type === "book"}
                <Book className="h-5 w-5 text-theme-brown" />
            {:else}
                <BookOpen className="h-5 w-5 text-theme-gold" />
            {/if}
    </div>
    <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
        <h3 class="font-medium">{item.title}</h3>
        <span class="text-xs text-muted-foreground">{item.date}</span>
        </div>
        <p class="text-sm text-muted-foreground">{item.description}</p>
    </div>
    </div>
    {/each}
</div>