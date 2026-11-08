
const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && localStorage.getItem("token")) {
            localStorage.removeItem("token");
            if (!window.location.pathname.endsWith("login.html")) {
                window.location.href = "login.html";
            }
        }
        return Promise.reject(error);
    }
);

window.api = api;
