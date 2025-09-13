import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"}/api`,
    // Removed withCredentials since we're not using cookies
});

// Add request interceptor to include token in Authorization header
axiosInstance.interceptors.request.use((config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle token storage
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear token on unauthorized
            localStorage.removeItem('authToken');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;