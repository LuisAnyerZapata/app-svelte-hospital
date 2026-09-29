import { landingRoutes } from '../../modules/landing/routes.js';
import { authRoutes } from '../../modules/auth/routes.js';
import { dashboardRoutes } from '../../modules/dashboard/routes.js';

export const appRoutes = {
    ...landingRoutes,
    ...authRoutes,
    ...dashboardRoutes,
};  