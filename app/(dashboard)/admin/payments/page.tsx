"use client";

import { Payment, Reservation, Statistics, User } from "@/lib/types";
import { useState, useEffect } from "react";
import { getReservationApi } from "@/api/reservation";
import { getStatisticsApi } from "@/api/statistic";
import { getPaymentsApi } from "@/api/payment";
import PaymentsTable from "@/components/admin/payment/paymentTable";
import PaymentsHeader from "@/components/admin/payment/payementHeader";



export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const getPayments = async () => {
    try {
      const response = await getPaymentsApi();
      setPayments(response.data);
      console.log("Fetched Payments:", response.data);
    } catch (error) {
      console.error("Error fetching Payments:", error);

    }
  }
  const getReservation = async (id: string | number) => {
    try {
      const response = await getReservationApi(String(id));
      setReservations(response.data);
      console.log("Fetched Reservation:", response.data);
    } catch (error) {
      console.error("Error fetching Reservation:", error);

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
    getStatistics();

    getPayments();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 mx-auto">
          <PaymentsHeader onSuccess={() => { getPayments()}}  />
          <PaymentsTable payments={payments} onEdit={(id: string | number) => getReservation(id)} onSuccess={getPayments} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          </div>
        </div>
      </main>
    </div>
  );
}