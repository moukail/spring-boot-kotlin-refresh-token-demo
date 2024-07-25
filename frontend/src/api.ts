import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        let refreshToken = localStorage.getItem('refreshToken');
        if (error.response.status === 401 && refreshToken == null) {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("401 error");
            originalRequest._retry = true;
            try {
                const { data } = await api.post('/auth/refresh-token', {
                    token: refreshToken,
                });
                localStorage.setItem('accessToken', data.accessToken);
                api.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token expired or invalid');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;