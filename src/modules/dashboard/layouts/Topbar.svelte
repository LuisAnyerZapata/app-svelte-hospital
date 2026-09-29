<script>
    import { sidebarState } from '../stores/sidebar-state.svelte.js';
    import SearchBar from './SearchBar.svelte';
    import UserMenu from './UserMenu.svelte';

    let { user, onlogout, currentTitle = '', onnavigate, ontogglemenu } = $props();
</script>

<header class="app-header">
    <div class="header-logo-area">
        <button class="hamburger-btn" onclick={ontogglemenu} aria-label="Abrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                {#if sidebarState.menuOpen}
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                {:else}
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                {/if}
            </svg>
        </button>
        <img src="/img/logotipo_blanco.png" alt="Logo HUMNT" class="header-logo-img" />
    </div>

    <div class="header-content-area">
        <div class="header-left">
            <h2 id="header-module-title">{currentTitle}</h2>
        </div>
        
        <div class="header-right">
            <SearchBar {user} {onnavigate} />
            <UserMenu {user} {onlogout} />
        </div>
    </div>
</header>

<style>
    .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        background: var(--white, white);
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        position: relative; 
        z-index: 1000;
        height: var(--header-height, 64px);
    }

    .header-logo-area {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
        flex-shrink: 0;
        background: var(--themeDark, #002d4f);
        padding: 0 0.75rem;
        width: var(--sidebar-width, 240px); 
    }

    .header-logo-img {
        height: 36px;
        object-fit: contain;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
    }
        
    .header-content-area {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 1.5rem;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    #header-module-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--themeDarker, #00213b);
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .hamburger-btn {
        display: none;
        background: none;
        border: none;
        color: var(--white, white);
        cursor: pointer;
        padding: 0.25rem;
        line-height: 0;
        border-radius: 4px;
        transition: background 0.2s;
    }
    
    .hamburger-btn:hover {
        background: rgba(255,255,255,0.1);
    }

    @media (max-width: 768px) {
        .hamburger-btn {
            display: inline-flex;
        }

        .header-logo-area { 
            width: var(--sidebar-width, 240px); 
            padding: 0 0.25rem;
            gap: 0.25rem;
            background: transparent !important;
        }

        .hamburger-btn {
            color: var(--themeDark, #002d4f);
        }

        #header-module-title {
            display: none;
        }

        .header-logo-img {
            display: none;
        }
    }
</style>