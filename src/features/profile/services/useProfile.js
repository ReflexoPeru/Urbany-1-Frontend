import { useCallback, useEffect, useState } from 'react';
import { get, post } from '../../../services/api';

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get('auth/me/');
      setProfile(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (payload) => {
    return await post('users/change-password/', payload);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    refresh: fetchProfile,
    changePassword,
  };
};

export default useProfile;