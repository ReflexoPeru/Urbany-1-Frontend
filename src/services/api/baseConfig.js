/**
 * Configuración base de la API
 */

// Base URL de la API
// En desarrollo: usar ruta relativa que pasará por el proxy de Vite
// En producción: usar la URL completa del dominio
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? '/api/' : 'http://178.156.143.222/api/');

// Configuración de timeout para las peticiones (en milisegundos)
export const API_TIMEOUT = 30000; // 30 segundos

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

// Nombres de cookies para tokens
export const COOKIE_NAMES = {
    ACCESS_TOKEN: 'urbany_access_token',
    REFRESH_TOKEN: 'urbany_refresh_token',
    USER_DATA: 'urbany_user_data',
};

// Configuración de cookies
export const COOKIE_CONFIG = {
    // Días de expiración para el token de acceso (7 días por defecto)
    ACCESS_TOKEN_EXPIRY_DAYS: 7,
    // Días de expiración para el token de refresh (30 días por defecto)
    REFRESH_TOKEN_EXPIRY_DAYS: 30,
    // Opciones de seguridad para las cookies
    OPTIONS: {
        path: '/',
        // En desarrollo (HTTP) usar secure: false, en producción (HTTPS) usar secure: true
        secure: import.meta.env.PROD, // Solo enviar por HTTPS en producción
        sameSite: 'Strict', // Protección CSRF
    },
};

