import api from "../lib/api";

// Exemple : récupérer toutes les voitures
export const getCarsApi = async () => {
  const response = await api.get("/cars");
  return response.data;  
};

// Exemple : ajouter une voiture avec photo
export const addCarApi = async (formData: FormData) => {
  const response = await api.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Exemple : mettre à jour une voiture
export const updateCarApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/cars/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Exemple : supprimer une voiture
export const deleteCarApi = async (id: number) => {
  const response = await api.delete(`/cars/${id}`);
  return response.data;
};


