import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
});

export default axiosInstance;