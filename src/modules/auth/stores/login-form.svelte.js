function createLoginFormStore() {
    let username = $state('');
    let password = $state('');
    let errorMsg = $state('');
    let warnMsg = $state('');
    let attempts = $state(0);
    let lockedUntil = $state(0);
    let showPassword = $state(false);
    let shake = $state(false);

    const MAX_ATTEMPTS = 3;
    const LOCK_SECONDS = 30;

    let lockRemaining = $derived(Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000)));
    let isLocked = $derived(lockedUntil > Date.now());

    /** @type {number | undefined} */
    let lockTimer = undefined;

    function startLockTimer() {
        // Prevenimos crear múltiples intervalos si se llama varias veces
        if (lockTimer) clearInterval(lockTimer);
        
        lockTimer = setInterval(() => {
            if (Date.now() >= lockedUntil) {
                lockedUntil = 0; // Esto hará que `isLocked` se vuelva false reactivamente
                if (lockTimer) clearInterval(lockTimer);
                lockTimer = undefined;
            }
        }, 1000);
    }

    /**
     * Valida el formulario. Retorna true si debe proceder con el login de la API.
     * @returns {boolean}
     */
    function validateAndProcess() {
        if (isLocked) return false;

        errorMsg = '';
        warnMsg = '';

        // En un caso real, aquí validaríamos formatos antes de llamar a la API
        return true;
    }

    /** @param {string} message */
    function handleFailure(message) {
        attempts++;
        shake = true;
        setTimeout(() => shake = false, 450);
        
        if (attempts >= MAX_ATTEMPTS) {
            lockedUntil = Date.now() + LOCK_SECONDS * 1000;
            attempts = 0;
            startLockTimer();
        } else {
            errorMsg = message;
            warnMsg = `Intento ${attempts} de ${MAX_ATTEMPTS}. Después de ${MAX_ATTEMPTS} intentos fallidos la cuenta se bloqueará temporalmente.`;
        }
    }

    function resetState() {
        attempts = 0;
        errorMsg = '';
        warnMsg = '';
    }

    return {
        get username() { return username; }, set username(v) { username = v; },
        get password() { return password; }, set password(v) { password = v; },
        get showPassword() { return showPassword; }, set showPassword(v) { showPassword = v; },
        get errorMsg() { return errorMsg; },
        get warnMsg() { return warnMsg; },
        get isLocked() { return isLocked; },
        get lockRemaining() { return lockRemaining; },
        get shake() { return shake; },
        validateAndProcess,
        handleFailure,
        resetState
    };
}

export const loginForm = createLoginFormStore();