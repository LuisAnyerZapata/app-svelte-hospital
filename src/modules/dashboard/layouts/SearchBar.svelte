<script>
    import { hasPermission } from '../../../core/security/permissions.js';

    let { user, onnavigate } = $props();
    
    let searchQuery = $state('');
    let searchFocused = $state(false);

    const SEARCH_OPTIONS = [
        { id: 'overview', label: 'Dashboard', parent: null },
        { id: 'system', label: 'Gestionar Inicio', parent: null },
        { id: 'scheduling', label: 'Citas', parent: null },
        { id: 'patients', label: 'Pacientes', parent: null },
        { id: 'staff_doctors', label: 'Médicos', parent: 'Personal' },
        { id: 'staff_nurses', label: 'Enfermeras', parent: 'Personal' },
        { id: 'staff_receptionists', label: 'Recepcionistas', parent: 'Personal' },
        { id: 'facilities_areas', label: 'Áreas', parent: null },
        { id: 'medical-records', label: 'Historia Clínica Integral', parent: null },
        { id: 'triage', label: 'Triaje', parent: null },
        { id: 'security', label: 'Seguridad y Auditoría', parent: null },
        { id: 'mi_perfil', label: 'Mi Perfil', parent: null }
    ];

    let searchResults = $derived.by(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase().trim();
        return SEARCH_OPTIONS.filter(opt => {
            if (!hasPermission(opt.id, user?.role)) return false;
            return opt.label.toLowerCase().includes(q) || (opt.parent && opt.parent.toLowerCase().includes(q));
        });
    });

    /** @param {string} id */
    function selectResult(id) {
        searchQuery = '';
        onnavigate(id);
    }

    /** @param {KeyboardEvent} e */
    function handleKeydown(e) {
        if (e.altKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('global-search')?.focus();
        }
    }

    $effect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

<div class="header-search">
    <div class="header-search-input-wrapper">
        <span class="header-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input
            type="text"
            id="global-search"
            class="header-search-input"
            placeholder="Buscar... (Alt+K)"
            bind:value={searchQuery}
            onfocus={() => searchFocused = true}
            onblur={() => setTimeout(() => searchFocused = false, 200)}
        />
    </div>
    {#if searchFocused && searchResults.length > 0}
        <div class="header-search-results active">
            {#each searchResults as r}
                <div role="button" tabindex="0" class="search-result-item" 
                     onclick={() => selectResult(r.id)} 
                     onkeydown={(e) => { if (e.key === 'Enter') selectResult(r.id); }}>
                    <div class="search-result-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div class="search-result-info">
                        <div class="search-result-label">{r.label}</div>
                        {#if r.parent}<div class="search-result-parent">{r.parent}</div>{/if}
                    </div>
                </div>
            {/each}
        </div>
    {:else if searchFocused && searchQuery.trim() && searchResults.length === 0}
        <div class="header-search-results active">
            <div class="header-search-empty">No se encontraron resultados</div>
        </div>
    {/if}
</div>

<style>
    .header-search {
        position: relative;
        width: 320px;
    }

    .header-search-input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .header-search-icon {
        position: absolute;
        left: 12px;
        color: var(--muted, #94a89c);
        display: flex;
        pointer-events: none;
    }

    .header-search-input {
        width: 100%;
        padding: 0.65rem 1rem 0.65rem 2.5rem;
        background: var(--white, white);
        border: 1px solid var(--neutralQuaternaryAlt, #e1dfdd);
        border-radius: 40px; 
        font-size: 0.9rem;
        transition: all 0.2s;
        color: var(--neutralPrimary, #323130);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        outline: none;
    }

    .header-search-input:focus {
        border-color: var(--themeTertiary, #427aa5);
        box-shadow: 0 0 0 4px rgba(0, 120, 180, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .header-search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-radius: 12px;
        box-shadow: var(--shadow-lg, 0 12px 40px rgba(15, 59, 47, 0.12));
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1100;
        border: 1px solid var(--border, #e8f3ea);
        display: none;
        animation: modalSlideUp 0.15s ease-out;
    }

    .header-search-results.active {
        display: block;
    }

    .search-result-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        cursor: pointer;
        transition: background 0.2s;
        border-bottom: 1px solid var(--border-light, #f1f8f1);
    }

    .search-result-item:last-child {
        border-bottom: none;
    }

    .search-result-item:hover {
        background: var(--bg-light, #f0f7f0);
    }

    .search-result-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: var(--primary-light, rgba(15, 141, 58, 0.1));
        color: var(--accent, #467c2a);
        border-radius: 8px;
    }

    .search-result-info {
        flex: 1;
    }

    .search-result-label {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--text, #436757);
    }

    .search-result-parent {
        font-size: 0.75rem;
        color: var(--muted, #94a89c);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .header-search-empty {
        padding: 1.5rem;
        text-align: center;
        color: var(--muted, #94a89c);
        font-size: 0.9rem;
    }

    @keyframes modalSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
        .header-search {
            width: auto;
        }

        .header-search-input {
            width: 140px;
            padding: 0.5rem 0.5rem 0.5rem 2.2rem;
            font-size: 0.8rem;
        }

        .header-search-icon {
            left: 0.6rem;
        }
    }

    @media (max-width: 480px) {
        .header-search-input {
            width: 100px;
            padding: 0.5rem 0.5rem 0.5rem 1.8rem;
            font-size: 0.75rem;
        }

        .header-search-icon {
            left: 0.4rem;
        }
    }
</style>