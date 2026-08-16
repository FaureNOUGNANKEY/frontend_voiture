import api from "../lib/api";
import Cookies from "js-cookie";

// Récupérer tous les paramètres
export const getSettingsApi = async () => {
  const response = await api.get("/settings", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Récupérer un paramètre par clé
export const getSettingApi = async (key: string) => {
  const response = await api.get(`/settings/${key}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};

// Mettre à jour ou créer un paramètre
export const updateSettingApi = async (key: string, value: any) => {
  const response = await api.put(
    `/settings/${key}`,
    { value },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data;
};
