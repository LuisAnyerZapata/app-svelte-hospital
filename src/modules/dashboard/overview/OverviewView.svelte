<script>
    import { getOverviewData, getClinicalRecordsCount } from './services/overview-service.js';
    import StatsGrid from './components/StatsGrid.svelte';
    import AppointmentsChart from './components/AppointmentsChart.svelte';

    let { user } = $props();

    let stats = $state({});

    /** @type {any[]} */
    let chartData = $state([]);

    $effect(() => {
        const data = getOverviewData(user);
        stats = data.stats;
        chartData = data.chartData;
    });
</script>

<div class="module-dashboard">
    <StatsGrid {stats} {user} clinicalRecordsCount={getClinicalRecordsCount(user)} />
    <div class="card mb-4">
        <div class="card-header">
            <h3>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" aria-hidden="true" viewBox="0 0 20 20"><rect x="2.25" y="3.75" width="15.5" height="14" rx="2.25" stroke="var(--muted)" stroke-width="1.5"/><path stroke="var(--muted)" stroke-width="1.5" d="M6 1.75v3.5M14 1.75v3.5"/><path stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" d="M2 7.5h16"/></svg></span>
                Proyección de Citas (Próximos 30 días)
            </h3>
            <div class="text-muted text-sm">Frecuencia estimada de actividad asistencial</div>
        </div>
        <AppointmentsChart {chartData} />
    </div>
</div>

<style>
    .module-dashboard { 
        width: 100%; 
    }

    .mb-4 { 
        margin-bottom: 1.5rem; 
    }

    .card { 
        background: var(--themeLighterAlt, #eff5f9); 
        border-radius: var(--radius, 4px); 
        box-shadow: var(--shadow, 0 6px 20px rgba(15, 59, 47, 0.06)); 
        padding: 1.5rem; 
        margin-bottom: 1rem; 
    }

    .card-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 1.5rem; 
        padding-bottom: 1rem; 
        border-bottom: 1px solid var(--border, #e8f3ea); 
    }

    .card-header h3 { 
        margin: 0; 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
        font-size: 1.25rem; 
        color: var(--themeDark, #002d4f); 
    }

    .text-muted { 
        color: var(--muted, #94a89c); 
    }

    .text-sm { 
        font-size: 0.875rem; 
    }

    @media (max-width: 600px) {
        .card { 
            padding: 1rem; 
        }

        .card-header h3 { 
            font-size: 1rem; 
        }
    }
</style>