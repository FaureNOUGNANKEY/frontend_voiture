"use client";

import AdminFooter from "@/components/admin/adminFooter";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import IncidentsList from "@/components/admin/vehicules/incidentList";
import UpcomingMaintenance from "@/components/admin/vehicules/upcomingMaintenance";
import VehiculeHeader from "@/components/admin/vehicules/vehiculeHeader";
import VehiculeKpis from "@/components/admin/vehicules/vehiculeKpis";
import VehiclesTable from "@/components/admin/vehicules/vehiculeTable";
import { useEffect, useState } from "react";
import { getCarsApi } from "@/api/car";
import { Car } from "@/lib/types";

export default function VehiculesPage() {
  const [cars, setCars] = useState<Car[]>([]);

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
    getCars();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 mx-auto">
          <VehiculeHeader />
          <VehiculeKpis cars={cars} />
          <VehiclesTable cars={cars}/>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <IncidentsList />
            <UpcomingMaintenance />
          </div>
        </div>
      </main>
    </div>
  );
}