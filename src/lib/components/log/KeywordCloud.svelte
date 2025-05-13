<script lang="ts">
    import { onMount } from 'svelte';

    interface KeywordCloudProps {
        period: string;
    }

    export let period: string;
    let containerRef: HTMLDivElement;

    // 임시 데이터 - 실제로는 API나 store에서 가져와야 합니다
    let keywords = [
        { text: "키워드1", value: 20 },
        { text: "키워드2", value: 15 },
        { text: "키워드3", value: 25 }
    ];

    // 랜덤 색상 생성 함수
    function getRandomColor() {
        const colors = ["#854836", "#FFB22C", "#000000", "#854836", "#FFB22C"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // period가 변경될 때마다 실행되는 reactive statement
    $: if (containerRef) {
        containerRef.innerHTML = "";
        
        keywords.forEach((keyword) => {
            const span = document.createElement("span");
            span.textContent = keyword.text;
            span.style.fontSize = `${Math.max(12, Math.min(36, keyword.value))}px`;
            span.style.color = getRandomColor();
            span.style.padding = "0.5rem";
            span.style.display = "inline-block";
            containerRef.appendChild(span);
        });
    }
</script>

<div bind:this={containerRef} class="w-full h-full flex flex-wrap items-center justify-center">    
</div>