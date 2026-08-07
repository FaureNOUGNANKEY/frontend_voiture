"use client"
import { getCarsApi } from "@/api/car";
import { getPannesApi } from "@/api/panne";
import { getStatisticsApi } from "@/api/statistic";
import MaintenanceActivityAndSupport from "@/components/admin/maintenance/maintenanceActivityandSupport";
import MaintenanceHeader from "@/components/admin/maintenance/maintenanceheader";
import MaintenanceOverview from "@/components/admin/maintenance/maintenanceoverview";
import MaintenanceTable from "@/components/admin/maintenance/maintenancetable";
import { Car, Panne, Statistics } from "@/lib/types";
import { useState, useEffect } from "react";


  

export default function MaintenancePage() {
  const [pannes, setPannes] = useState<Panne[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null >(null);

  const getPannes = async () => {
    try {
      const response = await getPannesApi();
      setPannes(response.data);
      console.log("Fetched pannes:", response.data);
    } catch (error) {
      console.error("Error fetching pannes:", error);
    }
  };
  const getCars = async () => {
    try {
      const response = await getCarsApi();
      setCars(response.data);
      console.log("Fetched cars:", response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  const getStatistics = async () => {
      try {
        const response = await getStatisticsApi();
        setStatistics(response.data);
        console.log("Fetched Statistics:", response.data);
      } catch (error) {
        console.error("Error fetching Statistics:", error);
  
      }
    }
  
  useEffect(() => {
    getPannes();
    getCars()
    getStatistics();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 p-6 mx-auto">
      <MaintenanceHeader cars={cars} onSuccess={ () => {getPannes(),getStatistics()}}/>
      {statistics &&<MaintenanceOverview statistics= {statistics} />}
      <MaintenanceTable pannes={pannes}/>
      <MaintenanceActivityAndSupport />
    </div>
  );
}