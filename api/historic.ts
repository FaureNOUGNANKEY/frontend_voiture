import api from "../lib/api";

// Récupérer tous les historiques
export const getHistoricsApi = async () => {
  const response = await api.get("/historics");
  return response.data;
};

// Ajouter un historique
export const addHistoricApi = async (formData: FormData) => {
  const response = await api.post("/historics", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Mettre à jour un historique
export const updateHistoricApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/historics/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer un historique
export const deleteHistoricApi = async (id: number) => {
  const response = await api.delete(`/historics/${id}`);
  return response.data;
};
