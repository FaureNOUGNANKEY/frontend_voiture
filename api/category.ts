import api from "../lib/api";

// Récupérer toutes les catégories
export const getCategoriesApi = async () => {
  const response = await api.get("/categories");
  return response.data;
};

// Ajouter une catégorie
export const addCategoryApi = async (formData: FormData) => {
  const response = await api.post("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Mettre à jour une catégorie
export const updateCategoryApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/categories/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une catégorie
export const deleteCategoryApi = async (id: number) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
