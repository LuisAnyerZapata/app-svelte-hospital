<script>
    let { social = {} } = $props();
</script>

<section class="landing-social" id="contacto">
    <h2 class="landing-section-title">Redes Sociales</h2>
    <p class="landing-section-subtitle">Síguenos en nuestras plataformas oficiales</p>
    <div class="landing-social-grid">
        <a href="https://instagram.com/{social.instagram ? social.instagram.replace('@', '') : 'humnt'}" target="_blank" rel="noopener noreferrer" class="landing-social-card">
            <div class="landing-social-icon instagram"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></div>
            <h3>Instagram</h3><p>{social.instagram || '@humnt_oficial'}</p>
        </a>
        <a href="https://t.me/{social.telegram ? social.telegram.replace('@', '') : 'humnt'}" target="_blank" rel="noopener noreferrer" class="landing-social-card">
            <div class="landing-social-icon telegram"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>
            <h3>Telegram</h3><p>{social.telegram || '@humnt_citas'}</p>
        </a>
        <a href="https://facebook.com/{social.facebook ? social.facebook.replace('/', '') : 'humnt'}" target="_blank" rel="noopener noreferrer" class="landing-social-card">
            <div class="landing-social-icon facebook"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></div>
            <h3>Facebook</h3><p>{social.facebook || '/hospitalmanuelnunez'}</p>
        </a>
        <a href="https://wa.me/{social.whatsapp ? social.whatsapp.replace(/[^0-9]/g, '') : '584241234567'}" target="_blank" rel="noopener noreferrer" class="landing-social-card">
            <div class="landing-social-icon whatsapp"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div>
            <h3>WhatsApp</h3><p>{social.whatsapp || '+58 424-1234567'}</p>
        </a>
    </div>
</section>

<style>
    .landing-social { 
        padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem); 
        background: linear-gradient(135deg, #f8fafc, #e2e8f0); 
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
        margin-bottom: 3rem; 
        font-size: clamp(0.9rem, 2.5vw, 1.1rem); 
    }

    .landing-social-grid { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: clamp(1rem, 2vw, 2rem); 
        max-width: 1000px; 
        margin: 0 auto; 
    }

    .landing-social-card { 
        text-decoration: none; 
        color: inherit; 
        background: white; 
        padding: clamp(1.25rem, 3vw, 2rem); 
        border-radius: 16px;  
        text-align: center; 
        transition: all 0.3s ease; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
    }

    .landing-social-card:hover { 
        transform: translateY(-5px); 
        box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
    }

    .landing-social-icon { 
        width: clamp(60px, 10vw, 80px); 
        height: clamp(60px, 10vw, 80px); 
        border-radius: 50%; 
        margin: 0 auto 1rem; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
    }

    .landing-social-icon svg { 
        width: clamp(24px, 4vw, 32px); 
        height: clamp(24px, 4vw, 32px); 
    }

    .landing-social-icon.instagram { 
        background: linear-gradient(45deg, #f09433, #d62976, #962fbf); 
    }

    .landing-social-icon.telegram { 
        background: #0088cc; 
    }

    .landing-social-icon.facebook { 
        background: #1877f2; 
    }

    .landing-social-icon.whatsapp { 
        background: #25d366; 
    }

    .landing-social-card h3 { 
        margin: 0 0 0.5rem 0; 
        color: #1f2937; 
        font-size: clamp(0.95rem, 2vw, 1.1rem); 
    }

    .landing-social-card p { 
        margin: 0; 
        color: #6b7280; 
        font-size: clamp(0.75rem, 1.5vw, 0.9rem); 
        word-break: break-word; 
    }

    @media (max-width: 1024px) { 
        .landing-social-grid { 
            grid-template-columns: repeat(2, 1fr); 
            max-width: 600px; 
        } 
    }

    @media (max-width: 480px) { 
        .landing-social-grid { 
            grid-template-columns: 1fr; 
            max-width: 320px; 
        } 
        
        .landing-social-icon { 
            width: 56px; 
            height: 56px; 
        } 
    }
</style>