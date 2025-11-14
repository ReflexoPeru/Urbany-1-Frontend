/**
 * Exportaciones principales del módulo de API
 */

// Instancia de axios configurada
export { default as apiInstance } from './MethodsGeneral';

// Métodos HTTP
export { default as apiMethods, get, post, put, patch, del, request } from './apiMethods';

// Configuración
export {
    API_BASE_URL,
    API_TIMEOUT,
    DEFAULT_HEADERS,
    COOKIE_NAMES,
    COOKIE_CONFIG,
} from './baseConfig';

