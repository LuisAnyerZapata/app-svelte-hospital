<script>
    let { stats = {}, user = null, clinicalRecordsCount = 0 } = $props();
</script>

<div class="stats-auto-grid mb-4">
    {#if user?.role === 'patient'}
        <div class="stat-info-card">
            <span class="stat-info-label">Mis Citas</span>
            <span class="stat-info-value">{stats.totalAppointments || 0}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2.25" y="3.75" width="15.5" height="14" rx="2.25" stroke="#94a89c" stroke-width="1.5"/><path stroke="#94a89c" stroke-width="1.5" d="M6 1.75v3.5M14 1.75v3.5"/><path stroke="#94a89c" stroke-width="1.5" stroke-linecap="round" d="M2 7.5h16"/></svg>
                Programadas
            </span>
        </div>
        <div class="stat-info-card">
            <span class="stat-info-label">Historias Clínicas</span>
            <span class="stat-info-value">{clinicalRecordsCount}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="4.25" y="3.75" width="11.5" height="14" rx="2.25" stroke="#ea4632" stroke-width="1.5"/><rect x="6.75" y="2" width="6.5" height="3.5" rx="1.25" stroke="#ea4632" stroke-width="1.5"/></svg>
                Registros propios
            </span>
        </div>
        <div class="stat-info-card">
            <span class="stat-info-label">Próxima Visita</span>
            <span class="stat-info-value stat-info-value-sm">{stats.upcomingAppointments > 0 ? 'Programada' : 'No hay'}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#249" stroke-width="2"/><path stroke="#249" stroke-width="2" d="M10 7v5"/><circle cx="10" cy="14" r="1" fill="#249"/></svg>
                Ver detalle abajo
            </span>
        </div>
    {:else}
        <div class="stat-info-card">
            <span class="stat-info-label">Citas totales</span>
            <span class="stat-info-value">{stats.totalAppointments || 0}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2.25" y="3.75" width="15.5" height="14" rx="2.25" stroke="#94a89c" stroke-width="1.5"/><path stroke="#94a89c" stroke-width="1.5" d="M6 1.75v3.5M14 1.75v3.5"/><path stroke="#94a89c" stroke-width="1.5" stroke-linecap="round" d="M2 7.5h16"/></svg>
                {stats.todayAppointments || 0} hoy
            </span>
        </div>
        <div class="stat-info-card">
            <span class="stat-info-label">Pacientes</span>
            <span class="stat-info-value">{stats.totalPatients || 0}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="7" r="4" stroke="#94a89c" stroke-width="1.5"/><path stroke="#94a89c" stroke-width="1.5" d="M3.75 17A6.25 6.25 0 0116.25 17"/></svg>
                Registrados
            </span>
        </div>
        <div class="stat-info-card">
            <span class="stat-info-label">Médicos</span>
            <span class="stat-info-value">{stats.totalDoctors || 0}</span>
            <span class="stat-info-sub">
                <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="6" r="4" stroke="#94a89c" stroke-width="1.5"/><path stroke="#94a89c" stroke-width="1.5" d="M3.5 18c0-3.037 2.486-5.5 6.5-5.5s6.5 2.463 6.5 5.5"/></svg>
                Activos
            </span>
        </div>
        {#if user?.role === 'nurse'}
            <div class="stat-info-card">
                <span class="stat-info-label">Pacientes en triaje</span>
                <span class="stat-info-value">{stats.triajePending || 0}</span>
                <span class="stat-info-sub">
                    <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#605e5c" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Pendientes
                </span>
            </div>
        {:else}
            <div class="stat-info-card">
                <span class="stat-info-label">Próximas citas</span>
                <span class="stat-info-value">{stats.upcomingAppointments || 0}</span>
                <span class="stat-info-sub">
                    <svg style="opacity: 1;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#605e5c" stroke-width="1.5" d="M10 3v8"/><circle cx="10" cy="15" r="1" fill="#605e5c"/><circle cx="10" cy="10" r="9" stroke="#605e5c" stroke-width="1.5"/></svg>
                    7 días
                </span>
            </div>
        {/if}
    {/if}
</div>

<style>
    .stats-auto-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        width: 100%;
        margin: 20px auto;
        justify-content: center;
        align-items: center;
    }   

    .stat-info-card {
        background: white;
        border: 1px solid #e8f3ea;
        padding: 1.25rem 0.75rem;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        text-align: center;
    }

    .stat-info-card:hover {
        border-color: #427aa5;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }

    .stat-info-label {
        font-size: 0.7rem;
        color: #94a89c;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 0.25rem;
        font-weight: 600;
    }

    .stat-info-value {
        font-size: 1.75rem;
        font-weight: 800;
        color: #427aa5; 
        line-height: 1;
    }
    
    .stat-info-sub {
        font-size: 0.75rem;
        color: #94a89c;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        opacity: 0.8;
    }
    
    .stat-info-value-sm { 
        font-size: 1.5rem; 
    }

    @media (max-width: 1024px) {
        .stats-auto-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
        }
    }

    @media (max-width: 600px) {
        .stats-auto-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }
</style>