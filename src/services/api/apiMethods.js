/**
 * Métodos HTTP reutilizables para hacer peticiones a la API
 */
import apiInstance from './MethodsGeneral';

/**
 * Realiza una petición GET
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} params - Parámetros de consulta (query params)
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const get = async (endpoint, params = {}, config = {}) => {
    try {
        const response = await apiInstance.get(endpoint, {
            params,
            ...config,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza una petición POST
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} data - Datos a enviar en el body
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const post = async (endpoint, data = {}, config = {}) => {
    try {
        const response = await apiInstance.post(endpoint, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza una petición PUT
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} data - Datos a enviar en el body
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const put = async (endpoint, data = {}, config = {}) => {
    try {
        const response = await apiInstance.put(endpoint, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza una petición PATCH
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} data - Datos a enviar en el body
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const patch = async (endpoint, data = {}, config = {}) => {
    try {
        const response = await apiInstance.patch(endpoint, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza una petición DELETE
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const del = async (endpoint, config = {}) => {
    try {
        const response = await apiInstance.delete(endpoint, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Realiza una petición con método personalizado
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE, etc.)
 * @param {string} endpoint - Endpoint de la API (sin la base URL)
 * @param {object} data - Datos a enviar (para POST, PUT, PATCH)
 * @param {object} config - Configuración adicional de axios
 * @returns {Promise} - Respuesta de la API
 */
export const request = async (method, endpoint, data = null, config = {}) => {
    try {
        const response = await apiInstance.request({
            method: method.toUpperCase(),
            url: endpoint,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Exportar todos los métodos como un objeto
export default {
    get,
    post,
    put,
    patch,
    delete: del,
    request,
};

