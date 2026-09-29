<script>
    let { ongetstarted = () => {} } = $props();
</script>

<section class="landing-cta">
    <h2>¿Listo para optimizar la gestión de tu salud?</h2>
    <p>Accede a nuestro sistema de citas en línea y agenda tus consultas de forma rápida y segura</p>
    <button class="landing-btn landing-btn-primary landing-btn-large" onclick={() => ongetstarted()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
        Comenzar Ahora
    </button>
</section>

<style>
    .landing-cta { 
        text-align: center; 
        padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem); 
        background: white; width: 100%; max-width: 100%; 
    }

    .landing-cta h2 { 
        font-size: clamp(1.4rem, 4vw, 2rem); 
        color: #1f2937; 
        margin-bottom: 1rem; 
    }

    .landing-cta p { 
        color: #6b7280; 
        margin-bottom: 2rem; 
        font-size: clamp(0.9rem, 2.5vw, 1.1rem); 
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
        transition: all 0.3s 
        ease; font-family: 
        inherit; 
    }

    .landing-btn-primary { 
        background: linear-gradient(135deg, #00213b, #003b69); 
        color: white; 
    }

    .landing-btn-primary:hover { 
        transform: translateY(-2px); 
        box-shadow: 0 4px 12px rgba(0, 120, 180, 0.3); 
    }

    .landing-btn-large { 
        padding: 1rem 2rem; 
        font-size: 1.1rem; 
    }
    
    @media (max-width: 640px) { 
        .landing-btn-large { 
            padding: 0.75rem 1.5rem; 
            font-size: 1rem; 
        } 
    }
</style>