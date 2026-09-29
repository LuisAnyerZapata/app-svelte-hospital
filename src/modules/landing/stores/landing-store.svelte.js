/** @typedef {{ id?: string; name?: string; description?: string; color?: string; areaId?: string; parentId?: string; isActive?: boolean; otherAreas?: string[] }} StoreArea */
/** @typedef {{ title: string; description: string; color: string; stats: { doctors: number; appointments: number } }} Area */
/** @typedef {{ label: string; value: string | number }} Stat */
/** @typedef {{ hero?: { title?: string; subtitle?: string; description?: string; backgroundImage?: string }; social?: Record<string, string>; contact?: Record<string, string>; stats?: Stat[] }} Config */
/** @typedef {{ get: (key: string) => any }} DataStore */

/**
 * Crea el store reactivo del dominio Landing
 * @param {DataStore | null} externalStore
 * @returns {{ areas: Area[]; hero: { title: string; subtitle: string; description: string; backgroundImage: string }; stats: Stat[]; social: Record<string, string>; contact: Record<string, string>; initialize: () => void }}
 */
function createLandingStore(externalStore = null) {
    const defaultAreas = [
        { title: 'Medicina Interna', description: 'Diagnóstico y tratamiento de enfermedades en adultos', color: '#64748b', stats: { doctors: 12, appointments: 45 } },
        { title: 'Pediatría', description: 'Atención médica integral para niños y adolescentes', color: '#578e7e', stats: { doctors: 8, appointments: 32 } },
        { title: 'Cardiología', description: 'Especialidad en enfermedades del corazón y sistema circulatorio', color: '#9f7373', stats: { doctors: 6, appointments: 28 } },
        { title: 'Traumatología', description: 'Tratamiento de lesiones del sistema musculoesquelético', color: '#b48464', stats: { doctors: 5, appointments: 21 } },
        { title: 'Ginecología', description: 'Atención especializada en salud femenina', color: '#87769e', stats: { doctors: 7, appointments: 38 } },
        { title: 'Neurología', description: 'Diagnóstico y tratamiento de trastornos neurológicos', color: '#6b979c', stats: { doctors: 4, appointments: 19 } }
    ];

    let areas = $state(defaultAreas);
    let config = $state(/** @type {Config | null} */ (null));

    async function loadMedicalAreas() {
        if (!externalStore) return;
        try {
            const storeAreas = /** @type {StoreArea[]} */ (externalStore.get('areas') || []);
            const mainAreas = storeAreas.filter(/** @param {StoreArea} a */ (a) => !a.parentId && a.isActive !== false);

            if (mainAreas.length > 0) {
                const doctors = /** @type {any[]} */ (externalStore.get('doctors') || []);
                const appointments = /** @type {any[]} */ (externalStore.get('appointments') || []);
                areas = mainAreas.slice(0, 12).map(/** @param {StoreArea} a */ (a) => ({
                    title: a.name || 'Sin nombre',
                    description: a.description || 'Área médica especializada del Hospital Universitario',
                    color: a.color || '#578e7e',
                    stats: {
                        doctors: doctors.filter(/** @param {any} d */ (d) => d.areaId === a.id || (d.otherAreas && d.otherAreas.includes(a.id))).length,
                        appointments: appointments.filter(/** @param {any} apt */ (apt) => apt.areaId === a.id).length
                    }
                }));
            }
        } catch (error) {
            console.error('Error cargando áreas médicas:', error);
        }
    }

    function loadConfig() {
        if (!externalStore) return;
        const configData = externalStore.get('landingConfig');
        config = (configData && !Array.isArray(configData)) ? configData : null;
    }

    function initialize() {
        loadMedicalAreas();
        loadConfig();
    }

    const hero = $derived({
        title: config?.hero?.title || 'Sistema de Gestión de Citas Médicas',
        subtitle: config?.hero?.subtitle || 'Hospital Universitario Manuel Núñez Tovar',
        description: config?.hero?.description || 'Plataforma integral para la administración eficiente de citas, historias clínicas y comunicaciones en el entorno hospitalario.',
        backgroundImage: config?.hero?.backgroundImage || 'img/hospital.jpg'
    });

    const social = $derived(config?.social ?? {});
    const contact = $derived(config?.contact ?? {});

    const defaultStatsDef = [
        { label: 'Pacientes registrados', value: 'auto' },
        { label: 'Médicos especialistas', value: 'auto' },
        { label: 'Citas gestionadas', value: 'auto' },
        { label: 'Áreas médicas', value: 'auto' }
    ];
    const statDefs = $derived(config?.stats ?? defaultStatsDef);

    function getStatValue(/** @type {string} */ label) {
        if (!externalStore) return '0';
        const l = label.toLowerCase();
        if (l.includes('paciente')) return externalStore.get('patients').length;
        if (l.includes('médico') || l.includes('doctor')) return externalStore.get('doctors').length;
        if (l.includes('cita')) return externalStore.get('appointments').length;
        if (l.includes('área')) return externalStore.get('areas').length;
        return '0';
    }

    const stats = $derived(
        statDefs.map(/** @param {Stat} s */ (s) => ({
            label: s.label,
            value: s.value === 'auto' ? getStatValue(s.label) : s.value
        }))
    );

    return {
        get areas() { return areas; },
        get hero() { return hero; },
        get stats() { return stats; },
        get social() { return social; },
        get contact() { return contact; },
        initialize
    };
}

export const landingStore = createLandingStore();