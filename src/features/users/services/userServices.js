import { get, post, put, patch, del } from '../../../services/api/apiMethods';

export const fetchUserById = async (userId) => {
    return await get(`users/${userId}`);
};

export const createUser = async (userData) => {
    return await post('users', userData);
};

export const updateUser = async (userId, userData) => {
    return await put(`users/${userId}`, userData);
};

export const patchUser = async (userId, userData) => {
    return await patch(`users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
    await del(`users/${userId}`);
    return { success: true };
};

export const changeUserPassword = async (userId, passwordData) => {
    return await post(`users/${userId}/change-password`, passwordData);
};

export const fetchUserStatistics = async () => {
    return await get('users/statistics');
};

export const fetchCurrentUser = async () => {
    return await get('users/me');
};

export const assignUserRole = async (userId, roleData) => {
    return await post(`users/${userId}/assign-role`, roleData);
};
