import api from "./axiosInstance";

export const getContacts = (params) => api.get("/contacts", { params });
export const getContact = (id) => api.get(`/contacts/${id}`);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);
