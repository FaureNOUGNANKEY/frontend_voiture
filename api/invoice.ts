import api from "../lib/api";

// Récupérer toutes les factures
export const getInvoicesApi = async () => {
  const response = await api.get("/invoices");
  return response.data;
};

// Récupérer une facture (invoice)
export const getInvoiceApi = async (id: string) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
}
// Ajouter une facture
export const addInvoiceApi = async (formData: FormData) => {
  const response = await api.post("/invoices", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Mettre à jour une facture
export const updateInvoiceApi = async (id: number, formData: FormData) => {
  const response = await api.post(`/invoices/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une facture
export const deleteInvoiceApi = async (id: number) => {
  const response = await api.delete(`/invoices/${id}`);
  return response.data;
};
