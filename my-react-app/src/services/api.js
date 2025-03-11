import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //url base da api
    headers: {
        "Content-Type" : "application/json",
    },
    timeout: 1000,
})

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['Content-Type'] = "multipart/form-data";
            config.timeout = null
        }

        return config;
    },
    (error) => {
        console.error("Erro no interceptor de requisição:", error);
        return Promise.reject(error);
    }
)

export default api;