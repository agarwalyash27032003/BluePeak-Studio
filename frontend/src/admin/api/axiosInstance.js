import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim();

// In dev, fall back to Vite proxy (/api → localhost:10000) if env is missing or broken
const baseURL = backendUrl
  ? `${backendUrl.replace(/\/$/, "")}/api/admin`
  : "/api/admin";

if (!backendUrl && import.meta.env.DEV) {
  console.warn(
    "[Admin] VITE_BACKEND_URL not set — using /api proxy. Add VITE_BACKEND_URL=http://localhost:10000 to frontend/.env"
  );
}

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/login")) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      if (!window.location.pathname.includes("/admin-panel/login")) {
        window.location.href = "/admin-panel/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
