import axios from 'axios';
import {
  getCookie,
  removeCookie,
} from '../../utils/cookieUtility';

const BaseURL =
  'https://178.156.143.222/api/';

const instance = axios.create({
  baseURL: BaseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('token') || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response?.status == 401 || error.response?.status == 403) &&
      window.location.pathname.includes('/Inicio')
    ) {
      removeCookie('token');
      removeCookie('refresh_token');
      removeCookie('user_id');
      window.location.href = '/error500';
    }
    return Promise.reject(error);
  },
);

export default instance;
