/**
 * Exportaciones del módulo de autenticación
 */
export { default as authService } from './authService';
export {
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser,
    isAuthenticated,
    getAccessToken,
    getUserData,
} from './authService';

