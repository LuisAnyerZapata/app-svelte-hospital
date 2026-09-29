<script>
    let {
        areas = [],
        title = 'Áreas Médicas',
        subtitle = 'Departamentos y servicios especializados de nuestro hospital'
    } = $props()

    /** @type {HTMLElement | null} */
    let scrollContainer = null

    /** @param {WheelEvent} e */
    function handleWheel(e) {
        if (scrollContainer && e.deltaY !== 0) {
            e.preventDefault()
            scrollContainer.scrollLeft += e.deltaY
        }
    }
</script>

<section class="landing-areas" id="areas">
    <h2 class="landing-section-title">{title}</h2>
    <p class="landing-section-subtitle">{subtitle}</p>

    <div
        class="landing-areas-scroll-container"
        bind:this={scrollContainer}
        onwheel={handleWheel}
    >
        <div class="landing-areas-scroll">
            {#each areas as area}
                <div class="landing-area-card-wrapper">
                    <div class="landing-area-card" style="border-left: 3px solid {area.color};">
                        <h3 class="landing-area-title">{area.title}</h3>
                        <p class="landing-area-description">{area.description}</p>
                        <div class="landing-area-stats">
                            <div class="landing-area-stat">
                                <span class="landing-area-stat-value">{area.stats.doctors}</span>
                                <span class="landing-area-stat-label">Médicos</span>
                            </div>
                            <div class="landing-area-stat">
                                <span class="landing-area-stat-value">{area.stats.appointments}</span>
                                <span class="landing-area-stat-label">Citas</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .landing-areas {
        padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem);
        background: white;
        position: relative;
        width: 100%;
        max-width: 100%;
    }

    .landing-section-title {
        text-align: center;
        font-size: clamp(1.5rem, 4vw, 2rem);
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .landing-section-subtitle {
        text-align: center;
        color: #6b7280;
        margin-bottom: clamp(1.5rem, 4vw, 3rem);
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    }

    .landing-areas-scroll-container {
        position: relative;
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        overflow-x: auto;
        padding: 1rem 0 3rem 0;
        margin-top: 2rem;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .landing-areas-scroll-container::-webkit-scrollbar {
        display: none;
    }

    .landing-areas-scroll {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
        padding: 0.5rem 0.25rem 1.5rem 0.25rem;
    }

    .landing-area-card-wrapper {
        min-width: 0;
    }

    .landing-area-card {
        background: #ffffff;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-left: 3px solid transparent;
    }

    .landing-area-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }

    .landing-area-title {
        font-size: clamp(1.1rem, 2.5vw, 1.25rem);
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.5rem 0;
    }

    .landing-area-description {
        font-size: 0.9rem;
        color: #6b7280;
        line-height: 1.5;
        flex-grow: 1;
    }

    .landing-area-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 4px;
        margin-top: auto;
        border-top: 1px solid #e1dfdd;
    }

    .landing-area-stat {
        text-align: center;
    }

    .landing-area-stat-value {
        display: block;
        font-size: 1.1rem;
        font-weight: 700;
        color: #10b981;
    }

    .landing-area-stat-label {
        font-size: 0.7rem;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        .landing-areas-scroll {
            display: flex;
            overflow-x: auto;
            gap: 1rem;
            padding: 0.5rem 0.25rem 1.5rem;
            scroll-snap-type: x mandatory;
        }

        .landing-area-card-wrapper {
            flex: 0 0 280px;
            min-width: 280px;
            scroll-snap-align: start;
        }

        .landing-area-card-wrapper:first-child {
            margin-left: 0.5rem;
        }

        .landing-area-card-wrapper:last-child {
            margin-right: 0.5rem;
        }
    }

    @media (max-width: 480px) {
        .landing-area-card-wrapper {
            flex: 0 0 260px;
            min-width: 260px;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .landing-areas-scroll {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>