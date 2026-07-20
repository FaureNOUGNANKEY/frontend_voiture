import api from "../lib/api";

//récupérer toutes les voitures
export const getCarsApi = async () => {
  const response = await api.get("/cars");
  return response.data;  
};

//ajouter une voiture 
export const addCarApi = async (formData: FormData) => {
  const response = await api.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//mettre à jour une voiture
export const updateCarApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/cars/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//supprimer une voiture
export const deleteCarApi = async (id: number) => {
  const response = await api.delete(`/cars/${id}`);
  return response.data;
};


