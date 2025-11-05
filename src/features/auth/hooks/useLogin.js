import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { setCookie } from '../../../utils/cookieUtility';

/**
 * Hook personalizado para manejar el login
 * @returns {Object} - Objeto con estado y funciones del login
 */
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Función para realizar el login
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     */
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginService({ email, password });

            // Guardar tokens en cookies
            if (response.data?.tokens) {
                // Guardar access token
                if (response.data.tokens.access) {
                    setCookie('token', response.data.tokens.access, 7); // 7 días
                }

                // Guardar refresh token
                if (response.data.tokens.refresh) {
                    setCookie('refresh_token', response.data.tokens.refresh, 30); // 30 días
                }
            }

            // Guardar información del usuario en localStorage (para UI)
            if (response.data?.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // También guardar user_id en cookie por si se necesita
                if (response.data.user.id) {
                    setCookie('user_id', response.data.user.id.toString(), 7);
                }
            }

            // Login exitoso, redirigir al dashboard
            navigate('/dashboard', { replace: true });
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Error al iniciar sesión';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
        clearError: () => setError(null),
    };
};

export default useLogin;

