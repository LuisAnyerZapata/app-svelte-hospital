<script>
    let { ongetstarted = () => {}, onnavclick = () => {} } = $props();
    let mobileMenuOpen = $state(false);

    function toggleMenu() {
        mobileMenuOpen = !mobileMenuOpen;
    }

    $effect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    });
</script>

<header class="landing-header">
    <div class="landing-logo">
        <img src="./img/logotipo.png" alt="Logo HUMNT" style="height: 48px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
    </div>
    <nav class="landing-nav" class:open={mobileMenuOpen}>
        <div class="landing-nav-links">
            <a href="#inicio" class="landing-nav-link active" onclick={() => onnavclick()}>Inicio</a>
            <a href="#areas" class="landing-nav-link" onclick={() => onnavclick()}>Áreas Médicas</a>
            <a href="#contacto" class="landing-nav-link" onclick={() => onnavclick()}>Contacto</a>
        </div>
        <button class="landing-btn landing-btn-outline radios mobile-login" onclick={() => ongetstarted()} title="Iniciar sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Ingresar
        </button>
    </nav>
    <div class="landing-actions">
        <button class="landing-btn landing-btn-outline radios" onclick={() => ongetstarted()} title="Iniciar sesión">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <button class="hamburger" class:open={mobileMenuOpen} onclick={toggleMenu} aria-label="Menú">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>

{#if mobileMenuOpen}
    <div class="nav-overlay" onclick={() => mobileMenuOpen = false} role="presentation"></div>
{/if}

<style>
    .landing-header { 
        display: flex; 
        align-items: center; 
        justify-content: space-between; 
        padding: 1rem 2rem; 
        background: rgba(255, 255, 255, 0.95); 
        backdrop-filter: blur(10px); 
        box-shadow: 0 2px 20px rgba(0,0,0,0.1); 
        position: sticky; 
        top: 0; 
        z-index: 1000; 
    }

    .landing-logo { 
        display: flex; 
        align-items: center; 
        gap: 0.75rem; 
    }

    .landing-nav { 
        display: flex; 
        gap: 2rem; 
    }

    .landing-nav-links { 
        display: flex; 
        gap: 2rem; 
    }

    .landing-nav-link { 
        text-decoration: none; 
        color: #1f2937; 
        font-weight: 500; 
        padding: 0.5rem 0; 
        position: relative; 
    }

    .landing-nav-link::after { 
        content: ''; 
        position: absolute; 
        bottom: 0; 
        left: 0; 
        width: 0; 
        height: 2px; 
        background: #003b69; 
        transition: 
        width 0.3s ease; 
    }

    .landing-nav-link:hover::after, .landing-nav-link.active::after { 
        width: 100%; 
    }

    .landing-actions { 
        display: flex; 
        gap: 1rem; 
        align-items: center; 
    }

    .landing-btn { 
        display: inline-flex; 
        align-items: center; 
        gap: 0.5rem; 
        padding: 0.6rem 1.2rem; 
        border: none; 
        border-radius: 8px; 
        font-weight: 500; 
        cursor: pointer; 
        transition: all 0.3s ease; 
        font-family: inherit; 
    }

    .landing-btn svg { 
        width: 18px; 
        height: 18px; 
    }

    .radios { 
        border-radius: 100%; 
    }

    .landing-btn-outline { 
        background: transparent; 
        border: 2px solid #003b69; 
        color: #002d4f; 
    }

    .landing-btn-outline:hover { 
        background: rgba(0, 120, 180, 0.1); 
    }

    .hamburger { 
        display: none; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        gap: 5px; 
        width: 40px; 
        height: 40px; 
        border: none; 
        background: transparent; 
        cursor: pointer; 
        padding: 8px; 
        border-radius: 6px; 
        transition: background 0.2s; 
    }

    .hamburger:hover { 
        background: rgba(0,0,0,0.05); 
    }

    .hamburger span { 
        display: block; 
        width: 22px; 
        height: 2.5px; 
        background: #003b69; 
        border-radius: 2px; 
        transition: all 0.3s ease; 
    }

    .mobile-login { 
        display: none; 
    }

    .nav-overlay { 
        position: fixed; 
        inset: 0; 
        background: rgba(0,0,0,0.4); 
        z-index: 998; 
    }

    @media (max-width: 768px) {
        .hamburger { 
            display: flex; 
        }

        .landing-nav { 
            position: fixed; 
            top: 0; 
            right: 0; 
            width: 280px; 
            height: 100vh; 
            height: 100dvh; 
            flex-direction: column; 
            background: white; 
            padding: 1.25rem 1.5rem 1.5rem; 
            gap: 0; 
            box-shadow: -4px 0 20px rgba(0,0,0,0.15); 
            transform: translateX(100%); 
            transition: transform 0.3s ease; 
            z-index: 999; 
            visibility: hidden; 
            overflow-y: auto; 
            -webkit-overflow-scrolling: touch; 
        }

        .landing-nav.open { 
            transform: translateX(0); 
            visibility: visible; 
        }

        .landing-nav-links { 
            display: flex; 
            flex-direction: column; 
            gap: 0; 
        }

        .landing-nav-link { 
            padding: 0.75rem 0; 
            font-size: 1.05rem; 
            border-bottom: 1px solid #f0f0f0; 
        }

        .mobile-login { 
            display: inline-flex !important; 
            margin-top: 2rem; 
            border-radius: 8px !important; 
            justify-content: center; 
            width: 100%; 
            flex-shrink: 0; 
        }

        .hamburger.open span:nth-child(1) { 
            transform: rotate(45deg) translate(5px, 5px); 
        }

        .hamburger.open span:nth-child(2) { 
            opacity: 0; 
        }

        .hamburger.open span:nth-child(3) { 
            transform: rotate(-45deg) translate(5px, -5px); 
        }
    }
    @media (max-width: 360px) {
        .landing-header { 
            padding: 0.5rem 0.75rem; 
        }

        .landing-logo img { 
            height: 36px !important; 
        }
        
        .landing-nav { 
            width: 100%; 
            padding: 3.5rem 1.25rem 1rem; 
        }
    }
</style>