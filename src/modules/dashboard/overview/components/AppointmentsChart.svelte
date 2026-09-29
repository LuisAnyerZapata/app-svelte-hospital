<script>
    let { chartData = [] } = $props();

    let chartHeight = 300;
    let chartPadding = { top: 20, right: 30, bottom: 40, left: 40 };
    let chartWidth = $state(800);
    
    /** @type {HTMLDivElement | null} */
    let chartContainer = $state(null);

    let maxCount = $derived(Math.max(...chartData.map(d => d.count), 5));

    /** @param {number} index */
    function getX(index) {
        if (chartData.length <= 1) return chartPadding.left;
        return chartPadding.left + (index * (chartWidth - chartPadding.left - chartPadding.right) / (chartData.length - 1));
    }

    /** @param {number} count */
    function getY(count) {
        return chartHeight - chartPadding.bottom - (count * (chartHeight - chartPadding.top - chartPadding.bottom) / maxCount);
    }

    let points = $derived(chartData.map((d, i) => `${getX(i)},${getY(d.count)}`).join(' '));

    let yLines = $derived.by(() => {
        const lines = [];
        const step = Math.ceil(maxCount / 5);
        for (let i = 0; i <= maxCount; i += step) {
            lines.push({ y: getY(i), value: i });
        }
        return lines;
    });

    let xLabels = $derived(chartData.filter(d => d.label).map((d) => {
        const idx = chartData.indexOf(d);
        return { x: getX(idx), label: d.label };
    }));

    $effect(() => {
        if (chartContainer) {
            chartWidth = Math.max(chartContainer.clientWidth || 800, 400);
            const ro = new ResizeObserver(entries => {
                for (const entry of entries) {
                    chartWidth = Math.max(entry.contentRect.width || 800, 400);
                }
            });
            ro.observe(chartContainer);
            return () => ro.disconnect();
        }
    });
</script>

<div bind:this={chartContainer} id="appointments-chart-container" class="chart-wrapper">
    {#if chartData.length > 0}
        <svg width="100%" height={chartHeight} viewBox="0 0 {chartWidth} {chartHeight}" preserveAspectRatio="none" class="chart-svg">
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent, #467c2a)" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="var(--accent, #467c2a)" stop-opacity="0" />
                </linearGradient>
            </defs>

            {#each yLines as line}
                <line x1={chartPadding.left} y1={line.y} x2={chartWidth - chartPadding.right} y2={line.y} stroke="var(--border, #e8f3ea)" stroke-dasharray="4" />
                <text x={chartPadding.left - 10} y={line.y + 5} font-size="12" fill="var(--muted, #94a89c)" text-anchor="end">{line.value}</text>
            {/each}

            <polyline
                points="{chartPadding.left},{chartHeight - chartPadding.bottom} {points} {chartWidth - chartPadding.right},{chartHeight - chartPadding.bottom}"
                fill="url(#chartGradient)"
            />

            <polyline
                points={points}
                fill="none"
                stroke="var(--themeTertiary, #427aa5)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            {#each chartData as d, i}
                <circle cx={getX(i)} cy={getY(d.count)} r="4" fill="white" stroke="var(--themeTertiary, #427aa5)" stroke-width="2">
                    <title>{d.date.toLocaleDateString()}: {d.count} citas</title>
                </circle>
            {/each}

            {#each xLabels as xl}
                <text x={xl.x} y={chartHeight - 10} font-size="11" fill="var(--muted, #94a89c)" text-anchor="middle">{xl.label}</text>
            {/each}
        </svg>
    {/if}
</div>

<style>
    .chart-wrapper {
        min-height: 350px;
        padding: 1rem 0;
    }

    .chart-svg {
        overflow: visible;
    }

    @media (max-width: 600px) {
        .chart-wrapper { 
            min-height: 250px; 
            padding: 0.5rem 0; 
        }
    }
</style>