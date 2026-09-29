import { authApi } from '../services/auth-api.js';

function createSessionStore() {
    /** @type {import('../models/auth.models.js').User | null} */
    let currentUser = $state(_loadSession());

    let isAuthenticated = $derived(currentUser !== null);
    let userRole = $derived(currentUser?.role || null);

    /** @returns {import('../models/auth.models.js').User | null} */
    function _loadSession() {
        try {
            const saved = localStorage.getItem('hospital_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    }

    /**
     * @param {string} username
     * @param {string} password
     * @returns {{ ok: boolean, message?: string }}
     */
    function login(username, password) {
        const result = authApi.login(username, password);
        if (result.ok && result.user) {
            currentUser = result.user;
        }
        return result;
    }

    function logout() {
        authApi.logout();
        currentUser = null;
    }

    return {
        get user() { return currentUser; },
        get isAuthenticated() { return isAuthenticated; },
        get role() { return userRole; },
        login,
        logout
    };
}

export const session = createSessionStore();