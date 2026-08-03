import CreateReservationModal from "@/components/modals/createReservationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Driver, User } from "@/lib/types";

import { Plus } from "lucide-react";
import { useState } from "react";


export const reservationStats = [
  { id: "total", label: "Total actif", value: "42", delta: "+12%" },
  { id: "pending", label: "En attente de chauffeur", value: "08", tag: "URGENT" },
];

interface ReservationProps{
  drivers:Driver[];
  clients:User[];
  cars :Car[],
  onSuccess?: () => void;
}

export default function ReservationsHeader({clients,drivers,cars,onSuccess}:ReservationProps) {
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold">Réservations actives</h1>
        <p className="text-sm text-slate-500">
          Suivez le cycle de vie des locations et les affectations des chauffeurs.
        </p>
      </div>
      <div >
        <Button
          onClick={() => setCreateOpen(true)}
          type="button"
          className="w-full text-sm font-semibold py-5 rounded-lg
          flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Nouvelle Reservation
        </Button>

        {/* Modal */}
        <CreateReservationModal
          open={createOpen}
          onOpenChange={setCreateOpen}
          cars={cars}
          clients={clients}
          drivers={drivers}
          onSuccess={onSuccess}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        {reservationStats.map((stat) => (
          <Card key={stat.id} className="min-w-[160px] border rounded-2xl shadow-sm hover:-translate-y-0.5 transition-transform">
            <CardContent className="p-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xl font-semibold ${
                    stat.id === "pending" ? "text-red-600" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </span>
                {stat.delta && (
                  <span className="text-emerald-600 font-bold text-xs">{stat.delta}</span>
                )}
                {stat.tag && (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">
                    {stat.tag}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}