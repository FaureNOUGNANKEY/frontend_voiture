import api from "../lib/api"

//récuperer les statistique depuis l'api 
export const getStatisticsApi = async () =>{
    const response = await api.get("/statistics");
    return response.data;
};