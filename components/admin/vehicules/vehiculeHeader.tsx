import { Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car, Category } from "@/lib/types";
import CreateVehiculeModal from "@/components/modals/createVehiculeModal";
import { useState } from "react";

interface CategoryProps{
  categories :Category[];
  onSuccess?: () => void;
}
export default function VehiculeHeader( {categories, onSuccess} : CategoryProps ) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Gestion des véhicules
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {
            "Supervisez l'état, la disponibilité et la maintenance de votre parc automobile en temps réel."
          }
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 p-4">
          <Filter size={18} />
          Filtres
        </Button>
        <Button onClick={() => setCreateOpen(true)} className="gap-2 p-4">
          <PlusCircle size={18} />
          Ajouter un véhicule
        </Button>
      </div>

      {/* Modal */}
      <CreateVehiculeModal
        categories={categories}
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={onSuccess}
      />
    </div>
  );
}
