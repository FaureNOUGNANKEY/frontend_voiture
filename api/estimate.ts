import api from "@/lib/api";

export const estimateReservationApi = async (formData: any) => {
  const response = await api.post("/reservations/estimate", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
