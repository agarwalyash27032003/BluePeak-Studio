import api from "./axiosInstance";

export const getDashboard = () => api.get("/analytics/dashboard");
export const getPL = () => api.get("/analytics/pl");
export const globalSearch = (q) => api.get("/analytics/search", { params: { q } });
