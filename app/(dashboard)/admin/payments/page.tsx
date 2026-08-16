"use client";

import { Payment, Reservation, Statistics, User } from "@/lib/types";
import { useState, useEffect } from "react";
import { getReservationApi, getReservationsApi } from "@/api/reservation";
import { getStatisticsApi } from "@/api/statistic";
import { getPaymentApi, getPaymentsApi } from "@/api/payment";
import PaymentsTable from "@/components/admin/payment/paymentTable";
import PaymentsHeader from "@/components/admin/payment/payementHeader";



export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedpayment, setSelectedPayment] = useState<Payment | null>(null);

  const getPayments = async () => {
    try {
      const response = await getPaymentsApi();
      setPayments(response.data);
      console.log("Fetched Payments:", response.data);
    } catch (error) {
      console.error("Error fetching Payments:", error);

    }
  }
  const getReservations = async () => {
    try {
      const response = await getReservationsApi();
      setReservations(response.data);
      console.log("Fetched Reservations:", response.data);
    } catch (error) {
      console.error("Error fetching Reservations:", error);

    }
  }
  const getReservation = async (id :number|string ) => {
    try {
      const response = await getReservationApi(String(id));
      setReservations(response.data);
      console.log("Fetched Reservations:", response.data);
    } catch (error) {
      console.error("Error fetching Reservations:", error);

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

  const getPayment = async (id: string| number) => {
    try {
      const response = await getPaymentApi(String(id));
      setSelectedPayment(response.data);
      console.log("Fetched Payment:", response.data);
    } catch (error) {
      console.error("Error fetching Payment:", error);

    }
  }

  useEffect(() => {
    getStatistics();
    getReservations();
    getPayments();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <main className="">
        <div className="p-6 mx-auto">
          <PaymentsHeader  reservations={reservations} onSuccess={() => { getPayments()}}  />
          <PaymentsTable payments={payments} onEdit={(id: string | number) => getReservation(id)} onSuccess={getPayments} onPrint={(id: string | number) => getPayment(id)} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          </div>
        </div>
      </main>
    </div>
  );
}