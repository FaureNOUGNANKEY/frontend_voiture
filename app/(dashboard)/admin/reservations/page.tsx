"use client";
import AdminFooter from "@/components/admin/adminFooter";
import DriverAvailability from "@/components/admin/reservations/driverAvailability";
import ReductionEngine from "@/components/admin/reservations/reductionEngin";
import ReservationsHeader from "@/components/admin/reservations/reservationHeader";
import ReservationsTable from "@/components/admin/reservations/reservationTable";
import SystemActivities from "@/components/admin/reservations/systemActivities";
import Sidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/adminHeader";
import { Car, Driver, Reservation, User } from "@/lib/types";
import { useState, useEffect } from "react";
import { getReservationApi, getReservationsApi } from "@/api/seservation";
import { getDriversApi } from "@/api/driver";
import { getUsersApi } from "@/api/user";
import { getCarsApi } from "@/api/car";



export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedreservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [clients, setClients] = useState<User[]>([]);

  const getReservations = async () => {
    try {
      const response = await getReservationsApi();
      setReservations(response.data);
      console.log("Fetched Reservations:", response.data);
    } catch (error) {
      console.error("Error fetching Reservations:", error);

    }
  }
  const getReservation = async (id: string| number) => {
    try {
      const response = await getReservationApi(String(id));
      setSelectedReservation(response.data);
      console.log("Fetched Reservation:", response.data);
    } catch (error) {
      console.error("Error fetching Reservation:", error);

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

  const getClients = async () => {
    try {
      const response = await getUsersApi();
      // Filtrer uniquement les clients (exclure admin)
      const clients = response.data.filter((user: any) => user.role !== "admin");
      setClients(clients);
      console.log("Fetched clients :", clients);
    } catch (error) {
      console.error("Error fetching users:", error);
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
    getCars();
    getClients();
    getReservations();
    getDrivers();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 mx-auto">
          <ReservationsHeader clients={clients} cars={cars} onSuccess={getReservations} drivers={drivers} />
          <ReservationsTable reservations={reservations} drivers={drivers} onEdit={(id: string | number) => getReservation(id)} onSuccess={getReservations} clients={clients} cars={cars}/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DriverAvailability />
            <ReductionEngine />
            <SystemActivities />
          </div>
        </div>
      </main>
    </div>
  );
}