/**
 * Reemplaza al viejo `hasPermission` y al viejo `ROUTES`.
 * Basado estrictamente en los 5 roles de tu app.
 * @param {string} requiredRole - El permiso requerido (ej. 'staff_doctors').
 * @param {string} currentRole - El rol del usuario actual (ej. 'doctor').
 * @returns {boolean}
 */
export function hasPermission(requiredRole, currentRole) {
    if (!requiredRole) return true;
    if (!currentRole) return false;
    
    /** @type {Record<string, string>} */
    const roleMapping = {
        'staff_doctors': 'doctor',
        'staff_nurses': 'nurse',
        'staff_receptionists': 'receptionist',
        'mi_perfil': 'all' // Todos los roles pueden ver su propio perfil
    };

    return currentRole === roleMapping[requiredRole] || currentRole === 'admin' || requiredRole === 'all';
}