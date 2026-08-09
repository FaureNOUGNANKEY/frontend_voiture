"use client";
import { cancelReservationApi, getMyReservationsApi } from "@/api/reservation";
import ClientFooter from "@/components/client/layout/ClientFooter";
import ClientHeader from "@/components/client/layout/ClientHeader";
import MyReservationsHeader from "@/components/client/reservations/myReservationsHeader";
import MyReservationsList from "@/components/client/reservations/myReservationsList";
import { useAuth } from "@/contexts/AuthContext";
import RequireClient from "@/contexts/RequireClient";
import { Reservation } from "@/lib/types";
import { useState, useEffect } from "react";

export default function MyReservationsPage() {

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const { login, getCurrentUser,  } = useAuth();

  const getReservations = async () => {
    try {
      const response = await getMyReservationsApi();
      setReservations(response.data); 
      console.log("Fetched myReservations:", response.data);
    } catch (error) {
      console.error("Error fetching myReservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
  try {
    await cancelReservationApi(id);
    console.log("Réservation annulée:", id);
    getReservations();
  } catch (error) {
    console.error("Erreur lors de l'annulation :", error);
  }
}

  useEffect(() => {
    getReservations();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <RequireClient>
      <main className="mx-auto px-4 md:px-10 py-10 bg-white">
        <MyReservationsHeader />
        <MyReservationsList reservations={reservations} onCancel={handleCancel} />
      </main>
    </RequireClient>
  );
}
