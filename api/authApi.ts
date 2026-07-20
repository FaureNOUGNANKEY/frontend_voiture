import api from "../lib/api";

//Inscription (Register) 
export const registerApi = async (formData: FormData) => {
  const response = await api.post("/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//Connexion (Login) 
export const loginApi = async (data: { email: string; password: string }) => {
  const response = await api.post("/login", data, {
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
export const getUsersApi = async (token: string) => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
