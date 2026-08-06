"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReservationCard from "./reservationCard";
import { Reservation } from "@/lib/types";
import ConfirmModal from "@/components/modals/confirmModal";
import { useState } from "react";

export type MyReservationStatus = "à venir" | "en cours" | "terminée" | "annulée";

const TABS: { value: string; label: string; filter?: MyReservationStatus }[] = [
  { value: "all", label: "Toutes" },
  { value: "upcoming", label: "À venir", filter: "à venir" },
  { value: "ongoing", label: "En cours", filter: "en cours" },
  { value: "completed", label: "Terminées", filter: "terminée" },
  { value: "cancelled", label: "Annulées", filter: "annulée" },
];

interface MyReservationsListProps {
  reservations: Reservation[];
  onCancel: (id: number) => void;
}

export default function MyReservationsList( { reservations, onCancel }: MyReservationsListProps) {

  
  return (

    <div>
      <Tabs defaultValue="all">
      <TabsList className="border-b border-slate-200 rounded-none w-full justify-start h-auto p-0 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-sm font-semibold whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => {
        const data = tab.filter
          ? reservations.filter((r) => r.computed_status === tab.filter)
          : reservations;

        return (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            {data.length > 0 ? (
              data.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} onCancel={onCancel}/>
              ))
            ) : (
              <p className="text-center text-sm text-slate-400 py-12">
                Aucune réservation dans cette catégorie.
              </p>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
    </div>  
  );
}