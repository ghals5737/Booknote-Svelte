<script lang="ts">
    import { cn } from "$lib/utils/utils.js";
    export let currentPage: number;
    export let totalPages: number;
    export let className: string = "";
    export let showText: boolean = true;
    export let size: "sm" | "md" | "lg" = "md";
    
    const progress = totalPages > 0 ? Math.min(Math.round((currentPage / totalPages) * 100), 100) : 0

    // 독서 상태 결정
    let status: "not-started" | "in-progress" | "completed" = "not-started"
    if (progress === 100) {
        status = "completed"
    } else if (progress > 0) {
        status = "in-progress"
    }

    // 사이즈별 높이 설정
    const heightClass = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
    }[size]

    // 상태별 색상 설정
    const colorClass = {
        "not-started": "bg-muted",
        "in-progress": "bg-theme-gold",
        completed: "bg-theme-brown",
    }[status]
</script>

<div class={cn("space-y-1", className)}>
    <div class="w-full bg-muted/30 rounded-full overflow-hidden">
      <div
      class={cn("rounded-full transition-all duration-300", heightClass, colorClass)}
        style={`width: ${progress}%`}
      />
    </div>
    {#if showText}
      <div class="flex justify-between items-center text-xs text-muted-foreground">
        <span>
          {status === "not-started"
            ? "읽기 전"
            : status === "completed"
              ? "완독"
              : `${currentPage}/${totalPages}페이지`}
        </span>
        <span>{progress}%</span>
      </div>
    {/if}
</div>