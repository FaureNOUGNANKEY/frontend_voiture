import api from "../lib/api";

// Récupérer toutes les réservations
export const getReservationsApi = async () => {
  const response = await api.get("/reservations");
  return response.data;  
};

// Récupérer une réservation
export const getReservationApi = async (id: string) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data;
}

// Ajouter une réservation
export const addReservationApi = async (formData: FormData) => {
  const response = await api.post("/reservations", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Mettre à jour une réservation
export const updateReservationApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/reservations/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une réservation
export const deleteReservationApi = async (id: number) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};
