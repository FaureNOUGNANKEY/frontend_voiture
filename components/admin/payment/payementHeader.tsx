import { Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car, Category, Reservation } from "@/lib/types";
import CreateVehiculeModal from "@/components/modals/createVehiculeModal";
import { useState } from "react";
import CreatePaymentModal from "@/components/modals/createPaymentModal";

interface PaymentProps{
  onSuccess?: () => void;
  reservations:Reservation[];
}
export default function VehiculeHeader( {onSuccess,reservations} : PaymentProps ) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Gestion des payements
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {
            "Consulter vos revenus."
          }
        </p>
      </div>
      <div className="flex gap-2">
        {/* <Button variant="outline" className="gap-2 p-4">
          <Filter size={18} />
          Filtres
        </Button> */}
        <Button onClick={() => setCreateOpen(true)} className="gap-2 p-4">
          <PlusCircle size={18} />
          Enrégistrer un payement
        </Button>
      </div>

      {/* Modal */}
      <CreatePaymentModal
        reservations={reservations}
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={onSuccess}
      />
    </div>
  );
}
