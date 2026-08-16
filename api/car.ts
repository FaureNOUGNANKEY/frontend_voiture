import api from "../lib/api";
import Cookies from "js-cookie";

//récupérer toutes les voitures
export const getCarsApi = async () => {
  const response = await api.get("/cars");
  return response.data;
};

//recuperer une voiture 
export const getCarApi = async (id: string) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
}
//ajouter une voiture 
export const addCarApi = async (formData: FormData) => {
  const response = await api.post("/cars", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${Cookies.get("token")}`
    },
  });
  return response.data;
};

//mettre à jour une voiture
export const updateCarApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/cars/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${Cookies.get("token")}`
    },
  });
  return response.data;
};

//supprimer une voiture
export const deleteCarApi = async (id: number) => {
  const response = await api.delete(`/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// récupérer les voitures disponibles
export const getAvailableCarsApi = async () => {
  const response = await api.get("/cars/available", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};


