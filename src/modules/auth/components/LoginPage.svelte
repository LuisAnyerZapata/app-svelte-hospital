<script>
    import { router } from '../../../core/router/router.svelte.js';
    import { session } from '../stores/session.svelte.js';
    import { loginForm } from '../stores/login-form.svelte.js';
    import RecoveryModal from './RecoveryModal.svelte';

    let showRecover = $state(false);

    /** @param {Event} e */
    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!loginForm.validateAndProcess()) return;

        const result = session.login(loginForm.username.trim(), loginForm.password);

        if (result.ok) {
            loginForm.resetState();
            router.goto('/dashboard'); // Navegación directa, sin props raras
        } else {
            loginForm.handleFailure(result.message || 'Error desconocido');
        }
    }

    function openRecover() {
        showRecover = true;
    }
</script>

<div class="login-page">
    <div class="login-card">
        <div class="login-form-panel">
            <h1 class="login-title">Hospital Universitario Manuel Núñez Tovar</h1>
            <p class="login-subtitle">Sistema de Gestión de Citas Médicas</p>

            <form class="login-form" class:auth-shake={loginForm.shake} onsubmit={handleSubmit} autocomplete="off">
                <div class="login-field">
                    <input
                        class="login-input"
                        type="text"
                        id="login-user"
                        placeholder="Ingrese su usuario"
                        bind:value={loginForm.username}
                        required
                        disabled={loginForm.isLocked}
                    />
                </div>
                <div class="login-field">
                    <div class="auth-pw-wrap">
                        <input
                            class="login-input"
                            type={loginForm.showPassword ? 'text' : 'password'}
                            id="login-pass"
                            placeholder="Ingrese su contraseña"
                            bind:value={loginForm.password}
                            required
                            disabled={loginForm.isLocked}
                            style="padding-right:2.5rem;"
                        />
                        <button type="button" class="auth-eye" onclick={() => loginForm.showPassword = !loginForm.showPassword} tabindex="-1">
                            {#if loginForm.showPassword}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                    <path d="m6.72 12.72a3 3 0 1 1 4.24-4.24"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            {/if}
                        </button>
                    </div>
                </div>

                {#if loginForm.errorMsg}
                    <div class="auth-msg auth-err">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{loginForm.errorMsg}</span>
                    </div>
                {/if}

                {#if loginForm.warnMsg}
                    <div class="auth-msg auth-warn-msg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{loginForm.warnMsg}</span>
                    </div>
                {/if}

                {#if loginForm.isLocked}
                    <div class="auth-msg auth-lock-msg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span>Cuenta bloqueada temporalmente. Espere <strong>{loginForm.lockRemaining}</strong> segundos para intentar de nuevo.</span>
                    </div>
                {/if}

                <button type="submit" class="login-submit-btn" disabled={loginForm.isLocked}>
                    INICIAR SESIÓN
                </button>

                <div class="login-recover">
                    <a href="#recover" onclick={(e) => { e.preventDefault(); openRecover(); }}>
                        ¿Olvidó su contraseña? Recuperar acceso
                    </a>
                </div>
                <div class="login-recover" style="margin-top: 0.5rem;">
                    <a href="#landing" onclick={(e) => { e.preventDefault(); router.goto('/'); }}>
                        ← Volver a página de bienvenida
                    </a>
                </div>
            </form>
        </div>

        <div class="login-image-panel">
            <div class="login-image-overlay">
                <div class="brand-title">HUMNT</div>
                <div class="brand-desc">Hospital Universitario Manuel Núñez Tovar. Sistema de gestión de citas médicas.</div>
            </div>
        </div>
    </div>
</div>

{#if showRecover}
    <RecoveryModal onclose={() => showRecover = false} />
{/if}

<style>
    .login-page { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 100vh; 
        background: var(--themeLighter, #c2d7e7); 
        padding: 1.5rem; 
    }
    
    .login-card { 
        display: flex; 
        width: 100%; 
        max-width: 960px; 
        background: var(--card, #f6fbf6); 
        border-radius: var(--radius-lg, 16px); 
        box-shadow: var(--shadow-lg, 0 12px 40px rgba(15, 59, 47, 0.12)); 
        overflow: hidden; 
        animation: loginFadeIn 0.6s ease-out; 
    }

    @keyframes loginFadeIn { 
        from { opacity: 0; transform: translateY(16px); } to { opacity: 1; 
            transform: translateY(0); 
        } 
    }

    .login-form-panel { 
        width: 50%; 
        flex: 1; 
        padding: 3rem 2.5rem; 
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
    }

    .login-title { 
        font-size: 1.65rem; 
        font-weight: 700; 
        color: var(--themeDark, #002d4f); 
        line-height: 1.25; 
        margin-bottom: 0.35rem; 
    }

    .login-subtitle { 
        color: var(--muted, #94a89c); 
        font-size: 0.95rem; 
        margin-bottom: 2rem; 
    }

    .login-form { 
        display: flex; 
        flex-direction: column; 
        gap: 0.8rem; 
        margin-bottom: 2rem; 
    }

    .login-field { 
        display: flex; 
        flex-direction: column; 
        gap: 0.3rem; 
    }

    .login-input { 
        width: 100%; 
        padding: 0.3rem 0.85rem; 
        border-color: var(--neutralTertiary, #a19f9d); 
        border-width: 0 0 2px 0; 
        border-radius: var(--radius, 4px); 
        font-family: var(--font, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif); 
        font-size: 0.9rem; background: var(--white, white); 
        color: var(--themeDark, #002d4f); 
        box-shadow: 0 0 0 1px rgba(0, 120, 180, 0.12); 
        transition: border-color 0.2s, box-shadow 0.2s; 
        outline: none; 
    }

    .login-input:hover { 
        background: var(--themeLighterAlt, #faf9f8); 
        border-color: var(--themeTertiary, #427aa5); 
    }

    .login-input:focus {
         border-color: var(--themePrimary, #003b69); 
         box-shadow: 0 0 0 1px rgba(0, 120, 180, 0.12); 
    }

    .login-input::placeholder { 
        color: var(--muted, #94a89c); 
        font-weight: 400; 
    }

    .login-input:disabled { 
        opacity: 0.6; 
        cursor: not-allowed; 
    }

    .login-submit-btn { 
        width: 100%; 
        padding: 0.8rem; 
        border: none; 
        border-radius: var(--radius-sm, 4px); 
        background: var(--themeDark, #002d4f); 
        color: white; 
        font-family: inherit; 
        font-size: 0.95rem; 
        font-weight: 700; 
        letter-spacing: 0.04em; 
        cursor: pointer; 
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s; 
        margin-top: 0.25rem; 
    }

    .login-submit-btn:hover:not(:disabled) { 
        background: var(--themeDarkAlt, #00355e); 
        box-shadow: 0 4px 14px rgba(0, 120, 180, 0.25); 
    }

    .login-submit-btn:disabled { 
        opacity: 0.5; 
        cursor: not-allowed; 
    }

    .login-recover { 
        text-align: center; 
        margin-top: 0.15rem; 
    }

    .login-recover a { 
        color: var(--themeDark, #002d4f); 
        font-size: 0.85rem; 
        text-decoration: none; 
        font-weight: 500; 
        transition: color 0.2s; 
    }

    .login-recover a:hover { 
        color: var(--themePrimary, #003b69); 
        text-decoration: underline; 
    }

    .login-image-panel { 
        width: 50%; 
        min-height: 520px; 
        position: relative; 
        overflow: hidden; 
        flex-shrink: 0; 
    }

    .login-image-overlay { 
        position: absolute; 
        inset: 0; 
        background: linear-gradient(135deg, rgba(0, 32, 80, 0.85) 0%, rgba(0, 69, 120, 0.75) 40%, rgba(0, 120, 180, 0.65) 100%), url(/img/hospital.jpg); 
        background-size: cover; 
        background-position: center; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 
        padding: 2.5rem; 
        text-align: center; 
        color: white; 
    }

    .brand-title { 
        font-size: 2.4rem; 
        font-weight: 800; 
        letter-spacing: 0.06em; 
        margin-bottom: 0.75rem; 
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); 
    }

    .brand-desc { 
        font-size: 0.95rem; 
        line-height: 1.5; 
        opacity: 0.9; 
        max-width: 280px; 
    }

    .auth-pw-wrap { 
        position: relative; 
    }

    .auth-eye { 
        position: absolute; 
        right: 10px; 
        top: 50%; 
        transform: translateY(-50%); 
        background: none; 
        border: none; 
        cursor: pointer; 
        color: #999; 
        padding: 4px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
    }

    .auth-eye:hover { 
        color: #333; 
    }

    .auth-msg { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        padding: 0.6rem 0.85rem; 
        border-radius: 8px; 
        font-size: 0.78rem; 
        line-height: 1.45; 
        animation: authIn .3s ease; 
    }
    
    @keyframes authIn { 
        from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } 
    }

    .auth-err { 
        background: #fef2f2; 
        color: #dc2626; 
        border: 1px solid #fecaca; 
    }

    .auth-warn-msg { 
        background: #fffbeb; 
        color: #d97706; 
        border: 1px solid #fde68a; 
    }

    .auth-lock-msg { 
        background: #fef2f2; 
        color: #b91c1c; 
        border: 1px solid #fca5a5; 
        font-weight: 500; 
    }

    .auth-shake { 
        animation: authShake .4s ease; 
    }

    @keyframes authShake { 
        0%, 
        100% { transform: translateX(0); } 
        20% { transform: translateX(-8px); } 
        40% { transform: translateX(8px); } 
        60% { transform: translateX(-5px); } 
        80% { transform: translateX(5px); } 
    }

    @media (max-width: 1024px) { 
        .login-card { max-width: 90vw; } 
        .login-form-panel { padding: 2.5rem 2rem; } 
    }

    @media (max-width: 768px) { 
        .login-card { flex-direction: column; max-width: 100%; border-radius: 12px; margin: 0.5rem; } 
        .login-form-panel { width: 100%; padding: 2rem 1.5rem; } 
        .login-image-panel { width: 100%; min-height: 180px; order: -1; } 
        .login-title { font-size: 1.35rem; } 
        .login-subtitle { font-size: 0.85rem; margin-bottom: 1.5rem; } 
    }

    @media (max-width: 480px) { 
        .login-page { padding: 0.75rem; } 
        .login-form-panel { padding: 1.5rem 1.25rem; } 
        .login-image-panel { min-height: 140px; } 
        .login-title { font-size: 1.15rem; } 
        .login-submit-btn { padding: 0.7rem; font-size: 0.85rem; } 
    }

    @media (max-width: 360px) { 
        .login-page { padding: 0.5rem; } 
        .login-form-panel { padding: 1rem 0.75rem; } 
        .login-image-panel { min-height: 100px; } 
        .login-title { font-size: 1rem; } 
        .login-subtitle { font-size: 0.75rem; margin-bottom: 1rem; } 
        .login-input { font-size: 0.8rem; padding: 0.25rem 0.65rem; } 
        .brand-title { font-size: 1.6rem; } 
        .brand-desc { font-size: 0.75rem; max-width: 200px; } 
    }
</style>