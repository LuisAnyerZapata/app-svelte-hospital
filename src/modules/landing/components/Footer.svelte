<script>
    let { contact = {}, onnavclick = () => {}, ongetstarted = () => {} } = $props();
</script>

<footer class="landing-footer">
    <div class="landing-footer-content">
        <div class="landing-footer-section">
            <div class="landing-footer-logo">
                <img src="img/logotipo_blanco.png" alt="Logo HUMNT" style="height: 52px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));" />
            </div>
            <p class="landing-footer-description">Sistema de Gestión de Citas Médicas del Hospital Universitario Manuel Núñez Tovar</p>
            <p class="landing-footer-copyright">© 2024 HUMNT. Todos los derechos reservados.</p>
        </div>
        <div class="landing-footer-section">
            <h4>Contacto</h4>
            <div class="landing-footer-contact-item">
                <span class="footer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><path d="M22 6L12 13 2 6"/></svg></span>
                <span>{contact.email || 'info@humnt.gob.ve'}</span>
            </div>
            <div class="landing-footer-contact-item">
                <span class="footer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                <span>{contact.phone || '+58 (123) 456-7890'}</span>
            </div>
            <div class="landing-footer-contact-item">
                <span class="footer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <span>{contact.address || 'Av. Universidad, Maturín, Venezuela'}</span>
            </div>
        </div>
        <div class="landing-footer-section">
            <h4>Enlaces Rápidos</h4>
            <div class="landing-footer-links">
                <a href="#inicio" class="landing-footer-link" onclick={() => onnavclick()}><span class="footer-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span> Inicio</a>
                <a href="#areas" class="landing-footer-link" onclick={() => onnavclick()}><span class="footer-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg></span> Áreas Médicas</a>
                <a href="#contacto" class="landing-footer-link" onclick={() => onnavclick()}><span class="footer-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span> Contacto</a>
                <a href="#login" class="landing-footer-link" onclick={(e) => { e.preventDefault(); ongetstarted(); }}><span class="footer-link-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span> Iniciar Sesión</a>
            </div>
        </div>
    </div>
    <div class="landing-footer-bottom">
        <p>Hospital Universitario Manuel Núñez Tovar - Comprometidos con tu salud</p>
    </div>
</footer>

<style>
    .landing-footer { 
        background: #1f2937; 
        color: white; 
        padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) 1rem; 
        width: 100%; 
        max-width: 100%; 
    }

    .landing-footer-content { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr)); 
        gap: 2rem; 
        max-width: 1200px; 
        margin: 0 auto; 
    }

    .landing-footer-logo { 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
        margin-bottom: 1rem; 
    }

    .landing-footer-description { 
        color: #9ca3af; 
        font-size: 0.9rem; 
        line-height: 1.5; 
        margin-bottom: 1rem; 
    }

    .landing-footer-copyright { 
        color: #6b7280; 
        font-size: 0.8rem; 
    }

    .landing-footer-section h4 { 
        color: #10b981; 
        margin-bottom: 1rem; 
        font-size: clamp(1rem, 2vw, 1.1rem); 
        font-weight: 600; 
    }

    .landing-footer-contact-item { 
        display: flex; 
        align-items: center; 
        gap: 0.75rem; 
        margin-bottom: 0.75rem; 
        color: #9ca3af; 
        font-size: 0.9rem; 
    }

    .footer-icon { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        color: #10b981; 
        flex-shrink: 0; 
    }

    .footer-icon svg { 
        width: 18px; 
        height: 18px; 
    }

    .landing-footer-links { 
        display: flex; 
        flex-direction: column; 
        gap: 0.5rem; 
    }

    .landing-footer-link { 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
        color: #9ca3af; 
        text-decoration: none; 
        font-size: 0.9rem; 
        transition: color 0.3s ease; 
    }

    .footer-link-icon { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        color: #10b981; 
        transition: transform 0.3s ease; 
        flex-shrink: 0; 
    }

    .footer-link-icon svg { 
        width: 16px; 
        height: 16px; 
    }

    .landing-footer-link:hover { 
        color: #10b981; 
    }

    .landing-footer-link:hover .footer-link-icon { 
        transform: translateX(4px); 
    }

    .landing-footer-bottom { 
        text-align: center; 
        margin-top: 2rem; 
        padding-top: 1.5rem; 
        border-top: 1px solid #374151; 
        color: #6b7280; 
        font-size: 0.8rem; 
    }
    
    @media (max-width: 768px) { 
        .landing-footer-content { 
            grid-template-columns: 1fr; 
            text-align: center; 
        } 
        .landing-footer-logo { 
            justify-content: center; 
        } 
        .landing-footer-contact-item { 
            justify-content: center; 
        } 
        .landing-footer-links { 
            align-items: center; 
        } 
    }
</style>