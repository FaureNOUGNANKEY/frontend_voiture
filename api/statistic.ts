import api from "../lib/api"
import Cookies from "js-cookie";

//récuperer les statistique depuis l'api 
export const getStatisticsApi = async () =>{
    
    const response = await api.get("/statistics",{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
    });
    return response.data;
};