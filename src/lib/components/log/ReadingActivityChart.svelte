<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart, registerables } from 'chart.js';
    Chart.register(...registerables);

    let chartCanvas: HTMLCanvasElement;
    let chart: Chart;

    const data = [
        { name: "1월", 책: 3, 노트: 12 },
        { name: "2월", 책: 4, 노트: 15 },
        { name: "3월", 책: 2, 노트: 8 },
        { name: "4월", 책: 5, 노트: 23 },
        { name: "5월", 책: 3, 노트: 14 },
        { name: "6월", 책: 4, 노트: 18 },
    ];

    onMount(() => {
        const ctx = chartCanvas.getContext('2d');
        if (!ctx) return;

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.name),
                datasets: [
                    {
                        label: '책',
                        data: data.map(item => item.책),
                        backgroundColor: '#A02334',
                    },
                    {
                        label: '노트',
                        data: data.map(item => item.노트),
                        backgroundColor: '#96CEB4',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    });
</script>

<div class="w-full h-[400px]">
    <canvas bind:this={chartCanvas}></canvas>
</div>