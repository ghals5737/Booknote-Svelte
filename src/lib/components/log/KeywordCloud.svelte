<script lang="ts">
    import { onMount } from 'svelte';
    export let period: string;
    let containerRef: HTMLDivElement;

    // 임시 데이터 (실제로는 API나 store에서 가져와야 함)
    const keywords = [
        { text: 'JavaScript', value: 30 },
        { text: 'TypeScript', value: 25 },
        { text: 'React', value: 20 },
        { text: 'Vue', value: 15 },
        { text: 'Angular', value: 10 }
    ];

   
</script>

<div id="tsparticles" class="w-full h-full" bind:this={containerRef}></div>

<style>
    :global(#tsparticles) {
        width: 100%;
        height: 100%;
    }
</style>