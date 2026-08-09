import api from "../lib/api";
import Cookies from "js-cookie";

//Inscription (Register) 
export const registerApi = async (formData: FormData) => {
  const response = await api.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Connexion Admin
export const loginAdminApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/loginAdmin", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Connexion Client
export const loginClientApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/loginClient", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


//Déconnexion (Logout) 
export const logoutApi = async () => {
  const response = await api.post("/logout");
  return response.data;
};

//récupérer les utilisateurs protégés avec token
export const getUserstokenApi = async (token: string) => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data;
};
