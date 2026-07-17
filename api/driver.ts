import api from "../lib/api";

// Récupérer tous les chauffeurs
export const getDriversApi = async () => {
  const response = await api.get("/drivers");
  return response.data;
};

// Ajouter un chauffeur
export const addDriverApi = async (formData: FormData) => {
  const response = await api.post("/drivers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Mettre à jour un chauffeur
export const updateDriverApi =  async (id: number, formData: FormData) => {
  const response = await api.post(`/cars/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer un chauffeur
export const deleteDriverApi = async (id: number) => {
  const response = await api.delete(`/drivers/${id}`);
  return response.data;
};
