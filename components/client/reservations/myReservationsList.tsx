"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReservationCard from "./reservationCard";

export type MyReservationStatus = "À venir" | "En cours" | "Terminée" | "Annulée";

const TABS: { value: string; label: string; filter?: MyReservationStatus }[] = [
  { value: "all", label: "Toutes" },
  { value: "upcoming", label: "À venir", filter: "À venir" },
  { value: "ongoing", label: "En cours", filter: "En cours" },
  { value: "completed", label: "Terminées", filter: "Terminée" },
  { value: "cancelled", label: "Annulées", filter: "Annulée" },
];

export type MyReservation = {
  id: string;
  reference: string;
  vehicle: {
    name: string;
    category: string;
    imageUrl: string;
  };
  dateRange: string;
  location: string;
  price: string;
  status: MyReservationStatus;
};
 
export const myReservations: MyReservation[] = [
  {
    id: "mr1",
    reference: "#RES-2024-902",
    vehicle: {
      name: "Tesla Model 3",
      category: "Électrique",
      imageUrl:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=300&h=200&fit=crop",
    },
    dateRange: "26 Oct - 27 Oct 2024",
    location: "Agence Paris Gare de Lyon",
    price: "120,00 €",
    status: "À venir",
  },
  {
    id: "mr2",
    reference: "#RES-2024-901",
    vehicle: {
      name: "BMW X5 M-Sport",
      category: "SUV",
      imageUrl:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop",
    },
    dateRange: "24 Oct - 28 Oct 2024",
    location: "Agence Paris Charles de Gaulle",
    price: "540,00 €",
    status: "En cours",
  },
  {
    id: "mr3",
    reference: "#RES-2024-885",
    vehicle: {
      name: "Peugeot 3008 Hybrid",
      category: "Compact SUV",
      imageUrl:
        "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=300&h=200&fit=crop",
    },
    dateRange: "20 Oct - 25 Oct 2024",
    location: "Agence Lyon Part-Dieu",
    price: "1 450,00 €",
    status: "Terminée",
  },
  {
    id: "mr4",
    reference: "#RES-2024-812",
    vehicle: {
      name: "Audi A4 Avant",
      category: "Berline",
      imageUrl:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    },
    dateRange: "04 Mai - 06 Mai 2024",
    location: "Agence Paris Gare de Lyon",
    price: "189,50 €",
    status: "Terminée",
  },
  {
    id: "mr5",
    reference: "#RES-2024-790",
    vehicle: {
      name: "BMW iX",
      category: "Électrique",
      imageUrl:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
    },
    dateRange: "28 Avr - 30 Avr 2024",
    location: "Agence Lyon Part-Dieu",
    price: "210,00 €",
    status: "Annulée",
  },
];

export default function MyReservationsList() {
  return (
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
          ? myReservations.filter((r) => r.status === tab.filter)
          : myReservations;

        return (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            {data.length > 0 ? (
              data.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
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
  );
}