<script>
    let {
        title = 'Sistema de Gestión de Citas Médicas',
        subtitle = 'Hospital Universitario Manuel Núñez Tovar',
        description = 'Plataforma integral para la administración eficiente de citas, historias clínicas y comunicaciones en el entorno hospitalario.',
        backgroundImage = 'img/hospital.jpg',
        stats = [],
        ongetstarted = null
    } = $props()

    const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22600%22%20viewBox%3D%220%200%201200%20600%22%3E%3Crect%20width%3D%221200%22%20height%3D%22600%22%20fill%3D%22%230078b4%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%20font-size%3D%2236%22%20font-family%3D%22Arial%22%3EHospital%20Universitario%3C%2Ftext%3E%3C%2Fsvg%3E"

    /** @param {Event} e */
    function handleImageError(e) {
        const img = /** @type {HTMLImageElement} */ (e.target);
        if (img) {
            img.src = FALLBACK_IMAGE;
        }
    }
</script>

<section class="landing-hero" id="inicio">
    <div class="landing-hero-background">
        <img
            src={backgroundImage}
            alt={subtitle}
            onerror={handleImageError}
        />
    </div>
    <div class="landing-hero-overlay"></div>
    <div class="landing-hero-content">
        <h1 class="landing-hero-title">
            <span class="landing-hero-title-main">{title}</span>
            <span class="landing-hero-title-sub">{subtitle}</span>
        </h1>
        <p class="landing-hero-description">{description}</p>
        <div class="landing-hero-buttons">
            <button class="landing-btn landing-btn-primary landing-btn-large" onclick={ongetstarted}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                </svg>
                Comenzar Ahora
            </button>
        </div>
        {#if stats.length > 0}
            <div class="landing-stats">
                {#each stats as stat}
                    <div class="landing-stat-item">
                        <span class="landing-stat-number">{stat.value}</span>
                        <span class="landing-stat-label">{stat.label}</span>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .landing-hero {
        position: relative;
        min-height: 100vh;
        min-height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .landing-hero-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .landing-hero-background img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .landing-hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(0, 32, 80, 0.85) 0%, rgba(0, 69, 120, 0.75) 40%, rgba(0, 120, 180, 0.65) 100%);
        z-index: 1;
    }

    .landing-hero-content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        width: 100%;
        padding: 2.5rem;
        text-align: center;
        color: white;
    }

    .landing-hero-title {
        margin-bottom: 1.5rem;
        color: var(--bg-light, #f0f7f0);
    }

    .landing-hero-title-main {
        display: block;
        font-size: clamp(1.8rem, 5vw, 2.8rem);
        font-weight: 800;
        line-height: 1.15;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .landing-hero-title-sub {
        display: block;
        font-size: clamp(1rem, 2.5vw, 1.3rem);
        margin-top: 0.5rem;
        font-weight: 400;
        opacity: 0.95;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .landing-hero-description {
        font-size: clamp(0.9rem, 2vw, 1.1rem);
        margin-bottom: 2rem;
        line-height: 1.6;
        opacity: 0.95;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .landing-hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 2rem;
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

    .landing-btn-primary {
        background: linear-gradient(135deg, #00213b, #003b69);
        color: white;
    }

    .landing-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 120, 180, 0.3);
    }

    .landing-btn svg {
        width: 18px;
        height: 18px;
    }

    .landing-btn-large {
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }

    .landing-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: clamp(1rem, 2vw, 1.5rem);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .landing-stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .landing-stat-number {
        font-size: clamp(1.3rem, 3.5vw, 1.8rem);
        font-weight: 800;
        color: white;
    }

    .landing-stat-label {
        font-size: clamp(0.7rem, 1.5vw, 0.875rem);
        color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 768px) {
        .landing-hero {
            min-height: 90vh;
            min-height: 90dvh;
        }
        .landing-hero-content {
            padding: 2rem 1.5rem;
        }
        .landing-stats {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .landing-hero-content {
            padding: 1.5rem 1rem;
        }
        .landing-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
        }
    }

    @media (max-width: 360px) {
        .landing-hero {
            min-height: 85vh;
            min-height: 85dvh;
        }
        .landing-hero-content {
            padding: 1rem 0.75rem;
        }
        .landing-stats {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 0.75rem;
        }
        .landing-hero-buttons {
            flex-direction: column;
            align-items: center;
        }
        .landing-btn-large {
            padding: 0.75rem 1.5rem;
            font-size: 0.95rem;
            width: 100%;
            max-width: 280px;
            justify-content: center;
        }
    }
</style>