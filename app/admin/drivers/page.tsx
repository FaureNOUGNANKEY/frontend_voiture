"use client";

import AdminFooter from "@/components/admin/adminFooter";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import IncidentsList from "@/components/admin/vehicules/incidentList";
import UpcomingMaintenance from "@/components/admin/vehicules/upcomingMaintenance";
import VehiculeKpis from "@/components/admin/drivers/driverKpis";
import { useEffect, useState } from "react";
import { getDriversApi } from "@/api/driver";
import { Driver, Statistics } from "@/lib/types";
import DriversTable from "@/components/admin/drivers/driverTable";
import DriverHeader from "@/components/admin/drivers/driverHeader";
import DriversKpis from "@/components/admin/drivers/driverKpis";
import { getStatisticsApi } from "@/api/statistic";

export default function ConducteursPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const getDrivers = async () => {
    try {
      const response = await getDriversApi();
      setDrivers(response.data);
      console.log("Fetched drivers:", response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);

    }
  }
  const [statistics, setStatistics] = useState<Statistics | null>(null);

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
    getDrivers();
    getStatistics();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminHeader />
      <Sidebar />

      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6 mx-auto">
          <DriverHeader />
          {statistics && <DriversKpis statistics={statistics} />}
          {/* <DriversKpis statistics={statistics} /> */}
          <DriversTable drivers={drivers}/>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* <IncidentsList /> */}
            {/* <UpcomingMaintenance /> */}
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}