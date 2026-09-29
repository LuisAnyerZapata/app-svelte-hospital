/**
 * Crea una instancia del enrutador principal de la aplicación.
 * Gestiona el estado de la URL y proporciona métodos de navegación y resolución jerárquica.
 */
function createRouter() {
    // Estado reactivo de la ruta actual
    let currentPath = $state(window.location.pathname);

    // Sincronización con la API de historial del navegador
    window.addEventListener('popstate', () => {
        currentPath = window.location.pathname;
    });

    return {
        /** @returns {string} La ruta URL actual completa (ej. '/dashboard/overview') */
        get path() { 
            return currentPath; 
        },
        
        /**
         * Navega a una nueva ruta actualizando la URL del navegador.
         * @param {string} targetPath - La ruta de destino.
         */
        goto(targetPath) {
            window.history.pushState({}, '', targetPath);
            currentPath = targetPath; 
        },

        /**
         * Algoritmo de resolución de rutas jerárquicas.
         * Dado un mapa de rutas, identifica si la URL actual coincide exactamente
         * con un componente, o si pertenece a un "Layout" padre (ruta base).
         * 
         * @param {Record<string, any>} routesMap - El diccionario de rutas registradas.
         * @returns {{ component: any, subpath: string | null }} El componente a renderizar y su sub-ruta.
         */
        resolve(routesMap) {
            // 1. Coincidencia exacta (ej. '/' o '/login')
            if (routesMap[currentPath]) {
                return { component: routesMap[currentPath], subpath: null };
            }

            // 2. Resolución jerárquica: Busca el Layout padre más específico.
            // Ordena las rutas de mayor a menor longitud para evitar falsos positivos
            // (ej. evita que '/dashboard' capture a '/dashboard-custom' si existe).
            const sortedPaths = Object.keys(routesMap).sort((a, b) => b.length - a.length);
            
            for (const basePath of sortedPaths) {
                if (currentPath.startsWith(basePath + '/')) {
                    const subpath = currentPath.substring(basePath.length + 1);
                    return { 
                        component: routesMap[basePath], // Retorna el componente del Layout (ej. DashboardShell)
                        subpath                        // Retorna el segmento hijo (ej. 'overview')
                    };
                }
            }

            // 3. Ruta no encontrada
            return { component: null, subpath: null };
        },

        /**
         * Extrae el segmento de ruta hijo correspondiente a un ámbito específico.
         * Evita que los Layouts tengan que parsear la URL manualmente.
         * 
         * @param {string} scopePath - La ruta base que define el ámbito (ej. '/dashboard').
         * @returns {string | null} El segmento de ruta hijo (ej. 'overview') o null si no aplica.
         */
        getSubpath(scopePath) {
            if (currentPath.startsWith(scopePath + '/')) {
                return currentPath.substring(scopePath.length + 1);
            }
            return null;
        }
    };
}

export const router = createRouter();