import api from "./axiosInstance";

export const getExpenses = (params) => api.get("/expenses", { params });
export const getExpenseSummary = (params) => api.get("/expenses/summary", { params });
export const getExpense = (id) => api.get(`/expenses/${id}`);
export const createExpense = (data) => {
  const form = toFormData(data);
  return api.post("/expenses", form, { headers: { "Content-Type": "multipart/form-data" } });
};
export const updateExpense = (id, data) => {
  const form = toFormData(data);
  return api.put(`/expenses/${id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
};
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

const toFormData = (data) => {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      if (k === "receipt" && v instanceof File) form.append("receipt", v);
      else if (k !== "receipt") form.append(k, v);
    }
  });
  return form;
};
