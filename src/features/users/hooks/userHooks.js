import { useState, useEffect, useCallback } from 'react';
import {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
    changeUserPassword,
    fetchUserStatistics,
    fetchCurrentUser,
    assignUserRole,
} from '../services/userServices';

export const useUsers = ({ page = 1, search = '', pageSize = 20, autoFetch = true } = {}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });

    const loadUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers({ page, search, pageSize });
            setUsers(data.results || []);
            setPagination({
                count: data.count || 0,
                next: data.next,
                previous: data.previous,
            });
        } catch (err) {
            setError(err.message);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, [page, search, pageSize]);

    useEffect(() => {
        if (autoFetch) {
            loadUsers();
        }
    }, [autoFetch, loadUsers]);

    return {
        users,
        loading,
        error,
        pagination,
        refetch: loadUsers,
    };
};

export const useUser = (userId, autoFetch = true) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadUser = useCallback(async () => {
        if (!userId) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUserById(userId);
            setUser(data);
        } catch (err) {
            setError(err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (autoFetch && userId) {
            loadUser();
        }
    }, [autoFetch, userId, loadUser]);

    return {
        user,
        loading,
        error,
        refetch: loadUser,
    };
};

export const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const create = async (userData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await createUser(userData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        create,
        loading,
        error,
        success,
    };
};

export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const update = async (userId, userData, partial = false) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = partial 
                ? await patchUser(userId, userData)
                : await updateUser(userId, userData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        update,
        loading,
        error,
        success,
    };
};

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const remove = async (userId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await deleteUser(userId);
            setSuccess(true);
            return { success: true };
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        remove,
        loading,
        error,
        success,
    };
};

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const changePassword = async (userId, passwordData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await changeUserPassword(userId, passwordData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword,
        loading,
        error,
        success,
    };
};

export const useUserStatistics = (autoFetch = true) => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadStatistics = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUserStatistics();
            setStatistics(data);
        } catch (err) {
            setError(err.message);
            setStatistics(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            loadStatistics();
        }
    }, [autoFetch, loadStatistics]);

    return {
        statistics,
        loading,
        error,
        refetch: loadStatistics,
    };
};

export const useCurrentUser = (autoFetch = true) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadCurrentUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCurrentUser();
            setCurrentUser(data);
        } catch (err) {
            setError(err.message);
            setCurrentUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            loadCurrentUser();
        }
    }, [autoFetch, loadCurrentUser]);

    return {
        currentUser,
        loading,
        error,
        refetch: loadCurrentUser,
    };
};

export const useAssignRole = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const assignRole = async (userId, roleData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await assignUserRole(userId, roleData);
            setSuccess(true);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        assignRole,
        loading,
        error,
        success,
    };
};

export const useUserManagement = () => {
    const { create, loading: creating } = useCreateUser();
    const { update, loading: updating } = useUpdateUser();
    const { remove, loading: deleting } = useDeleteUser();

    return {
        create,
        update,
        remove,
        loading: creating || updating || deleting,
    };
};
