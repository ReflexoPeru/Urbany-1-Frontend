/**
 * Servicio de autenticación
 * Maneja login, registro, logout y gestión de tokens usando cookies
 */
import { post, get } from '../api/apiMethods';
import { setCookie, removeCookie, getCookie } from '../../utils/cookieUtility';
import { COOKIE_NAMES, COOKIE_CONFIG } from '../api/baseConfig';

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} - Datos del usuario y tokens
 */
export const login = async (email, password) => {
    try {
        const response = await post('/auth/login/', {
            email,
            password,
        });

        // Guardar tokens en cookies
        if (response.tokens?.access) {
            setCookie(
                COOKIE_NAMES.ACCESS_TOKEN,
                response.tokens.access,
                COOKIE_CONFIG.ACCESS_TOKEN_EXPIRY_DAYS,
                COOKIE_CONFIG.OPTIONS
            );
        }

        if (response.tokens?.refresh) {
            setCookie(
                COOKIE_NAMES.REFRESH_TOKEN,
                response.tokens.refresh,
                COOKIE_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS,
                COOKIE_CONFIG.OPTIONS
            );
        }

        // Guardar datos del usuario en cookies
        if (response.user) {
            setCookie(
                COOKIE_NAMES.USER_DATA,
                JSON.stringify(response.user),
                COOKIE_CONFIG.ACCESS_TOKEN_EXPIRY_DAYS,
                COOKIE_CONFIG.OPTIONS
            );
        }

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Registra un nuevo usuario
 * @param {object} userData - Datos del usuario a registrar
 * @returns {Promise<object>} - Respuesta del servidor
 */
export const register = async (userData) => {
    try {
        const response = await post('/auth/register/', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Cierra sesión del usuario
 * @param {string} refreshToken - Token de refresh (opcional, se obtiene de cookies si no se proporciona)
 * @returns {Promise<object>} - Respuesta del servidor
 */
export const logout = async (refreshToken = null) => {
    try {
        const token = refreshToken || getCookie(COOKIE_NAMES.REFRESH_TOKEN);

        if (token) {
            try {
                await post('/auth/logout/', { refresh: token });
            } catch (error) {
                // Si falla el logout en el servidor, continuamos limpiando las cookies
                console.warn('Error al cerrar sesión en el servidor:', error);
            }
        }

        // Limpiar todas las cookies de autenticación
        removeCookie(COOKIE_NAMES.ACCESS_TOKEN, COOKIE_CONFIG.OPTIONS);
        removeCookie(COOKIE_NAMES.REFRESH_TOKEN, COOKIE_CONFIG.OPTIONS);
        removeCookie(COOKIE_NAMES.USER_DATA, COOKIE_CONFIG.OPTIONS);

        return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
        throw error;
    }
};

/**
 * Refresca el token de acceso usando el refresh token
 * @returns {Promise<object>} - Nuevos tokens
 */
export const refreshToken = async () => {
    try {
        const refreshTokenValue = getCookie(COOKIE_NAMES.REFRESH_TOKEN);

        if (!refreshTokenValue) {
            throw new Error('No hay refresh token disponible');
        }

        const response = await post('/auth/refresh/', {
            refresh: refreshTokenValue,
        });

        // Actualizar el token de acceso en cookies
        if (response.access) {
            setCookie(
                COOKIE_NAMES.ACCESS_TOKEN,
                response.access,
                COOKIE_CONFIG.ACCESS_TOKEN_EXPIRY_DAYS,
                COOKIE_CONFIG.OPTIONS
            );
        }

        return response;
    } catch (error) {
        // Si falla el refresh, limpiar cookies y redirigir al login
        removeCookie(COOKIE_NAMES.ACCESS_TOKEN, COOKIE_CONFIG.OPTIONS);
        removeCookie(COOKIE_NAMES.REFRESH_TOKEN, COOKIE_CONFIG.OPTIONS);
        removeCookie(COOKIE_NAMES.USER_DATA, COOKIE_CONFIG.OPTIONS);
        throw error;
    }
};

/**
 * Obtiene el perfil del usuario autenticado
 * @returns {Promise<object>} - Datos del usuario
 */
export const getCurrentUser = async () => {
    try {
        const response = await get('/auth/me/');
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} - true si hay un token de acceso válido
 */
export const isAuthenticated = () => {
    return !!getCookie(COOKIE_NAMES.ACCESS_TOKEN);
};

/**
 * Obtiene el token de acceso actual
 * @returns {string|null} - Token de acceso o null
 */
export const getAccessToken = () => {
    return getCookie(COOKIE_NAMES.ACCESS_TOKEN);
};

/**
 * Obtiene los datos del usuario desde las cookies
 * @returns {object|null} - Datos del usuario o null
 */
export const getUserData = () => {
    const userData = getCookie(COOKIE_NAMES.USER_DATA);
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error('Error al parsear datos del usuario:', error);
            return null;
        }
    }
    return null;
};

export default {
    login,
    register,
    logout,
    refreshToken,
    getCurrentUser,
    isAuthenticated,
    getAccessToken,
    getUserData,
};

