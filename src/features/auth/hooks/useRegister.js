import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerService } from '../services/authService';
import { setCookie } from '../../../utils/cookieUtility';

/**
 * Hook personalizado para manejar el registro
 * @returns {Object} - Objeto con estado y funciones del registro
 */
export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    /**
     * Función para realizar el registro
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} password_confirm - Confirmación de contraseña
     * @param {string} first_name - Nombre del usuario
     * @param {string} last_name - Apellido del usuario
     */
    const register = async (email, password, password_confirm, first_name, last_name) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerService({
                email,
                password,
                password_confirm,
                first_name,
                last_name,
            });

            // Guardar tokens en cookies si el registro incluye login automático
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

            // Registro exitoso, redirigir al dashboard
            navigate('/dashboard', { replace: true });
            return { success: true, data: response.data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Error al registrar usuario';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        error,
        clearError: () => setError(null),
    };
};

export default useRegister;

