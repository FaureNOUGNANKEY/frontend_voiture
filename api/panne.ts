import api from "../lib/api";

// Récupérer toutes les pannes
export const getPannesApi = async () => {
  const response = await api.get("/pannes");
  return response.data;
};

// Ajouter une panne
export const addPanneApi = async (data: {
  car_id: number;
  priority: string;
  description: string;
  panneAmount: number;
}) => {
  const response = await api.post("/pannes", data);
  return response.data;
};

// Mettre à jour une panne
export const updatePanneApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/pannes/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une panne
export const deletePanneApi = async (id: number) => {
  const response = await api.delete(`/pannes/${id}`);
  return response.data;
};
