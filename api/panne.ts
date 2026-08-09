import api from "../lib/api";
import Cookies from "js-cookie";

// Récupérer toutes les pannes
export const getPannesApi = async () => {
  const response = await api.get("/pannes",{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Récupérer une panne
export const getPanneApi = async (id: string) => {
  const response = await api.get(`/pannes/${id}`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
}

// Ajouter une panne
export const addPanneApi = async (data: {
  car_id: number;
  priority: string;
  description: string;
  panneAmount: number;
}) => {
  const response = await api.post("/pannes", data,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Mettre à jour une panne
export const updatePanneApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/pannes/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Supprimer une panne
export const deletePanneApi = async (id: number) => {
  const response = await api.delete(`/pannes/${id}`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
