import api from "./axiosInstance";

export const getDocuments = (projectId, params) =>
  api.get(`/projects/${projectId}/documents`, { params });

export const uploadDocuments = (projectId, files, category) => {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  form.append("category", category);
  return api.post(`/projects/${projectId}/documents`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteDocument = (id) => api.delete(`/${id}`);
