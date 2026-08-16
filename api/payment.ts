import api from "../lib/api";
import Cookies from "js-cookie";

// Récupérer tous les paiements
export const getPaymentsApi = async () => {
  const response = await api.get("/payments",{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
// Récupérer un paiement
export const getPaymentApi = async (id: string) => {
  const response = await api.get(`/payments/${id}`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Ajouter un paiement
export const addPaymentApi = async (formData: FormData) => {
  const response = await api.post("/payments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Mettre à jour un paiement
export const updatePaymentApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/payments/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Supprimer un paiement
export const deletePaymentApi = async (id: number) => {
  const response = await api.delete(`/payments/${id}`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
