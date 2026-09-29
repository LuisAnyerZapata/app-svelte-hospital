<script>
    import { authApi } from '../services/auth-api.js';

    let { onclose = () => {} } = $props();

    let currentView = $state('email');
    let email = $state('');
    /** @type {any} */
    let foundUser = $state(null);
    let verifyUsername = $state('');
    let newPass = $state('');
    let confirmPass = $state('');
    let error = $state('');
    let showNewPass = $state(false);
    let showConfirmPass = $state(false);

    /** @param {string} pw @returns {null | { label: string, color: string, w: string }} */
    function getPassStrength(pw) {
        if (!pw) return null;
        let s = 0;
        if (pw.length >= 6) s++;
        if (pw.length >= 8) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^a-zA-Z0-9]/.test(pw)) s++;
        if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
        if (s <= 1) return { label: 'Débil', color: '#ef4444', w: '25%' };
        if (s <= 2) return { label: 'Regular', color: '#f59e0b', w: '50%' };
        if (s <= 3) return { label: 'Buena', color: '#3b82f6', w: '75%' };
        return { label: 'Fuerte', color: '#10b981', w: '100%' };
    }

    let pwStrength = $derived(getPassStrength(newPass));

    /** @param {Event} e */
    function handleEmailSubmit(e) {
        e.preventDefault();
        error = '';
        const user = authApi.findUserByEmail(email.trim());
        if (!user) return (error = 'No se encontró una cuenta asociada a este correo electrónico.');
        if (user.isActive === false) return (error = 'Esta cuenta está desactivada. Contacte al administrador.');
        foundUser = user;
        currentView = 'verify';
    }

    /** @param {Event} e */
    function handleVerifySubmit(e) {
        e.preventDefault();
        error = '';
        if (!authApi.verifyUsername(foundUser.id, verifyUsername.trim())) {
            return (error = 'El nombre de usuario no coincide. Verifique e intente nuevamente.');
        }
        currentView = 'reset';
    }

    /** @param {Event} e */
    function handleResetSubmit(e) {
        e.preventDefault();
        error = '';
        if (newPass.length < 6) return (error = 'La contraseña debe tener al menos 6 caracteres.');
        if (newPass !== confirmPass) return (error = 'Las contraseñas no coinciden. Verifique e intente nuevamente.');
        
        if (authApi.resetPassword(foundUser.id, newPass)) {
            currentView = 'success';
        } else {
            error = 'Error al cambiar la contraseña. Intente nuevamente.';
        }
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="auth-modal-overlay" role="dialog" aria-modal="true" tabindex="-1" onclick={(e) => { if (e.target === e.currentTarget) onclose(); }}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="auth-modal" role="presentation" onclick={(e) => e.stopPropagation()}>
        <button class="auth-modal-close" onclick={() => onclose()} style="color: var(--red);">X</button>

        {#if currentView === 'email'}
            <div class="auth-rec">
                <div class="auth-rec-head">
                    <span class="auth-rec-ico">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    <h3>Recuperar Acceso</h3>
                    <p>Ingrese el correo electrónico asociado a su cuenta para buscarla en el sistema</p>
                </div>
                <form onsubmit={handleEmailSubmit}>
                    <div class="login-field">
                        <label class="login-label" for="rec-email">Correo electrónico</label>
                        <input class="login-input" type="email" id="rec-email" placeholder="ejemplo@hospital.com" bind:value={email} required />
                    </div>
                    {#if error}<div class="auth-msg auth-err"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>{error}</span></div>{/if}
                    <button type="submit" class="login-submit-btn" style="width:100%;">BUSCAR CUENTA</button>
                </form>
            </div>
        {:else if currentView === 'verify'}
            <div class="auth-rec">
                <div class="auth-rec-head">
                    <span class="auth-rec-ico">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </span>
                    <h3>Verificación de Identidad</h3>
                    <p>Cuenta encontrada: <strong>{foundUser?.name}</strong><br>Para verificar su identidad, ingrese su nombre de usuario registrado</p>
                </div>
                <form onsubmit={handleVerifySubmit}>
                    <div class="login-field">
                        <label class="login-label" for="verify-user">Nombre de usuario</label>
                        <input class="login-input" type="text" id="verify-user" placeholder="Ingrese su nombre de usuario" bind:value={verifyUsername} required />
                    </div>
                    {#if error}<div class="auth-msg auth-err"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>{error}</span></div>{/if}
                    <button type="submit" class="login-submit-btn" style="width:100%;">VERIFICAR IDENTIDAD</button>
                </form>
            </div>
        {:else if currentView === 'reset'}
            <div class="auth-rec">
                <div class="auth-rec-head">
                    <span class="auth-rec-ico">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
                    </span>
                    <h3>Nueva Contraseña</h3>
                    <p>Establezca una nueva contraseña para la cuenta de <strong>{foundUser?.name}</strong></p>
                </div>
                <form onsubmit={handleResetSubmit}>
                    <div class="login-field">
                        <label class="login-label" for="new-pass">Nueva contraseña</label>
                        <div class="auth-pw-wrap">
                            <input class="login-input" type={showNewPass ? 'text' : 'password'} id="new-pass" placeholder="Mínimo 6 caracteres" bind:value={newPass} required minlength="6" style="padding-right:2.5rem;" />
                            <button type="button" class="auth-eye" onclick={() => showNewPass = !showNewPass} tabindex="-1">
                                {#if showNewPass}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>{:else}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{/if}
                            </button>
                        </div>
                        {#if newPass}
                            <div class="auth-str">
                                <div class="auth-str-bar"><div class="auth-str-fill" style="width: {pwStrength?.w}; background: {pwStrength?.color};"></div></div>
                                <span class="auth-str-lbl" style="color: {pwStrength?.color};">{pwStrength?.label}</span>
                            </div>
                        {/if}
                    </div>
                    <div class="login-field">
                        <label class="login-label" for="confirm-pass">Confirmar contraseña</label>
                        <div class="auth-pw-wrap">
                            <input class="login-input" type={showConfirmPass ? 'text' : 'password'} id="confirm-pass" placeholder="Repita la contraseña" bind:value={confirmPass} required minlength="6" style="padding-right:2.5rem;" />
                            <button type="button" class="auth-eye" onclick={() => showConfirmPass = !showConfirmPass} tabindex="-1">
                                {#if showConfirmPass}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>{:else}<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{/if}
                            </button>
                        </div>
                    </div>
                    {#if error}<div class="auth-msg auth-err"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>{error}</span></div>{/if}
                    <button type="submit" class="login-submit-btn" style="width:100%;">CAMBIAR CONTRASEÑA</button>
                </form>
            </div>
        {:else if currentView === 'success'}
            <div class="auth-rec">
                <div class="auth-rec-head">
                    <span class="auth-rec-ico auth-ico-ok">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <h3>¡Contraseña Actualizada!</h3>
                    <p>Su contraseña ha sido cambiada exitosamente.<br>Ya puede iniciar sesión con su nueva contraseña.</p>
                </div>
                <button class="login-submit-btn" onclick={() => onclose()} style="width:100%;">VOLVER AL LOGIN</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .auth-modal-overlay { 
        position: fixed; inset: 0; 
        background: rgba(0, 0, 0, 0.5); 
        backdrop-filter: blur(4px); 
        z-index: 9999; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        animation: authModalFadeIn .25s ease; 
    }

    @keyframes authModalFadeIn { 
        from { opacity: 0; } to { opacity: 1; } 
    }

    .auth-modal { 
        background: #fff; 
        border-radius: 16px; 
        width: 100%; 
        max-width: 440px; 
        padding: 2rem; 
        position: relative; 
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25); 
        animation: authModalSlideUp .3s ease; 
    }
    
    @keyframes authModalSlideUp { 
        from { 
            opacity: 0; 
            transform: translateY(30px); } to { opacity: 1; transform: translateY(0); 
        } 
    }

    .auth-modal-close { 
        position: absolute; 
        top: 12px; 
        right: 14px; 
        background: none; 
        border: none; 
        cursor: pointer; 
        color: #6b7280; 
        font-size: 0.9rem; 
        display: flex; 
        align-items: center; 
        gap: 4px; 
        padding: 6px 10px; 
        border-radius: 6px; 
        transition: all .2s; 
    }

    .auth-modal-close:hover { 
        background: #f3f4f6; 
        color: #1f2937; 
    }

    .auth-modal .login-field { 
        margin-bottom: 1rem; 
    }

    .auth-modal .login-label { 
        display: block; 
        margin-bottom: 0.35rem; 
        font-size: 0.8rem; 
        font-weight: 600; 
        color: #374151; 
    }

    .auth-modal .login-input { 
        width: 100%; 
        padding: 0.3rem 0.85rem; 
        border-color: var(--neutralTertiary, #a19f9d); 
        border-width: 0 0 2px 0; 
        border-radius: var(--radius, 4px); 
        font-family: var(--font, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif); 
        font-size: 0.9rem; 
        background: var(--white, white); 
        color: var(--themeDark, #002d4f); 
        box-shadow: 0 0 0 1px rgba(0, 120, 180, 0.12); 
        transition: border-color 0.2s, box-shadow 0.2s; 
        outline: none; 
    }

    .auth-modal .login-input:hover { 
        background: var(--themeLighterAlt, #faf9f8); 
        border-color: var(--themeTertiary, #427aa5); 
    }

    .auth-modal .login-input:focus { 
        border-color: var(--themePrimary, #003b69); 
        box-shadow: 0 0 0 1px rgba(0, 120, 180, 0.12); 
    }

    .auth-modal .login-input::placeholder { 
        color: var(--muted, #94a89c); 
        font-weight: 400; 
    }

    .auth-modal .login-submit-btn { 
        display: block; 
        width: 100%; 
        padding: 0.7rem; 
        background: var(--themeDark, #002d4f); 
        color: #fff; 
        border: none; 
        border-radius: 8px; 
        font-weight: 700; 
        font-size: 0.88rem; 
        cursor: pointer; 
        transition: all .2s; 
        letter-spacing: 0.03em; 
    }

    .auth-modal .login-submit-btn:hover { 
        background: var(--themeDarkAlt, #00355e); 
        box-shadow: 0 4px 12px rgba(0, 120, 180, 0.3); 
    }

    .auth-rec { 
        animation: authSlide .35s ease; 
    }

    @keyframes authSlide { 
        from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } 
    }

    .auth-rec-head { 
        text-align: center; 
        margin-bottom: 0.5rem; 
    }

    .auth-rec-head h3 { 
        margin: 0.75rem 0 0.25rem; 
        font-size: 1.15rem; 
        color: #1a202c; 
    }

    .auth-rec-head p { 
        margin: 0; 
        font-size: 0.82rem; 
        color: #6b7280; line-height: 1.55; 
    }

    .auth-rec-ico { 
        display: inline-flex; 
        align-items: center; 
        justify-content: center; 
        width: 52px; 
        height: 52px; 
        border-radius: 50%; 
        background: var(--themeDark, #002d4f); 
        color: white; 
        box-shadow: 0 4px 12px rgba(0, 120, 180, 0.25); 
    }

    .auth-ico-ok { 
        background: linear-gradient(135deg, var(--themeDark, #002d4f), var(--themePrimary, #003b69)); 
    }

    .auth-str { 
        display: flex; 
        align-items: center; 
        gap: 8px; 
        margin-top: 6px; 
    }

    .auth-str-bar { 
        flex: 1; 
        height: 4px; 
        background: #e5e7eb; 
        border-radius: 4px; 
        overflow: hidden; 
    }

    .auth-str-fill { 
        height: 100%; 
        border-radius: 4px; 
        transition: all .3s ease; 
    }

    .auth-str-lbl { 
        font-size: 0.68rem; 
        font-weight: 600; 
        white-space: nowrap; 
    }
    
    @media (max-width: 768px) { 
        .auth-modal { 
            max-width: 90vw; 
            padding: 1.5rem; 
            margin: 1rem; 
        } 
        
        .auth-modal-close { 
            top: 8px; 
            right: 10px; 
        } 
    }

    @media (max-width: 480px) { 
        .auth-modal { 
            padding: 1.25rem; 
        }
         
        .auth-rec-head h3 { 
            font-size: 1rem; 
        } 
        
        .auth-rec-ico { 
            width: 44px; 
            height: 44px; 
        } 

        .auth-rec-ico svg { 
            width: 18px; 
            height: 18px; 
        } 
    }

    @media (max-width: 360px) { 
        .auth-modal { 
            padding: 1rem; 
            border-radius: 12px; 
        } 
    }
</style>