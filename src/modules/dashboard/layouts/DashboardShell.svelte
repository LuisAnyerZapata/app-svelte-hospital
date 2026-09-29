<script>
    import { router } from '../../../core/router/router.svelte.js';
    import { session } from '../../auth/stores/session.svelte.js';
    import { sidebarState } from '../stores/sidebar-state.svelte.js';
    import Topbar from './Topbar.svelte';
    import Sidebar from './Sidebar.svelte';
    import OverviewView from '../overview/OverviewView.svelte';

    let currentPath = $derived(router.path);
    let user = $derived(session.user);
    let currentSubpath = $derived(currentPath.replace('/dashboard/', ''));

    /** @param {string} subpath */
    function navigate(subpath) {
        router.goto(`/dashboard/${subpath}`);
    }

    function handleLogout() {
        session.logout();
        router.goto('/');
    }

    $effect(() => {
        if (currentPath === '/dashboard' || currentSubpath === '/dashboard') {
            navigate('overview');
        }
    });

    // Se añade @type para evitar el error de indexación con variables string
    /** @type {Record<string, string>} */
    const ROUTE_LABELS = {
        '/dashboard/overview': 'Dashboard',
        '/dashboard/system': 'Gestionar Inicio',
        '/dashboard/scheduling': 'Citas',
        '/dashboard/patients': 'Pacientes',
        '/dashboard/staff_doctors': 'Médicos',
        '/dashboard/staff_nurses': 'Enfermeras',
        '/dashboard/staff_receptionists': 'Recepcionistas',
        '/dashboard/facilities_areas': 'Áreas',
        '/dashboard/medical-records': 'Historia Clínica Integral',
        '/dashboard/triage': 'Triaje',
        '/dashboard/facilities_resources': 'Recursos',
        '/dashboard/messaging_inbox': 'Bandeja de entrada',
        '/dashboard/security': 'Seguridad y Auditoría',
        '/dashboard/mi_perfil': 'Mi Perfil'
    };

    // Ahora TS sabe que currentPath (string) puede leerse de ROUTE_LABELS
    let currentTitle = $derived(ROUTE_LABELS[currentPath] || 'Módulo');
</script>

<div class="app-shell">
    <Topbar 
        user={user} 
        onlogout={handleLogout} 
        currentTitle={currentTitle}
        onnavigate={navigate} 
        ontogglemenu={() => sidebarState.toggleMenu()}
    />
    
    <main class="app-main">
        {#if sidebarState.menuOpen}
            <button class="sidebar-backdrop" onclick={() => sidebarState.closeMenu()} aria-label="Cerrar menú lateral"></button>
        {/if}

        <Sidebar 
            user={user} 
            currentPath={currentPath} 
            onnavigate={navigate} 
            onlogout={handleLogout}
        />
        
        <div class="app-content">
            <div id="module-container">
                {#if currentPath === '/dashboard/overview'}
                    <OverviewView {user} />
                {:else}
                    <div class="placeholder-view">
                        <h2>{currentTitle}</h2>
                        <p>Próximamente: migración de este módulo.</p>
                    </div>
                {/if}
            </div>
        </div>
    </main>
</div>  

<style>
    .app-shell {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
    }

    .app-main {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
    }

    .app-content {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
        background: var(--white, white);
    }

    .sidebar-backdrop {
        display: none;
        position: fixed;
        inset: 0;
        top: var(--header-height, 64px);
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        border: none;
        padding: 0; 
        cursor: pointer;
    }

    .placeholder-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        gap: 1rem;
        color: var(--muted, #6b7280);
    }

    .placeholder-view h2 {
        color: var(--themeDarker, #00213b);
        font-size: 1.5rem;
    }

    @media (max-width: 768px) {
        .app-content {
            padding: 0.75rem;
        }
    }
</style>