const DEFAULT_USERS = [
    { id: 'admin_1', username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador', email: 'admin@hospital.com', isActive: true },
    { id: 'patient_1', username: 'maria', password: 'demo123', role: 'patient', name: 'María Gómez', email: 'maria@email.com', patientId: 'p_1', isActive: true },
    { id: 'doctor_1', username: 'daruiz', password: 'demo123', role: 'doctor', name: 'Dra. Ana Ruiz', email: 'ana.ruiz@hospital.com', doctorId: 'd_1', isActive: true },
    { id: 'nurse_1', username: 'enfermera', password: 'demo123', role: 'nurse', name: 'Enf. Elena Soler', email: 'elena.soler@hospital.com', nurseId: 'n_1', isActive: true },
    { id: 'receptionist_1', username: 'recepcion', password: 'demo123', role: 'receptionist', name: 'Recepcionista Carla', email: 'carla.recepcion@hospital.com', receptionistId: 'r_1', isActive: true }
];

const STORAGE_KEY = 'hospital_prototype_v3';

/** @returns {any[]} */
function getUsers() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (data.users && data.users.length > 0) return data.users;
        }
    } catch (e) { console.error('Error loading users:', e) }
    return DEFAULT_USERS;
}

/**
 * @param {string} userId
 * @param {string} newPassword
 * @returns {boolean}
 */
function saveUserPassword(userId, newPassword) {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            const idx = data.users.findIndex(/** @param {any} u */ (u) => u.id === userId);
            if (idx !== -1) {
                data.users[idx].password = newPassword;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                return true;
            }
        }
    } catch (e) { console.error('Error saving password:', e) }
    return false;
}

export const authApi = {
    /**
     * @param {string} username
     * @param {string} password
     * @returns {{ ok: boolean, message?: string, user?: import('../models/auth.models.js').User }}
     */
    login(username, password) {
        const users = getUsers();
        const user = users.find(/** @param {any} u */ (u) => u.username === username);

        if (!user) return { ok: false, message: 'Usuario no encontrado. Verifique sus credenciales.' };
        if (user.isActive === false) return { ok: false, message: 'Esta cuenta ha sido desactivada. Contacte al administrador.' };
        if (user.password !== password) return { ok: false, message: 'Contraseña incorrecta. Verifique e intente nuevamente.' };

        const session = {
            id: user.id, username: user.username, name: user.name, role: user.role, email: user.email,
            patientId: user.patientId || null, doctorId: user.doctorId || null,
            nurseId: user.nurseId || null, receptionistId: user.receptionistId || null
        };

        localStorage.setItem('hospital_user', JSON.stringify(session));
        localStorage.setItem('hospital_landing_seen', 'true');
        return { ok: true, user: session };
    },

    logout() {
        localStorage.removeItem('hospital_user');
        localStorage.removeItem('hospital_landing_seen');
    },

    /** @param {string} email @returns {any | null} */
    findUserByEmail(email) {
        const users = getUsers();
        return users.find(/** @param {any} u */ (u) => u.email && u.email.toLowerCase() === email.toLowerCase()) || null;
    },

    /** @param {string} userId @param {string} username @returns {boolean} */
    verifyUsername(userId, username) {
        const users = getUsers();
        const user = users.find(/** @param {any} u */ (u) => u.id === userId);
        return user && user.username === username;
    },

    /** @param {string} userId @param {string} newPassword @returns {boolean} */
    resetPassword(userId, newPassword) {
        return saveUserPassword(userId, newPassword);
    }
};