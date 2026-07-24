"use client";
import AdminFooter from "@/components/admin/adminFooter";
import DriverAvailability from "@/components/admin/reservations/driverAvailability";
import ReductionEngine from "@/components/admin/reservations/reductionEngin";
import ReservationsHeader from "@/components/admin/reservations/reservationHeader";
import ReservationsTable from "@/components/admin/reservations/reservationTable";
import SystemActivities from "@/components/admin/reservations/systemActivities";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import { Driver, Reservation } from "@/lib/types";
import { useState, useEffect } from "react";
import { getReservationsApi } from "@/api/seservation";
import { getDriversApi } from "@/api/driver";



export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const getReservations = async () => {
    try {
      const response = await getReservationsApi();
      setReservations(response.data);
      console.log("Fetched Reservations:", response.data);
    } catch (error) {
      console.error("Error fetching Reservations:", error);

    }
  }
  

  const getDrivers = async () => {
    try {
      const response = await getDriversApi();
      setDrivers(response.data);
      console.log("Fetched Drivers:", response.data);
    } catch (error) {
      console.error("Error fetching Drivers:", error);

    }
  }
  

  useEffect(() => {
    getReservations();
    getDrivers();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <AdminHeader />
      <Sidebar />

      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6 mx-auto">
          <ReservationsHeader />
          <ReservationsTable reservations={reservations} drivers={drivers}/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DriverAvailability />
            <ReductionEngine />
            <SystemActivities />
          </div>
        </div>
      </main>

      <AdminFooter />
    </div>
  );
}