import { post } from '../../../services/api/MethodsGeneral';

/**
 * Servicio de autenticación - Solo peticiones HTTP
 */
export const login = async (data) => {
    const response = await post('auth/login/', data);
    return response;
};

export const register = async (data) => {
    const response = await post('auth/register/', data);
    return response;
};

export default {
    login,
    register,
};

