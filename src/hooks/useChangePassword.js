import { useState } from 'react';
import { post } from '../services/api/apiMethods';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginToGetToken = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await post('/api/auth/login/', {
                email: email,
                password: password
            });

            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data || err.message);
            throw err;
        }
    };

    const changePasswordWithToken = async (token, oldPassword, newPassword, newPasswordConfirm) => {
        setLoading(true);
        setError(null);

        try {
            const response = await post('/api/users/change-password/', {
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirm: newPasswordConfirm
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setLoading(false);
            return response;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data || err.message);
            throw err;
        }
    };

    return {
        loginToGetToken,
        changePasswordWithToken,
        loading,
        error
    };
};
