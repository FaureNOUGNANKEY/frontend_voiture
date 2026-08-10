import api from "../lib/api";
import Cookies from "js-cookie";

export const addCarBackApi = async (formData: FormData) => {
  const response = await api.post("/carbacks", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${Cookies.get("token")}`
    },
  });
  return response.data;
};


export const updateCarBackApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/carbacks/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${Cookies.get("token")}`
    },
  });
  return response.data;
};