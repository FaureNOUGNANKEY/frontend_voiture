import api from "../lib/api";

//recupérer tous les utilisateurs
export const getUsersApi = async () => {
    const response = await api.get("/users");
    return response.data;
};

// Récupérer un utilisateur
export const getUserApi = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
}
//ajouter un utilisateur
export const addUserApi = async (formData : FormData)=> {
    const response = await api.post("/users", formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}
//mettre à jour un utilisateur
export const updateUserApi = async (id : number, formDate :FormData)=>{
    const response = await api.post(`/users/${id}?_method=PUT`,formDate,{
        headers:{
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

//supprimer utilisateur 
export const deleteUserApi = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
