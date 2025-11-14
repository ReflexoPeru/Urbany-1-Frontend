import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS, COOKIE_NAMES, COOKIE_CONFIG } from './baseConfig';
import { getCookie, removeCookie } from '../../utils/cookieUtility';

/**
 * Instancia de axios configurada con la base URL y headers por defecto
 */
const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: DEFAULT_HEADERS,
});

/**
 * Interceptor de peticiones
 * Agrega el token de autenticación desde las cookies a cada petición
 */
instance.interceptors.request.use(
    (config) => {
        const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuestas
 * Maneja errores de autenticación y redirige al login si es necesario
 */
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si la respuesta es 401 (Unauthorized) o 403 (Forbidden)
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Limpiar cookies de autenticación
            removeCookie(COOKIE_NAMES.ACCESS_TOKEN, COOKIE_CONFIG.OPTIONS);
            removeCookie(COOKIE_NAMES.REFRESH_TOKEN, COOKIE_CONFIG.OPTIONS);
            removeCookie(COOKIE_NAMES.USER_DATA, COOKIE_CONFIG.OPTIONS);

            // Redirigir al login si no estamos ya en una ruta de autenticación
            if (!window.location.pathname.includes('/login') &&
                !window.location.pathname.includes('/register')) {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
