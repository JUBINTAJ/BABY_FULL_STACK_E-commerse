
import axios from "axios";

const baseURL=import.meta.env.VITE_BABY_URL

const axiosInstance = axios.create({
  baseURL: baseURL, 
  withCredentials: true,
  timeout: 5000,

});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("user/refreshtoken");

                isRefreshing = false;
                return axiosInstance(originalRequest);
                
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);

                if (refreshError.response?.status === 401) {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;