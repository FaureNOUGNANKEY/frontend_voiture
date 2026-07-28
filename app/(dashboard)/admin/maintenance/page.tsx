"use client"
import { getCarsApi } from "@/api/car";
import { getPannesApi } from "@/api/panne";
import MaintenanceActivityAndSupport from "@/components/admin/maintenance/maintenanceActivityandSupport";
import MaintenanceHeader from "@/components/admin/maintenance/maintenanceheader";
import MaintenanceOverview from "@/components/admin/maintenance/maintenanceoverview";
import MaintenanceTable from "@/components/admin/maintenance/maintenancetable";
import { Car, Panne } from "@/lib/types";
import { useState, useEffect } from "react";


  

export default function MaintenancePage() {
  const [pannes, setPannes] = useState<Panne[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

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
  
  useEffect(() => {
    getPannes();
    getCars()
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 p-6 mx-auto">
      <MaintenanceHeader cars={cars} onSuccess={getPannes}/>
      <MaintenanceOverview />
      <MaintenanceTable pannes={pannes}/>
      <MaintenanceActivityAndSupport />
    </div>
  );
}