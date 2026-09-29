<script>
    import { sidebarState } from './../stores/sidebar-state.svelte';
    import { hasPermission } from './../../../core/security/permissions.js';

    let { user, currentPath, onnavigate, onlogout } = $props();

    const menuOpen = $derived(sidebarState.menuOpen);
    const openDropdowns = $derived(sidebarState.openDropdowns);

    /** @param {string} name */
    function toggleDropdown(name) {
        sidebarState.toggleDropdown(name);
    }

    /** @param {string} view */
    function handleNav(view) {
        onnavigate(view);
        sidebarState.closeMenu(); // Cerrar en móvil al hacer clic
    }
</script>

<nav class="app-sidebar" class:sidebar-visible={menuOpen}>
    <div class="sidebar-scroll-area">
        <div class="nav-menu">
            <div id="nav-links">
                <button class="nav-btn" class:active={currentPath === '/dashboard/overview'} onclick={() => handleNav('overview')}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg></span>
                    <span>Dashboard</span>
                </button>

                {#if hasPermission('system', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/system'} onclick={() => handleNav('system')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
                        <span>Gestionar Inicio</span>
                    </button>
                {/if}

                <button class="nav-btn" class:active={currentPath === '/dashboard/scheduling'} onclick={() => handleNav('scheduling')}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                    <span>Citas</span>
                </button>

                {#if hasPermission('patients', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/patients'} onclick={() => handleNav('patients')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                        <span>Pacientes</span>
                    </button>
                {/if}

                {#if hasPermission('staff_doctors', user?.role) || hasPermission('staff_nurses', user?.role) || hasPermission('staff_receptionists', user?.role)}
                    <div class="nav-dropdown-container" class:open={openDropdowns.personal}>
                        <button class="nav-btn dropdown-trigger" onclick={() => toggleDropdown('personal')}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
                            <span>Personal</span>
                            <span class="chevron"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                        </button>
                        <div class="nav-dropdown-content">
                            {#if hasPermission('staff_doctors', user?.role)}
                                <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/staff_doctors'} onclick={() => handleNav('staff_doctors')}>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v6"/><path d="M16 15v6"/><path d="M12 15v3"/><path d="M12 21h.01"/><path d="M8 21h.01"/><path d="M16 21h.01"/></svg></span>
                                    <span>Médicos</span>
                                </button>
                            {/if}
                            {#if hasPermission('staff_nurses', user?.role)}
                                <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/staff_nurses'} onclick={() => handleNav('staff_nurses')}>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.28 3.6-1.28 3.6-1.28v-6s-2 0-3.6 1.28a6.01 6.01 0 0 0-14 0C3.4 6.72 1.4 6.72 1.4 6.72v6s2 1.4 3.6 0"/><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/></svg></span>
                                    <span>Enfermeras</span>
                                </button>
                            {/if}
                            {#if hasPermission('staff_receptionists', user?.role)}
                                <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/staff_receptionists'} onclick={() => handleNav('staff_receptionists')}>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                                    <span>Recepcionistas</span>
                                </button>
                            {/if}
                        </div>
                    </div>
                {/if}

                <button class="nav-btn" class:active={currentPath === '/dashboard/facilities_areas'} onclick={() => handleNav('facilities_areas')}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg></span>
                    <span>Áreas</span>
                </button>

                <button class="nav-btn" class:active={currentPath === '/dashboard/medical-records'} onclick={() => handleNav('medical-records')}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg></span>
                    <span>Historia Clínica Integral</span>
                </button>

                {#if hasPermission('triage', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/triage'} onclick={() => handleNav('triage')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></span>
                        <span>Triaje</span>
                    </button>
                {/if}

                {#if hasPermission('facilities_resources', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/facilities_resources'} onclick={() => handleNav('facilities_resources')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                        <span>Recursos</span>
                    </button>
                {/if}

                {#if hasPermission('messaging_inbox', user?.role)}
                    <div class="nav-dropdown-container" class:open={openDropdowns.comunicaciones}>
                        <button class="nav-btn dropdown-trigger" onclick={() => toggleDropdown('comunicaciones')}>
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></span>
                            <span>Comunicaciones</span>
                            <span class="chevron"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                        </button>
                        <div class="nav-dropdown-content">
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_inbox'} onclick={() => handleNav('messaging_inbox')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                                <span>Bandeja de entrada</span>
                            </button>
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_sent'} onclick={() => handleNav('messaging_sent')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg></span>
                                <span>Enviados</span>
                            </button>
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_drafts'} onclick={() => handleNav('messaging_drafts')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5a1 1 0 0 1 1 1v5"/><path d="M14 10 3 21l-1 1"/><path d="m21 3-7 7"/><path d="M3 15v6h6"/></svg></span>
                                <span>Borradores</span>
                            </button>
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_trash'} onclick={() => handleNav('messaging_trash')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></span>
                                <span>Papelera</span>
                            </button>
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_reminders'} onclick={() => handleNav('messaging_reminders')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>
                                <span>Recordatorios</span>
                            </button>
                            <button class="nav-btn sub-btn" class:active={currentPath === '/dashboard/messaging_alerts'} onclick={() => handleNav('messaging_alerts')}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></span>
                                <span>Alertas</span>
                            </button>
                        </div>
                    </div>
                {/if}

                {#if hasPermission('security', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/security'} onclick={() => handleNav('security')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                        <span>Seguridad y Auditoría</span>
                    </button>
                {/if}

                {#if hasPermission('mi_perfil', user?.role)}
                    <button class="nav-btn" class:active={currentPath === '/dashboard/mi_perfil'} onclick={() => handleNav('mi_perfil')}>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="8" r="2" fill="currentColor" stroke="none" opacity="0.3"/></svg></span>
                        <span>Mi Perfil</span>
                    </button>
                {/if}
            </div>
        </div>
    </div>

    <div class="sidebar-footer">
        <button class="nav-btn logout-btn" onclick={onlogout} title="Cerrar Sesión">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
            <span class="font-bold">Cerrar Sesión</span>
        </button>
    </div>
</nav>

<style>
    .app-sidebar {
        width: var(--sidebar-width, 240px);
        background: var(--themeDark, #002d4f);
        border-top: 1px solid var(--themeLight, #c2d7e7);
        border-right: 1px solid var(--border, #e8f3ea);
        transition: transform 0.3s ease, width 0.3s ease;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 900;
    }
    
    .sidebar-scroll-area { 
        flex: 1; 
        overflow-y: auto;
    }

    .sidebar-scroll-area::-webkit-scrollbar { width: 6px; }
    .sidebar-scroll-area::-webkit-scrollbar-track { background: transparent; }
    .sidebar-scroll-area::-webkit-scrollbar-thumb { background: var(--themeSecondary, #0f4c7b); border-radius: 10px; }
    .sidebar-scroll-area::-webkit-scrollbar-thumb:hover { background: var(--themeTertiary, #427aa5); }

    .sidebar-footer { 
        padding: 0.5rem 1rem;
        border-top: 1px solid var(--themeLight, #c2d7e7);
        background: var(--themeDark, #002d4f);
        height: var(--header-height, 64px);
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .nav-menu { display: flex; flex-direction: column; gap: 0.25rem; }
    
    .nav-btn {
        padding: 0.75rem 1rem;
        border: none;
        border-left: 5px solid transparent; 
        background: transparent;
        color: var(--neutralLighterAlt, #f3f2f1);
        border-radius: var(--radius, 4px);
        cursor: pointer;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        transition: all 0.2s;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .nav-btn:hover { 
        background: var(--themeDarkAlt, #00355e); 
        color: var(--themeLighter, #c2d7e7); 
    }

    .nav-btn.active { 
        background: var(--themeDarkAlt, #00355e); 
        border-left-color: var(--themeTertiary, #427aa5);
        color: var(--themeLighter, #c2d7e7); 
        font-weight: 600; 
    }

    .nav-btn.sub-btn { 
        padding-left: 2.75rem; 
        font-size: 0.85rem; 
    }
    
    .font-bold { font-weight: 700; }
    
    .nav-dropdown-container { width: 100%; }
    .nav-dropdown-container .dropdown-trigger { width: 100%; justify-content: flex-start; }
    .nav-dropdown-container .dropdown-trigger .chevron { transition: transform 0.25s ease; margin-left: auto; display: flex; }
    .nav-dropdown-container.open .dropdown-trigger .chevron { transform: rotate(180deg); }
    .nav-dropdown-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, opacity 0.25s ease; opacity: 0; }
    .nav-dropdown-container.open .nav-dropdown-content { max-height: 300px; opacity: 1; }

    .logout-btn {
        color: var(--themeLighter, #c2d7e7) !important;
        opacity: 0.8;
    }

    .logout-btn:hover {
        background: var(--red, #d13438) !important;
        color: white !important;
        opacity: 1;
    }

    @media (max-width: 900px) {
        .app-sidebar {
            position: fixed;
            top: var(--header-height, 64px);
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            z-index: 1001;
            width: 280px;
            max-width: 85vw;
        }

        .app-sidebar.sidebar-visible {
            transform: translateX(0);
        }
    }
</style>