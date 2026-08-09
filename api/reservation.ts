import api from "../lib/api";
import Cookies from "js-cookie";

// Récupérer toutes les réservations
export const getReservationsApi = async () => {
  const response = await api.get("/reservations",{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;  
};

// Récupérer une réservation
export const getReservationApi = async (id: string) => {
  const response = await api.get(`/reservations/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    }
  });
  return response.data;
};


// Ajouter une réservation
export const addReservationApi = async (formData: FormData) => {
  const response = await api.post("/reservations", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Mettre à jour une réservation
export const updateReservationApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/reservations/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Supprimer une réservation
export const deleteReservationApi = async (id: number) => {
  const response = await api.delete(`/reservations/${id}`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};


// Récupérer les réservations de l'utilisateur connecté
export const getMyReservationsApi = async (status?: string) => {
  const url = status ? `/reservations/myReservations?status=${status}` : `/reservations/myReservations`;

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response.data; 
};

// Annuler une réservation
export const cancelReservationApi = async (id: number) => {
  const response = await api.put(`/reservations/${id}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  return response.data;
};